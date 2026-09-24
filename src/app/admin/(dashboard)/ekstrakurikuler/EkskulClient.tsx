"use client";

import { useState } from "react";
import { Activity, Plus, Edit, Trash2, X, Save } from "lucide-react";
import { extracurricularList, ExtracurricularItem } from "@/data/dummy";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EkskulClient() {
  const [items, setItems] = useState<ExtracurricularItem[]>(extracurricularList);
  const [editItem, setEditItem] = useState<ExtracurricularItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<ExtracurricularItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<ExtracurricularItem>>({});

  const handleEditOpen = (ekskul: ExtracurricularItem) => {
    setEditItem(ekskul);
    setForm({ ...ekskul });
  };

  const handleEditSave = () => {
    if (!editItem) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === editItem.id ? { ...item, ...form } as ExtracurricularItem : item
      )
    );
    setEditItem(null);
    setForm({});
  };

  const handleAddOpen = () => {
    setForm({
      name: "",
      category: "Keagamaan",
      description: "",
      schedule: "",
      coach: "",
      imageUrl: "",
      achievements: [],
    });
    setIsAddOpen(true);
  };

  const handleAddSave = () => {
    const newItem: ExtracurricularItem = {
      id: `ekskul-${Date.now()}`,
      name: form.name || "",
      category: (form.category as ExtracurricularItem["category"]) || "Keagamaan",
      description: form.description || "",
      schedule: form.schedule || "",
      coach: form.coach || "",
      imageUrl:
        form.imageUrl ||
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      achievements: form.achievements || [],
    };
    setItems((prev) => [...prev, newItem]);
    setIsAddOpen(false);
    setForm({});
  };

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    setItems((prev) => prev.filter((item) => item.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const closeModal = () => {
    setEditItem(null);
    setIsAddOpen(false);
    setForm({});
  };

  const categoryColors: Record<string, string> = {
    Keagamaan: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Kepemimpinan: "bg-blue-50 text-blue-700 border-blue-200",
    "Akademik & Teknologi": "bg-purple-50 text-purple-700 border-purple-200",
    "Olahraga & Seni": "bg-orange-50 text-orange-700 border-orange-200",
  };

  const CATEGORIES: ExtracurricularItem["category"][] = [
    "Keagamaan",
    "Akademik & Teknologi",
    "Olahraga & Seni",
    "Kepemimpinan",
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-foreground">
              Ekstrakurikuler
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kelola daftar kegiatan ekstrakurikuler siswa. ({items.length} ekskul aktif)
            </p>
          </div>
        </div>
        <Button className="rounded-full shadow-sm" onClick={handleAddOpen}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Ekskul
        </Button>
      </div>

      {/* Grid Kartu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((ekskul) => (
          <div
            key={ekskul.id}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col"
          >
            <div className="relative h-48 w-full bg-muted">
              <Image
                src={ekskul.imageUrl}
                alt={ekskul.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    categoryColors[ekskul.category] ?? "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  {ekskul.category}
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-foreground text-sm line-clamp-1">{ekskul.name}</h3>
              <p className="text-[11px] text-primary font-medium mt-1">{ekskul.schedule}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2 flex-1">
                {ekskul.description}
              </p>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs text-sky-600 border-sky-200 hover:bg-sky-50"
                  onClick={() => handleEditOpen(ekskul)}
                >
                  <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
                  onClick={() => setDeleteItem(ekskul)}
                >
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
              <h2 className="font-heading font-bold text-foreground text-lg">
                {editItem ? "Edit Ekstrakurikuler" : "Tambah Ekstrakurikuler"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
              {/* Nama */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Nama Ekstrakurikuler <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name ?? ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="contoh: Pramuka Siaga & Penggalang"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Kategori <span className="text-rose-500">*</span>
                </label>
                <select
                  value={form.category ?? "Keagamaan"}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as ExtracurricularItem["category"] })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Deskripsi <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={form.description ?? ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Tuliskan deskripsi singkat kegiatan ekstrakurikuler..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                />
              </div>

              {/* Jadwal */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Jadwal Latihan
                </label>
                <input
                  type="text"
                  value={form.schedule ?? ""}
                  onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                  placeholder="contoh: Setiap Jumat, 14.00 - 15.30 WIB"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>

              {/* Pelatih */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Nama Pelatih / Pembina
                </label>
                <input
                  type="text"
                  value={form.coach ?? ""}
                  onChange={(e) => setForm({ ...form, coach: e.target.value })}
                  placeholder="contoh: Kak Bambang Hendarto, S.Pd."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>

              {/* URL Gambar */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  URL Foto Kegiatan
                </label>
                <input
                  type="url"
                  value={form.imageUrl ?? ""}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={closeModal}>
                Batal
              </Button>
              <Button
                size="sm"
                className="rounded-xl"
                onClick={editItem ? handleEditSave : handleAddSave}
                disabled={!form.name || !form.description}
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                {editItem ? "Simpan Perubahan" : "Tambah Ekskul"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card w-full max-w-sm rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
                <Trash2 className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">Hapus Ekstrakurikuler?</h3>
              <p className="text-sm text-muted-foreground">
                Anda akan menghapus{" "}
                <span className="font-semibold text-foreground">
                  &ldquo;{deleteItem.name}&rdquo;
                </span>
                . Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => setDeleteItem(null)}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-xl"
                onClick={handleDeleteConfirm}
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
