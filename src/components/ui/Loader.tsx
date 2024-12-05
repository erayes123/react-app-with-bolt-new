import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    </div>
  );
};