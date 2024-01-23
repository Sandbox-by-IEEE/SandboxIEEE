'use client';
import Link from 'next/link';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from 'react';

import Button from '@/components/Button';
import { FileInputType } from '@/components/FileInput/fileInput-type';
import FileIcon from '@/components/icons/FileIcon';
import FileInputIconEmpty from '@/components/icons/FileInputIconEmpty';
import FileInputIconError from '@/components/icons/FileInputIconError';
import FileInputIconSuccess from '@/components/icons/FileInputIconSuccess';
import LinkIcon from '@/components/icons/LinkIcon';
import SaveIcon from '@/components/icons/SaveIcon';

const SingleFileInput = ({
  setFile,
  allowedFileTypes = [],
  setUrl,
  message,
  file,
}: {
  setFile: (file: FileInputType | undefined) => void;
  allowedFileTypes?: string[];
  setUrl?: Dispatch<SetStateAction<string>>;
  message: string;
  file: FileInputType | undefined;
}) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>('');

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const uploadFile = async (fileUploaded: File) => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (fileUploaded.size > 10 * 1024 * 1024) {
        throw 'File size exceeds the maximum allowed (10MB).';
      }

      const fd = new FormData();
      fd.append(`file`, fileUploaded);
      fd.append('upload_preset', 'ddriwluc');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: 'POST',
          body: fd,
        },
      );
      if (!response.ok) throw await response.json();

      const responseJSON = await response.json();

      return responseJSON;
    } catch (error) {
      throw error;
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const filesToUpload = event.target.files;
    try {
      setIsLoading(true);
      if (filesToUpload && filesToUpload.length > 1) {
        setErrorMsg('Only one file can be uploaded at a time');
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      } else if (filesToUpload) {
        const fileUploaded = filesToUpload[0];
        const responseJSON = await uploadFile(fileUploaded);
        const newFile: FileInputType = {
          fileName: fileUploaded.name,
          fileUrl: responseJSON?.secure_url,
        };

        setFile(newFile);
      }
    } catch (error) {
      setErrorMsg(error as string);
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const filesDropped = e.dataTransfer.files;

      if (filesDropped.length > 1) {
        setErrorMsg('Only one file can be uploaded at a time');
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      } else if (filesDropped.length === 1) {
        const allowedFileExtensions = allowedFileTypes.map(
          (el) => el.split('/')?.pop()?.toLowerCase(),
        );

        const fileUploaded = filesDropped[0];
        const fileExtension = fileUploaded?.name
          ?.split('.')
          ?.pop()
          ?.toLowerCase();

        if (
          !(
            allowedFileExtensions.length === 0 ||
            allowedFileExtensions.includes(fileExtension as string)
          )
        ) {
          throw `Wrong file type, allowed file types are ${allowedFileExtensions.join(
            ', ',
          )}`;
        }

        const responseJSON = await uploadFile(fileUploaded);
        const newFile = {
          fileName: fileUploaded.name,
          fileUrl: responseJSON?.secure_url,
        };

        setFile(newFile);
      } else {
        throw 'No files dropped';
      }
    } catch (error) {
      setErrorMsg(error as string);
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmitUrl = () => {
    if (setUrl) {
      const isValidUrl = new RegExp(
        '^([a-zA-Z]+:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i',
      ).test(inputUrl);

      if (isValidUrl) {
        setUrl(inputUrl);
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
      }
    }
  };

  if (isError) {
    return (
      <div>
        <div
          className='text-[15px] lg:text-base font-poppins w-full max-w-full px-10 py-8 lg:py-12 flex flex-col justify-center items-center rounded-lg border-dashed border-[3px] border-[#FF7387] text-[#e6e6e6] space-y-4'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <button onClick={handleClick} type='button'>
            <FileInputIconError className='w-[170px] lg:w-[214px]' />
          </button>
          <p
            className='text-[#FF7387]'
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {inputUrl ? 'Link' : 'File'} failed to upload!
          </p>
          <div className='flex gap-2'>
            <p className='max-w-[300px] md:max-w-[600px] overflow-hidden'>
              {errorMsg}
            </p>
          </div>
        </div>
        <input
          type='file'
          className='hidden'
          accept={allowedFileTypes.join(',')}
          onChange={handleChange}
          ref={hiddenFileInput}
        />
      </div>
    );
  }

  if (file?.fileName) {
    return (
      <div>
        <div
          className='text-[15px] lg:text-base font-poppins w-full max-w-full px-10 py-8 lg:py-12 flex flex-col justify-center items-center rounded-lg border-dashed border-[3px] border-[#00FFA1] text-[#e6e6e6] space-y-4'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <button onClick={handleClick} type='button'>
            <FileInputIconSuccess className='w-[170px] lg:w-[214px]' />
          </button>
          <p className='text-[#00FFA1]'>
            {inputUrl ? 'Link' : 'File'} successfully uploaded!
          </p>
          <div className={`flex gap-2 items-center`}>
            {inputUrl ? <LinkIcon /> : <FileIcon />}
            {inputUrl ? (
              <Link
                href={inputUrl}
                target='_blank'
                rel='noreferer'
                className='max-w-[300px] md:max-w-[600px] overflow-hidden'
              >
                {inputUrl}
              </Link>
            ) : (
              <a href={file?.fileUrl} className='flex flex-col'>
                <p>{file?.fileName}</p>
              </a>
            )}
          </div>
          <div className='w-full flex justify-center pt-6 gap-3'>
            <Button
              color='green'
              onClick={() => setFile(undefined)}
              type='button'
            >
              Remove
            </Button>
            <Button color='gold' type='button' onClick={handleClick}>
              Edit
            </Button>
          </div>
        </div>
        <input
          type='file'
          onChange={handleChange}
          accept={allowedFileTypes.join(',')}
          ref={hiddenFileInput}
          className='hidden'
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div
          className={
            'w-full max-w-full px-4 py-8 lg:py-12 flex flex-col justify-center items-center rounded-lg border-dashed border-[3px] border-[#dbb88b] text-[#e6e6e6] space-y-4'
          }
        >
          <button type='button' className='py-10'>
            <div
              className='w-[100px] aspect-square rounded-full animate-spin
                    border-8 border-solid border-[#dbb88b] border-t-transparent'
            ></div>
          </button>
          <p className='text-[15px] lg:text-base font-poppins font-bold cursor-pointer'>
            Drag or <span className='text-blue-500'>upload</span> your file here
          </p>
          <p>{message}</p>
          {setUrl && (
            <div className='flex flex-col gap-4 text-sm lg:text-base font-poppins'>
              <div className='flex gap-4 items-center mx-auto'>
                <div className='w-[120px] md:w-[168px] h-[2px] bg-white' />
                <p>or</p>
                <div className='w-[120px] md:w-[168px] h-[2px] bg-white' />
              </div>
              <div className='flex flex-col items-center gap-4'>
                <p>attach Google Drive Link</p>
                <div className='flex w-full gap-2'>
                  <input
                    type='text'
                    onChange={(e) => setInputUrl(e.target.value)}
                    className='border-4 border-[#DBB88B] px-4 py-2 flex-grow bg-inherit rounded-lg'
                  />
                  <button
                    className='py-2 lg:py-3 px-6 bg-[#AB814E] rounded-lg'
                    onClick={handleSubmitUrl}
                  >
                    <SaveIcon className='w-[24px] aspect-square' />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <input
          type='file'
          disabled
          onChange={handleChange}
          ref={hiddenFileInput}
          accept={allowedFileTypes.join(',')}
          className='hidden'
        />
      </div>
    );
  }

  return (
    <div>
      <div
        className={
          'w-full max-w-full px-4 py-8 lg:py-12 flex flex-col justify-center items-center rounded-lg border-dashed border-[3px] border-[#dbb88b] text-[#e6e6e6] space-y-4'
        }
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <button onClick={handleClick} type='button'>
          <FileInputIconEmpty className='w-[170px] lg:w-[214px]' />
        </button>
        <p
          className='text-[15px] lg:text-base font-poppins font-bold cursor-pointer'
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          Drag or <span className='text-blue-500'>upload</span> your file here
        </p>
        <p>{message}</p>
        {setUrl && (
          <div className='flex flex-col gap-4 text-sm lg:text-base font-poppins'>
            <div className='flex gap-4 items-center mx-auto'>
              <div className='w-[120px] md:w-[168px] h-[2px] bg-white' />
              <p>or</p>
              <div className='w-[120px] md:w-[168px] h-[2px] bg-white' />
            </div>
            <div className='flex flex-col items-center gap-4'>
              <p>attach Google Drive Link</p>
              <div className='flex w-full gap-2'>
                <input
                  type='text'
                  onChange={(e) => setInputUrl(e.target.value)}
                  className='border-4 border-[#DBB88B] px-4 py-2 flex-grow bg-inherit rounded-lg'
                />
                <button
                  className='py-2 lg:py-3 px-6 bg-[#AB814E] rounded-lg'
                  onClick={handleSubmitUrl}
                >
                  <SaveIcon className='w-[24px] aspect-square' />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <input
        type='file'
        onChange={handleChange}
        ref={hiddenFileInput}
        accept={allowedFileTypes.join(',')}
        className='hidden'
      />
    </div>
  );
};

export default SingleFileInput;
