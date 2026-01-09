"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EmailCopyButtonProps {
  email?: string;
}

export default function EmailCopyButton({ email = "jasonpmarsh@gmail.com" }: EmailCopyButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    // Check if device supports hover (not a touch device)
    const mediaQuery = window.matchMedia("(hover: hover)");
    setSupportsHover(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleCopyEmail = async () => {
    // Reset hover state on click/touch to prevent stuck hover state on touch devices
    setIsHovered(false);
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleMouseEnter = () => {
    if (supportsHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (supportsHover) {
      setIsHovered(false);
    }
  };

  return (
    <Tooltip delayDuration={750}>
      <TooltipTrigger asChild>
        <motion.button
          className="email-button-chromatic outline-none h-10 flex items-center justify-center whitespace-nowrap rounded-lg focus-visible:ring-1 focus-visible:ring-[oklch(0.145_0_0)] focus-visible:ring-offset-1 focus:outline-none bg-[oklch(1_0_0)] text-[oklch(0.145_0_0)] font-sans text-sm font-medium cursor-pointer relative"
          onClick={handleCopyEmail}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => setIsHovered(false)}
          aria-label="Copy email address to clipboard"
          layout
          whileTap={{
            y: 0.5,
            boxShadow: "0 0 0 1px #00000014, 0px 1px 1px #0000000a, inset 0 1.25px 0 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 0 rgba(0, 0, 0, 0.12), inset 0 2.5px 5px 0 rgba(0, 0, 0, 0.15), inset 0 -2px 4px 0 rgba(255, 255, 255, 0.15)"
          }}
          transition={{
            layout: {
              type: "spring",
              bounce: 0,
              duration: 0.2,
            },
            duration: 0.1,
          }}
        >
          <motion.div
            className="flex items-center px-4 relative"
            layout
            transition={{
              layout: {
                type: "spring",
                bounce: 0,
                duration: 0.2,
              },
            }}
          >
            <div className="relative flex items-center">
              <motion.div
                className="flex items-center gap-1.5"
                initial={false}
                animate={{
                  opacity: isCopied ? 1 : 0,
                  pointerEvents: isCopied ? "auto" : "none",
                }}
                transition={{
                  opacity: {
                    type: "spring",
                    bounce: 0,
                    duration: isCopied ? 0.2 : 0.15,
                  },
                }}
                style={{ 
                  position: isCopied ? "relative" : "absolute",
                  left: 0,
                  top: 0,
                  visibility: isCopied ? "visible" : "hidden",
                }}
              >
                <Check size={16} strokeWidth={2} />
                <span className="email-button-text">Copied Email!</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={false}
                animate={{
                  opacity: isCopied ? 0 : 1,
                  pointerEvents: isCopied ? "none" : "auto",
                }}
                transition={{
                  opacity: {
                    type: "spring",
                    bounce: 0,
                    duration: isCopied ? 0.15 : 0.2,
                  },
                }}
                style={{ 
                  position: isCopied ? "absolute" : "relative",
                  visibility: isCopied ? "hidden" : "visible",
                }}
              >
                <AnimatePresence initial={false}>
                  {isHovered && !isCopied && (
                    <motion.div
                      key="icon"
                      initial={{ opacity: 0, width: 0, marginRight: 0 }}
                      animate={{ opacity: 1, width: 16, marginRight: 6 }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        marginRight: 0,
                        transition: {
                          type: "spring",
                          bounce: 0,
                          duration: 0.15,
                        },
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0,
                        duration: 0.2,
                      }}
                      className="flex items-center overflow-hidden"
                      style={{ flexShrink: 0 }}
                    >
                      <Copy size={16} strokeWidth={2} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="email-button-text">Copy Email</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        <p>{email}</p>
      </TooltipContent>
    </Tooltip>
  );
}
