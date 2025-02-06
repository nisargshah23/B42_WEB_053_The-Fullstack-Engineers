export type User = {
  id: string;
  username: string;
  email: string;
  role: "admin" | "manager" | "driver";
  name: string;
};

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  currentMileage: number;
  status: "available" | "in-use" | "maintenance";
  lastMaintenance: string;
  fuelLevel: number;
  location: {
    lat: number;
    lng: number;
  };
};

export type Driver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  license: string;
  status: "available" | "on-trip" | "off-duty";
  performanceScore: number;
  trips: Trip[];
};

export type Trip = {
  id: string;
  driverId: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  purpose: string;
  status: "planned" | "in-progress" | "completed";
};

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: string;
  date: string;
  status: "scheduled" | "in-progress" | "completed";
  cost: number;
  priority: "low" | "medium" | "high";
  notes?: string;
}

export interface MaintenanceFormData {
  vehicleId: string;
  type: string;
  date: string;
  cost: string;
  status:string;
  priority: "low" | "medium" | "high";
  notes: string;
}
