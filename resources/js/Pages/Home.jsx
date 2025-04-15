import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useDragControls } from 'framer-motion';
import AppLayout from '@/Layouts/MainLayout';

export default function Home() {
    const items = [1, 2, 3, 4, 5, 6];
    const radius = 200;
    const dragX = useMotionValue(0);
    const [angle, setAngle] = useState(0);
    const dragControls = useDragControls();

    // We transform the dragX value to rotation
    const rotate = useSpring(useTransform(dragX, [0, 300], [0, 360]), {
        damping: 20,
        stiffness: 150,
    });

    // On drag end, snap to nearest rotation
    const handleDragEnd = (e, info) => {
        const deltaX = info.offset.x;
        const deltaAngle = (deltaX / 300) * 360;
        const newAngle = angle + deltaAngle;

        const snapped = Math.round(newAngle / (360 / items.length)) * (360 / items.length);
        setAngle(snapped);
        dragX.set(0); // reset drag
    };

    return (
        <AppLayout>
            <div className="w-screen h-screen flex items-center justify-center bg-white overflow-hidden">
                <motion.div
                    className="relative w-[500px] h-[500px]"
                    style={{ rotate: angle }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    dragControls={dragControls}
                >
                    {items.map((item, i) => {
                        const theta = (360 / items.length) * i;
                        const rad = (theta * Math.PI) / 180;
                        const x = radius * Math.cos(rad);
                        const y = radius * Math.sin(rad);

                        return (
                            <div
                                key={i}
                                className="absolute w-16 h-16 rounded-full bg-pink-300 shadow-xl flex items-center justify-center font-bold text-black"
                                style={{
                                    top: `calc(50% - 2rem)`,
                                    left: `calc(50% - 2rem)`,
                                    transform: `translate(${x}px, ${y}px)`,
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </AppLayout>
    );
}
