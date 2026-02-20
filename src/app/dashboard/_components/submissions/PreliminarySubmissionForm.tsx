'use client';

import { Calendar, FileText, Loader2, Upload, X } from 'lucide-react';
import { useState } from 'react';

import { validateFile } from '@/lib/fileConfig';

interface PreliminarySubmissionFormProps {
  registration: any;
  onSuccess: () => void;
}

export default function PreliminarySubmissionForm({
  registration,
  onSuccess,
}: PreliminarySubmissionFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const { competition, preliminary } = registration;
  const deadline = new Date(competition.preliminaryDeadline);
  const isDeadlinePassed = new Date() > deadline;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile, 'preliminary');
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

      const response = await fetch('/api/dashboard/submissions/preliminary', {
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    setIsUploading(true);
    try {
      const response = await fetch(
        `/api/dashboard/submissions/preliminary?id=${preliminary.id}`,
        { method: 'DELETE' },
      );

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {/* Header Card */}
      <div className='bg-gradient-to-br from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 mb-8'>
        <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
          Executive Summary
        </h3>

        <div className='text-center'>
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
          {isDeadlinePassed && (
            <p className='text-red-400 text-sm mt-2'>⚠️ Deadline has passed</p>
          )}
        </div>
      </div>

      {/* Form Content Card */}
      <div className='bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-10 border border-white/5'>
        {/* Show existing submission */}
        {preliminary && (
          <div className='mb-6 bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-4 md:p-5'>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex items-start gap-3 min-w-0'>
                <FileText className='w-5 h-5 text-[#FFCD8D] mt-1 flex-shrink-0' />
                <div className='min-w-0'>
                  <p className='text-white font-medium mb-1'>Submitted</p>
                  <p className='text-sm text-gray-400'>
                    {new Date(preliminary.submittedAt).toLocaleString()}
                  </p>
                  <p className='text-sm text-gray-400 truncate'>
                    {preliminary.fileName}
                  </p>
                  {preliminary.fileUrl && (
                    <a
                      href={preliminary.fileUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm text-[#FFCD8D] hover:text-[#E8A05D] underline mt-2 inline-block'
                    >
                      View Submission
                    </a>
                  )}
                  <div className='mt-2'>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        preliminary.status === 'qualified'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : preliminary.status === 'rejected'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                      }`}
                    >
                      {preliminary.status}
                    </span>
                  </div>
                </div>
              </div>
              {!isDeadlinePassed && preliminary.status === 'pending' && (
                <button
                  onClick={handleDelete}
                  disabled={isUploading}
                  className='p-2 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0'
                >
                  <X className='w-5 h-5 text-red-400' />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Upload Form - File Only */}
        {(!preliminary || preliminary.status === 'rejected') &&
          !isDeadlinePassed && (
            <form onSubmit={handleSubmit}>
              {/* File Upload Area */}
              <div className='mb-6'>
                <label htmlFor='file-upload' className='block cursor-pointer'>
                  <div className='border-2 border-dashed border-white/20 rounded-xl p-8 md:p-12 text-center hover:border-[#FFCD8D]/50 transition-colors'>
                    <Upload className='w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4' />
                    <p className='text-white font-medium mb-2'>
                      {file
                        ? 'File selected'
                        : 'Click or drag to upload your file'}
                    </p>
                    <p className='text-gray-400 text-sm mb-4'>
                      PDF format, max 10MB
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
                    id='file-upload'
                    type='file'
                    accept='.pdf'
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

              {!file && !error && (
                <div className='mb-4 bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 text-blue-400 text-sm'>
                  📤 Please upload a PDF file to continue
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
                    <span>Submit Abstract</span>
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

        {isDeadlinePassed && !preliminary && (
          <div className='text-center text-gray-400 py-8'>
            <p>Deadline has passed. Submissions are no longer accepted.</p>
          </div>
        )}
      </div>
    </div>
  );
}
