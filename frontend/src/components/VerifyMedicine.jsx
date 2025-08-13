import { useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon, CloudArrowUpIcon, QrCodeIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Header from './Header';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from './LoadingSpinner';

const VerificationResultCard = ({ title, batch, expiry, manufacturer }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
    <div>
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="text-sm text-green-600 font-medium bg-green-100 inline-block px-2 py-1 rounded-full my-2">
        <ShieldCheckIcon className="h-4 w-4 inline-block mr-1" />
        Verified
      </div>
      <div className="text-sm text-gray-500 space-y-1">
        <p><strong>Manufacturer:</strong> {manufacturer}</p>
        <p><strong>Batch Number:</strong> {batch}</p>
        <p><strong>Expiry Date:</strong> {expiry}</p>
      </div>
    </div>
    <div className="text-right">
      <AcademicCapIcon className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
      <p className="text-xs text-gray-400 mt-2">{manufacturer.replace(/\s/g, '')}{batch}</p>
    </div>
  </div>
);

export default function VerifyMedicine() {
  const [tagId, setTagId] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Retrieve token & role from localStorage (saved at login)
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleVerify = async () => {
    setMessage("");
    setResult(null);
    setLoading(true);

    if (!token) {
      setMessage("❌ You must be logged in as a pharmacy owner to verify medicine.");
      setLoading(false);
      return;
    }

    if (role !== "pharmacy") {
      setMessage("❌ Access denied. Only pharmacy owners can verify medicine.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://blockchain-drug-counterfit.vercel.app/api/verify",
        { tag_id: tagId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );
      setResult(res.data);
      setMessage(res.data.found ? "✅ Medicine found!" : "❌ Medicine not found.");
    } catch (err) {
      setMessage("❌ Error verifying medicine.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4F1] to-[#D4E9E2]">
      <Header />
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Verify Your Medicine</h2>
          <p className="text-gray-600 mt-2">Enter the medicine name, batch number, or upload an image to verify authenticity</p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Medicine Verification</h3>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow w-full">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={tagId}
                placeholder="Enter medicine name, batch number, or serial code..."
                onChange={(e) => setTagId(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
              />
            </div>
            <button onClick={handleVerify} className="w-full md:w-auto bg-[#27A292] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#208375] transition-colors flex items-center justify-center disabled:opacity-50" disabled={loading}>
              {loading ? <LoadingSpinner /> : (
                <>
                  <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                  Verify
                </>
              )}
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
              <CloudArrowUpIcon className="h-5 w-5 mr-2" />
              Upload Image
            </button>
            <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
              <QrCodeIcon className="h-5 w-5 mr-2" />
              Scan Barcode
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Verification Results</h3>
          {loading && <LoadingSpinner />}
          {message && !loading && <p className="text-center py-4">{message}</p>}
          {result && result.found && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <VerificationResultCard 
                title={result.medicine.name}
                batch={result.medicine.batch}
                expiry={result.medicine.expiry}
                manufacturer={result.medicine.manufacturer}
              />
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
