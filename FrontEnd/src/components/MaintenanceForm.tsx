import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { X } from 'lucide-react';
import { addMaintenance, AppDispatch, updateMaintenance } from '../store/actions/maintenance.action';
import { MaintenanceFormData, MaintenanceRecord } from '../types';


interface MaintenanceFormProps {
  onClose: () => void;
  editRecord?: MaintenanceRecord;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onClose, editRecord }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<MaintenanceFormData>({
    vehicleId: '',
    type: '',
    date: '',
    cost: '',
    status:'',
    priority: 'medium',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<MaintenanceFormData>>({});

  useEffect(() => {
    if (editRecord) {
      setFormData({
        vehicleId: editRecord.vehicleId,
        type: editRecord.type,
        date: editRecord.date,
        cost: editRecord.cost.toString(),
        status: editRecord.status,
        priority: editRecord.priority,
        notes: editRecord.notes || ''
      });
    }
  }, [editRecord]);

  const validateForm = (): boolean => {
    const newErrors: Partial<MaintenanceFormData> = {};
    
    if (!formData.vehicleId.trim()) {
      newErrors.vehicleId = 'Vehicle ID is required';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Maintenance type is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.cost || isNaN(parseFloat(formData.cost))) {
      newErrors.cost = 'Valid cost is required';
    }
    if(!formData.status.trim()){
        newErrors.status = 'Status is required'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editRecord) {
      dispatch(updateMaintenance(editRecord.id, formData));
    } else {
      dispatch(addMaintenance(formData));
    }
    onClose();
  };

  const handleChange = (field: keyof MaintenanceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editRecord ? 'Edit Maintenance' : 'Schedule Maintenance'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vehicle ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
            <input
              type="text"
              value={formData.vehicleId}
              onChange={(e) => handleChange('vehicleId', e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                errors.vehicleId ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.vehicleId && (
              <p className="mt-1 text-sm text-red-500">{errors.vehicleId}</p>
            )}
          </div>

          {/* Maintenance Type Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Maintenance Type</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.type && (
              <p className="mt-1 text-sm text-red-500">{errors.type}</p>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          {/* Cost Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Cost ($)</label>
            <input
              type="number"
              value={formData.cost}
              onChange={(e) => handleChange('cost', e.target.value)}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md border ${
                errors.cost ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.cost && (
              <p className="mt-1 text-sm text-red-500">{errors.cost}</p>
            )}
          </div>

        {/* Status Field */}
                   <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value as MaintenanceFormData['status'])}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >  
              <option value="">-</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">{errors.status}</p>
            )}
          </div>




          {/* Priority Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value as MaintenanceFormData['priority'])}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Notes Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
            >
              {editRecord ? 'Update Maintenance' : 'Schedule Maintenance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;