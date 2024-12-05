import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

interface SuccessPopupProps {
  requestNumber: string;
  onClose: () => void;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({
  requestNumber,
  onClose,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Success!</h2>
          <p className="text-gray-600 mb-4 text-center">
            Your request has been submitted successfully.
            <br />
            Request number: <span className="font-bold">{requestNumber}</span>
          </p>
          <div className="flex gap-4 w-full">
            <Button
              variant="outlined"
              className="flex-1"
              onClick={() => navigate('/')}
            >
              Go to Home
            </Button>
            <Button
              className="flex-1"
              onClick={() => navigate(`/requests/${requestNumber}`)}
            >
              View Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};