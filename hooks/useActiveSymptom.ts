'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Symptom } from '@/components/sections/for-whom/symptoms';

interface UseActiveSymptom {
  active: Symptom;
  activeId: string;
  clearHover: () => void;
  clearSelection: () => void;
  hasSelection: boolean;
  hover: (id: string) => void;
  isActive: (id: string) => boolean;
  onKeyNavigate: (event: { key: string; preventDefault: () => void }) => void;
  select: (id: string) => void;
}

export function useActiveSymptom(symptoms: Symptom[]): UseActiveSymptom {
  const [pinnedId, setPinnedId] = useState<null | string>(null);
  const [hoverId, setHoverId] = useState<null | string>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeId = pinnedId ?? hoverId ?? symptoms[0].id;
  const hasSelection = pinnedId !== null;
  const active = useMemo(
    () => symptoms.find((s) => s.id === activeId) ?? symptoms[0],
    [symptoms, activeId],
  );

  const cancelHoverTimer = useCallback(() => {
    if (!hoverTimer.current) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }, []);

  useEffect(() => cancelHoverTimer, [cancelHoverTimer]);

  const hover = useCallback(
    (id: string) => {
      cancelHoverTimer();
      if (hasSelection || id === hoverId) return;
      hoverTimer.current = setTimeout(() => setHoverId(id), 140);
    },
    [cancelHoverTimer, hasSelection, hoverId],
  );
  const clearHover = useCallback(() => {
    cancelHoverTimer();
    setHoverId(null);
  }, [cancelHoverTimer]);
  const select = useCallback(
    (id: string) => {
      cancelHoverTimer();
      setPinnedId(id);
      setHoverId(null);
    },
    [cancelHoverTimer],
  );
  const clearSelection = useCallback(() => {
    cancelHoverTimer();
    setPinnedId(null);
    setHoverId(null);
  }, [cancelHoverTimer]);
  const isActive = useCallback(
    (id: string) => id === pinnedId || (!hasSelection && id === hoverId),
    [hasSelection, hoverId, pinnedId],
  );

  const onKeyNavigate = useCallback(
    (event: { key: string; preventDefault: () => void }) => {
      const dir =
        event.key === 'ArrowDown' || event.key === 'ArrowRight'
          ? 1
          : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
            ? -1
            : 0;
      if (dir === 0) return;
      event.preventDefault();
      const index = symptoms.findIndex((s) => s.id === activeId);
      const next = (index + dir + symptoms.length) % symptoms.length;
      setPinnedId(symptoms[next].id);
      setHoverId(null);
    },
    [symptoms, activeId],
  );

  return {
    active,
    activeId,
    clearHover,
    clearSelection,
    hasSelection,
    hover,
    isActive,
    onKeyNavigate,
    select,
  };
}
