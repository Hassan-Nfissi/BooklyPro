import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { StaffItem, ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Plus, Phone, Mail, Edit2, Users, Check, X, Sparkles } from 'lucide-react';

export const DashboardStaff: React.FC = () => {
  const { t } = useLanguage();
  const toast = useToast();
  const [staff, setStaff] = useState<StaffItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffItem | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [assignedServiceIds, setAssignedServiceIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

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
      toast.error(t.toastError);
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

  const selectAllServices = () => {
    setAssignedServiceIds(services.map(s => s.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
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

      toast.success(t.toastSaved);
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.toastError);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      await api.patch(`/owner/staff/${id}/status`);
      toast.success(t.toastStatusUpdated);
      fetchData();
    } catch (err) {
      toast.error(t.toastError);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Add Staff */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.staffTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {t.staffSub}
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addStaffBtn}</span>
        </button>
      </div>

      {/* Staff Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 animate-pulse">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-400">{t.searchingSlots}</p>
        </div>
      ) : staff.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="font-black text-slate-800 text-lg">{t.noStaffFound}</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
            {t.noStaffFoundSub}
          </p>
          <button
            onClick={openCreate}
            className="mt-5 inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-xs shadow hover:bg-emerald-700 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addStaffBtn}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {staff.map((member) => {
            const initials = member.displayName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .substring(0, 2);

            return (
              <div
                key={member.id}
                className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all group ${
                  member.active
                    ? 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md'
                    : 'border-slate-200/60 bg-slate-50/50 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-base shadow-xs flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors">
                        {member.displayName}
                      </h3>
                      <div className="flex flex-col text-xs text-slate-400 gap-0.5 mt-0.5">
                        {member.phone && (
                          <span className="flex items-center gap-1 text-slate-600">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{member.phone}</span>
                          </span>
                        )}
                        {member.email && (
                          <span className="flex items-center gap-1 truncate max-w-[180px]">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{member.email}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Assigned Services Pills */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      {t.assignedServicesLabel}
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                      {member.assignedServiceIds && member.assignedServiceIds.length > 0 ? (
                        member.assignedServiceIds.map((srvId) => {
                          const srv = services.find((s) => s.id === srvId);
                          return (
                            <span
                              key={srvId}
                              className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 rounded-lg"
                            >
                              {srv?.name || srvId}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          {t.allServicesAssigned}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => toggleStatus(member.id)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      member.active
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${member.active ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    <span>{member.active ? t.activeLabel : t.inactiveLabel}</span>
                  </button>

                  <button
                    onClick={() => openEdit(member)}
                    className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all"
                    title={t.editStaffBtn}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {editingStaff ? t.editStaffModalTitle : t.newStaffModalTitle}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.staffNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Amina Benani"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.staffPhoneLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="+212 6..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.staffEmailLabel}
                  </label>
                  <input
                    type="email"
                    placeholder="amina@salon.ma"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Service Assignment Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {t.assignedServicesLabel}
                  </label>
                  <button
                    type="button"
                    onClick={selectAllServices}
                    className="text-xs text-emerald-700 font-bold hover:underline"
                  >
                    {t.allServicesAssigned}
                  </button>
                </div>

                <div className="border border-slate-200 rounded-2xl p-3 max-h-48 overflow-y-auto space-y-2 bg-slate-50/50">
                  {services.map((srv) => {
                    const checked = assignedServiceIds.includes(srv.id);
                    return (
                      <label
                        key={srv.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border text-xs font-bold transition-all ${
                          checked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                            : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleService(srv.id)}
                            className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                          />
                          <span>{srv.name}</span>
                        </div>
                        <span className="text-slate-400 font-semibold">{srv.priceMad} {t.mad}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? t.confirming : t.saveStaffBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
