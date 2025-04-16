import React from 'react';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';

export default function AppLayout({ 
  children, 
  footerProps = {} // Default empty object for footer props
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar with elevated z-index to ensure it stays above content */}
            <div className="relative z-20">
                <Sidebar />
            </div>
            
            {/* Main content area - flex-1 ensures it takes up remaining space */}
            <main className="flex-1 overflow-x-hidden flex flex-col">
                {/* Main content */}
                <div className="flex-grow">
                    {children}
                </div>
                
                {/* Footer with custom props */}
                <Footer {...footerProps} />
            </main>
        </div>
    );
}