import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../components/ui/Input';
import { PhoneInput } from '../components/ui/PhoneInput';
import { Button } from '../components/ui/Button';
import axiosInstance from '../utils/axios';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Invalid phone number'),
  sponsorNumber: z.string().length(10, 'Sponsor number must be exactly 10 digits')
    .regex(/^[12]\d{9}$/, 'Sponsor number must start with 1 or 2 and be 10 digits'),
});

type FormData = z.infer<typeof schema>;

export const CompleteProfilePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axiosInstance.post('/api/profile/complete', data);
      // Redirect to OTP verification
      window.location.href = '/verify-otp';
    } catch (error) {
      console.error('Failed to complete profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <PhoneInput
            label="Mobile Number"
            name="mobile"
            register={register}
            setValue={setValue}
            error={errors.mobile?.message}
          />
          <Input
            label="Sponsor Number"
            name="sponsorNumber"
            register={register}
            error={errors.sponsorNumber?.message}
            validation={{
              pattern: {
                value: /^[12]\d{9}$/,
                message: 'Sponsor number must start with 1 or 2 and be 10 digits',
              },
            }}
          />
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};