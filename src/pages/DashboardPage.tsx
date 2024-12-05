import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useServices } from '../hooks/useServices';
import { useRequests } from '../hooks/useRequests';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { services } = useServices();
  const { requests } = useRequests({ limit: 5 });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Services */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Available Services</h2>
            <Button
              variant="text"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/services')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {services?.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/services/${service.id}`)}
              >
                <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{service.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Recent Requests</h2>
            <Button
              variant="text"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/requests')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {requests?.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/requests/${request.id}`)}
              >
                <div className="min-w-0 flex-1 mr-4">
                  <h3 className="font-medium truncate">Request #{request.requestNumber}</h3>
                  <p className="text-sm text-gray-600 truncate">{request.requestType}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  request.status === 'completed' ? 'bg-green-100 text-green-800' :
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};