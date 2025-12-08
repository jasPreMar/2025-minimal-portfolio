"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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

  // Display text logic
  const getDisplayText = () => {
    if (isCopied) return "Copied!";
    return isHovered ? "Copy" : "Email";
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          className="email-button-chromatic outline-none px-4 h-9 flex items-center justify-center whitespace-nowrap rounded-lg active:scale-95 transition-transform focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-1 focus:outline-none bg-foreground text-background font-sans text-sm font-medium cursor-pointer"
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyEmail}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(false)}
          aria-label="Copy email address to clipboard"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              className="flex items-center justify-center min-w-[3rem]"
              key={isCopied ? 'copied' : (isHovered ? 'hovered' : 'default')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            >
              <span className="email-button-text">
                {getDisplayText()}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8}>
        <p>{email}</p>
      </TooltipContent>
    </Tooltip>
  );
}

