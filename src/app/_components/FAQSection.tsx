'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is The Sandbox?',
      answer:
        'The Sandbox is an annual national-level competition event organized by IEEE ITB Student Branch, featuring three competitions: ProtoTech Contest (PTC), Technovate Paper Competition (TPC), and Business Case Competition (BCC).',
    },
    {
      question: 'Who can participate?',
      answer:
        'Active undergraduate (S1/D4) students from accredited Indonesian universities. PTC and TPC also accept high school/equivalent (SMA/SMK/MA) students.',
    },
    {
      question: 'Can I register for multiple competitions?',
      answer:
        'Each account can only register for one competition. However, team members (non-leaders) may appear in teams for different competitions.',
    },
    {
      question: 'What is the registration fee?',
      answer:
        'PTC: Rp 150,000 per team. TPC & BCC: Rp 125,000 per team. Payment must be submitted during registration.',
    },
    {
      question: 'What is the total prize pool?',
      answer:
        'The total prize pool across all competitions is Rp 25.000.000++, including cash prizes, certificates, and other rewards.',
    },
    {
      question: 'When is the Grand Final?',
      answer:
        'The Grand Final and Awarding ceremony for all competitions will be held on April 25, 2026.',
    },
  ];

  return (
    <section className='py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16'>
          <Image
            src='/qna.svg'
            alt='QnA'
            width={128}
            height={128}
            className='hidden md:block w-32 h-32 md:w-32 md:h-32'
          />
          <h2
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center font-gemunu'
            style={{
              background: 'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Any Questions?
          </h2>
          <Image
            src='/qna-2.svg'
            alt='QnA'
            width={192}
            height={192}
            className='hidden md:block w-48 h-48 md:w-48 md:h-48 -ml-16'
          />
        </div>

        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='bg-gradient-to-br from-[#2a0507]/50 to-[#1a0304]/50 rounded-2xl md:rounded-[24px] border border-white/10 overflow-hidden'
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className='w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors'
                >
                  <span className='text-white font-gemunu font-semibold text-sm sm:text-base'>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-white/70 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className='px-4 md:px-6 pb-3 md:pb-4 text-white/70 font-gemunu text-xs sm:text-sm'>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
