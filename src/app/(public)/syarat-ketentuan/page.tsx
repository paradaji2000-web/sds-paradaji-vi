import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { schoolInfo } from "@/data/dummy";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan pendaftaran peserta didik baru (PPDB) SDS Paradjai VI.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3">
        <Badge variant="default">Ketentuan PPDB</Badge>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
          Syarat & Ketentuan Penerimaan Siswa Baru
        </h1>
        <p className="text-xs text-muted-foreground">
          Tahun Ajaran 2025/2026
        </p>
      </div>

      <div className="prose prose-emerald max-w-none text-muted-foreground space-y-6 text-sm sm:text-base leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Persyaratan Usia</h2>
          <p>
            Calon peserta didik baru kelas 1 Sekolah Dasar (SD) diprioritaskan telah berusia minimal 7 (tujuh) tahun pada tanggal 1 Juli tahun ajaran berjalan. Calon siswa dengan usia minimal 6 (enam) tahun pada tanggal 1 Juli dapat diterima sepanjang daya tampung rombongan belajar masih tersedia dan menunjukkan kematangan emosional.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Kelengkapan Berkas Fisik & Digital</h2>
          <p>
            Wali murid wajib mengunggah salinan dokumen yang sah dan jelas terbaca, meliputi:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Akta Kelahiran asli calon siswa (format file PDF atau JPG/PNG).</li>
            <li>Kartu Keluarga (KK) terbaru yang mencantumkan nama calon siswa.</li>
            <li>Pas foto berwarna terbaru ukuran 3x4 (2 lembar fisik saat verifikasi ulang).</li>
            <li>Ijazah / Surat Tanda Selesai Belajar TK atau RA (jika telah terbit).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Tata Tertib dan Kejujuran Data</h2>
          <p>
            Orang tua atau wali murid menjamin keaslian dan kebenaran setiap data yang diinputkan ke dalam sistem PPDB online {schoolInfo.name}. Apabila di kemudian hari ditemukan pemalsuan identitas atau dokumen, pihak panitia berhak membatalkan status penerimaan pendaftar bersangkutan.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">4. Biaya Pendaftaran</h2>
          <p>
            Pengisian formulir pendaftaran awal secara online ini <strong>tidak dipungut biaya pendaftaran (Gratis Formulir)</strong>. Rincian biaya seragam dan perlengkapan sekolah akan disampaikan secara transparan setelah status verifikasi berkas dinyatakan diterima oleh panitia.
          </p>
        </section>
      </div>
    </div>
  );
}
