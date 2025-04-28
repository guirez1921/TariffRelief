import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}