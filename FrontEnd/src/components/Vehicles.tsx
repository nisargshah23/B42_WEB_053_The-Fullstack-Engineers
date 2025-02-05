import React, { useState } from 'react';
import { MapPin, Battery, PenTool as Tool, Plus, X } from 'lucide-react';

function Vehicles() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    fuelLevel: 100,
  });
  const [vehicles, setVehicles] = useState([
    {
      id: '1',
      make: 'Toyota',
      model: 'Hilux',
      licensePlate: 'ABC123',
      status: 'available',
      location: 'Warehouse A',
      fuelLevel: 75,
      lastMaintenance: '2024-02-15',
    },
    {
      id: '2',
      make: 'Ford',
      model: 'Transit',
      licensePlate: 'XYZ789',
      status: 'in-use',
      location: 'Route 27',
      fuelLevel: 45,
      lastMaintenance: '2024-02-10',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicle = {
      id: (vehicles.length + 1).toString(),
      ...newVehicle,
      status: 'available',
      location: 'Warehouse A',
      lastMaintenance: new Date().toISOString().split('T')[0],
    };
    setVehicles([...vehicles, vehicle]);
    setShowAddForm(false);
    setNewVehicle({
      make: '',
      model: '',
      year: '',
      licensePlate: '',
      fuelLevel: 100,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Vehicle
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Vehicle</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Make</label>
                <input
                  type="text"
                  value={newVehicle.make}
                  onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">License Plate</label>
                <input
                  type="text"
                  value={newVehicle.licensePlate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{vehicle.make} {vehicle.model}</h3>
                <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                vehicle.status === 'available' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {vehicle.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{vehicle.location}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Battery className="h-4 w-4 text-gray-400 mr-2" />
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${vehicle.fuelLevel}%` }}
                    />
                  </div>
                </div>
                <span className="ml-2 text-gray-600">{vehicle.fuelLevel}%</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Tool className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Last maintenance: {vehicle.lastMaintenance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vehicles;