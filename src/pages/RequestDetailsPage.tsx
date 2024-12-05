import React from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Calendar, User, Clock } from 'lucide-react';
import { useRequest } from '../hooks/useRequest';
import { Loader } from '../components/ui/Loader';

export const RequestDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { request, isLoading } = useRequest(id!);

  if (isLoading) return <Loader />;
  if (!request) return <div>Request not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Request #{request.requestNumber}
              </h1>
              <p className="text-gray-600">{request.subject}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                request.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : request.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {request.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Request Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Request Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <div className="font-medium">Description</div>
                    <p className="text-gray-600">{request.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Due Date</div>
                    <p className="text-gray-600">
                      {new Date(request.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Requester</div>
                    <p className="text-gray-600">{request.requesterName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Timeline</h2>
              <div className="space-y-4">
                {request.timeline?.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attachments */}
          {request.attachments && request.attachments.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Attachments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {request.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{attachment.name}</div>
                      <p className="text-sm text-gray-600">
                        {attachment.size} • {attachment.type}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};