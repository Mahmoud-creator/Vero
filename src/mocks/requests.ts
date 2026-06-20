import { ServiceRequest } from "@/src/types";

export const requests: ServiceRequest[] = [
  {
    id: "rq1",
    workerId: "w1",
    serviceName: "Leak inspection & repair",
    description: "Kitchen sink dripping under the cabinet, possible seal issue.",
    status: "accepted",
    scheduledDate: "Jun 22, 2026 · 10:00 AM",
    createdAt: "2 hours ago",
    price: 90,
  },
  {
    id: "rq2",
    workerId: "w2",
    serviceName: "Deep clean (2BR)",
    description: "Move-out deep clean for a 2-bedroom apartment.",
    status: "pending",
    scheduledDate: "Jun 25, 2026 · 9:00 AM",
    createdAt: "1 day ago",
    price: 180,
  },
  {
    id: "rq3",
    workerId: "w3",
    serviceName: "EV charger install",
    description: "Install level-2 charger in the garage.",
    status: "completed",
    scheduledDate: "Jun 14, 2026 · 1:00 PM",
    createdAt: "1 week ago",
    price: 450,
  },
  {
    id: "rq4",
    workerId: "w4",
    serviceName: "Accent wall",
    description: "Navy accent wall in the living room.",
    status: "completed",
    scheduledDate: "Jun 8, 2026 · 11:00 AM",
    createdAt: "2 weeks ago",
    price: 120,
  },
  {
    id: "rq5",
    workerId: "w5",
    serviceName: "Lawn mowing",
    description: "Front and back lawn, weekly recurring.",
    status: "cancelled",
    scheduledDate: "Jun 5, 2026 · 8:00 AM",
    createdAt: "3 weeks ago",
    price: 35,
  },
];

export function getRequestsByStatus(status: ServiceRequest["status"]): ServiceRequest[] {
  return requests.filter((r) => r.status === status);
}

