"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";

interface RulersProps {
  visible: boolean;
}

interface GuideLine {
  id: string;
  orientation: "horizontal" | "vertical";
  position: number; // pixel position from top (horizontal) or left (vertical)
}

const RULER_SIZE = 24;
const TICK_INTERVAL = 50;
const GUIDE_COLOR = "#FF0000";
const CONTENT_MAX_WIDTH = 608;
const PADDING_DESKTOP = 64; // px-16 = 64px
const PADDING_MOBILE = 32; // px-8 = 32px
const SM_BREAKPOINT = 640;

export function Rulers({ visible }: RulersProps) {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [guideLines, setGuideLines] = useState<GuideLine[]>([]);
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOrientation, setDragOrientation] = useState<"horizontal" | "vertical" | null>(null);
  const [dragPosition, setDragPosition] = useState(0);
  const [draggingGuideId, setDraggingGuideId] = useState<string | null>(null);
  
  // Hover state
  const [hoveredGuideId, setHoveredGuideId] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate preset guide positions based on content margins
  const calculatePresetGuides = useCallback(() => {
    const vw = window.innerWidth;
    const padding = vw >= SM_BREAKPOINT ? PADDING_DESKTOP : PADDING_MOBILE;
    
    // ContentWrapper uses full viewport width (ruler is just an overlay)
    const contentAreaWidth = vw - (padding * 2);
    
    // Content is centered and has max-width of 608px
    const actualContentWidth = Math.min(contentAreaWidth, CONTENT_MAX_WIDTH);
    
    // Calculate left and right edges of content (in content coordinates, subtract RULER_SIZE)
    const contentLeft = padding + (contentAreaWidth - actualContentWidth) / 2 - RULER_SIZE;
    const contentRight = contentLeft + actualContentWidth;
    
    return [
      { id: "preset-left", orientation: "vertical" as const, position: contentLeft },
      { id: "preset-right", orientation: "vertical" as const, position: contentRight },
    ];
  }, []);

  // Reset or initialize guide lines when visibility changes
  useEffect(() => {
    if (!visible) {
      setGuideLines([]);
      setIsDragging(false);
      setDraggingGuideId(null);
      setHoveredGuideId(null);
    } else {
      // Initialize with preset guides at content margins
      setGuideLines(calculatePresetGuides());
    }
  }, [visible, calculatePresetGuides]);

  useEffect(() => {
    if (!visible) return;

    const updateDimensions = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    const updateScroll = () => {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    };

    updateDimensions();
    updateScroll();

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateDimensions);

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateDimensions);
      resizeObserver.disconnect();
    };
  }, [visible]);

  // Handle mouse move during drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (dragOrientation === "horizontal") {
        // Horizontal guide - tracks Y position (absolute page position)
        setDragPosition(e.clientY + scrollY);
      } else if (dragOrientation === "vertical") {
        // Vertical guide - tracks X position (absolute page position)
        setDragPosition(e.clientX + scrollX);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (dragOrientation === "horizontal") {
        const dropY = e.clientY;
        // If dropped back on the top ruler area, remove the guide
        if (dropY <= RULER_SIZE) {
          if (draggingGuideId) {
            setGuideLines(prev => prev.filter(g => g.id !== draggingGuideId));
          }
        } else {
          const finalPosition = e.clientY + scrollY - RULER_SIZE;
          if (draggingGuideId) {
            // Update existing guide
            setGuideLines(prev => prev.map(g => 
              g.id === draggingGuideId ? { ...g, position: finalPosition } : g
            ));
          } else {
            // Create new guide
            setGuideLines(prev => [...prev, {
              id: `guide-${Date.now()}`,
              orientation: "horizontal",
              position: finalPosition,
            }]);
          }
        }
      } else if (dragOrientation === "vertical") {
        const dropX = e.clientX;
        // If dropped back on the left ruler area, remove the guide
        if (dropX <= RULER_SIZE) {
          if (draggingGuideId) {
            setGuideLines(prev => prev.filter(g => g.id !== draggingGuideId));
          }
        } else {
          const finalPosition = e.clientX + scrollX - RULER_SIZE;
          if (draggingGuideId) {
            // Update existing guide
            setGuideLines(prev => prev.map(g => 
              g.id === draggingGuideId ? { ...g, position: finalPosition } : g
            ));
          } else {
            // Create new guide
            setGuideLines(prev => [...prev, {
              id: `guide-${Date.now()}`,
              orientation: "vertical",
              position: finalPosition,
            }]);
          }
        }
      }
      
      setIsDragging(false);
      setDragOrientation(null);
      setDraggingGuideId(null);
      setHoveredGuideId(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOrientation, draggingGuideId, scrollX, scrollY]);

  // Start dragging from top ruler (creates horizontal guide)
  const handleTopRulerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOrientation("horizontal");
    setDragPosition(e.clientY + scrollY);
    setDraggingGuideId(null);
    setHoveredGuideId(null);
  }, [scrollY]);

  // Start dragging from left ruler (creates vertical guide)
  const handleLeftRulerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOrientation("vertical");
    setDragPosition(e.clientX + scrollX);
    setDraggingGuideId(null);
    setHoveredGuideId(null);
  }, [scrollX]);

  // Start dragging an existing guide
  const handleGuideMouseDown = useCallback((e: React.MouseEvent, guide: GuideLine) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragOrientation(guide.orientation);
    setDragPosition(guide.position);
    setDraggingGuideId(guide.id);
    setHoveredGuideId(null);
  }, []);

  // Generate horizontal tick marks (for top ruler)
  const horizontalTicks = useMemo(() => {
    if (!visible || viewportWidth === 0) return [];
    
    const ticks: number[] = [];
    const startTick = Math.floor(scrollX / TICK_INTERVAL) * TICK_INTERVAL;
    for (let pos = startTick; pos <= scrollX + viewportWidth + TICK_INTERVAL; pos += TICK_INTERVAL) {
      if (pos >= 0) {
        ticks.push(pos);
      }
    }
    return ticks;
  }, [visible, scrollX, viewportWidth]);

  // Generate vertical tick marks (for left ruler)
  const verticalTicks = useMemo(() => {
    if (!visible || viewportHeight === 0) return [];
    
    const ticks: number[] = [];
    const startTick = Math.floor(scrollY / TICK_INTERVAL) * TICK_INTERVAL;
    for (let pos = startTick; pos <= scrollY + viewportHeight + TICK_INTERVAL; pos += TICK_INTERVAL) {
      if (pos >= 0) {
        ticks.push(pos);
      }
    }
    return ticks;
  }, [visible, scrollY, viewportHeight]);

  if (!visible) return null;

  return (
    <div ref={containerRef}>
      {/* Guide lines overlay - covers the whole viewport */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ top: RULER_SIZE, left: RULER_SIZE }}
      >
        {/* Existing guide lines */}
        {guideLines.map(guide => {
          // Don't render the guide being dragged (we render it separately)
          if (guide.id === draggingGuideId) return null;
          
          if (guide.orientation === "horizontal") {
            const screenY = guide.position - scrollY;
            return (
              <div
                key={guide.id}
                className="absolute left-0 right-0 pointer-events-auto cursor-row-resize"
                style={{
                  top: screenY,
                  height: 5,
                  marginTop: -2,
                  marginLeft: -RULER_SIZE,
                }}
                onMouseDown={(e) => handleGuideMouseDown(e, guide)}
                onMouseEnter={() => setHoveredGuideId(guide.id)}
                onMouseLeave={() => setHoveredGuideId(null)}
              >
                <div 
                  className="absolute left-0 right-0"
                  style={{
                    top: 2,
                    height: 0.5,
                    backgroundColor: GUIDE_COLOR,
                  }}
                />
              </div>
            );
          } else {
            const screenX = guide.position - scrollX;
            return (
              <div
                key={guide.id}
                className="absolute top-0 bottom-0 pointer-events-auto cursor-col-resize"
                style={{
                  left: screenX,
                  width: 5,
                  marginLeft: -2,
                  marginTop: -RULER_SIZE,
                }}
                onMouseDown={(e) => handleGuideMouseDown(e, guide)}
                onMouseEnter={() => setHoveredGuideId(guide.id)}
                onMouseLeave={() => setHoveredGuideId(null)}
              >
                <div 
                  className="absolute top-0 bottom-0"
                  style={{
                    left: 2,
                    width: 0.5,
                    backgroundColor: GUIDE_COLOR,
                  }}
                />
              </div>
            );
          }
        })}
        
        {/* Currently dragging guide line */}
        {isDragging && dragOrientation === "horizontal" && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: dragPosition - scrollY - RULER_SIZE,
              height: 0.5,
              backgroundColor: GUIDE_COLOR,
              marginLeft: -RULER_SIZE,
            }}
          />
        )}
        {isDragging && dragOrientation === "vertical" && (
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: dragPosition - scrollX - RULER_SIZE,
              width: 0.5,
              backgroundColor: GUIDE_COLOR,
              marginTop: -RULER_SIZE,
            }}
          />
        )}
      </div>

      {/* Top horizontal ruler */}
      <div
        className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[9999] cursor-row-resize"
        style={{ height: RULER_SIZE, paddingLeft: RULER_SIZE }}
        onMouseDown={handleTopRulerMouseDown}
      >
        <div className="relative w-full h-full overflow-hidden pointer-events-none">
          {horizontalTicks.map((pos) => {
            const screenX = pos - scrollX;
            return (
              <div
                key={pos}
                className="absolute top-0 h-full flex flex-col justify-end items-center"
                style={{ left: screenX }}
              >
                <div 
                  className="w-px bg-border"
                  style={{ height: pos % 100 === 0 ? 10 : 6 }}
                />
                <span 
                  className="text-[9px] text-secondary absolute bottom-1 whitespace-nowrap"
                  style={{ 
                    transform: "translateX(-50%)",
                    left: 0,
                  }}
                >
                  {pos}
                </span>
              </div>
            );
          })}
          {/* Guide position labels for vertical guides */}
          {guideLines
            .filter(g => g.orientation === "vertical" && g.id !== draggingGuideId && hoveredGuideId === g.id)
            .map(guide => {
              const screenX = guide.position - scrollX;
              return (
                <div
                  key={`label-${guide.id}`}
                  className="absolute top-0 h-full flex flex-col justify-end items-center"
                  style={{ left: screenX }}
                >
                  <div 
                    className="w-px"
                    style={{ height: 10, backgroundColor: GUIDE_COLOR }}
                  />
                  <span 
                    className="text-[9px] absolute bottom-1 whitespace-nowrap font-medium"
                    style={{ 
                      transform: "translateX(-50%)",
                      left: 0,
                      color: GUIDE_COLOR,
                    }}
                  >
                    {Math.round(guide.position)}
                  </span>
                </div>
              );
            })}
          {/* Dragging guide label (vertical) */}
          {isDragging && dragOrientation === "vertical" && (
            <div
              className="absolute top-0 h-full flex flex-col justify-end items-center"
              style={{ left: dragPosition - scrollX - RULER_SIZE }}
            >
              <div 
                className="w-px"
                style={{ height: 10, backgroundColor: GUIDE_COLOR }}
              />
              <span 
                className="text-[9px] absolute bottom-1 whitespace-nowrap font-medium"
                style={{ 
                  transform: "translateX(-50%)",
                  left: 0,
                  color: GUIDE_COLOR,
                }}
              >
                {Math.round(dragPosition - RULER_SIZE)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Left vertical ruler */}
      <div
        className="fixed top-0 left-0 bottom-0 bg-background border-r border-border z-[9999] cursor-col-resize"
        style={{ width: RULER_SIZE, paddingTop: RULER_SIZE }}
        onMouseDown={handleLeftRulerMouseDown}
      >
        <div className="relative w-full h-full overflow-hidden pointer-events-none">
          {verticalTicks.map((pos) => {
            const screenY = pos - scrollY;
            return (
              <div
                key={pos}
                className="absolute left-0 w-full flex flex-row justify-end items-center"
                style={{ top: screenY }}
              >
                <div 
                  className="h-px bg-border"
                  style={{ width: pos % 100 === 0 ? 10 : 6 }}
                />
                <span 
                  className="text-[9px] text-secondary absolute right-1 whitespace-nowrap"
                  style={{ 
                    transform: "translateY(-50%) rotate(-90deg)",
                    transformOrigin: "center center",
                    top: 0,
                  }}
                >
                  {pos}
                </span>
              </div>
            );
          })}
          {/* Guide position labels for horizontal guides */}
          {guideLines
            .filter(g => g.orientation === "horizontal" && g.id !== draggingGuideId && hoveredGuideId === g.id)
            .map(guide => {
              const screenY = guide.position - scrollY;
              return (
                <div
                  key={`label-${guide.id}`}
                  className="absolute left-0 w-full flex flex-row justify-end items-center"
                  style={{ top: screenY }}
                >
                  <div 
                    className="h-px"
                    style={{ width: 10, backgroundColor: GUIDE_COLOR }}
                  />
                  <span 
                    className="text-[9px] absolute right-1 whitespace-nowrap font-medium"
                    style={{ 
                      transform: "translateY(-50%) rotate(-90deg)",
                      transformOrigin: "center center",
                      top: 0,
                      color: GUIDE_COLOR,
                    }}
                  >
                    {Math.round(guide.position)}
                  </span>
                </div>
              );
            })}
          {/* Dragging guide label (horizontal) */}
          {isDragging && dragOrientation === "horizontal" && (
            <div
              className="absolute left-0 w-full flex flex-row justify-end items-center"
              style={{ top: dragPosition - scrollY - RULER_SIZE }}
            >
              <div 
                className="h-px"
                style={{ width: 10, backgroundColor: GUIDE_COLOR }}
              />
              <span 
                className="text-[9px] absolute right-1 whitespace-nowrap font-medium"
                style={{ 
                  transform: "translateY(-50%) rotate(-90deg)",
                  transformOrigin: "center center",
                  top: 0,
                  color: GUIDE_COLOR,
                }}
              >
                {Math.round(dragPosition - RULER_SIZE)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Corner square (where rulers meet) */}
      <div
        className="fixed top-0 left-0 bg-background border-r border-b border-border z-[10000]"
        style={{ width: RULER_SIZE, height: RULER_SIZE }}
      />

      {/* Global cursor override during drag */}
      {isDragging && (
        <style>{`
          * {
            cursor: ${dragOrientation === "horizontal" ? "row-resize" : "col-resize"} !important;
          }
        `}</style>
      )}
    </div>
  );
}
