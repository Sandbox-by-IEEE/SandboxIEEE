/* eslint-disable no-console */
'use client';
import Image from 'next/image';
import QrScanner from 'qr-scanner';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import { callLoading, callToast } from '@/components/Toast';

// Component for QR Code scanning
export default function QRCode() {
  // State to hold scanned data and button scan state
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  // Use refs to prevent re-render
  const stopScanRef = useRef(false);
  const videoElementRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the submission of scanned QR code
  const onSubmit = async (scanCode: string) => {
    //shoot API here
    const loadingToastId = callLoading('Submitting Data...'); // Tampilkan toast loading
    try {
      setIsLoading(true);
      const data = JSON.parse(scanCode);

      // console.log(data)

      const response = await fetch('/api/ticket/exhibition/validate', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const bodyResponse = await response.json();
      // console.log(bodyResponse)
      if (!response.ok) {
        callToast({
          status: 'error',
          description: bodyResponse.message,
        });
      } else {
        callToast({
          status: 'success',
          description: bodyResponse.message,
        });
      }
    } catch (err) {
      callToast({
        status: 'error',
        description:
          'Something went wrong while submit your data, please try again',
      });
      setIsLoading(false);
    } finally {
      toast.dismiss(loadingToastId); // Dismiss toast loading ketika proses pengiriman formulir selesai
      setIsLoading(false);
    }
  };

  // Function to initiate QR code scanning
  const scanNow = async (isScan: boolean) => {
    // Stop scan if already scanning to prevent multiple scans
    if (isScan) {
      stopScanRef.current = false;
    } else {
      stopScanRef.current = true;
    }

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

  return (
    <main className='overflow-hidden relative z-[50] font-poppins bg-gradient-to-tl px-4 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 from-[#103020] to-[#061906] text-white flex min-h-screen flex-col items-center'>
      <div className='flex flex-col items-center justify-center gap-10 w-full '>
        {isCameraOn ? (
          <video
            ref={videoElementRef}
            id='scanView'
            className='w-full h-full sm:max-w-[500px] sm:max-h-[800px] xl:max-w-[800px] xl:max-h-[400px] rounded-lg'
          />
        ) : (
          <Image
            src='/camera-not-found.png'
            alt='Camera not found'
            width={1920}
            height={1080}
            className='w-full h-full sm:max-w-[500px] sm:max-h-[800px] xl:max-w-[800px] xl:max-h-[400px] rounded-lg text-orange-400 text-center'
          ></Image>
        )}
        <div className='w-full flex gap-4 max-w-2xl'>
          <Button
            onClick={toggleCamera}
            color='gold'
            isDisabled={isLoading}
            isFullWidth
          >
            {isLoading
              ? 'Loading...'
              : isCameraOn
              ? 'Turn off the Camera'
              : 'Turn on the Camera'}
          </Button>
          <Button
            onClick={() => {
              setFacingMode((prev) =>
                prev === 'environment' ? 'user' : 'environment',
              );
            }}
            color='gold'
            isDisabled={isLoading}
            isFullWidth
          >
            Switch Camera
          </Button>
        </div>
        <p className='text-center text-sm md:text-base'>
          if you want to switch camera turn off the camera first
        </p>
      </div>
    </main>
  );
}
