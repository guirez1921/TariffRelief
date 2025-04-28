import { VideoIcon } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import Button from './Button';

export default function VideoModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [borderColor, setBorderColor] = useState('gray');
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const openModal = async () => {
        setIsModalOpen(true);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
        setBorderColor('gray');
    };

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        };

        loadModels();
    }, []);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;

            const detectFace = async () => {
                if (videoRef.current) {
                    const detections = await faceapi.detectAllFaces(
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()
                    );
                    setBorderColor(detections.length > 0 ? 'green' : 'red');
                }
            };

            const interval = setInterval(detectFace, 1000); // Check for faces every second
            return () => clearInterval(interval);
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
                        {stream ? (
                            <video
                                autoPlay
                                playsInline
                                muted
                                ref={videoRef}
                                className={`w-full rounded-lg border-4`}
                                style={{ borderColor }}
                            />
                        ) : (
                            <p>Loading camera...</p>
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