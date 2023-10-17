'use client';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from 'react';

import { FileInputType } from '@/app/page';
import FileIcon from '@/components/icons/FileIcon';
import FileInputIconEmpty from '@/components/icons/FileInputIconEmpty';
import FileInputIconError from '@/components/icons/FileInputIconError';
import FileInputIconSuccess from '@/components/icons/FileInputIconSuccess';
import LinkIcon from '@/components/icons/LinkIcon';
import SaveIcon from '@/components/icons/SaveIcon';

const FileInput = ({
  setFiles,
  allowedFileTypes = [],
  setUrl,
  message,
  files,
}: {
  setFiles: Dispatch<SetStateAction<FileInputType[] | undefined>>;
  allowedFileTypes?: string[];
  setUrl?: Dispatch<SetStateAction<string>>;
  message: string;
  files: FileInputType[] | undefined;
}) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
      if (filesToUpload && filesToUpload.length > 0) {
        const uploadedFiles: FileInputType[] = [];
        for (let i = 0; i < filesToUpload.length; i++) {
          const fileUploaded = filesToUpload[i];
          const responseJSON = await uploadFile(fileUploaded);

          const newFile: FileInputType = {
            fileName: fileUploaded.name,
            fileUrl: responseJSON?.secure_url,
          };

          uploadedFiles.push(newFile);
        }

        setIsSuccess(true);
        if (files) setFiles([...files, ...uploadedFiles]);
        else setFiles(uploadedFiles);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();

      const filesDropped = e.dataTransfer.files;
      if (filesDropped.length > 0) {
        const uploadedFiles: FileInputType[] = [];
        const allowedFileExtensions = allowedFileTypes.map((el) => el.slice(1));

        for (let i = 0; i < filesDropped.length; i++) {
          const fileUploaded = filesDropped[i];
          const fileExtension = fileUploaded?.name
            ?.split('.')
            ?.pop()
            ?.toLowerCase();

          if (
            allowedFileExtensions.length === 0 ||
            allowedFileExtensions.includes(fileExtension as string)
          ) {
            const responseJSON = await uploadFile(fileUploaded);

            const newFile = {
              fileName: fileUploaded.name,
              fileUrl: responseJSON?.secure_url,
            };

            uploadedFiles.push(newFile);
          } else {
            throw new Error('Wrong file type');
          }
        }

        setIsSuccess(true);

        if (files) {
          setFiles([...files, ...uploadedFiles]);
        } else {
          setFiles(uploadedFiles);
        }
      } else {
        throw 'No files dropped';
      }
    } catch (error) {
      setErrorMsg(error as string);
      setIsError(true);
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
        setIsSuccess(true);
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
      }
    }
  };

  if (isSuccess) {
    return (
      <div>
        <div
          className='w-[500px] h-[388px] md:w-[730px] flex flex-col justify-center items-center rounded-lg border-dashed border-[3px] border-[#00FFA1] text-[#e6e6e6] space-y-4'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <button onClick={handleClick}>
            <FileInputIconSuccess />
          </button>
          <p className='text-[16px] font-[700] text-[#00FFA1]'>
            {inputUrl ? 'Link' : 'File'} berhasil diupload!
          </p>
          <div className='flex gap-2 items-center'>
            {inputUrl ? <LinkIcon /> : <FileIcon />}
            {files && files[0].fileName ? (
              <p>Files</p>
            ) : (
              <a
                href={inputUrl}
                target='_blank'
                rel='noreferer'
                className='max-w-[300px] md:max-w-[600px] whitespace-nowrap overflow-hidden text-ellipsis'
              >
                {inputUrl}
              </a>
            )}
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

  if (isError) {
    return (
      <div>
        <div
          className='w-[500px] h-[388px] md:w-[730px] flex flex-col justify-center items-center rounded-lg border-dashed border-[3px] border-[#FF7387] text-[#e6e6e6] space-y-4'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <button onClick={handleClick}>
            <FileInputIconError />
          </button>
          <p
            className='text-[16px] font-[700] text-[#FF7387]'
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {inputUrl ? 'Link' : 'File'} gagal diupload!
          </p>
          <div className='flex gap-2'>
            <p className='max-w-[300px] md:max-w-[600px] whitespace-nowrap overflow-hidden text-ellipsis'>
              {inputUrl ? 'Link' : 'File'} {errorMsg}
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

  return (
    <div>
      <div
        className={
          setUrl
            ? 'w-[400px] h-[500px] md:h-[542px] md:w-[730px] flex flex-col justify-center items-center rounded-lg border-dashed border-[3px] border-[#dbb88b] text-[#e6e6e6] space-y-4'
            : 'w-[400px] h-[388px] md:w-[730px] flex flex-col justify-center items-center rounded-lg border-dashed border-[3px] border-[#dbb88b] text-[#e6e6e6] space-y-4'
        }
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <button onClick={handleClick}>
          <FileInputIconEmpty />
        </button>
        <p
          className='text-[16px] font-[700] cursor-pointer'
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          Drag atau <span className='text-blue-500'>upload</span> file kamu di
          sini
        </p>
        <p>{message}</p>
        {setUrl && (
          <div className='flex flex-col gap-4'>
            <div className='flex gap-4 items-center mx-auto'>
              <div className='w-[120px] md:w-[168px] h-[2px] bg-white' />
              <p>atau</p>
              <div className='w-[120px] md:w-[168px] h-[2px] bg-white' />
            </div>
            <div className='flex flex-col items-center gap-4'>
              <p>cantumkan Link Google Drive</p>
              <div className='flex w-full gap-2'>
                <input
                  type='text'
                  onChange={(e) => setInputUrl(e.target.value)}
                  className='border-4 border-[#DBB88B] px-4 py-2 flex-grow bg-inherit rounded-lg'
                />
                <button
                  className='py-3 px-6 bg-[#AB814E] rounded-lg'
                  onClick={handleSubmitUrl}
                >
                  <SaveIcon />
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
        multiple
      />
    </div>
  );
};

export default FileInput;
