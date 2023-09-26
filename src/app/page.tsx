import React from 'react';

import Button from '@/components/Button';

export default function Home() {
  // ... (other code)

  return (
    <main className='flex flex-col w-screen h-screen'>
      <div className=' p-10 mx-auto space-x-2 space-y-3 w-[400px]'>
        {/* Sample usage of the Button component */}

        {/* GREEN, 100%, GLOW */}
        <Button color='green' isIcon={false} isDisabled={false}>
          Sample Button
        </Button>

        {/* GREEN, 100%, NO GLOW */}
        <Button color='trans-green' isIcon={false} isDisabled={false}>
          Sample Button
        </Button>

        {/* BLACK, 100%, NO GLOW */}
        <Button color='black' isIcon={false} isDisabled={true}>
          Sample Button
        </Button>

        {/* DISABLED */}

        {/* GOLD, 100%, GLOW */}

        {/* GOLD, 100%, NO GLOW */}
        <Button color='gold' isIcon={false} isDisabled={false}>
          Sample Button
        </Button>

        {/* BLACK, 100%, NO GLOW */}
        <Button color='black' isIcon={false} isDisabled={false}>
          Sample Button
        </Button>

        {/* DISABLED */}

        {/* GREEN, 100%, GLOW, ARROW */}
        <Button color='green' isIcon={true} isDisabled={false}>
          Sample Button
        </Button>

        {/* GREEN, 100%, NO GLOW, ARROW */}
        <Button color='trans-orange' isIcon={true} isDisabled={false}>
          Sample Button
        </Button>

        {/* BLACK, 100%, NO GLOW, ARROW */}
        <Button color='black' isIcon={true} isDisabled={false}>
          Sample Button
        </Button>

        {/* DISABLED, ARROW */}

        {/* Continue adding more button examples as needed */}
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
