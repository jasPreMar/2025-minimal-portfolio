"use client";

import React from "react";
import { motion } from "motion/react";

interface ProjectsStaggeredFadeProps {
    children: React.ReactNode;
}

const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export function ProjectsStaggeredFade({ children }: ProjectsStaggeredFadeProps) {
    const validChildren = React.Children.toArray(children).filter(Boolean);

    return (
        <>
            {validChildren.map((child, index) => (
                <motion.div
                    key={index}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.5,
                        delay: index * 0.12,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="border-b border-border last:border-0"
                >
                    {child}
                </motion.div>
            ))}
        </>
    );
}
