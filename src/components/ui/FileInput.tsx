import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileInputProps {
  label: string;
  multiple?: boolean;
  accept?: string;
  onChange: (files: File[]) => void;
  error?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  multiple = false,
  accept,
  onChange,
  error
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFileNames(files.map(f => f.name));
    onChange(files);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary"
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
        />
        <div className="flex flex-col items-center">
          <Upload className="w-8 h-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Click to upload {multiple ? 'files' : 'a file'}
          </p>
        </div>
      </div>
      {fileNames.length > 0 && (
        <ul className="mt-2 space-y-1">
          {fileNames.map((name, index) => (
            <li key={index} className="text-sm text-gray-600">
              {name}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};