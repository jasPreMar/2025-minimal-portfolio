"use client";

import { useState, useEffect } from "react";

const glyphs = ["•", "✢", "✳", "✶", "✻", "✽", "✽", "✻", "✶", "✳", "✢", "•"];

export function SiteFooter() {
    const [currentGlyphIndex, setCurrentGlyphIndex] = useState(0);
    const [isBigHeart, setIsBigHeart] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGlyphIndex((prev) => (prev + 1) % glyphs.length);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Heartbeat animation: big → small → big → pause
        const heartbeat = () => {
            setIsBigHeart(false); // small
            setTimeout(() => setIsBigHeart(true), 100); // back to big
        };

        const interval = setInterval(heartbeat, 800); // heartbeat every 800ms

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="mt-6 mb-6">
            <div className="text-center text-secondary text-sm font-mono">
                Made with {isBigHeart ? "❤" : "♥"} by Jason Marsh and {glyphs[currentGlyphIndex]}
            </div>
        </footer>
    );
}
