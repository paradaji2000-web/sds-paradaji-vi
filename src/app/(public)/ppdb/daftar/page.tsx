"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Users,
  MapPin,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function PPDBDaftarPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const totalSteps = 5;

  // Form State
  const [formData, setFormData] = React.useState({
    // Step 1: Siswa
    fullName: "",
    nickname: "",
    nik: "",
    birthPlace: "",
    birthDate: "",
    gender: "Laki-laki",
    religion: "Islam",
    previousSchool: "",
    // Step 2: Orang Tua
    fatherName: "",
    fatherJob: "",
    motherName: "",
    motherJob: "",
    parentPhone: "",
    // Step 3: Alamat
    address: "",
    rtRw: "",
    subdistrict: "", // Kelurahan
    district: "Cilandak", // Kecamatan
    city: "Jakarta Selatan",
    postalCode: "",
    // Step 4: Berkas
    fileKK: "Kartu_Keluarga_Scan.pdf",
    fileAkta: "Akta_Kelahiran_Scan.pdf",
    fileFoto: "Pas_Foto_3x4.jpg",
    fileIjazah: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate random registration number for mock
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regNum = `PPDB-2025-${randomNum}`;

    // Store in localStorage for dummy persistence
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("sds_ppdb_registrations") || "[]");
      const newEntry = {
        id: `reg-${Date.now()}`,
        registrationNumber: regNum,
        ...formData,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("sds_ppdb_registrations", JSON.stringify([newEntry, ...existing]));
      localStorage.setItem(`sds_ppdb_${regNum}`, JSON.stringify(newEntry));
    }

    // Redirect to success page
    router.push(`/ppdb/sukses/${regNum}`);
  };

  const progressPercentage = (step / totalSteps) * 100;

  const stepTitles = [
    "Data Diri Calon Siswa",
    "Data Orang Tua / Wali",
    "Alamat Tempat Tinggal",
    "Unggah Dokumen Berkas",
    "Ringkasan & Konfirmasi",
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-8">
      {/* Header Wizard */}
      <div className="text-center space-y-2">
        <Badge variant="default">Formulir PPDB Online</Badge>
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-foreground">
          Pendaftaran Siswa Baru TA 2025/2026
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Langkah {step} dari {totalSteps}: <strong>{stepTitles[step - 1]}</strong>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progressPercentage} />
        <div className="flex justify-between text-[11px] text-muted-foreground font-medium px-1">
          <span className={step >= 1 ? "text-primary font-bold" : ""}>1. Siswa</span>
          <span className={step >= 2 ? "text-primary font-bold" : ""}>2. Orang Tua</span>
          <span className={step >= 3 ? "text-primary font-bold" : ""}>3. Alamat</span>
          <span className={step >= 4 ? "text-primary font-bold" : ""}>4. Berkas</span>
          <span className={step >= 5 ? "text-primary font-bold" : ""}>5. Konfirmasi</span>
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <Card className="p-6 sm:p-8 border-border/80 shadow-xl">
        <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {/* STEP 1: DATA SISWA */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Identitas Calon Siswa
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Nama Lengkap Anak (Sesuai Akta) *
                  </label>
                  <Input
                    required
                    name="fullName"
                    placeholder="Contoh: Muhammad Rayyan Pratama"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Nama Panggilan *
                    </label>
                    <Input
                      required
                      name="nickname"
                      placeholder="Contoh: Rayyan"
                      value={formData.nickname}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Nomor Induk Kependudukan (NIK) *
                    </label>
                    <Input
                      required
                      type="text"
                      maxLength={16}
                      name="nik"
                      placeholder="16 digit angka sesuai KK"
                      value={formData.nik}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Tempat Lahir *
                    </label>
                    <Input
                      required
                      name="birthPlace"
                      placeholder="Contoh: Jakarta"
                      value={formData.birthPlace}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Tanggal Lahir *
                    </label>
                    <Input
                      required
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Jenis Kelamin *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full h-11 rounded-xl border border-input bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Asal Sekolah TK / RA
                    </label>
                    <Input
                      name="previousSchool"
                      placeholder="Contoh: TK Islam Al-Ikhlas"
                      value={formData.previousSchool}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DATA ORANG TUA */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Identitas Orang Tua / Wali
                </h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Nama Ayah Kandung / Wali *
                    </label>
                    <Input
                      required
                      name="fatherName"
                      placeholder="Contoh: Bambang Pratama"
                      value={formData.fatherName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Pekerjaan Ayah *
                    </label>
                    <Input
                      required
                      name="fatherJob"
                      placeholder="Contoh: Karyawan Swasta"
                      value={formData.fatherJob}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Nama Ibu Kandung *
                    </label>
                    <Input
                      required
                      name="motherName"
                      placeholder="Contoh: Siti Aisyah"
                      value={formData.motherName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Pekerjaan Ibu *
                    </label>
                    <Input
                      required
                      name="motherJob"
                      placeholder="Contoh: Ibu Rumah Tangga / PNS"
                      value={formData.motherJob}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Nomor WhatsApp Aktif Wali Murid *
                  </label>
                  <Input
                    required
                    type="tel"
                    name="parentPhone"
                    placeholder="Contoh: 081298765432"
                    value={formData.parentPhone}
                    onChange={handleChange}
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Pemberitahuan verifikasi berkas dan jadwal observasi akan dikirimkan ke nomor ini.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ALAMAT */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Alamat Domisili Tempat Tinggal
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Alamat Lengkap (Jalan, No. Rumah) *
                  </label>
                  <Input
                    required
                    name="address"
                    placeholder="Contoh: Jl. Fatmawati Raya No. 45"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      RT / RW *
                    </label>
                    <Input
                      required
                      name="rtRw"
                      placeholder="Contoh: 004 / 002"
                      value={formData.rtRw}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Kelurahan *
                    </label>
                    <Input
                      required
                      name="subdistrict"
                      placeholder="Contoh: Cilandak Barat"
                      value={formData.subdistrict}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Kecamatan *
                    </label>
                    <Input
                      required
                      name="district"
                      placeholder="Contoh: Cilandak"
                      value={formData.district}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Kota / Kabupaten *
                    </label>
                    <Input
                      required
                      name="city"
                      placeholder="Contoh: Jakarta Selatan"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: UNGGAH BERKAS */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Upload className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Unggah Dokumen Pendukung
                </h3>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-dashed border-border p-4 bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        Kartu Keluarga (KK) *
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        File PDF / JPG maks. 2MB
                      </div>
                    </div>
                  </div>
                  <Badge variant="accepted">Siap Diunggah</Badge>
                </div>

                <div className="rounded-xl border border-dashed border-border p-4 bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        Akta Kelahiran Calon Siswa *
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        File PDF / JPG maks. 2MB
                      </div>
                    </div>
                  </div>
                  <Badge variant="accepted">Siap Diunggah</Badge>
                </div>

                <div className="rounded-xl border border-dashed border-border p-4 bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        Pas Foto Berwarna Anak 3x4 *
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Latar merah/biru format JPG maks. 1MB
                      </div>
                    </div>
                  </div>
                  <Badge variant="accepted">Siap Diunggah</Badge>
                </div>

                <div className="rounded-xl border border-dashed border-border p-4 bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        Ijazah / Surat Keterangan TK (Opsional)
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Dapat disusulkan kemudian
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">Opsional</Badge>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: RINGKASAN & KONFIRMASI */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Periksa Kembali Data Pendaftaran
                </h3>
              </div>

              <div className="rounded-2xl bg-muted/40 p-4 space-y-3 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Nama Lengkap Siswa:</span>
                  <strong className="text-foreground">{formData.fullName || "Muhammad Rayyan"}</strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Tempat / Tgl Lahir:</span>
                  <strong className="text-foreground">
                    {formData.birthPlace || "Jakarta"},{" "}
                    {formData.birthDate || "12 April 2018"}
                  </strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Jenis Kelamin:</span>
                  <strong className="text-foreground">{formData.gender}</strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Nama Ayah / Ibu:</span>
                  <strong className="text-foreground">
                    {formData.fatherName || "Bambang Pratama"} / {formData.motherName || "Siti Aisyah"}
                  </strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Nomor WhatsApp:</span>
                  <strong className="text-primary">{formData.parentPhone || "081298765432"}</strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Alamat Domisili:</span>
                  <strong className="text-foreground">{formData.address || "Jl. Fatmawati No. 45"}, {formData.district}</strong>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Dengan mengklik tombol <strong>Kirim Pendaftaran Sekarang</strong>, Anda
                  menyatakan bahwa seluruh data yang diisikan adalah benar dan dapat
                  dipertanggungjawabkan. Sistem akan menghasilkan nomor registrasi resmi.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                className="font-semibold gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Sebelumnya
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <Button
                type="submit"
                variant="default"
                className="font-bold gap-1 shadow-md"
              >
                Lanjutkan
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="font-bold gap-2 shadow-xl"
              >
                <CheckCircle2 className="h-5 w-5" />
                Kirim Pendaftaran Sekarang
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
