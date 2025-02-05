import React, { useState } from 'react';
import { PenTool as Tool, Calendar, DollarSign, AlertCircle, Plus, X } from 'lucide-react';

function Maintenance() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    vehicleId: '',
    type: '',
    date: '',
    cost: '',
    priority: 'medium',
    notes: '',
  });
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: '1',
      vehicleId: 'ABC123',
      type: 'Oil Change',
      date: '2024-02-20',
      status: 'scheduled',
      cost: 150,
      priority: 'high',
    },
    {
      id: '2',
      vehicleId: 'XYZ789',
      type: 'Brake Inspection',
      date: '2024-02-22',
      status: 'in-progress',
      cost: 200,
      priority: 'medium',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const maintenance = {
      id: (maintenanceRecords.length + 1).toString(),
      vehicleId: newMaintenance.vehicleId,
      type: newMaintenance.type,
      date: newMaintenance.date,
      status: 'scheduled',
      cost: parseInt(newMaintenance.cost),
      priority: newMaintenance.priority,
    };
    setMaintenanceRecords([...maintenanceRecords, maintenance]);
    setShowAddForm(false);
    setNewMaintenance({
      vehicleId: '',
      type: '',
      date: '',
      cost: '',
      priority: 'medium',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Schedule Maintenance
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Schedule Maintenance</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
                <input
                  type="text"
                  value={newMaintenance.vehicleId}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, vehicleId: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maintenance Type</label>
                <input
                  type="text"
                  value={newMaintenance.type}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
                <input
                  type="date"
                  value={newMaintenance.date}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Cost ($)</label>
                <input
                  type="number"
                  value={newMaintenance.cost}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, cost: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={newMaintenance.priority}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, priority: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={newMaintenance.notes}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, notes: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
                >
                  Schedule Maintenance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {maintenanceRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{record.type}</h3>
                <p className="text-sm text-gray-500">Vehicle: {record.vehicleId}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                record.status === 'scheduled' 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {record.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Scheduled: {record.date}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Estimated Cost: ${record.cost}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                <span className={`${
                  record.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {record.priority.charAt(0).toUpperCase() + record.priority.slice(1)} Priority
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Maintenance;