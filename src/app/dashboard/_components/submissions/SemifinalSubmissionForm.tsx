'use client';

import { Calendar, FileText, Loader2, Upload, X } from 'lucide-react';
import { useState } from 'react';

import { validateFile } from '@/lib/fileConfig';

interface SemifinalSubmissionFormProps {
  registration: any;
  onSuccess: () => void;
}

/**
 * Competition-specific semifinal requirements:
 * - PTC: Proposal + Prototype Video URL
 * - TPC: Paper + Presentation
 * - BCC: Business Plan + Pitch Deck
 */
const SEMIFINAL_CONFIG: Record<
  string,
  {
    title: string;
    fields: {
      key: string;
      label: string;
      type: 'file' | 'url';
      accept?: string;
      description: string;
    }[];
  }
> = {
  PTC: {
    title: 'Semifinal Submission — Proposal & Video',
    fields: [
      {
        key: 'proposalUrl',
        label: 'Proposal Document',
        type: 'file',
        accept: '.pdf,.doc,.docx',
        description: 'PDF or Word file, max 20MB',
      },
      {
        key: 'prototypeVideoUrl',
        label: 'Prototype Video URL',
        type: 'url',
        description:
          'YouTube or Google Drive link to your prototype demo video',
      },
    ],
  },
  TPC: {
    title: 'Semifinal Submission — Paper & Presentation',
    fields: [
      {
        key: 'paperUrl',
        label: 'Research Paper',
        type: 'file',
        accept: '.pdf,.doc,.docx',
        description: 'IEEE format, PDF or Word, max 20MB',
      },
      {
        key: 'presentationUrl',
        label: 'Presentation Slides',
        type: 'file',
        accept: '.pdf,.ppt,.pptx',
        description: 'PDF or PowerPoint, max 20MB',
      },
    ],
  },
  BCC: {
    title: 'Semifinal Submission — Business Plan & Pitch Deck',
    fields: [
      {
        key: 'businessPlanUrl',
        label: 'Business Plan',
        type: 'file',
        accept: '.pdf,.doc,.docx',
        description: 'PDF or Word file, max 20MB',
      },
      {
        key: 'pitchDeckUrl',
        label: 'Pitch Deck',
        type: 'file',
        accept: '.pdf,.ppt,.pptx',
        description: 'PDF or PowerPoint, max 20MB',
      },
    ],
  },
};

export default function SemifinalSubmissionForm({
  registration,
  onSuccess,
}: SemifinalSubmissionFormProps) {
  const { competition, semifinal } = registration;
  const competitionCode = competition.code as string;
  const config = SEMIFINAL_CONFIG[competitionCode] || SEMIFINAL_CONFIG.BCC;

  const deadline = new Date(competition.semifinalDeadline);
  const isDeadlinePassed = new Date() > deadline;

  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // Check if semifinal was already submitted (has any data)
  const hasExistingSubmission =
    semifinal &&
    (semifinal.proposalUrl ||
      semifinal.paperUrl ||
      semifinal.businessPlanUrl ||
      semifinal.prototypeVideoUrl ||
      semifinal.presentationUrl ||
      semifinal.pitchDeckUrl);

  const handleFileChange = (
    fieldKey: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile, 'semifinal');
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }

    setFiles((prev) => ({ ...prev, [fieldKey]: selectedFile }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate all required fields
    for (const field of config.fields) {
      if (
        field.type === 'file' &&
        !files[field.key] &&
        !getExistingValue(field.key)
      ) {
        setError(`${field.label} is required`);
        return;
      }
      if (
        field.type === 'url' &&
        !urls[field.key] &&
        !getExistingValue(field.key)
      ) {
        setError(`${field.label} is required`);
        return;
      }
    }

    setIsUploading(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const formData = new FormData();
      formData.append('registrationId', registration.id);
      formData.append('competitionCode', competitionCode);

      // Append files
      for (const field of config.fields) {
        if (field.type === 'file' && files[field.key]) {
          formData.append(field.key, files[field.key]!);
        }
        if (field.type === 'url' && urls[field.key]) {
          formData.append(field.key, urls[field.key]);
        }
      }

      const response = await fetch('/api/dashboard/submissions/semifinal', {
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

  const getExistingValue = (key: string): string | null => {
    if (!semifinal) return null;
    return (semifinal as Record<string, any>)[key] || null;
  };

  return (
    <div>
      {/* Header Card */}
      <div className='bg-gradient-to-br from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 mb-8'>
        <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
          {config.title}
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

      {/* Existing Submission */}
      {hasExistingSubmission && (
        <div className='bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-10 border border-white/5 mb-6'>
          <div className='bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-4 md:p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <FileText className='w-5 h-5 text-[#FFCD8D]' />
              <p className='text-white font-medium'>Submission Received</p>
            </div>
            <p className='text-sm text-gray-400'>
              Submitted on {new Date(semifinal.submittedAt).toLocaleString()}
            </p>
            <div className='mt-2'>
              <span className='inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50'>
                Submitted
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Upload Form */}
      {!hasExistingSubmission && !isDeadlinePassed && (
        <div className='bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-10 border border-white/5'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {config.fields.map((field) => (
              <div key={field.key}>
                <label className='block text-white font-medium mb-2'>
                  {field.label} <span className='text-[#FFCD8D]'>*</span>
                </label>
                <p className='text-sm text-gray-400 mb-3'>
                  {field.description}
                </p>

                {field.type === 'file' ? (
                  <label
                    htmlFor={`file-${field.key}`}
                    className='block cursor-pointer'
                  >
                    <div className='border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#FFCD8D]/50 transition-colors'>
                      <Upload className='w-8 h-8 text-gray-400 mx-auto mb-3' />
                      <p className='text-white font-medium mb-1'>
                        {files[field.key] ? 'File selected' : 'Click to upload'}
                      </p>
                      {files[field.key] && (
                        <div className='inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg max-w-full mt-2'>
                          <FileText className='w-4 h-4 text-[#FFCD8D] flex-shrink-0' />
                          <span className='text-white text-sm truncate'>
                            {files[field.key]!.name}
                          </span>
                          <button
                            type='button'
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setFiles((prev) => ({
                                ...prev,
                                [field.key]: null,
                              }));
                            }}
                            className='ml-2 text-gray-400 hover:text-red-400 flex-shrink-0'
                          >
                            <X className='w-4 h-4' />
                          </button>
                        </div>
                      )}
                    </div>
                    <input
                      id={`file-${field.key}`}
                      type='file'
                      accept={field.accept}
                      onChange={(e) => handleFileChange(field.key, e)}
                      className='hidden'
                      disabled={isUploading}
                    />
                  </label>
                ) : (
                  <input
                    type='url'
                    value={urls[field.key] || ''}
                    onChange={(e) =>
                      setUrls((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    placeholder='https://...'
                    className='w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm'
                    disabled={isUploading}
                  />
                )}
              </div>
            ))}

            {error && (
              <div className='bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm break-words'>
                {error}
              </div>
            )}

            <button
              type='submit'
              disabled={isUploading}
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
                  <span>Submit Semifinal</span>
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
        </div>
      )}

      {isDeadlinePassed && !hasExistingSubmission && (
        <div className='text-center text-gray-400 py-8'>
          <p>Deadline has passed. Submissions are no longer accepted.</p>
        </div>
      )}
    </div>
  );
}
