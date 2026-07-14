import { RefObject, useEffect, useState } from 'react';

export function useSvgTextWidth(textRef: RefObject<null | SVGTextElement>, text: string) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!textRef.current) return;

    setWidth(textRef.current.getBBox().width);
  }, [textRef, text]);

  return width;
}
