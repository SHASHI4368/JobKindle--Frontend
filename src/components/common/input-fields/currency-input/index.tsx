import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, useRef } from "react";
import { DollarSign, Search, Loader2, X } from "lucide-react";

// Common currencies data
const CURRENCIES = [
  {
    key: 1,
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    country: "United States",
  },
  { key: 2, code: "EUR", name: "Euro", symbol: "€", country: "European Union" },
  {
    key: 3,
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    country: "United Kingdom",
  },
  { key: 4, code: "JPY", name: "Japanese Yen", symbol: "¥", country: "Japan" },
  {
    key: 5,
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    country: "Canada",
  },
  {
    key: 6,
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    country: "Australia",
  },
  {
    key: 7,
    code: "CHF",
    name: "Swiss Franc",
    symbol: "CHF",
    country: "Switzerland",
  },
  { key: 8, code: "CNY", name: "Chinese Yuan", symbol: "¥", country: "China" },
  { key: 9, code: "INR", name: "Indian Rupee", symbol: "₹", country: "India" },
  {
    key: 10,
    code: "KRW",
    name: "South Korean Won",
    symbol: "₩",
    country: "South Korea",
  },
  {
    key: 11,
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
    country: "Singapore",
  },
  {
    key: 12,
    code: "HKD",
    name: "Hong Kong Dollar",
    symbol: "HK$",
    country: "Hong Kong",
  },
  {
    key: 13,
    code: "NZD",
    name: "New Zealand Dollar",
    symbol: "NZ$",
    country: "New Zealand",
  },
  {
    key: 14,
    code: "SEK",
    name: "Swedish Krona",
    symbol: "kr",
    country: "Sweden",
  },
  {
    key: 15,
    code: "NOK",
    name: "Norwegian Krone",
    symbol: "kr",
    country: "Norway",
  },
  {
    key: 16,
    code: "DKK",
    name: "Danish Krone",
    symbol: "kr",
    country: "Denmark",
  },
  {
    key: 17,
    code: "PLN",
    name: "Polish Złoty",
    symbol: "zł",
    country: "Poland",
  },
  {
    key: 18,
    code: "CZK",
    name: "Czech Koruna",
    symbol: "Kč",
    country: "Czech Republic",
  },
  {
    key: 19,
    code: "HUF",
    name: "Hungarian Forint",
    symbol: "Ft",
    country: "Hungary",
  },
  {
    key: 20,
    code: "RUB",
    name: "Russian Ruble",
    symbol: "₽",
    country: "Russia",
  },
  {
    key: 21,
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    country: "Brazil",
  },
  {
    key: 22,
    code: "MXN",
    name: "Mexican Peso",
    symbol: "$",
    country: "Mexico",
  },
  {
    key: 23,
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    country: "South Africa",
  },
  {
    key: 24,
    code: "TRY",
    name: "Turkish Lira",
    symbol: "₺",
    country: "Turkey",
  },
  {
    key: 25,
    code: "AED",
    name: "UAE Dirham",
    symbol: "د.إ",
    country: "United Arab Emirates",
  },
  {
    key: 26,
    code: "SAR",
    name: "Saudi Riyal",
    symbol: "﷼",
    country: "Saudi Arabia",
  },
  { key: 27, code: "THB", name: "Thai Baht", symbol: "฿", country: "Thailand" },
  {
    key: 28,
    code: "MYR",
    name: "Malaysian Ringgit",
    symbol: "RM",
    country: "Malaysia",
  },
  {
    key: 29,
    code: "IDR",
    name: "Indonesian Rupiah",
    symbol: "Rp",
    country: "Indonesia",
  },
  {
    key: 30,
    code: "PHP",
    name: "Philippine Peso",
    symbol: "₱",
    country: "Philippines",
  },
  {
    key: 31,
    code: "VND",
    name: "Vietnamese Dong",
    symbol: "₫",
    country: "Vietnam",
  },
  {
    key: 32,
    code: "ILS",
    name: "Israeli Shekel",
    symbol: "₪",
    country: "Israel",
  },
  {
    key: 33,
    code: "LKR",
    name: "Sri Lankan Rupee",
    symbol: "Rs",
    country: "Sri Lanka",
  },
  {
    key: 34,
    code: "EGP",
    name: "Egyptian Pound",
    symbol: "£",
    country: "Egypt",
  },
  {
    key: 35,
    code: "PKR",
    name: "Pakistani Rupee",
    symbol: "Rs",
    country: "Pakistan",
  },
  {
    key: 36,
    code: "BDT",
    name: "Bangladeshi Taka",
    symbol: "৳",
    country: "Bangladesh",
  },
  {
    key: 37,
    code: "NPR",
    name: "Nepalese Rupee",
    symbol: "Rs",
    country: "Nepal",
  },
];

