import { useEffect, useState } from "react";

interface Farmer {
  farmerID: number;
  name: string;
  location: string;
  crops: string;
  phone: string;
  email: string;
}

const Farmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);

  // For adding new farmer
  const [newFarmer, setNewFarmer] = useState<Omit<Farmer, "farmerID">>({
    name: "",
    location: "",
    crops: "",
    phone: "",
    email: "",
  });

  // For editing
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/farmers");
      const data = await res.json();
      setFarmers(data);
    } catch (err) {
      console.error("Error fetching farmers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add farmer
  const addFarmer = async () => {
    try {
      await fetch("http://localhost:8080/api/farmers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFarmer),
      });
      setNewFarmer({ name: "", location: "", crops: "", phone: "", email: "" });
      fetchFarmers();
    } catch (err) {
      console.error("Error adding farmer:", err);
    }
  };

  // Delete farmer
  const deleteFarmer = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/farmers/${id}`, {
        method: "DELETE",
      });
      fetchFarmers(); // refresh after delete
    } catch (err) {
      console.error("Error deleting farmer:", err);
    }
  };

  // Save update
  const saveUpdate = async () => {
    if (!editingFarmer) return;
    try {
      await fetch(`http://localhost:8080/api/farmers/${editingFarmer.farmerID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingFarmer),
      });
      setEditingFarmer(null);
      fetchFarmers(); // refresh after update
    } catch (err) {
      console.error("Error updating farmer:", err);
    }
  };

  if (loading) return <p>Loading farmers...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Farmers</h1>

      {/* Add Farmer Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Farmer</h2>
        {["name", "location", "crops", "phone", "email"].map((field) => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(newFarmer as any)[field]}
            onChange={(e) =>
              setNewFarmer({ ...newFarmer, [field]: e.target.value })
            }
            className="border p-2 mr-2 mb-2"
          />
        ))}
        <button
          onClick={addFarmer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Farmer
        </button>
      </div>

      {/* Farmers Table */}
      <table className="w-full border border-gray-300 rounded-lg mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th> {/* Sequential index */}
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Crops</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((f, index) => (
            <tr key={f.farmerID} className="hover:bg-gray-50">
              {/* Sequential display index */}
              <td className="p-2 border">{index + 1}</td>

              {/* Editable fields */}
              <td className="p-2 border">
                {editingFarmer?.farmerID === f.farmerID ? (
                  <input
                    value={editingFarmer.name}
                    onChange={(e) =>
                      setEditingFarmer({ ...editingFarmer, name: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  f.name
                )}
              </td>
              <td className="p-2 border">
                {editingFarmer?.farmerID === f.farmerID ? (
                  <input
                    value={editingFarmer.location}
                    onChange={(e) =>
                      setEditingFarmer({ ...editingFarmer, location: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  f.location
                )}
              </td>
              <td className="p-2 border">
                {editingFarmer?.farmerID === f.farmerID ? (
                  <input
                    value={editingFarmer.crops}
                    onChange={(e) =>
                      setEditingFarmer({ ...editingFarmer, crops: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  f.crops
                )}
              </td>
              <td className="p-2 border">
                {editingFarmer?.farmerID === f.farmerID ? (
                  <input
                    value={editingFarmer.phone}
                    onChange={(e) =>
                      setEditingFarmer({ ...editingFarmer, phone: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  f.phone
                )}
              </td>
              <td className="p-2 border">
                {editingFarmer?.farmerID === f.farmerID ? (
                  <input
                    value={editingFarmer.email}
                    onChange={(e) =>
                      setEditingFarmer({ ...editingFarmer, email: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  f.email
                )}
              </td>

              {/* Action buttons */}
              <td className="p-2 border">
                {editingFarmer?.farmerID === f.farmerID ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={saveUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={() => setEditingFarmer(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => setEditingFarmer(f)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteFarmer(f.farmerID)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Farmers;
