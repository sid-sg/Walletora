
interface AmountSelectorProps {
  label: string;
  placeholder: string;
  amount: number;
  onAmountChange: (value: number) => void;
}

const AmountSelector: React.FC<AmountSelectorProps> = ({
  label,
  placeholder,
  amount,
  onAmountChange,
}) => {
  const handleIncrease = () =>
    onAmountChange(parseFloat((amount + 1).toFixed(2)));
  
  const handleDecrease = () =>
    onAmountChange(Math.max(0, parseFloat((amount - 1).toFixed(2))));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      onAmountChange(value === "" ? 0 : parseFloat(value));
    }
  };

  return (
    <div className="w-[250px] max-w-sm relative mt-4">
      <div className="text-lg block mb-1 font-semibold text-slate-300">
        {label}
      </div>
      <div className="relative">
        <button
          className="absolute right-9 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleDecrease}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </button>

        <input
          type="number"
          step="0.01"
          placeholder={placeholder}
          value={amount==0 ? '' : amount}
          onChange={handleInputChange}
          className="text-lg w-full p-2.5 bg-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleIncrease}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AmountSelector;
