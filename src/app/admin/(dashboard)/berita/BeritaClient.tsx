"use client";

import { useState } from "react";
import { Newspaper, Plus, Edit, Trash2, X, Save } from "lucide-react";
import { newsList, NewsItem } from "@/data/dummy";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function BeritaClient() {
  const [items, setItems] = useState<NewsItem[]>(newsList);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<NewsItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<NewsItem>>({});

  const CATEGORIES: NewsItem["category"][] = ["Berita", "Kegiatan", "Pengumuman"];

  const handleEditOpen = (item: NewsItem) => {
    setEditItem(item);
    setForm({ ...item });
  };

  const handleEditSave = () => {
    if (!editItem) return;
    setItems((prev) =>
      prev.map((n) => (n.id === editItem.id ? { ...n, ...form } as NewsItem : n))
    );
    setEditItem(null);
    setForm({});
  };

  const handleAddOpen = () => {
    setForm({ title: "", category: "Berita", author: "", excerpt: "", content: "", imageUrl: "", tags: [], date: new Date().toISOString().split("T")[0] });
    setIsAddOpen(true);
  };

  const handleAddSave = () => {
    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      slug: (form.title ?? "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: form.title || "",
      category: (form.category as NewsItem["category"]) || "Berita",
      author: form.author || "",
      date: form.date || new Date().toISOString().split("T")[0],
      excerpt: form.excerpt || "",
      content: form.content || "",
      imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      tags: [],
    };
    setItems((prev) => [newItem, ...prev]);
    setIsAddOpen(false);
    setForm({});
  };

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    setItems((prev) => prev.filter((n) => n.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const closeModal = () => { setEditItem(null); setIsAddOpen(false); setForm({}); };

  const categoryColor: Record<string, string> = {
    Berita: "bg-sky-50 text-sky-700 border-sky-200",
    Kegiatan: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pengumuman: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Newspaper className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-foreground">Kabar Berita</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kelola artikel berita, kegiatan, dan pengumuman sekolah. ({items.length} artikel)
            </p>
          </div>
        </div>
        <Button className="rounded-full shadow-sm" onClick={handleAddOpen}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Berita
        </Button>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/60 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="p-4 w-12 text-center">No</th>
                <th className="p-4">Judul Berita</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Tanggal / Penulis</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-center font-medium text-muted-foreground">{idx + 1}</td>
                  <td className="p-4">
                    <div className="font-bold text-foreground line-clamp-1">{item.title}</div>
                    {item.isFeatured && (
                      <Badge variant="outline" className="mt-1 bg-amber-50 text-amber-700 border-amber-200 text-[10px] px-2 py-0">
                        Unggulan
                      </Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={categoryColor[item.category]}>
                      {item.category}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground">{formatDate(item.date)}</div>
                    <div className="text-[11px] text-muted-foreground">{item.author}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-sky-600 border-sky-200 hover:bg-sky-50" onClick={() => handleEditOpen(item)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-rose-600 border-rose-200 hover:bg-rose-50" onClick={() => setDeleteItem(item)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">Belum ada data berita.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit / Tambah */}
      {(editItem || isAddOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/40">
              <h2 className="font-heading font-bold text-foreground text-lg">
                {editItem ? "Edit Berita" : "Tambah Berita"}
              </h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Judul <span className="text-rose-500">*</span></label>
                <input type="text" value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul artikel berita..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Kategori</label>
                  <select value={form.category ?? "Berita"} onChange={(e) => setForm({ ...form, category: e.target.value as NewsItem["category"] })} className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Tanggal</label>
                  <input type="date" value={form.date ?? ""} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Penulis</label>
                <input type="text" value={form.author ?? ""} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Nama penulis / admin" className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Ringkasan (Excerpt) <span className="text-rose-500">*</span></label>
                <textarea value={form.excerpt ?? ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="Ringkasan singkat artikel..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Konten Artikel</label>
                <textarea value={form.content ?? ""} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} placeholder="Tulis konten lengkap artikel di sini..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">URL Gambar Utama</label>
                <input type="url" value={form.imageUrl ?? ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={closeModal}>Batal</Button>
              <Button size="sm" className="rounded-xl" onClick={editItem ? handleEditSave : handleAddSave} disabled={!form.title || !form.excerpt}>
                <Save className="h-3.5 w-3.5 mr-1.5" />
                {editItem ? "Simpan Perubahan" : "Tambah Berita"}
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
              <h3 className="font-bold text-foreground text-base mb-2">Hapus Berita?</h3>
              <p className="text-sm text-muted-foreground">
                Anda akan menghapus <span className="font-semibold text-foreground">&ldquo;{deleteItem.title}&rdquo;</span>. Tindakan ini tidak dapat dibatalkan.
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
