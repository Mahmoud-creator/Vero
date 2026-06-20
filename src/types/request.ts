export type RequestStatus = "pending" | "accepted" | "completed" | "cancelled";

export interface ServiceRequest {
  id: string;
  workerId: string;
  serviceName: string;
  description: string;
  status: RequestStatus;
  scheduledDate: string;
  createdAt: string;
  price: number;
}

