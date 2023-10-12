'use client';

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';
import { CustomFilterProps } from '@/types';
import { updateSearchParams } from '@/utils';

/**
 * A custom filter component for selecting filter options.
 *
 * @param {CustomFilterProps} props - The component's properties.
 * @param {string} props.title - The title of the filter.
 * @param {Array} props.options - The available filter options.
 * @returns {JSX.Element} The rendered CustomFilter component.
 */
const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]);

  /**
   * Handles updating the search parameters and the URL when a filter option is selected.
   * @param {Object} e - The selected filter option.
   * @param {string} e.title - The title of the selected option.
   * @param {string} e.value - The value of the selected option.
   */
  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathName, { scroll: false });
  };

  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className='relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image
              src='/chevron-up-down.svg'
              width={20}
              height={20}
              className='ml-4 object-contain'
              alt="chevron up down"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) => `relative cursor-default select-none py-2 px-4 ${
                    active ? 'bg-primary-blue text-white' : 'text-gray-900'
                  }`}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default CustomFilter;
