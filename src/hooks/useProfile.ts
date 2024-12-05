import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { User } from '../types';

interface UpdateProfileData {
  email?: string;
  mobile?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/profile');
        setProfile(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const response = await axiosInstance.put('/api/profile', data);
      setProfile(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return { profile, isLoading, error, updateProfile };
};