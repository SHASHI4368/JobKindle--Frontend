import { useEffect, useRef } from "react";

// Custom hook to handle scrollable drawer behavior
export const useScrollableDrawer = (isOpen: boolean) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const scrollTop = useRef<number>(0);

  useEffect(() => {
    if (!isOpen) return;

    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      scrollTop.current = scrollElement.scrollTop;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;
      const currentScrollTop = scrollElement.scrollTop;

      // If we're scrolling within the content, prevent drawer close
      if (
        (deltaY > 0 &&
          currentScrollTop <
            scrollElement.scrollHeight - scrollElement.clientHeight) || // Scrolling down and can scroll down
        (deltaY < 0 && currentScrollTop > 0) // Scrolling up and can scroll up
      ) {
        e.stopPropagation();
      }

      // If we're at the top and trying to scroll up (pull down), allow drawer close
      if (currentScrollTop <= 0 && deltaY < -50) {
        // Allow the drawer's default behavior
        return;
      }

      // If we're scrolling within bounds, stop propagation
      if (currentScrollTop > 0 || deltaY > 0) {
        e.stopPropagation();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
    };

    // Add event listeners
    scrollElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    scrollElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    scrollElement.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });

    // Cleanup
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("touchstart", handleTouchStart);
        scrollElement.removeEventListener("touchmove", handleTouchMove);
        scrollElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isOpen]);

  return scrollRef;
};
