import React from 'react';
import { BarChart, PieChart, TrendingUp, Download } from 'lucide-react';

function Reports() {
  const reports = [
    {
      id: '1',
      title: 'Fleet Performance',
      description: 'Overview of vehicle efficiency and utilization',
      type: 'performance',
      lastUpdated: '2024-02-19',
    },
    {
      id: '2',
      title: 'Maintenance Costs',
      description: 'Summary of maintenance expenses by vehicle',
      type: 'maintenance',
      lastUpdated: '2024-02-18',
    },
    {
      id: '3',
      title: 'Driver Analytics',
      description: 'Driver performance and safety metrics',
      type: 'drivers',
      lastUpdated: '2024-02-17',
    },
  ];

  const monthlyData = [
    { month: 'Jan', value: 65, expenses: 12000 },
    { month: 'Feb', value: 45, expenses: 10500 },
    { month: 'Mar', value: 75, expenses: 15000 },
    { month: 'Apr', value: 55, expenses: 11000 },
    { month: 'May', value: 60, expenses: 13000 },
    { month: 'Jun', value: 80, expenses: 16000 },
    { month: 'Jul', value: 70, expenses: 14000 },
    { month: 'Aug', value: 55, expenses: 11500 },
    { month: 'Sep', value: 65, expenses: 13500 },
    { month: 'Oct', value: 75, expenses: 15500 },
    { month: 'Nov', value: 85, expenses: 17000 },
    { month: 'Dec', value: 70, expenses: 14500 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                {report.type === 'performance' && <BarChart className="h-6 w-6 text-blue-600" />}
                {report.type === 'maintenance' && <PieChart className="h-6 w-6 text-blue-600" />}
                {report.type === 'drivers' && <TrendingUp className="h-6 w-6 text-blue-600" />}
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <Download className="h-5 w-5" />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{report.description}</p>
            
            <div className="text-xs text-gray-400">
              Last updated: {report.lastUpdated}
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Performance Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance Overview</h2>
        <div className="relative h-80">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-6 w-12 flex flex-col justify-between text-xs text-gray-500">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          
          {/* Graph */}
          <div className="ml-12 h-full flex items-end space-x-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full">
                  {/* Bar */}
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${data.value}%` }}
                  >
                    {/* Tooltip */}
                    <div className="opacity-0 hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {data.value}% utilization
                      <br />
                      ${data.expenses.toLocaleString()} expenses
                    </div>
                  </div>
                </div>
                <span className="mt-2 text-xs text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-gray-600">Fleet Utilization</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;