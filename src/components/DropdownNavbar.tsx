import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import ArrowDropdownIcon from '@/components/icons/ArrowDropdownIcon';

interface data {
  title: string;
  subdata: subdata[];
}

interface subdata {
  subtitle: string;
  link: string;
}

export default function DropdownNavbar({
  data,
  pathName,
}: {
  data: data;
  pathName: string;
}) {
  const [expandMain, setExpandMain] = useState(false);
  const dropwdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropwdown if user clicks outside dropdown options.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropwdownRef.current &&
        buttonRef.current &&
        !dropwdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setExpandMain(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropwdownRef, buttonRef]);

  return (
    <div className='group/container xl:relative'>
      {/* Dropdown Title */}
      <button
        ref={buttonRef}
        onClick={() => setExpandMain(!expandMain)}
        className='flex items-center gap-x-[5px] text-base xl:py-3'
      >
        <span
          className={`font-gantari-b ${expandMain && 'max-xl:text-ted-red'} ${
            data.subdata.some((item) => pathName.includes(item.link))
              ? 'text-ted-red'
              : 'text-white xl:group-hover/container:text-ted-red'
          } xl:uppercase`}
        >
          {data.title}
        </span>
        <ArrowDropdownIcon
          size={20}
          className={`w-[24px] h-[24px] fill-ted-red ${
            expandMain ? 'max-xl:rotate-180' : 'max-xl:rotate-0'
          } transition duration-300 ease-in-out xl:duration-500 xl:rotate-0 xl:group-hover/container:rotate-180
          `}
        />
      </button>

      {/* Main Dropdown Container*/}
      <div
        ref={dropwdownRef}
        className={`z-30 flex flex-col gap-y-[12px] font-gantari-b text-xs text-white max-xl:pl-[11px] ${
          expandMain
            ? 'max-xl:static max-xl:opacity-100 max-xl:ease-in-out'
            : 'max-xl:pointer-events-none max-xl:absolute max-xl:opacity-0 max-xl:ease-out'
        } transition duration-300 max-xl:mt-[17px] xl:pointer-events-none xl:absolute xl:left-[-13px] xl:top-[43px] xl:z-50 xl:w-[204px] xl:gap-y-0 xl:rounded-md xl:bg-white xl:font-gantari-r xl:text-base xl:leading-[19px] xl:text-[#4D4D4D] xl:opacity-0 xl:drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25)] xl:group-hover/container:pointer-events-auto xl:group-hover/container:opacity-100 xl:group-hover/container:duration-500 xl:group-hover/container:ease-in-out
        `}
      >
        {data.subdata.map((item, index) => {
          return (
            <Link
              key={`item_${index}`}
              className={`group/item w-fit xl:relative xl:h-[41px] xl:w-full ${
                pathName.includes(item.link) && 'max-xl:text-ted-red'
              }`}
              href={item.link}
            >
              <div
                className={`xl:absolute xl:top-0 xl:left-0 xl:h-full xl:w-full xl:border-[1px] xl:border-solid xl:border-ted-gray xl:group-hover/item:border-2 xl:group-hover/item:border-[#feb20eb3] xl:group-hover/item:bg-[#ffd16fb3] xl:group-hover/item:blur-[1px] ${
                  index === 0 && 'xl:rounded-t-md'
                } ${index === data.subdata.length - 1 && 'xl:rounded-b-md'}`}
              />
              <button className='w-fit xl:absolute xl:left-4 xl:top-[9px] xl:z-20'>
                {item.subtitle}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
