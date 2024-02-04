"use client"

import Midtrans from '@/components/midtrans';
import React from 'react';

const MidPage = () => {
  const handleBayar = async () => {
    const data = {
      userId: '',
      name: 'Mesach',
      email: 'mesachharmasendro@gmail.com',
      participants: [
        {
          name: 'Mesach',
          email: 'mesachharmasendro@gmail.com',
          idLine: 'tes',
          phone: "'085700287190",
        },
        {
          name: 'Mesach',
          email: '13522117@std.stei.itb.ac.id',
          idLine: 'tes',
          phone: "'085700287190",
        },
        {
          name: 'Fairuz',
          email: 'fairuzalauddinyahya08@gmail.com',
          idLine: 'tes',
          phone: "'085700287190",
        },
        {
          name: 'Fairuz',
          email: 'harmasendromesach@gmail.com',
          idLine: 'tes',
          phone: "'085700287190",
        },
        {
          name: 'Fairuz',
          email: 'sandboxieeewebsite@gmail.com',
          idLine: 'tes',
          phone: "'085700287190",
        },
      ],
      registrationType: 'Early Bid',
    };

    const res = await fetch("/api/ticket/exhibition/payment", {
      method: "POST",
      body: JSON.stringify(data)
    })

    const resData = await res.json()

    const w = window as any

    w.snap.pay(resData.data.snapToken)
  };
  return (
    <>
      <Midtrans />
      <div>MidPage</div>
      <button onClick={handleBayar}>bayar</button>
    </>
  );
};

export default MidPage;
