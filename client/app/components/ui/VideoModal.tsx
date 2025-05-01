import { VideoIcon } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import faceMeshPkg from '@mediapipe/face_mesh';
const { FaceMesh } = faceMeshPkg;
import cameraUtils from '@mediapipe/camera_utils';
const { Camera } = cameraUtils;
import Button from './Button';
import axios from 'axios';

export default function VideoModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isFaceDetected, setIsFaceDetected] = useState(false);
    const [isLightingGood, setIsLightingGood] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const openModal = async () => {
        setIsModalOpen(true);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Camera permission required. Please allow camera access and try again.');
            setIsModalOpen(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    };

    const startRecording = () => {
        if (stream) {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const formData = new FormData();
                formData.append('video', blob, 'recording.webm');

                try {
                    await axios.post('https://dummyapi.io/endpoint', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    alert('Video uploaded successfully!');
                } catch (error) {
                    console.error('Error uploading video:', error);
                    alert('Failed to upload video.');
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    useEffect(() => {
        if (videoRef.current && canvasRef.current) {
            const faceMesh = new FaceMesh({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
            });

            faceMesh.setOptions({
                maxNumFaces: 1,
                refineLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            });

            faceMesh.onResults((results) => {
                const canvas = canvasRef.current!;
                const context = canvas.getContext('2d', { willReadFrequently: true })!;
                context.clearRect(0, 0, canvas.width, canvas.height);

                if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
                    setIsFaceDetected(true);

                    const landmarks = results.multiFaceLandmarks[0];
                    const xCoords = landmarks.map((landmark) => landmark.x * canvas.width);
                    const yCoords = landmarks.map((landmark) => landmark.y * canvas.height);

                    const minX = Math.min(...xCoords);
                    const maxX = Math.max(...xCoords);
                    const minY = Math.min(...yCoords);
                    const maxY = Math.max(...yCoords);

                    // Draw the video frame onto the canvas
                    context.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);

                    context.strokeStyle = 'blue';
                    context.lineWidth = 2;
                    context.beginPath();
                    context.rect(minX, minY, maxX - minX, maxY - minY);
                    context.stroke();

                    // Check face orientation
                    const nose = landmarks[1];
                    if (nose.x < 0.3) {
                        console.log('Turn face to the right');
                    } else if (nose.x > 0.7) {
                        console.log('Turn face to the left');
                    }

                    // Check lighting condition
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const brightness = imageData.data.reduce((sum, value, index) => {
                        if (index % 4 === 0) sum += value; // Only consider red channel
                        return sum;
                    }, 0) / (imageData.data.length / 4);

                    setIsLightingGood(brightness > 50); // Example threshold
                } else {
                    setIsFaceDetected(false);
                }
            });

            const camera = new Camera(videoRef.current, {
                onFrame: async () => {
                    await faceMesh.send({ image: videoRef.current! });
                },
                width: 640,
                height: 480,
            });

            camera.start();

            // Cleanup function to stop the camera and release resources
            return () => {
                camera.stop();
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                }
            };
        }
    }, [stream]);

    return (
        <>
            {/* Draggable Floating Button */}
            <div
                className="fixed bottom-5 right-5 z-50 cursor-pointer"
                draggable
                onDragEnd={(e) => {
                    const button = e.target as HTMLElement;
                    button.style.bottom = `${window.innerHeight - e.clientY - button.offsetHeight / 2}px`;
                    button.style.right = `${window.innerWidth - e.clientX - button.offsetWidth / 2}px`;
                }}
                onClick={openModal}
            >
                <button className="bg-blue-500 text-white border-none rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    <VideoIcon />
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg w-4/5 max-w-lg text-center">
                        <h2 className="text-xl font-bold mb-4 py-2">Camera Recording</h2>
                        <div className="relative">
                            {stream ? (
                                <>
                                    <video
                                        autoPlay
                                        playsInline
                                        muted
                                        ref={videoRef}
                                        className="w-full rounded-sm"
                                    />
                                    <canvas
                                        ref={canvasRef}
                                        className="absolute top-0 left-0 w-full h-full"
                                    />
                                </>
                            ) : (
                                <p>Loading camera...</p>
                            )}
                        </div>
                        {!isLightingGood && (
                            <p className="text-red-500 mt-2">Brightness is low. Please adjust your lighting.</p>
                        )}
                        {!isFaceDetected && (
                            <p className="text-red-500 mt-2">No face detected. Please position your face in front of the camera.</p>
                        )}
                        {isFaceDetected && isLightingGood && !isRecording && (
                            <Button variant="primary" onClick={startRecording} className="mt-5">
                                Start Recording
                            </Button>
                        )}
                        {isRecording && (
                            <Button variant="white" onClick={stopRecording} className="mt-5">
                                Stop Recording
                            </Button>
                        )}
                        <Button variant="primary" onClick={closeModal} className="mt-5">
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}