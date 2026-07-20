'use client';

import {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
  useEffect,
  useRef,
} from 'react';

interface HorizontalScrollHandlers {
  onClickCapture: (event: ReactMouseEvent<HTMLElement>) => void;
  onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLElement>) => void;
}

export function useHorizontalScroll(
  scrollRef: RefObject<HTMLElement | null>,
): HorizontalScrollHandlers {
  const drag = useRef({ active: false, moved: false, startScroll: 0, startX: 0 });

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const onWheel = (event: WheelEvent) => {
      if (
        element.scrollWidth <= element.clientWidth ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      ) {
        return;
      }

      const atStart = element.scrollLeft <= 0;
      const atEnd = element.scrollLeft >= element.scrollWidth - element.clientWidth - 1;
      if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;

      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
  }, [scrollRef]);

  const finishDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.removeAttribute('data-dragging');
  };

  return {
    onClickCapture: (event) => {
      if (!drag.current.moved) return;
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    },
    onPointerCancel: finishDrag,
    onPointerDown: (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      drag.current = {
        active: true,
        moved: false,
        startScroll: event.currentTarget.scrollLeft,
        startX: event.clientX,
      };
    },
    onPointerLeave: (event) => {
      if (drag.current.active && !drag.current.moved) finishDrag(event);
    },
    onPointerMove: (event) => {
      if (!drag.current.active) return;
      if (event.buttons !== 1) {
        finishDrag(event);
        return;
      }
      const distance = event.clientX - drag.current.startX;
      if (Math.abs(distance) > 5 && !drag.current.moved) {
        drag.current.moved = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.setAttribute('data-dragging', 'true');
      }
      if (!drag.current.moved) return;
      event.currentTarget.scrollLeft = drag.current.startScroll - distance;
    },
    onPointerUp: finishDrag,
  };
}
