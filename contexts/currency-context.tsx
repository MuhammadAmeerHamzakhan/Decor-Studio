"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// Ensure you created the file in Step 1 for this import to work!
import { type Country, countries, convertPrice, formatPrice, getCountryByCode } from "@/lib/currency";

interface CurrencyContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  convertAndFormat: (priceInUSD: number) => string;
  showCountrySelector: () => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Default to USA if countries array is empty/failed
  const [selectedCountry, setSelectedCountryState] = useState<Country>(countries[0]);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if country is already selected in LocalStorage
    const savedCountryCode = localStorage.getItem("selectedCountry");
    if (savedCountryCode) {
      const country = getCountryByCode(savedCountryCode);
      if (country) {
        setSelectedCountryState(country);
      }
    } else {
      // First visit - trigger selector modal
      setIsFirstVisit(true);
    }
    setIsInitialized(true);
  }, []);

  const setSelectedCountry = (country: Country) => {
    setSelectedCountryState(country);
    localStorage.setItem("selectedCountry", country.code);
    setIsFirstVisit(false);
  };

  const convertAndFormat = (priceInUSD: number) => {
    const converted = convertPrice(priceInUSD, selectedCountry.rate);
    return formatPrice(converted, selectedCountry.symbol);
  };

  const showCountrySelector = () => {
    setIsFirstVisit(true);
  };

  if (!isInitialized) {
    return null; // Prevent hydration mismatch
  }

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        convertAndFormat,
        showCountrySelector,
        isFirstVisit,
        setIsFirstVisit,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}