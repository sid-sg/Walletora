'use client';
import { useState } from 'react';

type BankType = {
  name: string;
  redirectUrl: string;
};

type DropdownProps = {
  options: BankType[];
  provider: string;
  onProviderChange: (value: string) => void;
};

const Dropdown = ({ options, provider, onProviderChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionSelect = (option: BankType) => {
    onProviderChange(option.name);
    toggleDropdown();
  };

  return (
    <div className="w-full py-8">
      <div className="relative inline-block">
        <button
          type="button"
          className="flex justify-between items-center px-4 py-2 text-xl text-white bg-gray-800 hover:bg-gray-700 focus:ring-1 focus:outline-none focus:ring-white font-medium rounded-lg"
          onClick={toggleDropdown}
          style={{ width: '250px' }}
        >
          <span className="truncate">{provider}</span>
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
