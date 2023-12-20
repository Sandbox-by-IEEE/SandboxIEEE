'use client';
import React, { useEffect, useRef } from 'react';

const LazyLoadMap = ({ src }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = document.createElement('iframe');
          iframe.src = (entry.target as HTMLDivElement).dataset.src || '';
          iframe.title = 'Maps Location'; //
          iframe.className = 'h-full w-full border-0';
          entry.target.appendChild(iframe);
          observer.unobserve(entry.target);
        }
      });
    });

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <div
      data-aos='zoom-in'
      ref={mapRef}
      className='lazy-load-map w-full h-full'
      data-src={src}
    ></div>
  );
};

export default LazyLoadMap;
