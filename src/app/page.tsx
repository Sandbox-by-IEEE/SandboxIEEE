import Button from '@/components/Button';
import IconButton from '@/components/IconButton';

export default function Home() {
  const cardData = [
    {
      title: 'Sample Card 1',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Lorem ipsum dolor sit ameta siudahsok dhjahsdljks hasjkdahsgdjkas hdjkas hdjka dhjkah sdjkh ...',
      leftTag: 'Tag1',
      rightTag: 'Tag2',
      horizontal: false,
      buttonText: 'Click Me',
      onClick: () => {
        // Handle button click
      },
    },
    {
      title: 'Sample Card 2',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Another card with different content dasjhd kjahsd jka hsdjkha sjdh ajkshd jkashdjk a hdkjash djkas hdjkhas djaksdhjk ashd jk...',
      leftTag: 'Tag3',
      rightTag: 'Tag4',
      horizontal: true,
      buttonText: 'Explore',
      onClick: () => {
        // Handle button click
      },
    },
    {
      title: 'Sample Card 1',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Lorem ipsum dolor sit ameta siudahsok dhjahsdljks hasjkdahsgdjkas hdjkas hdjka dhjkah sdjkh ...',
      leftTag: 'Tag1',
      rightTag: 'Tag2',
      horizontal: false,
      onClick: () => {
        // Handle button click
      },
    },
    {
      title: 'Sample Card 2',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Another card with different content dasjhd kjahsd jka hsdjkha sjdh ajkshd jkashdjk a hdkjash djkas hdjkhas djaksdhjk ashd jk...',
      leftTag: 'Tag3',
      rightTag: 'Tag4',
      horizontal: true,
      onClick: () => {
        // Handle button click
      },
    },
    {
      title: 'Sample Card 2',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Another card with different content dasjhd kjahsd jka hsdjkha sjdh ajkshd jkashdjk a hdkjash djkas hdjkhas djaksdhjk ashd jk...',
      leftTag: 'Tag3',
      rightTag: 'Tag4',
      horizontal: false,
      buttonText: 'yuhu',
      onClick: () => {
        // Handle button click
      },
    },

    // Add more card data objects as needed
  ];

  return (
    <main>
      <div className='w-screen h-screen p-10 mx-auto space-x-2 space-y-3'>
        <IconButton bgColor='green' />
        <IconButton bgColor='gold' />
        <IconButton bgColor='black' />
        <IconButton bgColor='disabled' />

        <Button //GREEN, 100%, !GLOW, !ARROW
          isTextWhite={true}
          bgColor='green'
          bgOpacity={100}
          isGlow={true}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //GREEN, 100%, GLOW, !ARROW
          isTextWhite={true}
          bgColor='green'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //BLACK, 100%, !GLOW, !ARROW
          isTextWhite={true}
          bgColor='black'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //DISABLED, !ARROW
          isTextWhite={true}
          bgColor='disabled'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={true}
        />

        <Button //GOLD, 100%, GLOW, !ARROW
          isTextWhite={true}
          bgColor='gold'
          bgOpacity={100}
          isGlow={true}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //GOLD, 100%, !GLOW, !ARROW
          isTextWhite={true}
          bgColor='gold'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //BLACK, 100%, !GLOW, !ARROW
          isTextWhite={true}
          bgColor='black'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //DISABLED, !ARROW
          isTextWhite={true}
          bgColor='disabled'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={true}
        />

        <Button //GREEN, 100%, GLOW, ARROW
          isTextWhite={true}
          bgColor='green'
          bgOpacity={100}
          isGlow={true}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //GREEN, 100%, !GLOW, ARROW
          isTextWhite={true}
          bgColor='green'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //BLACK, 100%, !GLOW, ARROW
          isTextWhite={true}
          bgColor='black'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //DISABLED, ARROW
          isTextWhite={true}
          bgColor='disabled'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={true}
        />

        <Button //GOLD, 100%, GLOW, ARROW
          isTextWhite={true}
          bgColor='gold'
          bgOpacity={100}
          isGlow={true}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //GOLD, 100%, GLOW, ARROW
          isTextWhite={true}
          bgColor='gold'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //BLACK, 100%, !GLOW, ARROW
          isTextWhite={true}
          bgColor='black'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //DISABLED, ARROW
          isTextWhite={true}
          bgColor='disabled'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={true}
        />

        <Button //GREEN, 0%, !GLOW, !ARROW
          isTextWhite={false}
          bgColor='green'
          bgOpacity={0}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //GREEN, 20%, !GLOW, !ARROW
          isTextWhite={false}
          bgColor='green'
          bgOpacity={20}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //wGREEN, 100%, !GLOW, !ARROW
          isTextWhite={false}
          bgColor='green'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //DISABLED, !ARROW
          isTextWhite={true}
          bgColor='disabled'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={true}
        />

        <Button //GOLD, 0%, !GLOW, !ARROW
          isTextWhite={false}
          bgColor='gold'
          bgOpacity={0}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //GOLD, 20%, !GLOW, !ARROW
          isTextWhite={false}
          bgColor='gold'
          bgOpacity={20}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //wGOLD, 100%, !GLOW, !ARROW
          isTextWhite={false}
          bgColor='gold'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={false}
        />

        <Button //DISABLED, !ARROW
          isTextWhite={true}
          bgColor='disabled'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={false}
          isDisabled={true}
        />
        <Button //GREEN, 0%, !GLOW, ARROW
          isTextWhite={false}
          bgColor='green'
          bgOpacity={0}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //GREEN, 20%, !GLOW, ARROW
          isTextWhite={false}
          bgColor='green'
          bgOpacity={20}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //wGREEN, 100%, !GLOW, ARROW
          isTextWhite={false}
          bgColor='green'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //DISABLED, !ARROW
          isTextWhite={true}
          bgColor='disabled'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={true}
        />

        <Button //GOLD, 0%, !GLOW, ARROW
          isTextWhite={false}
          bgColor='gold'
          bgOpacity={0}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //GOLD, 20%, !GLOW, ARROW
          isTextWhite={false}
          bgColor='gold'
          bgOpacity={20}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //wGOLD, 100%, !GLOW, ARROW
          isTextWhite={false}
          bgColor='gold'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={false}
        />

        <Button //DISABLED, ARROW
          isTextWhite={true}
          bgColor='disabled'
          bgOpacity={100}
          isGlow={false}
          text='Button'
          isIcon={true}
          isDisabled={true}
        />
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
