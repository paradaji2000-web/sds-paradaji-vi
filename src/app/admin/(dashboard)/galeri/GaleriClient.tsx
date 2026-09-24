"use client";

import { useState } from "react";
import { Image as ImageIcon, Plus, Edit, Trash2, X, Save } from "lucide-react";
import { galleryImages, GalleryImage } from "@/data/dummy";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GaleriClient() {
  const [items, setItems] = useState<GalleryImage[]>(galleryImages);
  const [editItem, setEditItem] = useState<GalleryImage | null>(null);
  const [deleteItem, setDeleteItem] = useState<GalleryImage | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<GalleryImage>>({});

  const CATEGORIES: GalleryImage["category"][] = ["Kegiatan", "Fasilitas", "Prestasi", "Keagamaan"];

  const handleEditOpen = (foto: GalleryImage) => { setEditItem(foto); setForm({ ...foto }); };

  const handleEditSave = () => {
    if (!editItem) return;
    setItems((prev) => prev.map((f) => f.id === editItem.id ? { ...f, ...form } as GalleryImage : f));
    setEditItem(null); setForm({});
  };

  const handleAddOpen = () => {
    setForm({ title: "", category: "Kegiatan", imageUrl: "", date: new Date().toISOString().split("T")[0] });
    setIsAddOpen(true);
  };

  const handleAddSave = () => {
    const newItem: GalleryImage = {
      id: `gal-${Date.now()}`,
      title: form.title || "",
      category: (form.category as GalleryImage["category"]) || "Kegiatan",
      imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600",
      date: form.date || new Date().toISOString().split("T")[0],
    };
    setItems((prev) => [newItem, ...prev]);
    setIsAddOpen(false); setForm({});
  };

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    setItems((prev) => prev.filter((f) => f.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const closeModal = () => { setEditItem(null); setIsAddOpen(false); setForm({}); };

  const categoryColor: Record<string, string> = {
    Kegiatan: "bg-sky-50 text-sky-700 border-sky-200",
    Fasilitas: "bg-purple-50 text-purple-700 border-purple-200",
    Prestasi: "bg-amber-50 text-amber-700 border-amber-200",
    Keagamaan: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary"><ImageIcon className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-foreground">Galeri Sekolah</h1>
            <p className="text-sm text-muted-foreground mt-1">Kelola foto dan dokumentasi kegiatan sekolah. ({items.length} foto)</p>
          </div>
        </div>
        <Button className="rounded-full shadow-sm" onClick={handleAddOpen}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Foto
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((foto) => (
          <div key={foto.id} className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="relative aspect-square w-full bg-muted">
              <Image src={foto.imageUrl} alt={foto.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border w-fit mb-2 ${categoryColor[foto.category]}`}>{foto.category}</span>
                <p className="text-white text-[10px] font-medium line-clamp-2 mb-2">{foto.title}</p>
                <div className="flex items-center gap-1.5">
                  <Button variant="secondary" size="sm" className="h-6 flex-1 text-[9px] bg-white/90 hover:bg-white text-slate-800 px-1" onClick={() => handleEditOpen(foto)}>
                    <Edit className="h-2.5 w-2.5 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="icon" className="h-6 w-6 shrink-0" onClick={() => setDeleteItem(foto)}>
                    <Trash2 className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit / Tambah */}
      {(editItem || isAddOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/40">
              <h2 className="font-heading font-bold text-foreground text-lg">{editItem ? "Edit Foto" : "Tambah Foto"}</h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Keterangan Foto <span className="text-rose-500">*</span></label>
                <input type="text" value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="contoh: Upacara Hari Kemerdekaan 2025" className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Kategori</label>
                  <select value={form.category ?? "Kegiatan"} onChange={(e) => setForm({ ...form, category: e.target.value as GalleryImage["category"] })} className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Tanggal</label>
                  <input type="date" value={form.date ?? ""} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">URL Foto</label>
                <input type="url" value={form.imageUrl ?? ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
              {(form.imageUrl || editItem?.imageUrl) && (
                <div className="relative h-32 w-full rounded-xl overflow-hidden border border-border bg-muted">
                  <Image src={form.imageUrl || editItem?.imageUrl || ""} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={closeModal}>Batal</Button>
              <Button size="sm" className="rounded-xl" onClick={editItem ? handleEditSave : handleAddSave} disabled={!form.title}>
                <Save className="h-3.5 w-3.5 mr-1.5" />{editItem ? "Simpan" : "Tambah Foto"}
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
              <h3 className="font-bold text-foreground text-base mb-2">Hapus Foto?</h3>
              <p className="text-sm text-muted-foreground">
                Anda akan menghapus foto <span className="font-semibold text-foreground">&ldquo;{deleteItem.title}&rdquo;</span>. Tidak dapat dibatalkan.
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
