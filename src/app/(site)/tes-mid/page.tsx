'use client';

import React from 'react';

import Button from '@/components/Button';
import Midtrans from '@/components/midtrans';

const MidPage = () => {
  const handleBayar = async () => {
    const data = {
      userId: 'cls79p4ut0000botcaognv5hr',
      name: 'Mesach',
      email: 'mesachharmasendro@gmail.com',
      price: 20000,
      participants: [
        {
          name: 'Mesach',
          email: 'mesachharmasendro@gmail.com',
          lineId: 'tes',
          phoneNumber: "'085700287190",
        },
        {
          name: 'Mesach',
          email: '13522117@std.stei.itb.ac.id',
          lineId: 'tes',
          phoneNumber: "'085700287190",
        },
        {
          name: 'Fairuz',
          email: 'fairuzalauddinyahya08@gmail.com',
          lineId: 'tes',
          phoneNumber: "'085700287190",
        },
        {
          name: 'Fairuz',
          email: 'harmasendromesach@gmail.com',
          lineId: 'tes',
          phoneNumber: "'085700287190",
        },
        {
          name: 'Fairuz',
          email: 'sandboxieeewebsite@gmail.com',
          lineId: 'tes',
          phoneNumber: "'085700287190",
        },
      ],
      registrationType: 'Early Bid',
    };

    const res = await fetch('/api/ticket/exhibition/payment', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    console.log(resData);

    const w = window as any;

    w.snap.pay(resData.data.snapToken);
  };
  return (
    <>
      <Midtrans />
      <div>MidPage</div>
      <Button color='gold' onClick={handleBayar}>
        bayar
      </Button>
    </>
  );
};

export default MidPage;
