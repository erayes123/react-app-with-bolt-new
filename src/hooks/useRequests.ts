import { useState, useEffect } from 'react';
import { Request } from '../types';
import { getPaginatedRequests } from '../services/mockData';

interface UseRequestsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  sort?: string;
}

export const useRequests = (params: UseRequestsParams = {}) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = getPaginatedRequests(params.page, params.limit, {
          search: params.search,
          type: params.type,
          sort: params.sort
        });
        setRequests(result.requests);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [params.page, params.limit, params.search, params.type, params.sort]);

  return { requests, isLoading, error, totalPages };
};