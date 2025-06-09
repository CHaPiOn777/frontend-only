import { useState, useLayoutEffect, useRef, RefObject } from "react";
import gsap from "gsap";

type UseFadeTransitionOptions = {
  duration?: number;
  easeIn?: string;
  easeOut?: string;
  y?: number;
};

export function useFadeTransition<T, S>(
  value: T,
  options: UseFadeTransitionOptions = {}
): { ref: RefObject<S | null>; displayedValue: T } {
  const {
    duration = 0.3,
    easeOut = "power1.out",
    easeIn = "power1.in",
    y = 0,
  } = options;
  const ref = useRef<S>(null);
  const [displayedValue, setDisplayedValue] = useState<T>(value);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 1 });

    const tl = gsap.timeline();

    tl.to(el, { opacity: 0, duration, ease: easeOut })
      .call(() => {
        setDisplayedValue(value);
        gsap.set(el, { y });
      })

      .to(el, { opacity: 1, duration, ease: easeIn, y: 0 });

    return () => {
      tl.kill();
    };
  }, [value, duration, easeIn, easeOut]);

  return { ref, displayedValue };
}
