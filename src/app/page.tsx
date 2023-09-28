import React from 'react';

import Button from '@/components/Button';
import IconButton from '@/components/IconButton';

export default function Home() {
  // ... (other code)

  return (
    <main className='flex flex-col bg-black w-screen h-screen'>
      <div className=' p-10 mx-auto space-y-3 w-[400px] '>
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

        {/* GOLD, 100%, GLOW */}

        {/* GOLD, 100%, NO GLOW */}
        <Button color='gold' isIcon={false} isDisabled={false}>
          Sample Button
        </Button>

        {/* BLACK, 100%, NO GLOW */}
        <Button color='black' isIcon={false} isDisabled={false}>
          Sample Button
        </Button>

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

        <IconButton color='black' />
        <IconButton color='green' />
        <IconButton color='gold' />
        <IconButton color='black' isDisabled={true} />
        {/* Continue adding more button examples as needed */}
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
