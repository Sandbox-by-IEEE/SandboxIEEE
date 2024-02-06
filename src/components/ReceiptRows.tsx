interface member {
  name: string;
  email: string;
  phoneNumber: string;
  lineId: string;
}

interface props {
  memberCount: number;
  members: member[];
  price: string;
}

function ReceiptRow({ memberCount, members, price }: props) {
  return (
    <div className='ReceiptRow w-full block'>
      <div className='title w-full font-semibold flex'>
        <div className='items w-[70%]'>ITEMS</div>
        <div className='price w-[30%]'>PRICE</div>
      </div>
      <div className='title w-full italic flex mt-5'>
        <div className='items w-[70%] pr-2'>
          The Sandbox Exhibition and Grand Seminar ({memberCount}x)
        </div>
        <div className='price w-[30%]'>{price}</div>
      </div>
      {/* emails */}
      <div className='emails block text-sm pl-3 mt-1 opacity-70'>
        {members.map((member) => (
          <p key={member.email}>
            {member.name} - {member.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ReceiptRow;
