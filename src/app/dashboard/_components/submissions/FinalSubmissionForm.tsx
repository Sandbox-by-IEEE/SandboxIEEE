'use client';

import { Calendar, FileText, Loader2, Upload, X } from 'lucide-react';
import { useState } from 'react';

import { validateFile } from '@/lib/fileConfig';

interface FinalSubmissionFormProps {
  registration: any;
  onSuccess: () => void;
}

export default function FinalSubmissionForm({
  registration,
  onSuccess,
}: FinalSubmissionFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const { competition } = registration;
  const finalSubmission = registration.final;
  const deadline = competition.finalDeadline
    ? new Date(competition.finalDeadline)
    : null;
  const isDeadlinePassed = deadline ? new Date() > deadline : false;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile, 'final');
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError('');

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('registrationId', registration.id);
      formData.append('competitionCode', competition.code);

      const response = await fetch('/api/dashboard/submissions/final', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      onSuccess();
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Upload cancelled.');
      } else if (err.name === 'TimeoutError') {
        setError(
          'Upload timed out. Please check your connection and try again.',
        );
      } else {
        setError(err.message || 'Failed to submit. Please try again.');
      }
    } finally {
      setIsUploading(false);
      setAbortController(null);
    }
  };

  return (
    <div>
      {/* Header Card */}
      <div className='bg-gradient-to-br from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 mb-8'>
        <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
          Final Submission
        </h3>
        <div className='text-center'>
          {deadline && (
            <div className='flex items-center justify-center gap-2 text-gray-400 text-sm'>
              <Calendar className='w-4 h-4 flex-shrink-0' />
              <span>
                Deadline:{' '}
                {deadline.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}
          {isDeadlinePassed && (
            <p className='text-red-400 text-sm mt-2'>⚠️ Deadline has passed</p>
          )}
        </div>
      </div>

      {/* Form Content Card */}
      <div className='bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-10 border border-white/5'>
        {/* Show existing submission */}
        {finalSubmission && (
          <div className='mb-6 bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-4 md:p-5'>
            <div className='flex items-start gap-3'>
              <FileText className='w-5 h-5 text-[#FFCD8D] mt-1 flex-shrink-0' />
              <div className='min-w-0'>
                <p className='text-white font-medium mb-1'>
                  Final Submission Received 🏆
                </p>
                <p className='text-sm text-gray-400'>
                  {new Date(finalSubmission.submittedAt).toLocaleString()}
                </p>
                <p className='text-sm text-gray-400 truncate'>
                  {finalSubmission.fileName}
                </p>
                {finalSubmission.pitchDeckUrl && (
                  <a
                    href={finalSubmission.pitchDeckUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm text-[#FFCD8D] hover:text-[#E8A05D] underline mt-2 inline-block'
                  >
                    View Submission
                  </a>
                )}
                <div className='mt-2'>
                  <span className='inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50'>
                    Submitted
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Form */}
        {!finalSubmission && !isDeadlinePassed && (
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <p className='text-white font-medium mb-2'>
                Upload your final pitch deck / presentation{' '}
                <span className='text-[#FFCD8D]'>*</span>
              </p>
              <p className='text-sm text-gray-400 mb-4'>
                PDF or PowerPoint file, max 25MB
              </p>

              <label
                htmlFor='final-file-upload'
                className='block cursor-pointer'
              >
                <div className='border-2 border-dashed border-white/20 rounded-xl p-8 md:p-12 text-center hover:border-[#FFCD8D]/50 transition-colors'>
                  <Upload className='w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4' />
                  <p className='text-white font-medium mb-2'>
                    {file
                      ? 'File selected'
                      : 'Click or drag to upload your file'}
                  </p>
                  <p className='text-gray-400 text-sm mb-4'>
                    PDF, PPT, or PPTX format
                  </p>
                  {file && (
                    <div className='inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg max-w-full'>
                      <FileText className='w-4 h-4 text-[#FFCD8D] flex-shrink-0' />
                      <span className='text-white text-sm truncate'>
                        {file.name}
                      </span>
                      <button
                        type='button'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className='ml-2 text-gray-400 hover:text-red-400 flex-shrink-0'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    </div>
                  )}
                </div>
                <input
                  id='final-file-upload'
                  type='file'
                  accept='.pdf,.ppt,.pptx'
                  onChange={handleFileChange}
                  className='hidden'
                  disabled={isUploading}
                />
              </label>
            </div>

            {error && (
              <div className='mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm break-words'>
                {error}
              </div>
            )}

            <button
              type='submit'
              disabled={isUploading || !file}
              className='w-full bg-gradient-to-r from-[#8B3A3A] to-[#6B2D2D] border-2 border-[#FFCD8D]/30 rounded-2xl px-6 md:px-8 py-3 md:py-4 text-white font-bold hover:from-[#9B4A4A] hover:to-[#7B3D3D] transition-all duration-300 shadow-lg shadow-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isUploading ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className='w-5 h-5' />
                  <span>Submit Final Entry</span>
                </>
              )}
            </button>

            {isUploading && (
              <button
                type='button'
                onClick={() => abortController?.abort()}
                className='w-full mt-3 bg-transparent border-2 border-red-500/40 rounded-2xl px-6 md:px-8 py-3 text-red-400 font-bold hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2'
              >
                <X className='w-5 h-5' />
                <span>Cancel Upload</span>
              </button>
            )}
          </form>
        )}

        {isDeadlinePassed && !finalSubmission && (
          <div className='text-center text-gray-400 py-8'>
            <p>Deadline has passed. Submissions are no longer accepted.</p>
          </div>
        )}
      </div>
    </div>
  );
}
