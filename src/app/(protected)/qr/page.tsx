'use client';
import QrScanner from 'qr-scanner';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Component for QR Code scanning
export default function QRCode() {
  // State to hold scanned data and button scan state
  const [isLoading, setIsLoading] = useState(true);

  // Use vars to prevent re-render
  let stopScan = false;

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

  // Function to initiate QR code scanning
  const scanNow = async (isScan: boolean) => {
    setIsLoading(isScan);
    // Stop scan if already scanning to prevent multiple scans
    if (isScan) stopScan = true;

    // Check if scanning is allowed based on button state
    if (isLoading === false) return;

    stopScan = false; // Reset stopScan flag
    await new Promise((r) => setTimeout(r, 100)); // Wait for 100ms

    // Get video element for scanning
    const videoElement = document.getElementById(
      'scanView',
    ) as HTMLVideoElement;

    // Initialize QR scanner
    const scanner = new QrScanner(
      videoElement,
      (result: { data: string }) => {
        onSubmit(result.data); // Call onSubmit when QR code is scanned
        setIsLoading(true); // Reset button scan state
        stopScan = true; // Stop scanning
      },
      {
        onDecodeError: (error: any) => {
          console.error(error); // Log decoding errors
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      },
    );

    // Start scanning
    await scanner.start();

    // Wait until stopScan flag is set
    while (stopScan === false) await new Promise((r) => setTimeout(r, 100));

    // Stop and destroy the scanner
    scanner.stop();
    scanner.destroy();
  };

  // Render the QRCode component
  return (
    <main className='overflow-hidden relative z-[50] font-poppins bg-gradient-to-tl px-4 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 from-[#103020] to-[#061906] text-white flex min-h-screen flex-col items-center'>
      <video
        id='scanView'
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '100%',
          maxHeight: '400px',
          borderStyle: 'dotted',
        }}
      ></video>
      <button onClick={() => scanNow(true)}>Turn on the Camera</button>
    </main>
  );
}
