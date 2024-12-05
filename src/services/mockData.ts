import { Service, Request } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Document Attestation',
    description: 'Get your documents attested and verified officially',
    icon: 'file-check'
  },
  {
    id: '2',
    name: 'Visa Services',
    description: 'Apply for new visas or manage existing ones',
    icon: 'passport'
  },
  {
    id: '3',
    name: 'License Renewal',
    description: 'Renew your business or professional licenses',
    icon: 'license'
  },
  {
    id: '4',
    name: 'Certificate Issuance',
    description: 'Request official certificates and documentation',
    icon: 'certificate'
  },
  {
    id: '5',
    name: 'Business Registration',
    description: 'Register new businesses or update existing registrations',
    icon: 'building'
  }
];

export const mockRequests: Request[] = [
  {
    id: '1',
    requestNumber: 'REQ-2024-001',
    requestType: 'Document Attestation',
    status: 'completed',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-16T15:30:00Z',
    subject: 'University Degree Attestation',
    description: 'Request for attestation of bachelor degree certificate',
    dueDate: '2024-03-20T00:00:00Z',
    requesterName: 'Mohammed Ahmed',
    timeline: [
      {
        title: 'Request Submitted',
        description: 'Request has been successfully submitted',
        timestamp: '2024-03-15T10:00:00Z'
      },
      {
        title: 'Document Verification',
        description: 'Documents are being verified by the concerned department',
        timestamp: '2024-03-15T14:00:00Z'
      },
      {
        title: 'Attestation Complete',
        description: 'Documents have been successfully attested',
        timestamp: '2024-03-16T15:30:00Z'
      }
    ],
    attachments: [
      {
        name: 'Degree Certificate.pdf',
        url: 'https://example.com/files/degree.pdf',
        size: '2.5 MB',
        type: 'PDF'
      }
    ]
  },
  {
    id: '2',
    requestNumber: 'REQ-2024-002',
    requestType: 'Visa Services',
    status: 'pending',
    createdAt: '2024-03-14T09:00:00Z',
    updatedAt: '2024-03-14T09:00:00Z',
    subject: 'Business Visa Application',
    description: 'Application for new business visa',
    dueDate: '2024-03-25T00:00:00Z',
    requesterName: 'Sarah Wilson',
    timeline: [
      {
        title: 'Request Submitted',
        description: 'Visa application has been submitted',
        timestamp: '2024-03-14T09:00:00Z'
      }
    ],
    attachments: [
      {
        name: 'Passport Copy.pdf',
        url: 'https://example.com/files/passport.pdf',
        size: '1.8 MB',
        type: 'PDF'
      },
      {
        name: 'Business Documents.zip',
        url: 'https://example.com/files/business-docs.zip',
        size: '5.2 MB',
        type: 'ZIP'
      }
    ]
  },
  {
    id: '3',
    requestNumber: 'REQ-2024-003',
    requestType: 'License Renewal',
    status: 'in-progress',
    createdAt: '2024-03-13T11:30:00Z',
    updatedAt: '2024-03-14T16:45:00Z',
    subject: 'Professional License Renewal',
    description: 'Request to renew engineering professional license',
    dueDate: '2024-03-30T00:00:00Z',
    requesterName: 'Abdullah Al-Sayed',
    timeline: [
      {
        title: 'Request Submitted',
        description: 'Renewal request has been submitted',
        timestamp: '2024-03-13T11:30:00Z'
      },
      {
        title: 'Document Review',
        description: 'Documents are under review',
        timestamp: '2024-03-14T16:45:00Z'
      }
    ]
  }
];

// Helper function to paginate requests
export const getPaginatedRequests = (
  page: number = 1,
  limit: number = 10,
  filters: { search?: string; type?: string; sort?: string } = {}
): { requests: Request[]; totalPages: number; currentPage: number } => {
  let filteredRequests = [...mockRequests];

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredRequests = filteredRequests.filter(
      request =>
        request.requestNumber.toLowerCase().includes(searchTerm) ||
        request.subject?.toLowerCase().includes(searchTerm) ||
        request.description?.toLowerCase().includes(searchTerm)
    );
  }

  // Apply type filter
  if (filters.type && filters.type !== 'all') {
    filteredRequests = filteredRequests.filter(
      request => request.requestType === filters.type
    );
  }

  // Apply sorting
  if (filters.sort) {
    filteredRequests.sort((a, b) => {
      if (filters.sort === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });
  }

  // Calculate pagination
  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  return {
    requests: paginatedRequests,
    totalPages,
    currentPage: page
  };
};