// Maintenance.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import MaintenanceForm from './MaintenanceForm';
import { PenTool, Calendar, DollarSign, AlertCircle, Plus, Edit } from 'lucide-react';
import { RootState } from '../store/store';
import { MaintenanceRecord } from '../types';
import { AppDispatch, fetchMaintenance } from '../store/actions/maintenance.action';

const Maintenance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { records, loading, error } = useSelector((state: RootState) => state.maintenance);
  // const data = useSelector((state: RootState) => state.maintenance);
  // console.log(data)
  const [showForm, setShowForm] = useState(false);
  const [editRecord, setEditRecord] = useState<MaintenanceRecord | undefined>(undefined);
  const API_KEY: string = import.meta.env.GEMINI_API_KEY 
  useEffect(() => {
    dispatch(fetchMaintenance());

    
  }, [dispatch]);

  const handleEdit = (record: MaintenanceRecord) => {
    setEditRecord(record);
    setShowForm(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-200';
      case 'medium':
        return 'bg-yellow-100 border-yellow-200';
      case 'low':
        return 'bg-green-100 border-green-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
        <button 
          onClick={() => {
            setEditRecord(undefined);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Schedule Maintenance
        </button>
      </div>

      {showForm && (
        <MaintenanceForm
          onClose={() => {
            setShowForm(false);
            setEditRecord(undefined);
          }}
          editRecord={editRecord}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {records?.map((record: MaintenanceRecord) => (
          <div 
            key={record.id} 
            className={`rounded-lg shadow-sm border p-6 ${getPriorityColor(record.priority)}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{record.type}</h3>
                <p className="text-sm text-gray-500">Vehicle: {record.vehicleId}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  record.status === 'scheduled' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {record.status}
                </span>
                <button
                  onClick={() => handleEdit(record)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
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
                  record.priority === 'high' ? 'text-red-600' : 
                  record.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {record.priority.charAt(0).toUpperCase() + record.priority.slice(1)} Priority
                </span>
              </div>
              
              {record.notes && (
                <div className="text-sm text-gray-600 mt-2">
                  <p className="font-medium">Notes:</p>
                  <p>{record.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;