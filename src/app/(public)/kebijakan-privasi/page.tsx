import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { schoolInfo } from "@/data/dummy";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan perlindungan data pribadi siswa dan calon wali murid SDS Paradjai VI.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3">
        <Badge variant="default">Perlindungan Data</Badge>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
          Kebijakan Privasi Data Pribadi
        </h1>
        <p className="text-xs text-muted-foreground">
          Terakhir diperbarui: 1 Januari 2025
        </p>
      </div>

      <div className="prose prose-emerald max-w-none text-muted-foreground space-y-6 text-sm sm:text-base leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Komitmen Perlindungan Privasi</h2>
          <p>
            {schoolInfo.name} berkomitmen penuh untuk melindungi privasi serta keamanan data pribadi seluruh calon siswa, orang tua/wali murid, dan pengunjung portal ini. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga kerahasiaan informasi yang Anda serahkan saat mengakses website atau mengisi formulir PPDB online.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Data yang Kami Kumpulkan</h2>
          <p>
            Dalam rangka proses pendaftaran dan verifikasi berkas PPDB, kami mengumpulkan data yang mencakup:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identitas calon murid: Nama lengkap, NIK, tempat dan tanggal lahir, jenis kelamin, dan asal sekolah TK/RA.</li>
            <li>Identitas orang tua/wali: Nama orang tua, pekerjaan, nomor telepon/WhatsApp aktif, dan alamat domisili.</li>
            <li>Dokumen penunjang: Salinan digital Kartu Keluarga (KK), Akta Kelahiran, dan Pas Foto anak.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Penggunaan dan Keamanan Informasi</h2>
          <p>
            Data yang dikumpulkan semata-mata digunakan untuk kepentingan verifikasi berkas penerimaan murid baru, pencatatan administrasi Dapodik sekolah, serta pengiriman notifikasi pembaruan status seleksi melalui WhatsApp atau Email resmi sekolah. Kami tidak pernah memperjualbelikan, menyewakan, atau memberikan data pribadi Anda kepada pihak ketiga manapun untuk tujuan komersial.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">4. Hak Akses Orang Tua</h2>
          <p>
            Orang tua atau wali murid berhak untuk meninjau kembali data yang telah dikirimkan, memperbarui dokumen yang belum lengkap, atau mengajukan permohonan koreksi data melalui panitia sekretariat PPDB dengan menghubungi kontak WhatsApp resmi sekolah di <strong>+{schoolInfo.whatsapp}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
