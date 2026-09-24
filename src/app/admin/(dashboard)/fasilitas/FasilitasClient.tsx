"use client";

import { useState } from "react";
import { School, Plus, Edit, Trash2, X, Save } from "lucide-react";
import { facilitiesList, FacilityItem } from "@/data/dummy";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function FasilitasClient() {
  const [items, setItems] = useState<FacilityItem[]>(facilitiesList);
  const [editItem, setEditItem] = useState<FacilityItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<FacilityItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<FacilityItem>>({});

  const CATEGORIES: FacilityItem["category"][] = ["Ruang Belajar", "Olahraga & Ibadah", "Penunjang"];

  const handleEditOpen = (f: FacilityItem) => { setEditItem(f); setForm({ ...f }); };

  const handleEditSave = () => {
    if (!editItem) return;
    setItems((prev) => prev.map((f) => f.id === editItem.id ? { ...f, ...form } as FacilityItem : f));
    setEditItem(null); setForm({});
  };

  const handleAddOpen = () => {
    setForm({ name: "", category: "Ruang Belajar", description: "", imageUrl: "", features: [] });
    setIsAddOpen(true);
  };

  const handleAddSave = () => {
    const newItem: FacilityItem = {
      id: `fac-${Date.now()}`,
      name: form.name || "",
      category: (form.category as FacilityItem["category"]) || "Ruang Belajar",
      description: form.description || "",
      imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
      features: form.features || [],
    };
    setItems((prev) => [...prev, newItem]);
    setIsAddOpen(false); setForm({});
  };

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    setItems((prev) => prev.filter((f) => f.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const closeModal = () => { setEditItem(null); setIsAddOpen(false); setForm({}); };

  const categoryColor: Record<string, string> = {
    "Ruang Belajar": "bg-sky-50 text-sky-700 border-sky-200",
    "Olahraga & Ibadah": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Penunjang": "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary"><School className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-foreground">Fasilitas Sekolah</h1>
            <p className="text-sm text-muted-foreground mt-1">Manajemen sarana dan prasarana sekolah. ({items.length} fasilitas)</p>
          </div>
        </div>
        <Button className="rounded-full shadow-sm" onClick={handleAddOpen}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Fasilitas
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((fasilitas) => (
          <div key={fasilitas.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-40 w-full bg-muted">
              <Image src={fasilitas.imageUrl} alt={fasilitas.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className={`text-[10px] ${categoryColor[fasilitas.category]}`}>{fasilitas.category}</Badge>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-foreground text-sm line-clamp-1">{fasilitas.name}</h3>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2 flex-1">{fasilitas.description}</p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs text-sky-600 border-sky-200 hover:bg-sky-50" onClick={() => handleEditOpen(fasilitas)}>
                  <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs text-rose-600 border-rose-200 hover:bg-rose-50" onClick={() => setDeleteItem(fasilitas)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Hapus
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
              <h2 className="font-heading font-bold text-foreground text-lg">{editItem ? "Edit Fasilitas" : "Tambah Fasilitas"}</h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Nama Fasilitas <span className="text-rose-500">*</span></label>
                <input type="text" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="contoh: Laboratorium IPA" className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Kategori</label>
                <select value={form.category ?? "Ruang Belajar"} onChange={(e) => setForm({ ...form, category: e.target.value as FacilityItem["category"] })} className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Deskripsi <span className="text-rose-500">*</span></label>
                <textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Deskripsi lengkap fasilitas..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">URL Foto Fasilitas</label>
                <input type="url" value={form.imageUrl ?? ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={closeModal}>Batal</Button>
              <Button size="sm" className="rounded-xl" onClick={editItem ? handleEditSave : handleAddSave} disabled={!form.name || !form.description}>
                <Save className="h-3.5 w-3.5 mr-1.5" />{editItem ? "Simpan Perubahan" : "Tambah Fasilitas"}
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
              <h3 className="font-bold text-foreground text-base mb-2">Hapus Fasilitas?</h3>
              <p className="text-sm text-muted-foreground">
                Anda akan menghapus <span className="font-semibold text-foreground">&ldquo;{deleteItem.name}&rdquo;</span>. Tindakan ini tidak dapat dibatalkan.
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
