import React, { useEffect, useState } from 'react';
import { User, Star, MapPin, Phone, Plus, X, Edit } from 'lucide-react';
import { Driver, Trip } from '../types';
import { useDispatch } from 'react-redux';
import { addDrivers, AppDispatch, fetchDrivers, updateDriver } from '../store/actions/driver.actions';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { shallowEqual } from 'react-redux';

function Drivers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDriver, setNewDriver] = useState<Driver>({
    id: '',
    name: '',
    phone: '',
    email: '',
    license: '',
    location: '',
    performanceScore: 0.0,
    trips: [],
    status: 'off-duty',
  });
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [editForm, setEditForm] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.drivers.records)


  // console.log('Driver State:',data)

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]); // ✅ Only trigger effect on first render or when dispatch changes
  
  useEffect(() => {
    if (data.length > 0) {
      setDrivers(data);
    }
  }, [data]);
  
  const handleSubmit = (e: React.FormEvent) => { debugger;
    e.preventDefault();
    // console.log(editForm)
    if (!editForm) {
      const driver: Driver = {
        ...newDriver,
        id: (drivers.length + 1).toString(),
        status: "off-duty",
        location: '-',
        performanceScore: 0.0,
        trips: [],
      };
      dispatch(addDrivers(driver));
    } else {
      const driver: Driver = {
        ...newDriver,
        trips: [],
      }
      dispatch(updateDriver(driver.id, driver))
    }


    setShowAddForm(false);
    setNewDriver({
      id: '',
      name: '',
      phone: '',
      email: '',
      license: '',
      status: 'off-duty' ,
      location: '',
      performanceScore: 0.0,
      trips:[]
    });
  };

  const handelEdit = (e: React.FormEvent, driver: Driver) => {
    debugger
    setEditForm(true)
    setNewDriver(driver)
    setShowAddForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
        <button
          onClick={() => { setShowAddForm(true); setEditForm(false) }}
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
              <button onClick={() => { setShowAddForm(false); setNewDriver({ id: '', name: '', phone: '', email: '', license: '', status: "off-duty " as 'off-duty', location: '-', performanceScore: 0.0,trips:[] }); }} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {editForm ?
                <div>

                  <label className="block text-sm font-medium text-gray-700">Driver ID</label>
                  <input
                    type="text"
                    value={newDriver.id}
                    onChange={(e) => setNewDriver({ ...newDriver, id: e.target.value })}
                    disabled={true}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                : <></>}

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
              {editForm ? <>
                {/* <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <input
                  type="text"
                  value={newDriver.status}
                  onChange={(e) => setNewDriver({ ...newDriver, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Performance Score</label>
                  <input
                    type="text"
                    value={newDriver.performanceScore}
                    onChange={(e) => setNewDriver({ ...newDriver, performanceScore: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Driver's location</label>
                  <input
                    type="text"
                    value={newDriver.location}
                    onChange={(e) => setNewDriver({ ...newDriver, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </>
                : <></>}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
                >
                  {editForm?'Edit Details' :'Add Driver'}
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
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${driver.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                    }`}>
                    {driver.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-600">{driver.performanceScore}</span>
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
              <div className='flex justify-between'>
                <div className="text-sm text-gray-600">
                  Total trips: {driver?.trips?.length > 0 ? driver?.trips?.length : '0'}
                </div>
                <button className="text-gray-500 hover:text-gray-700" onClick={(e) => handelEdit(e, driver)}>
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drivers;