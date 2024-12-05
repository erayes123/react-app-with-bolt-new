import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useRequests } from '../hooks/useRequests';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';

interface FilterForm {
  type: string;
  sort: string;
}

const requestTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'type1', label: 'Type 1' },
  { value: 'type2', label: 'Type 2' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

export const RequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  
  const { control } = useForm<FilterForm>({
    defaultValues: {
      type: 'all',
      sort: 'newest'
    }
  });

  const { requests, isLoading, totalPages } = useRequests({
    page,
    search: searchTerm,
    type: control._getWatch('type'),
    sort: control._getWatch('sort'),
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Requests</h1>
        <Button onClick={() => navigate('/requests/new')}>
          Create New Request
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            name="search"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-5 h-5 text-gray-400" />}
          />
          <Select
            label="Request Type"
            name="type"
            control={control}
            options={requestTypes}
            isClearable={false}
          />
          <Select
            label="Sort By"
            name="sort"
            control={control}
            options={sortOptions}
            isClearable={false}
          />
        </div>
      </div>

      {/* Mobile View: Cards */}
      <div className="block lg:hidden space-y-4">
        {requests?.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/requests/${request.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{request.requestNumber}</h3>
                <p className="text-sm text-gray-600">{request.requestType}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                request.status === 'completed' ? 'bg-green-100 text-green-800' :
                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {request.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(request.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests?.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/requests/${request.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.requestNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.requestType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t gap-4">
          <Button
            variant="outlined"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outlined"
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};