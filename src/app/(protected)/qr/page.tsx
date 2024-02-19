'use client';
import QrScanner from 'qr-scanner';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/Button';

// Component for QR Code scanning
export default function QRCode() {
  // State to hold scanned data and button scan state
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  // Use refs to prevent re-render
  const stopScanRef = useRef(false);
  const videoElementRef = useRef(null);

  // Function to handle the submission of scanned QR code
  const onSubmit = async (scanCode: string) => {
    try {
      const data = JSON.parse(scanCode);
      toast.success('onSubmit berhasil'); // Display success toast
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  // Function to handle the submission of scanned QR code
  console.log(isCameraOn, videoElementRef, stopScanRef.current, facingMode);
  // Function to initiate QR code scanning
  const scanNow = async (isScan: boolean) => {
    // Stop scan if already scanning to prevent multiple scans
    if (isScan) {
      stopScanRef.current = false;
    } else {
      stopScanRef.current = true;
    }
    // Check if scanning is allowed based on button state

    await new Promise((r) => setTimeout(r, 100)); // Wait for 100ms

    // Get video element for scanning
    const videoElement = videoElementRef.current;

    // Check if video element exists before initializing the scanner
    if (!videoElement) {
      console.error('Video element not found');
      return;
    }

    // Initialize QR scanner
    const scanner = new QrScanner(
      videoElement,
      (result: { data: string }) => {
        onSubmit(result.data); // Call onSubmit when QR code is scanned
        setIsLoading(true); // Reset button scan state
        stopScanRef.current = true; // Stop scanning
      },
      {
        onDecodeError: (error: any) => {
          console.error(error); // Log decoding errors
        },
        preferredCamera: facingMode,
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      },
    );

    // Start scanning
    await scanner.start();

    // Wait until stopScan flag is set
    while (stopScanRef.current === false)
      await new Promise((r) => setTimeout(r, 100));
    // Stop and destroy the scanner
    scanner.stop();
    scanner.destroy();
  };

  // Function to toggle the camera state
  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev); // Toggle camera state
    scanNow(!isCameraOn); // Start or stop scanning based on camera state
  };

  // ...
  return (
    <main className='overflow-hidden relative z-[50] font-poppins bg-gradient-to-tl px-4 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 from-[#103020] to-[#061906] text-white flex min-h-screen flex-col items-center'>
      <div className='flex flex-col items-center justify-center gap-10'>
        <video
          ref={videoElementRef}
          id='scanView'
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '100%',
            maxHeight: '400px',
            borderStyle: 'dotted',
          }}
        />
        <div className='w-full max-w-[400px]'>
          <Button onClick={toggleCamera} color='gold' isFullWidth>
            {isCameraOn && videoElementRef.current
              ? 'Turn off the Camera'
              : 'Turn on the Camera'}
          </Button>
        </div>
        if you want to switch camera turn off the camera first
        <div className='w-full max-w-[400px]'>
          <Button
            onClick={() => {
              setFacingMode((prev) =>
                prev === 'environment' ? 'user' : 'environment',
              );
            }}
            color='gold'
            isFullWidth
          >
            Switch Camera
          </Button>
        </div>
      </div>
    </main>
  );
}
