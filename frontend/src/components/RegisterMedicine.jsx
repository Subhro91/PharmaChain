import { useState } from "react";
import axios from "axios";
import Header from './Header';

export default function RegisterMedicine() {
  const [form, setForm] = useState({
    name: "",
    batch: "",
    expiry: "",
    manufacturer: "",
  });
  const [message, setMessage] = useState("");
  const [generatedTagId, setGeneratedTagId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setGeneratedTagId("");

    try {
      // ✅ Get JWT token from storage
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ You must be logged in as a manufacturer.");
        return;
      }

      const res = await axios.post(
        "https://blockchain-drug-counterfit.vercel.app/api/medicine/register",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token to backend
          },
        }
      );

      setMessage("✅ Medicine registered successfully!");
      setGeneratedTagId(res.data.tag_id); // backend returns tag_id
      setForm({ name: "", batch: "", expiry: "", manufacturer: "" });
    } catch (err) {
      if (err.response?.status === 403) {
        setMessage("❌ Access denied: Only manufacturers can register medicines.");
      } else {
        setMessage("❌ Error registering medicine.");
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4F1] to-[#D4E9E2]">
      <Header />
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Register New Medicine</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Medicine Name (e.g., Acetaminophen 500mg)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="batch"
              placeholder="Batch Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
              value={form.batch}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="expiry"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
              value={form.expiry}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
              value={form.manufacturer}
              onChange={handleChange}
              required
            />
            <button type="submit" className="w-full bg-[#27A292] text-white py-3 rounded-lg font-semibold hover:bg-[#208375] transition-colors">
              Register Medicine
            </button>
          </form>

          {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}

          {generatedTagId && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold">Generated Tag ID:</p>
              <p className="font-mono text-lg my-2 p-2 bg-gray-200 rounded-md inline-block">{generatedTagId}</p>
              <div className="flex justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    generatedTagId
                  )}`}
                  alt="QR Code"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
