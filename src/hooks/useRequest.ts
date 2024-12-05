import { useState, useEffect } from 'react';
import { Request } from '../types';
import { mockRequests } from '../services/mockData';

export const useRequest = (id: string) => {
  const [request, setRequest] = useState<Request | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const foundRequest = mockRequests.find(r => r.id === id);
        setRequest(foundRequest || null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  return { request, isLoading, error };
};