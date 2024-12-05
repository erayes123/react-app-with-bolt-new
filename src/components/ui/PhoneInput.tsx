import React from 'react';
import Select from 'react-select';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface PhoneInputProps {
  label: string;
  error?: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  language?: 'en' | 'ar';
}

const countries: Country[] = [
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971' },
  // Add more countries as needed
];

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  error,
  register,
  setValue,
  name,
  language = 'en',
}) => {
  const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleCountryChange = (option: any) => {
    setSelectedCountry(option.value);
    validateAndSetPhone(phoneNumber, option.value);
  };

  const validateAndSetPhone = (phone: string, country: Country) => {
    try {
      const fullNumber = `${country.dialCode}${phone}`;
      if (isValidPhoneNumber(fullNumber, country.code)) {
        const parsed = parsePhoneNumber(fullNumber, country.code);
        setValue(name, parsed.number);
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    validateAndSetPhone(value, selectedCountry);
  };

  const options = countries.map((country) => ({
    value: country,
    label: (
      <div className="flex items-center gap-2">
        <span>{country.flag}</span>
        <span>{language === 'en' ? country.name : `${country.name} (Arabic)`}</span>
        <span className="text-gray-500">{country.dialCode}</span>
      </div>
    ),
  }));

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="w-52">
          <Select
            options={options}
            defaultValue={options[0]}
            onChange={handleCountryChange}
            isSearchable={true}
            className="react-select"
          />
        </div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Phone number"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};