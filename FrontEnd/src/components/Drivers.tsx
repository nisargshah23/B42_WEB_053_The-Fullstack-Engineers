import React, { useState } from 'react';
import { User, Star, MapPin, Phone, Plus, X } from 'lucide-react';

function Drivers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    email: '',
    license: '',
  });
  const [drivers, setDrivers] = useState([
    {
      id: '1',
      name: 'John Doe',
      status: 'available',
      phone: '+1 234-567-8900',
      location: 'Warehouse A',
      rating: 4.8,
      trips: 156,
    },
    {
      id: '2',
      name: 'Jane Smith',
      status: 'on-trip',
      phone: '+1 234-567-8901',
      location: 'Route 27',
      rating: 4.9,
      trips: 203,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const driver = {
      id: (drivers.length + 1).toString(),
      ...newDriver,
      status: 'available',
      location: 'Warehouse A',
      rating: 5.0,
      trips: 0,
    };
    setDrivers([...drivers, driver]);
    setShowAddForm(false);
    setNewDriver({
      name: '',
      phone: '',
      email: '',
      license: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Driver
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Driver</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newDriver.email}
                  onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Driver's License</label>
                <input
                  type="text"
                  value={newDriver.license}
                  onChange={(e) => setNewDriver({ ...newDriver, license: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
                >
                  Add Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    driver.status === 'available' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {driver.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-600">{driver.rating}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{driver.phone}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{driver.location}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                Total trips: {driver.trips}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drivers;