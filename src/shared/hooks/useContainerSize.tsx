import { useState, useLayoutEffect, RefObject } from "react";

type Size = { width: number; height: number };

export function useContainerSize(ref: RefObject<HTMLElement | null>): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref?.current) return;
    const node = ref.current;

    setSize({ width: node.clientWidth, height: node.clientHeight });

    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    ro.observe(node);

    return () => {
      ro.disconnect();
    };
  }, [ref.current]);

  return size;
}
