"use client";

import { useState } from "react";
import { MessageSquare, BellRing, Settings, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notif {
  id: string;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  badge: "success" | "warning" | "info";
}

const initialNotifs: Notif[] = [
  { id: "n1", title: "Pendaftaran Baru (PPDB)", body: "Siswa bernama Budi Santoso baru saja mengirimkan formulir PPDB.", time: "Baru saja", isRead: false, badge: "success" },
  { id: "n2", title: "Berkas Terverifikasi", body: "Admin telah memverifikasi berkas atas nama Siti Aminah.", time: "2 jam lalu", isRead: false, badge: "success" },
  { id: "n3", title: "Pendaftaran Baru (PPDB)", body: "Siswa bernama Rayyan Pratama mengirimkan formulir PPDB.", time: "5 jam lalu", isRead: true, badge: "info" },
  { id: "n4", title: "Berkas Belum Lengkap", body: "Pendaftar Fathan Bilal belum mengunggah pas foto ukuran 3x4.", time: "1 hari lalu", isRead: true, badge: "warning" },
];

const badgeClass = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
};

const badgeLabel = { success: "WhatsApp Terkirim", warning: "Perlu Tindakan", info: "Info" };

export default function NotifikasiClient() {
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs);
  const [waNumber, setWaNumber] = useState("81234567890");
  const [saved, setSaved] = useState(false);

  const handleMarkAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const handleDelete = (id: string) => setNotifs((prev) => prev.filter((n) => n.id !== id));
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary"><MessageSquare className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-foreground">Notifikasi &amp; Pesan</h1>
            <p className="text-sm text-muted-foreground mt-1">Pusat pemberitahuan dan template pesan WhatsApp.</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={handleMarkAllRead}>
            <CheckCheck className="h-4 w-4" /> Tandai semua sudah dibaca
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Riwayat Notifikasi */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
              <BellRing className="h-5 w-5 text-primary" /> Riwayat Notifikasi
            </h2>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">{unreadCount} belum dibaca</Badge>
            )}
          </div>
          <div className="divide-y divide-border">
            {notifs.length === 0 && (
              <div className="p-8 text-center text-muted-foreground text-sm">Tidak ada notifikasi.</div>
            )}
            {notifs.map((n) => (
              <div key={n.id} className={`p-5 flex gap-4 transition-colors ${n.isRead ? "hover:bg-muted/20" : "bg-primary/5 hover:bg-primary/10"}`}>
                <div className="mt-1.5 shrink-0">
                  <span className={`flex h-2 w-2 rounded-full ${n.isRead ? "bg-slate-300" : "bg-primary"}`} />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold ${n.isRead ? "text-muted-foreground" : "text-foreground"}`}>{n.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{n.body}</p>
                  <div className="pt-2 flex items-center gap-2">
                    <Badge variant="outline" className={`text-[10px] ${badgeClass[n.badge]}`}>{badgeLabel[n.badge]}</Badge>
                    <button onClick={() => handleDelete(n.id)} className="ml-auto text-[11px] text-muted-foreground hover:text-rose-600 flex items-center gap-1 transition-colors">
                      <Trash2 className="h-3 w-3" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pengaturan Pesan WA */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4 h-fit">
          <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" /> Pengaturan Pesan
          </h3>
          <p className="text-sm text-muted-foreground">Atur nomor WhatsApp tujuan dan template pesan otomatis.</p>

          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-2">No. WhatsApp Admin / Sekolah</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-input bg-muted text-muted-foreground text-sm">+62</span>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value.replace(/\D/g, ""))}
                  className="flex h-10 w-full rounded-none rounded-r-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground"
                  placeholder="81234567890"
                />
              </div>
            </div>
            <Button className="w-full" onClick={handleSave}>
              {saved ? <><CheckCheck className="mr-2 h-4 w-4" /> Tersimpan!</> : "Simpan Pengaturan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
