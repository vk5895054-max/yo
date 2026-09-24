"use client";

import React, { useState, useRef, useEffect } from "react";

export interface CountryOption {
  name: string;
  code: string;
  flag: React.ReactNode;
}

export const COUNTRIES_DATA: CountryOption[] = [
  {
    name: "United States",
    code: "US",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="16" fill="#B22234" />
        <path d="M0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.24H0z" fill="#FFF" />
        <rect width="9.6" height="8.6" fill="#3C3B6E" />
        <circle cx="2" cy="2" r="0.5" fill="#FFF" /><circle cx="4.8" cy="2" r="0.5" fill="#FFF" /><circle cx="7.6" cy="2" r="0.5" fill="#FFF" />
        <circle cx="3.4" cy="4.3" r="0.5" fill="#FFF" /><circle cx="6.2" cy="4.3" r="0.5" fill="#FFF" />
        <circle cx="2" cy="6.6" r="0.5" fill="#FFF" /><circle cx="4.8" cy="6.6" r="0.5" fill="#FFF" /><circle cx="7.6" cy="6.6" r="0.5" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0l24 16m0-16L0 16" stroke="#FFF" strokeWidth="2.5" />
        <path d="M0 0l24 16m0-16L0 16" stroke="#C8102E" strokeWidth="1.5" />
        <path d="M12 0v16M0 8h24" stroke="#FFF" strokeWidth="4" />
        <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "Canada",
    code: "CA",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="16" fill="#FF0000" />
        <rect x="6" width="12" height="16" fill="#FFF" />
        <path d="M12 3l1 2.5 1.5-.5-.5 2 2 .5-1 1.5 2 1-3 1 .5 2.5-2-1-.5 1.5h-1l-.5-1.5-2 1 .5-2.5-3-1 2-1-1-1.5 2-.5-.5-2 1.5.5z" fill="#FF0000" />
      </svg>
    ),
  },
  {
    name: "Germany",
    code: "DE",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="5.33" fill="#000000" />
        <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
        <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
      </svg>
    ),
  },
  {
    name: "India",
    code: "IN",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="5.33" fill="#FF9933" />
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
        <rect y="10.67" width="24" height="5.33" fill="#128807" />
        <circle cx="12" cy="8" r="2.2" stroke="#000088" strokeWidth="0.6" fill="none" />
        <circle cx="12" cy="8" r="0.6" fill="#000088" />
      </svg>
    ),
  },
  {
    name: "Australia",
    code: "AU",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="16" fill="#00008B" />
        <g transform="scale(0.5)">
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0l24 16m0-16L0 16" stroke="#FFF" strokeWidth="2.5" />
          <path d="M0 0l24 16m0-16L0 16" stroke="#C8102E" strokeWidth="1.5" />
          <path d="M12 0v16M0 8h24" stroke="#FFF" strokeWidth="4" />
          <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="2.5" />
        </g>
        <circle cx="6" cy="12" r="1.3" fill="#FFF" />
        <circle cx="18" cy="3" r="0.7" fill="#FFF" />
        <circle cx="16" cy="7" r="0.7" fill="#FFF" />
        <circle cx="20" cy="7" r="0.7" fill="#FFF" />
        <circle cx="18" cy="12" r="0.7" fill="#FFF" />
        <circle cx="19" cy="9" r="0.4" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: "Singapore",
    code: "SG",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="8" fill="#ED2939" />
        <rect y="8" width="24" height="8" fill="#FFFFFF" />
        <path d="M4.5 2a3 3 0 000 4 3 3 0 010-4z" fill="#FFF" />
        <circle cx="6.5" cy="4" r="0.4" fill="#FFF" />
        <circle cx="7.5" cy="3.2" r="0.4" fill="#FFF" />
        <circle cx="7.5" cy="4.8" r="0.4" fill="#FFF" />
        <circle cx="8.5" cy="3.6" r="0.4" fill="#FFF" />
        <circle cx="8.5" cy="4.4" r="0.4" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="5.33" fill="#00732F" />
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
        <rect y="10.67" width="24" height="5.33" fill="#000000" />
        <rect width="6" height="16" fill="#FF0000" />
      </svg>
    ),
  },
  {
    name: "France",
    code: "FR",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="8" height="16" fill="#002395" />
        <rect x="8" width="8" height="16" fill="#FFFFFF" />
        <rect x="16" width="8" height="16" fill="#ED2939" />
      </svg>
    ),
  },
  {
    name: "Netherlands",
    code: "NL",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="5.33" fill="#AE1C28" />
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
        <rect y="10.67" width="24" height="5.33" fill="#21468B" />
      </svg>
    ),
  },
  {
    name: "Switzerland",
    code: "CH",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="16" fill="#D52B1E" />
        <rect x="10.5" y="4" width="3" height="8" fill="#FFFFFF" />
        <rect x="8" y="6.5" width="8" height="3" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "Japan",
    code: "JP",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200" fill="none">
        <rect width="24" height="16" fill="#FFFFFF" />
        <circle cx="12" cy="8" r="4.5" fill="#BC002D" />
      </svg>
    ),
  },
  {
    name: "Other",
    code: "GLOBAL",
    flag: (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-[2px] shadow-xs flex-shrink-0 border border-slate-200 bg-slate-900" fill="none">
        <circle cx="12" cy="8" r="5" stroke="#38BDF8" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="8" rx="2.2" ry="5" stroke="#38BDF8" strokeWidth="1" fill="none" />
        <line x1="7" y1="8" x2="17" y2="8" stroke="#38BDF8" strokeWidth="1" />
      </svg>
    ),
  },
];

interface CountryPickerProps {
  value: string;
  onChange: (countryName: string) => void;
  hasError?: boolean;
  id?: string;
}

export function CountryPicker({ value, onChange, hasError, id }: CountryPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = COUNTRIES_DATA.find((c) => c.name === value);

  const filteredCountries = COUNTRIES_DATA.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-white text-left text-[#181a24] !rounded-[6px] px-3.5 py-2.5 text-sm font-medium border ${
          hasError ? "border-red-500" : "border-[#d1d5db]"
        } outline-none focus:outline-none focus:ring-0 focus:border-[#0066ff] transition-colors shadow-xs flex items-center justify-between cursor-pointer`}
      >
        <span className="flex items-center gap-2.5 truncate">
          {selectedOption ? (
            <>
              {selectedOption.flag}
              <span className="text-[#181a24] font-medium">{selectedOption.name}</span>
            </>
          ) : (
            <span className="text-[#94a3b8] font-normal">Select Country</span>
          )}
        </span>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180 text-[#0066ff]" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#e5e7eb] shadow-xl !rounded-[6px] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Quick Search */}
          <div className="p-2 border-b border-slate-100 bg-[#f8f9fa]">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country..."
                className="w-full bg-white text-[#181a24] placeholder:text-[#94a3b8] text-xs px-2.5 py-1.5 pl-7 border border-[#d1d5db] !rounded-[4px] outline-none focus:outline-none focus:ring-0 focus:border-[#0066ff]"
              />
              <svg
                className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Countries List */}
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1 divide-y divide-slate-50">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.name === value;
                return (
                  <li
                    key={c.name}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(c.name)}
                    className={`px-3.5 py-2 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#0066ff]/10 text-[#0066ff] font-semibold"
                        : "text-[#181a24] hover:bg-[#f8f9fa] hover:text-[#0066ff]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      {c.flag}
                      <span>{c.name}</span>
                    </span>
                    {isSelected && (
                      <span className="text-[#0066ff] text-xs font-bold">✓</span>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-3 text-xs text-slate-400 text-center">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
