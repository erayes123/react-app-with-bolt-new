export interface User {
  id: string;
  email?: string;
  mobile?: string;
  sponsorNumber?: string;
  name?: string;
  roles: string[];
}

export interface Session {
  token: string;
  user: User;
}

export interface Request {
  id: string;
  requestNumber: string;
  requestType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  subject?: string;
  description?: string;
  dueDate?: string;
  requesterName?: string;
  timeline?: Array<{
    title: string;
    description: string;
    timestamp: string;
  }>;
  attachments?: Array<{
    name: string;
    url: string;
    size: string;
    type: string;
  }>;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}