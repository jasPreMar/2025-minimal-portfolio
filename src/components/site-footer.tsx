"use client";

import { useState, useEffect } from "react";

const glyphs = ["·", "✢", "✳", "✶", "✻", "✽", "❤", "♥", "❤", "✽", "✻", "✶", "✳", "✢", "·"];

export function SiteFooter() {
    const [currentGlyphIndex, setCurrentGlyphIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGlyphIndex((prev) => (prev + 1) % glyphs.length);
        }, 170);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="mt-6 mb-6">
            <div className="text-center text-secondary text-sm font-mono">
                Made with {glyphs[currentGlyphIndex]} by Jason Marsh
            </div>
        </footer>
    );
}
