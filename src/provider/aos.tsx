'use client';
import 'aos/dist/aos.css';

import AOS from 'aos';
import { useEffect } from 'react';

/**
 * AOS (Animate on Scroll) client-side initializer.
 *
 * Uses requestAnimationFrame to delay AOS.init() until AFTER React hydration
 * completes. This prevents hydration mismatch errors caused by AOS adding
 * `aos-init` classes to DOM elements before React has finished comparing
 * server-rendered HTML with client-side output.
 */
const AOSClient = () => {
  useEffect(() => {
    // Delay AOS init to the next animation frame so React hydration finishes
    // first. AOS adds `aos-init` class to elements with `data-aos`, which
    // would mismatch the server-rendered HTML if run synchronously.
    const frameId = requestAnimationFrame(() => {
      AOS.init({
        offset: 50,
        delay: 0,
        duration: 700,
        easing: 'ease-in-out',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  return <></>;
};
export default AOSClient;
