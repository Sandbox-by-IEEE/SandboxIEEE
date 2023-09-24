import TextInput from '@/components/TextInput';

export default function Home() {
  return (
    <main>
      <div className='w-screen h-screen bg-black p-10 mx-auto space-x space-y-3'>
        <TextInput
          box={'usual'}
          isIcon={false}
          label={'Apa aja lah'}
          placeholder={'test disini'}
        />

        <TextInput box={'usual'} isIcon={false} placeholder={'test disini'} />
      </div>
    </main>
  );
}
