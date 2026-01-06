"use client";

import { motion } from "motion/react";

export function SiteFooter() {
    const text = "Made with ❤️ by Jason + Claude";

    return (
        <footer className="mt-6">
            <motion.div
                className="relative w-20 h-20"
                animate={{ rotate: -360 }}
                transition={{
                    duration: 15,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                >
                    <defs>
                        <path
                            id="circlePath"
                            d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                            fill="none"
                        />
                    </defs>
                    <text 
                        fontSize="12"
                        fontWeight="500"
                        letterSpacing="0.06em"
                        style={{ 
                            fill: 'var(--secondary)',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-sans), system-ui, sans-serif'
                        }}
                    >
                        <textPath
                            href="#circlePath"
                            startOffset="0%"
                        >
                            {text}
                        </textPath>
                    </text>
                </svg>
            </motion.div>
        </footer>
    );
}
