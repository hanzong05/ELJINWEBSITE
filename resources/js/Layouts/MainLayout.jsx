import React from 'react';
import Sidebar from '@/Components/Sidebar';

export default function AppLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar /> {/* or IconNavigation */}
            <main className="flex-1">{children}</main>
        </div>
    );
}
