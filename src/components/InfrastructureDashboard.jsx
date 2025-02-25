import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const InfrastructureDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data from the CSV
  const totalAssetValue = 2728055460; // € 2.73 billion
  const annualInvestment = 43564533; // € 43.6 million
  const annualOperationalBudget = 41998265; // € 42 million
  
  const decadeInvestments = [
    { name: '2021-2030', value: 53535594 },
    { name: '2031-2040', value: 60182967 },
    { name: '2041-2050', value: 39132951 },
    { name: '2051-2060', value: 25838203 },
    { name: '2061-2070', value: 39132951 }
  ];
  
  const assetTypes = [
    { name: 'Asphalt Roads', value: 426206967 },
    { name: 'Concrete Block Pavement', value: 441335605 },
    { name: 'Brick Pavement', value: 110490782 },
    { name: 'Footpaths', value: 628126627 },
    { name: 'Other', value: 466602478 }
  ];
  
  const costBreakdown = [
    { name: 'Asset Replacement', value: 2114771675 },
    { name: 'Project Management', value: 63443150 },
    { name: 'Environment Management', value: 105738584 },
    { name: 'Preparation', value: 211477167 },
    { name: 'Execution', value: 126886300 },
    { name: 'Risk Reserve', value: 105738584 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Road Infrastructure Investment Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Asset Value</h2>
            <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalAssetValue)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700">Annual Investment</h2>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(annualInvestment)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700">Annual Operational Budget</h2>
            <p className="text-3xl font-bold text-orange-600">{formatCurrency(annualOperationalBudget)}</p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex mb-6 border-b">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'investments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('investments')}
          >
            Decade Investments
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'assets' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('assets')}
          >
            Asset Types
          </button>
        </div>
        
        {/* Charts */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Cost Breakdown</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Asset Type Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assetTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'investments' && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Projected Investments by Decade</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={decadeInvestments}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `€${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Investment" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {activeTab === 'assets' && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Asset Value Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={assetTypes}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `€${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" name="Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfrastructureDashboard;
