import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Custom hook to detect when an element is in the viewport.
 * @param elementRef - A React ref to the DOM element to observe.
 * @param options - Intersection Observer options (threshold, rootMargin, etc.).
 * @returns A boolean indicating if the element is intersecting.
 */
const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element intersects, update state and stop observing.
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(element);
        }
      },
      options
    );

    observer.observe(element);

    // Cleanup function to unobserve the element when the component unmounts.
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, options]);

  return isIntersecting;
};

export default useIntersectionObserver;