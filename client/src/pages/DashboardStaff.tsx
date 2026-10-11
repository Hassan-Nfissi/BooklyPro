import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { StaffItem, ServiceItem } from '../types';
import { Plus, Phone, Mail, Edit2 } from 'lucide-react';

export const DashboardStaff: React.FC = () => {
  const [staff, setStaff] = useState<StaffItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffItem | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [assignedServiceIds, setAssignedServiceIds] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const [stfRes, srvRes] = await Promise.all([
        api.get('/owner/staff'),
        api.get('/owner/services')
      ]);
      setStaff(stfRes.data);
      setServices(srvRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditingStaff(null);
    setDisplayName('');
    setEmail('');
    setPhone('');
    setAssignedServiceIds(services.map(s => s.id));
    setShowModal(true);
  };

  const openEdit = (s: StaffItem) => {
    setEditingStaff(s);
    setDisplayName(s.displayName);
    setEmail(s.email || '');
    setPhone(s.phone || '');
    setAssignedServiceIds(s.assignedServiceIds || []);
    setShowModal(true);
  };

  const toggleService = (srvId: string) => {
    setAssignedServiceIds((prev) =>
      prev.includes(srvId) ? prev.filter(id => id !== srvId) : [...prev, srvId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        displayName,
        email,
        phone,
        assignedServiceIds,
      };

      if (editingStaff) {
        await api.put(`/owner/staff/${editingStaff.id}`, payload);
      } else {
        await api.post('/owner/staff', payload);
      }

      setShowModal(false);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de l’enregistrement');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Équipe & Collaborateurs</h1>
          <p className="text-sm text-slate-500 mt-1">Gérez vos coiffeurs, esthéticiennes et attribuez les prestations</p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-700 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un collaborateur</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Chargement de l'équipe...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-sm">
                      {s.displayName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{s.displayName}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {s.active ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openEdit(s)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 my-3">
                  {s.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{s.phone}</span>
                    </div>
                  )}
                  {s.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{s.email}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Services assignés :</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {s.assignedServiceIds.map((srvId) => {
                      const serviceObj = services.find(srv => srv.id === srvId);
                      return (
                        <span key={srvId} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {serviceObj ? serviceObj.name : 'Service'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-slate-900 text-lg mb-4">
              {editingStaff ? 'Modifier le collaborateur' : 'Ajouter un collaborateur'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="ex. Karim Tazi"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="karim@..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Prestations assignées</label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-100 p-2 rounded-xl">
                  {services.map((srv) => (
                    <label key={srv.id} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={assignedServiceIds.includes(srv.id)}
                        onChange={() => toggleService(srv.id)}
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                      <span>{srv.name} ({srv.priceMad} MAD)</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-500 font-bold text-sm hover:text-slate-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 text-white font-bold text-sm rounded-xl hover:bg-teal-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
