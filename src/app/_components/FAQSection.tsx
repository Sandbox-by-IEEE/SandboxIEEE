'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Question 1',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    {
      question: 'Question 1',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    {
      question: 'Question 1',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    {
      question: 'Question 1',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    {
      question: 'Question 1',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    {
      question: 'Question 1',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16">
          <Image
            src="/qna.svg"
            alt="QnA"
            width={80}
            height={80}
            className="hidden md:block w-12 h-12 md:w-20 md:h-20"
          />
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center font-gemunu"
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
            src="/qna-2.svg"
            alt="QnA"
            width={80}
            height={80}
            className="hidden md:block w-12 h-12 md:w-20 md:h-20"
          />
        </div>

        <p className="text-center text-white/70 font-gemunu text-sm sm:text-base md:text-lg mb-8 md:mb-12">
          Here are some frequently asked questions
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#2a0507]/50 to-[#1a0304]/50 rounded-2xl md:rounded-[24px] border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-gemunu font-semibold text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-white/70 transition-transform ${openIndex === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-4 md:px-6 pb-3 md:pb-4 text-white/70 font-gemunu text-xs sm:text-sm">
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
