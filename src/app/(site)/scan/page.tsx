'use client';
import { Html5Qrcode } from 'html5-qrcode';
import { useState } from 'react';

// Define interface for seminar ticket data
interface ISeminarTicket {
  name: string;
  email: string;
  ticketId: string;
  validated: boolean;
}

const QrScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [data, setData] = useState<ISeminarTicket>();
  const [error, setError] = useState('');
  const [isAlreadyValidated, setIsAlreadyValidated] = useState(false);

  const scan = () => {
    setIsScanning(true);
    const html5QrCode = new Html5Qrcode('reader');

    const startCamera = () => {
      html5QrCode
        .start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 400, height: 400 },
          },
          (decodedText) => {
            let ticketData: ISeminarTicket | null = null;
            try {
              // Parse QR code data
              const parsedData = JSON.parse(decodedText);
              // Check for expected ticket format
              if (!parsedData.ticketId || !parsedData.email) {
                throw new Error('Invalid QR code format');
              }
              ticketData = parsedData;
            } catch (error) {
              console.error('QR parsing error:', error);
              alert('Invalid QR code format');
            }

            html5QrCode
              .stop()
              .then(() => {
                const validateTicket = async () => {
                  if (!ticketData) return;

                  const response = await fetch('/api/ticket/seminar/validate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      ticketId: ticketData.ticketId,
                      email: ticketData.email,
                    }),
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.alreadyValidated) {
                      setIsAlreadyValidated(true);
                      setData(errorData.ticket);
                    } else {
                      setError(errorData.message || 'Ticket validation failed');
                    }
                    throw new Error(errorData.message || 'Ticket not valid');
                  }

                  const { ticket } = await response.json();
                  setData(ticket);
                };

                validateTicket().catch((err) => {
                  console.error('Validation error:', err);
                });
              })
              .catch((err) => {
                console.error('Scanner stop error:', err);
              })
              .finally(() => {
                setIsScanning(false);
              });
          },
          (_errorMessage) => {
            // Do nothing on error message
          },
        )
        .catch((err) => {
          alert(`Unable to start scanning, error: ${err}`);
        });
    };

    startCamera();
  };

  return (
    <main className='text-white relative flex min-h-screen w-full flex-col items-center justify-center gap-5'>
      <h1 className='mt-12 text-xl text-center md:text-2xl font-bold mb-4'>
        The Sandbox 2.0 - Seminar Ticket Scanner
      </h1>
      <div id='reader' style={{ width: '350px', height: '350px' }} />
      {!isScanning && (
        <>
          <button
            className='rounded-md bg-red p-2 text-2xl font-bold hover:border hover:border-red hover:bg-transparent'
            onClick={() => {
              scan();
              setData(undefined);
              setError('');
              setIsAlreadyValidated(false);
            }}
          >
            SCAN
          </button>

          {data && !isAlreadyValidated && (
            <div className='absolute text-black flex h-[300px] w-[300px] flex-col items-center justify-center rounded-md border border-green-500 bg-white'>
              <h1 className='text-xl font-bold text-green-500'>
                Ticket Verified ✓
              </h1>
              <p className='font-bold mt-2 '>Name: {data.name}</p>
              <p>Email: {data.email}</p>
              <p>Ticket ID: {data.ticketId}</p>
              <div className='mt-4 bg-green-100 p-2 rounded-md'>
                <p className='text-green-700'>Attendance confirmed</p>
              </div>
            </div>
          )}

          {data && isAlreadyValidated && (
            <div className='absolute text-black flex h-[300px] w-[300px] flex-col items-center justify-center rounded-md border border-yellow-500 bg-white'>
              <h1 className='text-xl font-bold text-yellow-500'>
                Ticket Already Used!
              </h1>
              <p className='font-bold mt-2'>Name: {data.name}</p>
              <p>Email: {data.email}</p>
              <p>Ticket ID: {data.ticketId}</p>
              <div className='mt-4 bg-yellow-100 p-2 rounded-md'>
                <p className='text-yellow-700'>
                  This ticket has already been scanned
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className='absolute text-black flex h-[300px] w-[300px] flex-col items-center justify-center rounded-md border border-red bg-white'>
              <h1 className='text-xl font-bold text-red'>
                Ticket Verification Failed
              </h1>
              <p className='mt-2'>{error}</p>
              <p className='mt-4'>Please verify the ticket information</p>
              <button
                className='mt-4 bg-red text-white px-4 py-2 rounded-md'
                onClick={() => setError('')}
              >
                Dismiss
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default QrScanner;
