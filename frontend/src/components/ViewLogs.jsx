import React, { useState } from "react";
import Header from './Header';
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const ViewLogs = () => {
  const [tagId, setTagId] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    if (!tagId.trim()) {
      setError("Please enter a tag ID");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`https://blockchain-drug-counterfit.vercel.app/api/blockchain/logs/${tagId}`);
      const data = await res.json();

      if (!res.ok) {
        setLogs([]);
        setError(data.message || "Error fetching logs");
      } else {
        setLogs(data.logs);
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Date', 'Time', 'Medicine', 'Batch Number', 'Status', 'User']],
      body: logs
        .filter(log => log.tx.name && log.tx.batch)
        .map(log => [
          new Date(log.timestamp).toLocaleDateString(),
          new Date(log.timestamp).toLocaleTimeString(),
          log.tx.name,
          log.tx.batch,
          'Verified',
          log.tx.type === 'REGISTER' ? 'Manufacturer' : 'Pharmacist'
      ]),
    });
    doc.save('verification-logs.pdf');
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
      status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4F1] to-[#D4E9E2]">
      <Header />
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Verification Logs</h2>
          <p className="text-gray-600 mt-2">Track and monitor all medicine verification activities</p>
        </div>

        <div className="mt-12 bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h3 className="text-xl font-semibold mb-4 md:mb-0">Recent Verification Activities</h3>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button onClick={exportToPDF} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
          <div className="relative flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow w-full">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs by medicine name, user, or batch number..."
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
              />
            </div>
            <button
              onClick={fetchLogs}
              className="w-full md:w-auto bg-[#27A292] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#208375] transition-colors"
            >
              Search
            </button>
          </div>

          {/* Loading */}
          {loading && <LoadingSpinner />}

          {/* Error */}
          {error && <p className="text-center text-red-600 py-4">{error}</p>}

          {/* Logs Table */}
          {logs.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initialized By</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs
                    .filter(log => log.tx.name && log.tx.batch)
                    .map((log) => (
                    <tr key={log.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(log.timestamp).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.tx.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.tx.batch}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status="Verified" /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.tx.type === 'REGISTER' ? 'Manufacturer' : 'Pharmacist'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLogs;
