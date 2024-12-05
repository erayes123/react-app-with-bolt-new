import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Hash } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { PhoneInput } from '../components/ui/PhoneInput';
import { Button } from '../components/ui/Button';
import { useProfile } from '../hooks/useProfile';
import { Loader } from '../components/ui/Loader';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Invalid phone number'),
});

type FormData = z.infer<typeof schema>;

export const ProfilePage: React.FC = () => {
  const { profile, isLoading, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: profile?.email || '',
      mobile: profile?.mobile || '',
    },
  });

  React.useEffect(() => {
    if (profile) {
      reset({
        email: profile.email || '',
        mobile: profile.mobile || '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Profile Information</h1>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {updateSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
              Profile updated successfully!
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email"
                name="email"
                type="email"
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
              <div className="flex gap-4">
                <Button type="submit">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium">{profile?.name || 'Not provided'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{profile?.email || 'Not provided'}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Mobile Number</div>
                      <div className="font-medium">{profile?.mobile || 'Not provided'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Hash className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Sponsor Number</div>
                      <div className="font-medium">{profile?.sponsorNumber || 'Not provided'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};