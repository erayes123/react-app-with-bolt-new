import React from 'react';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import { Loader } from '../components/ui/Loader';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { services, isLoading } = useServices();

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/services/${service.id}`)}
          >
            <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};