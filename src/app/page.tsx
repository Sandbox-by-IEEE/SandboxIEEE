'use client';
import React, { useState } from 'react';

import TextInput from '@/components/TextInput';

export default function Home() {
  const [text, setText] = useState('');

  return (
    <main className='flex min-h-screen bg-black flex-col items-center p-24 gap-2'>
      <TextInput
        text={text}
        setText={setText}
        color='white'
        type='email'
        placeholder='Your email address'
      />
      <TextInput
        text={text}
        setText={setText}
        color='white'
        type='password'
        disabled
        placeholder='Your password'
      />
      <TextInput
        text={text}
        setText={setText}
        color='white'
        type='password'
        placeholder='Your password'
      />
      <TextInput
        text={text}
        setText={setText}
        color='trans-white'
        type='search'
        placeholder='Your password'
      />
      <TextInput
        text={text}
        setText={setText}
        color='trans-white'
        type='textarea'
        placeholder='Your password'
      />
    </main>
  );
}
