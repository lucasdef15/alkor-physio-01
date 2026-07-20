'use client';

import { useCallback, useMemo, useState } from 'react';

import { Symptom } from '@/components/sections/for-whom/symptoms';

interface UseActiveSymptom {
  active: Symptom;
  activeId: string;
  clearHover: () => void;
  hover: (id: string) => void;
  isActive: (id: string) => boolean;
  onKeyNavigate: (event: { key: string; preventDefault: () => void }) => void;
  select: (id: string) => void;
}

export function useActiveSymptom(symptoms: Symptom[]): UseActiveSymptom {
  const [pinnedId, setPinnedId] = useState(symptoms[0].id);
  const [hoverId, setHoverId] = useState<null | string>(null);

  const activeId = hoverId ?? pinnedId;
  const active = useMemo(
    () => symptoms.find((s) => s.id === activeId) ?? symptoms[0],
    [symptoms, activeId],
  );

  const hover = useCallback((id: string) => setHoverId(id), []);
  const clearHover = useCallback(() => setHoverId(null), []);
  const select = useCallback((id: string) => {
    setPinnedId(id);
    setHoverId(null);
  }, []);
  const isActive = useCallback((id: string) => id === activeId, [activeId]);

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

  return { active, activeId, clearHover, hover, isActive, onKeyNavigate, select };
}
