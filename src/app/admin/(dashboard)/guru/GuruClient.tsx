"use client";

import { useState } from "react";
import { GraduationCap, Plus, Edit, Trash2, X, Save } from "lucide-react";
import { teachersList, TeacherItem } from "@/data/dummy";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GuruClient() {
  const [items, setItems] = useState<TeacherItem[]>(teachersList);
  const [editItem, setEditItem] = useState<TeacherItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<TeacherItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<TeacherItem>>({});

  const handleEditOpen = (guru: TeacherItem) => { setEditItem(guru); setForm({ ...guru }); };

  const handleEditSave = () => {
    if (!editItem) return;
    setItems((prev) => prev.map((g) => g.id === editItem.id ? { ...g, ...form } as TeacherItem : g));
    setEditItem(null); setForm({});
  };

  const handleAddOpen = () => {
    setForm({ name: "", role: "", subject: "", education: "", bio: "", imageUrl: "", order: items.length + 1 });
    setIsAddOpen(true);
  };

  const handleAddSave = () => {
    const newItem: TeacherItem = {
      id: `teacher-${Date.now()}`,
      name: form.name || "",
      role: form.role || "",
      subject: form.subject || "",
      education: form.education || "",
      bio: form.bio || "",
      imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      order: form.order || items.length + 1,
    };
    setItems((prev) => [...prev, newItem]);
    setIsAddOpen(false); setForm({});
  };

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    setItems((prev) => prev.filter((g) => g.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const closeModal = () => { setEditItem(null); setIsAddOpen(false); setForm({}); };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-foreground">Dewan Guru</h1>
            <p className="text-sm text-muted-foreground mt-1">Manajemen data tenaga pendidik dan kependidikan. ({items.length} guru)</p>
          </div>
        </div>
        <Button className="rounded-full shadow-sm" onClick={handleAddOpen}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Guru
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((guru) => (
          <div key={guru.id} className="bg-card rounded-2xl border border-border p-4 shadow-sm flex items-start gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0 border border-border bg-muted">
              <Image src={guru.imageUrl} alt={guru.name} fill className="object-cover" sizes="64px" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-sm truncate">{guru.name}</h3>
              <p className="text-xs text-primary font-semibold truncate">{guru.role}</p>
              <p className="text-[11px] text-muted-foreground mt-1 truncate">{guru.subject}</p>
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 text-sky-600 border-sky-200 hover:bg-sky-50" onClick={() => handleEditOpen(guru)}>
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 text-rose-600 border-rose-200 hover:bg-rose-50" onClick={() => setDeleteItem(guru)}>
                  <Trash2 className="h-3 w-3 mr-1" /> Hapus
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit / Tambah */}
      {(editItem || isAddOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/40">
              <h2 className="font-heading font-bold text-foreground text-lg">{editItem ? "Edit Data Guru" : "Tambah Guru"}</h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Nama Lengkap + Gelar <span className="text-rose-500">*</span></label>
                <input type="text" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="contoh: Ust. Ahmad Fauzan, S.Pd.I" className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Jabatan / Peran <span className="text-rose-500">*</span></label>
                <input type="text" value={form.role ?? ""} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="contoh: Wali Kelas 3A" className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Mata Pelajaran / Bidang</label>
                <input type="text" value={form.subject ?? ""} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="contoh: Pendidikan Agama Islam" className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Pendidikan Terakhir</label>
                <input type="text" value={form.education ?? ""} onChange={(e) => setForm({ ...form, education: e.target.value })} placeholder="contoh: S1 PGSD - Universitas Pendidikan Indonesia" className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Bio Singkat</label>
                <textarea value={form.bio ?? ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} placeholder="Deskripsi singkat pengalaman dan keahlian guru..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">URL Foto Profil</label>
                <input type="url" value={form.imageUrl ?? ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={closeModal}>Batal</Button>
              <Button size="sm" className="rounded-xl" onClick={editItem ? handleEditSave : handleAddSave} disabled={!form.name || !form.role}>
                <Save className="h-3.5 w-3.5 mr-1.5" />{editItem ? "Simpan Perubahan" : "Tambah Guru"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card w-full max-w-sm rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
                <Trash2 className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">Hapus Data Guru?</h3>
              <p className="text-sm text-muted-foreground">
                Anda akan menghapus data <span className="font-semibold text-foreground">&ldquo;{deleteItem.name}&rdquo;</span>. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setDeleteItem(null)}>Batal</Button>
              <Button variant="destructive" className="flex-1 rounded-xl" onClick={handleDeleteConfirm}>Ya, Hapus</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
