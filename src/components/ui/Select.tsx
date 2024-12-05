import React from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';
import { Control, Controller } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<ReactSelectProps, 'onChange'> {
  label: string;
  error?: string;
  options: Option[];
  isMulti?: boolean;
  name: string;
  control: Control<any>;
  rules?: object;
  isClearable?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  isMulti = false,
  name,
  control,
  rules = {},
  isClearable = true,
  ...props
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: error ? '#ef4444' : state.isFocused ? '#005EB8' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 1px #005EB8' : 'none',
      '&:hover': {
        borderColor: error ? '#ef4444' : '#005EB8',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#005EB8' : state.isFocused ? '#e6f3ff' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:active': {
        backgroundColor: '#005EB8',
        color: 'white',
      },
    }),
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            className={`react-select ${error ? 'is-invalid' : ''}`}
            classNamePrefix="react-select"
            styles={customStyles}
            value={options.find(option => option.value === field.value) || null}
            onChange={(option: any) => {
              const value = isMulti
                ? option?.map((item: Option) => item.value)
                : option?.value;
              field.onChange(value);
            }}
            {...props}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};