export type CurrencyResult = {
  code: string;
  name: string;
  symbol: string;
  country: string;
};

type CurrencyInputProps = {
  label: string;
  placeholder?: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrencySelect?: (currency: CurrencyResult) => void;
};

const CurrencyInput = ({
  label,
  placeholder = "Search for currencies...",
  value = "",
  onChange = () => {},
  onCurrencySelect = () => {},
}: CurrencyInputProps) => {
  const [searchResults, setSearchResults] = useState<CurrencyResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search for currencies
  const searchCurrencies = async (query: string) => {
    if (!query.trim() || query.length < 1) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      const filteredCurrencies = CURRENCIES.filter(
        (currency) =>
          currency.code.toLowerCase().includes(query.toLowerCase()) ||
          currency.name.toLowerCase().includes(query.toLowerCase()) ||
          currency.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Limit to 8 results

      setSearchResults(filteredCurrencies);
      setShowDropdown(filteredCurrencies.length > 0);
      setIsLoading(false);
    }, 200);
  };

  // Handle input change with debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debounced search
    const newTimeout = setTimeout(() => {
      searchCurrencies(inputValue);
    }, 300); // 300ms delay

    setSearchTimeout(newTimeout);
  };

  // Handle currency selection
  const handleCurrencySelect = (currency: CurrencyResult) => {
    // Create a synthetic event to update the input value
    const displayValue = `${currency.code} - ${currency.name}`;
    const syntheticEvent = {
      target: { value: displayValue },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
    onCurrencySelect(currency);
    setShowDropdown(false);
    setSearchResults([]);

    // Focus back to input
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Clear search results
  const clearSearch = () => {
    setSearchResults([]);
    setShowDropdown(false);
    const syntheticEvent = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  // Show popular currencies when input is focused and empty
  const handleInputFocus = () => {
    if (!value) {
      const popularCurrencies = CURRENCIES.slice(0, 6); // Show top 6 popular currencies
      setSearchResults(popularCurrencies);
      setShowDropdown(true);
    }
  };

  return (
    <div
      className="flex flex-col w-full gap-2 font-raleway relative"
      ref={dropdownRef}
    >
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          className={` ${
            value ? "pr-[70px]" : "pr-3"
          } md:h-[45px] h-[40px]  md:text-[16px] text-[14px]`}
          placeholder={placeholder}
          type="text"
          value={value ?? ""}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          autoComplete="off"
        />

        {/* Loading spinner and clear button */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {isLoading && (
            <Loader2 size={16} className="text-primary animate-spin" />
          )}
          {value && !isLoading && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={14} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Currency dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {!value && (
            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 bg-gray-50">
              Popular Currencies
            </div>
          )}
          {searchResults.map((currency) => (
            <div
              key={currency.code}
              onClick={() => handleCurrencySelect(currency)}
              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mr-3 flex-shrink-0">
                <span className="text-primary font-semibold text-sm">
                  {currency.symbol}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {currency.code}
                  </span>
                  <span className="text-sm text-gray-700">{currency.name}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{currency.country}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {showDropdown &&
        searchResults.length === 0 &&
        !isLoading &&
        value &&
        value.length >= 1 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
            <div className="flex items-center text-gray-500">
              <Search size={16} className="mr-2" />
              <span className="text-sm">No currencies found for "{value}"</span>
            </div>
          </div>
        )}
    </div>
  );
};

export default CurrencyInput;
