'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PaginatedArticles({
  allArticles,
}: {
  allArticles: any[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(allArticles.length / pageSize);

  // Get articles for current page
  const paginatedArticles = allArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Helper function to extract plain text from structured text
  const extractPlainText = (structuredText: any) => {
    try {
      if (!structuredText || !structuredText.value || !structuredText.value.document) {
        return '';
      }
      
      // Extract text from all text blocks
      const textBlocks = structuredText.value.document.children
        .filter((node: any) => node.type === 'paragraph')
        .map((node: any) => {
          return node.children
            .filter((child: any) => child.type === 'span')
            .map((span: any) => span.value)
            .join(' ');
        });
        
      return textBlocks.join(' ');
    } catch (error) {
      console.error('Error extracting plain text:', error);
      return '';
    }
  };

  const renderPagination = () => {
    const paginationItems: JSX.Element[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i ? 'bg-gray-900 text-white' : 'bg-inherit'
            }`}
          >
            {i}
          </button>,
        );
      }
    } else {
      paginationItems.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === 1 ? 'bg-gray-900 text-white' : 'bg-inherit'
          }`}
        >
          1
        </button>,
      );

      if (currentPage > 2) {
        paginationItems.push(
          <span key='ellipsis-1' className='px-3 py-1 mx-1 text-gray-400'>
            ...
          </span>,
        );
      }

      if (currentPage > 1 && currentPage < totalPages) {
        paginationItems.push(
          <button
            key={currentPage}
            onClick={() => handlePageChange(currentPage)}
            className={`px-3 py-1 mx-1 rounded bg-gray-900 text-white`}
          >
            {currentPage}
          </button>,
        );
      }

      if (currentPage < totalPages - 1) {
        paginationItems.push(
          <span key='ellipsis-2' className='px-3 py-1 mx-1 text-gray-400'>
            ...
          </span>,
        );
      }

      paginationItems.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === totalPages ? 'bg-gray-900 text-white' : 'bg-inherit'
          }`}
        >
          {totalPages}
        </button>,
      );
    }

    return paginationItems;
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl text-center mb-12 font-bold text-white'>Newsletter</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        {paginatedArticles.map((article) => {
          const plainText = extractPlainText(article.body);
          
          return (
            <Link key={article.id} href={`/article/${article.id}`}>
              <div className='p-4 rounded-lg cursor-pointer hover:bg-gray-800 duration-200'>
                {article.image?.url && (
                  <Image
                    src={article.image.url}
                    alt={article.title}
                    width={500}
                    height={200}
                    className='object-cover rounded-t-lg'
                  />
                )}
                <div className='flex items-center mt-3 gap-2'>
                  <p className='text-white text-sm'>By {article.author},</p>
                  <p className='text-white text-sm'>{article.date}</p>
                </div>
                <h2 className='text-2xl font-semibold mt-2 text-white'>
                  {article.title}
                </h2>
                <p className='mt-2 text-white text-xs'>
                  {plainText.length > 100
                    ? `${plainText.slice(0, 100)}...`
                    : plainText}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className='flex items-center justify-between mt-8 text-white gap-2'>
        <button
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className='flex items-center gap-2 ml-4'
        >
          <Image
            src='/previous_arrow.svg'
            alt='Previous'
            width={15}
            height={15}
          />
          Previous
        </button>

        <div className='flex items-center'>{renderPagination()}</div>

        <button
          onClick={() => {
            if (currentPage < totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
          className='flex items-center gap-2 mr-4'
        >
          Next
          <Image src='/next_arrow.svg' alt='Next' width={15} height={15} />
        </button>
      </div>
    </div>
  );
}