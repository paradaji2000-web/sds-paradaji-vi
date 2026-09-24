"use client";

import { useState } from "react";
import { Settings, Save, Shield, Database, LayoutTemplate, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Tab = "info" | "keamanan" | "backup";

export default function PengaturanClient() {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [saved, setSaved] = useState(false);

  // Info sekolah state
  const [schoolName, setSchoolName] = useState("SDS PARADAJI VI");
  const [tagline, setTagline] = useState("Membentuk Generasi Cerdas, Berakhlak Mulia, dan Siap Menyongsong Masa Depan.");
  const [email, setEmail] = useState("info@sdsparadaji6.sch.id");
  const [phone, setPhone] = useState("+62 812 3456 7890");
  const [address, setAddress] = useState("Jl. Paradjai No. 6, Cilandak, Jakarta Selatan, DKI Jakarta 12430");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { id: "info" as Tab, label: "Informasi Sekolah", icon: LayoutTemplate },
    { id: "keamanan" as Tab, label: "Keamanan & Akun", icon: Shield },
    { id: "backup" as Tab, label: "Backup Data", icon: Database },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary"><Settings className="h-6 w-6" /></div>
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-foreground">Pengaturan Website</h1>
          <p className="text-sm text-muted-foreground mt-1">Konfigurasi umum, tampilan, dan integrasi sistem.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
          {/* Sidebar */}
          <div className="border-r border-border bg-muted/20 p-4 space-y-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>

          {/* Konten */}
          <div className="md:col-span-3 p-6 space-y-6">
            {/* Tab: Info Sekolah */}
            {activeTab === "info" && (
              <>
                <div className="space-y-1">
                  <h2 className="text-lg font-heading font-bold text-foreground">Informasi Sekolah</h2>
                  <p className="text-sm text-muted-foreground">Perbarui nama, tagline, dan kontak resmi sekolah yang tampil di website publik.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Nama Sekolah</label>
                    <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Slogan / Tagline</label>
                    <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Email Sekolah</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">No. Telepon / WA</label>
                      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Alamat Lengkap</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3}
                      className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Button onClick={handleSave}>
                      {saved
                        ? <><CheckCheck className="mr-2 h-4 w-4" /> Tersimpan!</>
                        : <><Save className="mr-2 h-4 w-4" /> Simpan Perubahan</>
                      }
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Tab: Keamanan */}
            {activeTab === "keamanan" && (
              <>
                <div className="space-y-1">
                  <h2 className="text-lg font-heading font-bold text-foreground">Keamanan &amp; Akun</h2>
                  <p className="text-sm text-muted-foreground">Kelola kata sandi dan pengaturan akses admin.</p>
                </div>
                <div className="space-y-4">
                  {["Kata Sandi Lama", "Kata Sandi Baru", "Konfirmasi Kata Sandi Baru"].map((label) => (
                    <div key={label} className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">{label}</label>
                      <input type="password" placeholder="••••••••"
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                  ))}
                  <div className="pt-2 flex justify-end">
                    <Button onClick={handleSave} variant="outline">
                      <Shield className="mr-2 h-4 w-4" /> Ubah Kata Sandi
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Tab: Backup */}
            {activeTab === "backup" && (
              <>
                <div className="space-y-1">
                  <h2 className="text-lg font-heading font-bold text-foreground">Backup Data</h2>
                  <p className="text-sm text-muted-foreground">Unduh salinan data pendaftar PPDB dan konten website.</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Data Pendaftar PPDB (.xlsx)", desc: "Semua data formulir pendaftaran siswa baru." },
                    { label: "Konten Berita & Pengumuman (.json)", desc: "Seluruh artikel berita yang telah dipublikasikan." },
                    { label: "Data Guru & Fasilitas (.json)", desc: "Informasi lengkap tenaga pendidik dan sarana sekolah." },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0 ml-4">
                        <Database className="mr-1.5 h-3.5 w-3.5" /> Unduh
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
