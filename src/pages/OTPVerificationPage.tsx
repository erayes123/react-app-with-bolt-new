import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import axiosInstance from '../utils/axios';

export const OTPVerificationPage: React.FC = () => {
  const [isResending, setIsResending] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: { otp: string }) => {
    try {
      await axiosInstance.post('/api/verify-otp', data);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await axiosInstance.post('/api/resend-otp');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Verify Your Phone Number</h1>
        <p className="text-gray-600 text-center mb-8">
          We've sent a verification code to your phone number
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Enter OTP"
            name="otp"
            register={register}
            error={errors.otp?.message}
            validation={{
              required: 'OTP is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'OTP must be 6 digits',
              },
            }}
          />
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button
            variant="text"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? 'Resending...' : 'Resend Code'}
          </Button>
        </div>
      </div>
    </div>
  );
};