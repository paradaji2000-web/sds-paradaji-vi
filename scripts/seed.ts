import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

// ============================================================
// Koneksi database
// ============================================================
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// ============================================================
// Helper
// ============================================================
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ============================================================
// DATA SEED
// ============================================================

async function seedSiteSettings() {
  console.log("🌱 Seeding site_settings...");
  const settings = [
    {
      key: "whatsapp_number",
      value: "6281234567890",
      category: "whatsapp",
      description: "Nomor WhatsApp admin utama sekolah (format internasional tanpa +)",
    },
    {
      key: "whatsapp_template_ppdb",
      value:
        "Assalamu'alaikum, Kami dari SDS PARADAJI VI ingin menginformasikan bahwa pendaftaran PPDB atas nama *{nama_anak}* (No. Reg: *{nomor_registrasi}*) telah kami terima pada tanggal {tanggal_daftar}.\n\nSilakan tunggu konfirmasi verifikasi berkas dari kami. Terima kasih, Orang Tua/Wali: *{nama_orang_tua}*.",
      category: "whatsapp",
      description: "Template pesan WhatsApp konfirmasi pendaftaran PPDB",
    },
    {
      key: "whatsapp_template_verified",
      value:
        "Yth. Orang Tua/Wali *{nama_orang_tua}*,\n\nKami dengan senang hati menginformasikan bahwa berkas pendaftaran PPDB putra/putri Anda atas nama *{nama_anak}* (No. Reg: *{nomor_registrasi}*) telah *DIVERIFIKASI* oleh tim SDS PARADAJI VI.\n\nSelanjutnya, mohon menunggu pengumuman penerimaan resmi. Terima kasih.",
      category: "whatsapp",
      description: "Template pesan WhatsApp saat berkas diverifikasi",
    },
    {
      key: "whatsapp_template_accepted",
      value:
        "Selamat! 🎉\n\nYth. Orang Tua/Wali *{nama_orang_tua}*,\n\nDengan bangga kami mengumumkan bahwa putra/putri Anda *{nama_anak}* (No. Reg: *{nomor_registrasi}*) *DITERIMA* sebagai peserta didik baru di SDS PARADAJI VI Tahun Ajaran 2025/2026.\n\nSegera hubungi sekolah untuk proses selanjutnya. Jazakumullahu khairan.",
      category: "whatsapp",
      description: "Template pesan WhatsApp saat pendaftar diterima",
    },
    {
      key: "whatsapp_template_rejected",
      value:
        "Yth. Orang Tua/Wali *{nama_orang_tua}*,\n\nMohon maaf, kami menginformasikan bahwa pendaftaran PPDB atas nama *{nama_anak}* (No. Reg: *{nomor_registrasi}*) tidak dapat kami terima pada tahap ini karena keterbatasan kapasitas.\n\nTerima kasih atas kepercayaan Anda kepada SDS PARADAJI VI.",
      category: "whatsapp",
      description: "Template pesan WhatsApp saat pendaftar ditolak",
    },
    {
      key: "email_subject_ppdb_created",
      value: "Konfirmasi Pendaftaran PPDB SDS PARADAJI VI — No. Reg: {nomor_registrasi}",
      category: "email",
      description: "Subject email konfirmasi pendaftaran PPDB",
    },
    {
      key: "email_subject_status_update",
      value: "Update Status PPDB SDS PARADAJI VI — {nama_anak}",
      category: "email",
      description: "Subject email update status PPDB",
    },
    {
      key: "school_name",
      value: "SDS PARADAJI VI",
      category: "general",
      description: "Nama resmi sekolah",
    },
    {
      key: "school_address",
      value: "Jl. Paradjai No. 6, Kelurahan Cimahi, Kecamatan Cimahi Tengah, Kota Cimahi, Jawa Barat 40522",
      category: "general",
      description: "Alamat lengkap sekolah",
    },
    {
      key: "school_phone",
      value: "022-6631234",
      category: "general",
      description: "Nomor telepon sekolah",
    },
    {
      key: "school_email",
      value: "info@sdsparadaji6.sch.id",
      category: "general",
      description: "Email resmi sekolah",
    },
    {
      key: "ppdb_year",
      value: "2025/2026",
      category: "ppdb",
      description: "Tahun ajaran PPDB aktif",
    },
    {
      key: "ppdb_quota",
      value: "60",
      category: "ppdb",
      description: "Kuota penerimaan peserta didik baru",
    },
  ];

  for (const setting of settings) {
    await db
      .insert(schema.siteSettings)
      .values(setting)
      .onConflictDoNothing();
  }
  console.log(`  ✅ ${settings.length} site settings seeded`);
}

async function seedTeachers() {
  console.log("🌱 Seeding teachers...");
  const teacherData = [
    {
      name: "Drs. H. Ahmad Fauzi, M.Pd.",
      slug: "ahmad-fauzi",
      position: "Kepala Sekolah",
      subject: undefined,
      education: "S2 Manajemen Pendidikan, UPI Bandung",
      bio: "Memimpin SDS PARADAJI VI sejak 2015 dengan visi mewujudkan sekolah berbasis nilai islami dan prestasi akademik tinggi.",
      photoUrl: undefined,
      displayOrder: 1,
      isActive: true,
    },
    {
      name: "Hj. Siti Rahmawati, S.Pd.",
      slug: "siti-rahmawati",
      position: "Wakil Kepala Sekolah Bidang Kurikulum",
      subject: "Bahasa Indonesia",
      education: "S1 Pendidikan Bahasa Indonesia, UNPAD",
      bio: "Berpengalaman 18 tahun dalam pengembangan kurikulum berbasis literasi dan karakter.",
      photoUrl: undefined,
      displayOrder: 2,
      isActive: true,
    },
    {
      name: "Muhammad Ridwan, S.Pd.I.",
      slug: "muhammad-ridwan",
      position: "Guru Pendidikan Agama Islam",
      subject: "Pendidikan Agama Islam & Tahfidz",
      education: "S1 Pendidikan Agama Islam, UIN Sunan Gunung Djati",
      bio: "Pembina program Tahfidz Al-Qur'an yang berhasil membimbing 47 siswa hafal minimal 3 juz.",
      photoUrl: undefined,
      displayOrder: 3,
      isActive: true,
    },
    {
      name: "Dewi Kusuma Wardani, S.Pd.",
      slug: "dewi-kusuma-wardani",
      position: "Guru Kelas I & II",
      subject: "Tematik Kelas Rendah",
      education: "S1 Pendidikan Guru Sekolah Dasar, UPI Cibiru",
      bio: "Spesialis pembelajaran aktif dan menyenangkan untuk siswa kelas rendah dengan pendekatan bermain sambil belajar.",
      photoUrl: undefined,
      displayOrder: 4,
      isActive: true,
    },
    {
      name: "Budi Santoso, S.Pd.",
      slug: "budi-santoso",
      position: "Guru Kelas III & IV",
      subject: "Matematika & IPA",
      education: "S1 Pendidikan Matematika, STKIP Pasundan",
      bio: "Peraih penghargaan Guru Berprestasi Kota Cimahi 2022, ahli dalam metode pembelajaran matematika berbasis masalah.",
      photoUrl: undefined,
      displayOrder: 5,
      isActive: true,
    },
    {
      name: "Nurul Hidayah, S.Pd.",
      slug: "nurul-hidayah",
      position: "Guru Kelas V & VI",
      subject: "IPS & PKn",
      education: "S1 Pendidikan IPS, UPI Bandung",
      bio: "Aktif mengintegrasikan nilai kebangsaan dan wawasan lingkungan dalam pembelajaran IPS.",
      photoUrl: undefined,
      displayOrder: 6,
      isActive: true,
    },
    {
      name: "Rini Setiawati, S.Pd.",
      slug: "rini-setiawati",
      position: "Guru Seni Budaya & Prakarya",
      subject: "Seni Budaya & Prakarya",
      education: "S1 Pendidikan Seni Rupa, UPI Bandung",
      bio: "Pembimbing tim kesenian sekolah yang berhasil meraih juara 1 Pentas Seni Tingkat Kota Cimahi 2023.",
      photoUrl: undefined,
      displayOrder: 7,
      isActive: true,
    },
    {
      name: "Hendra Gunawan, S.Pd.",
      slug: "hendra-gunawan",
      position: "Guru Pendidikan Jasmani",
      subject: "PJOK",
      education: "S1 Pendidikan Jasmani, UPI Bandung",
      bio: "Pelatih tim Pramuka dan olahraga sekolah. Membawa tim futsal SDS PARADAJI VI menjadi runner-up tingkat kecamatan.",
      photoUrl: undefined,
      displayOrder: 8,
      isActive: true,
    },
  ];

  for (const teacher of teacherData) {
    await db
      .insert(schema.teachers)
      .values({
        ...teacher,
        subject: teacher.subject ?? null,
        photoUrl: teacher.photoUrl ?? null,
      })
      .onConflictDoNothing();
  }
  console.log(`  ✅ ${teacherData.length} teachers seeded`);
}

async function seedFacilities() {
  console.log("🌱 Seeding facilities...");
  const facilityData = [
    { name: "Ruang Kelas Ber-AC", slug: "ruang-kelas-ber-ac", category: "Ruang Belajar", description: "12 ruang kelas modern dilengkapi AC, proyektor interaktif, dan papan tulis digital. Setiap kelas berkapasitas 28 siswa dengan ventilasi optimal.", imageUrl: null, displayOrder: 1 },
    { name: "Perpustakaan Digital", slug: "perpustakaan-digital", category: "Ruang Belajar", description: "Perpustakaan dengan koleksi lebih dari 3.000 judul buku pelajaran, fiksi islami, dan ensiklopedi. Dilengkapi 10 unit komputer akses internet untuk penelusuran literatur digital.", imageUrl: null, displayOrder: 2 },
    { name: "Laboratorium Komputer", slug: "laboratorium-komputer", category: "Laboratorium", description: "Lab komputer dengan 30 unit PC terbaru, koneksi internet fiber optic, dan software edukasi terkini. Digunakan untuk pelajaran TIK dan persiapan Asesmen Nasional Berbasis Komputer (ANBK).", imageUrl: null, displayOrder: 3 },
    { name: "Masjid Sekolah Al-Ikhlas", slug: "masjid-al-ikhlas", category: "Ibadah", description: "Masjid sekolah berkapasitas 300 jamaah, digunakan untuk shalat berjamaah, kajian Islam, dan program Tahfidz Al-Qur'an harian sebelum jam pelajaran dimulai.", imageUrl: null, displayOrder: 4 },
    { name: "Lapangan Olahraga Serbaguna", slug: "lapangan-olahraga", category: "Olahraga", description: "Lapangan multifungsi seluas 800 m² yang dapat digunakan untuk futsal, badminton, voli, dan upacara bendera. Lantai dilapisi semen dengan cat garis lapangan standar.", imageUrl: null, displayOrder: 5 },
    { name: "UKS (Unit Kesehatan Sekolah)", slug: "uks", category: "Kesehatan", description: "Ruang UKS dilengkapi tempat tidur, peralatan P3K lengkap, timbangan badan, dan alat ukur tinggi. Dijaga oleh guru terlatih dan bekerjasama dengan Puskesmas Cimahi Tengah.", imageUrl: null, displayOrder: 6 },
    { name: "Kantin Sehat Sekolah", slug: "kantin-sehat", category: "Sarana Penunjang", description: "Kantin sekolah yang menyajikan makanan bergizi, halal, dan terjangkau. Semua produk telah melalui seleksi gizi dari tim kesehatan sekolah. Bebas makanan kemasan mengandung pengawet berlebih.", imageUrl: null, displayOrder: 7 },
    { name: "Ruang Kepala Sekolah & Tata Usaha", slug: "ruang-kepala-sekolah", category: "Administrasi", description: "Ruang administrasi terpadu yang representatif, dilengkapi sistem CCTV 24 jam, ruang tunggu tamu yang nyaman, dan area resepsionis untuk melayani orang tua murid.", imageUrl: null, displayOrder: 8 },
    { name: "Ruang Guru & Aula Serbaguna", slug: "ruang-guru-aula", category: "Ruang Belajar", description: "Ruang guru berkapasitas 20 orang dilengkapi loker pribadi dan meja kerja. Berdampingan dengan aula serbaguna berkapasitas 200 orang untuk rapat, seminar, dan acara sekolah.", imageUrl: null, displayOrder: 9 },
    { name: "Area Parkir & Zona Antar-Jemput", slug: "area-parkir", category: "Sarana Penunjang", description: "Area parkir tertata dengan zona khusus motor, mobil, dan area tunggu antar-jemput yang aman. Dilengkapi CCTV dan petugas keamanan selama jam sekolah.", imageUrl: null, displayOrder: 10 },
    { name: "Toilet Bersih Terstandar", slug: "toilet-bersih", category: "Sanitasi", description: "Toilet siswa (putra & putri terpisah) dan toilet guru yang selalu terjaga kebersihannya dengan jadwal pembersihan 2 kali sehari. Dilengkapi cermin, sabun cuci tangan, dan hand dryer.", imageUrl: null, displayOrder: 11 },
    { name: "Taman Baca & Pojok Literasi", slug: "taman-baca", category: "Ruang Belajar", description: "Area outdoor dengan taman hijau, kursi baca, dan rak buku ringan untuk mendorong budaya membaca di luar kelas. Dilengkapi Wi-Fi dan papan tulis kecil untuk diskusi kelompok.", imageUrl: null, displayOrder: 12 },
  ];

  for (const facility of facilityData) {
    await db.insert(schema.facilities).values(facility).onConflictDoNothing();
  }
  console.log(`  ✅ ${facilityData.length} facilities seeded`);
}

async function seedExtracurriculars() {
  console.log("🌱 Seeding extracurriculars...");
  const ekskul = [
    { name: "Pramuka", slug: "pramuka", description: "Gerakan Pramuka gugus depan SDS PARADAJI VI membentuk karakter mandiri, disiplin, dan cinta alam. Siswa dilatih keterampilan kepramukaan, tali-temali, navigasi, dan baris-berbaris. Aktif mengikuti Jambore Tingkat Kota dan Kwartir Cabang.", schedule: "Jumat, 13.30 – 15.30 WIB", coach: "Kak Hendra Gunawan, S.Pd.", imageUrl: null, displayOrder: 1 },
    { name: "Tahfidz Al-Qur'an", slug: "tahfidz-quran", description: "Program unggulan hafalan Al-Qur'an dengan metode talaqqi dan murajaah harian. Target hafalan 3 juz (Juz 28, 29, 30) selama 6 tahun. Siswa yang lulus mendapat syahadah dan penghargaan khusus dari sekolah.", schedule: "Senin – Jumat, 06.30 – 07.00 WIB (sebelum KBM)", coach: "Ustadz Muhammad Ridwan, S.Pd.I.", imageUrl: null, displayOrder: 2 },
    { name: "Futsal", slug: "futsal", description: "Tim futsal SDS PARADAJI VI aktif berkompetisi di turnamen antar-SD tingkat kecamatan dan kota. Latihan berfokus pada teknik dasar, strategi bermain, dan membangun sportivitas. Runner-up Turnamen Futsal Cimahi Cup 2023.", schedule: "Rabu, 14.00 – 16.00 WIB", coach: "Kak Hendra Gunawan, S.Pd.", imageUrl: null, displayOrder: 3 },
    { name: "Seni Tari Sunda", slug: "seni-tari-sunda", description: "Melestarikan kebudayaan Sunda melalui tari Jaipong, Topeng, dan Merak. Siswa tampil di acara-acara sekolah dan pernah mewakili Kota Cimahi di Festival Budaya Jawa Barat. Terbuka untuk siswa kelas 3–6.", schedule: "Sabtu, 08.00 – 10.00 WIB", coach: "Ibu Rini Setiawati, S.Pd.", imageUrl: null, displayOrder: 4 },
    { name: "Robotika & Coding", slug: "robotika-coding", description: "Ekskul futuristik yang memperkenalkan pemrograman Scratch, micro:bit, dan perakitan robot sederhana. Membangun computational thinking sejak dini. Siswa dari ekskul ini berhasil masuk 10 besar Olimpiade Sains Terapan Kota Cimahi.", schedule: "Kamis, 13.30 – 15.30 WIB", coach: "Bapak Budi Santoso, S.Pd.", imageUrl: null, displayOrder: 5 },
    { name: "Dokter Kecil (UKS)", slug: "dokter-kecil", description: "Melatih siswa menjadi kader kesehatan sekolah yang mampu memberikan P3K dasar, memantau kebersihan lingkungan, dan mengkampanyekan pola hidup sehat kepada teman-teman. Bekerjasama dengan Puskesmas Cimahi Tengah.", schedule: "Selasa, 13.00 – 14.30 WIB", coach: "Ibu Dewi Kusuma Wardani, S.Pd.", imageUrl: null, displayOrder: 6 },
  ];

  for (const item of ekskul) {
    await db.insert(schema.extracurriculars).values(item).onConflictDoNothing();
  }
  console.log(`  ✅ ${ekskul.length} extracurriculars seeded`);
}

async function seedGalleries() {
  console.log("🌱 Seeding galleries...");
  const galleryData = [
    { title: "Ruang Kelas Kelas 5A — Suasana Belajar Aktif", category: "Ruang Kelas", description: "Siswa kelas 5A sedang melakukan diskusi kelompok dalam pembelajaran IPS berbasis proyek.", displayOrder: 1 },
    { title: "Perpustakaan — Jam Literasi Pagi", category: "Perpustakaan", description: "Suasana perpustakaan SDS PARADAJI VI saat program membaca 15 menit sebelum pelajaran.", displayOrder: 2 },
    { title: "Masjid Al-Ikhlas — Shalat Berjamaah Dzuhur", category: "Masjid", description: "Seluruh civitas sekolah melaksanakan shalat Dzuhur berjamaah setiap hari di Masjid Al-Ikhlas.", displayOrder: 3 },
    { title: "Lapangan — Senam Pagi Bersama", category: "Lapangan", description: "Kegiatan senam pagi setiap Jumat diikuti seluruh siswa dan guru sebagai pembiasaan hidup sehat.", displayOrder: 4 },
    { title: "Lab Komputer — Persiapan ANBK", category: "Laboratorium", description: "Siswa kelas 6 berlatih mengerjakan soal berbasis komputer untuk mempersiapkan Asesmen Nasional.", displayOrder: 5 },
    { title: "Pramuka — Latihan Tali-Temali", category: "Ekstrakurikuler", description: "Anggota Pramuka gudep SDS PARADAJI VI sedang berlatih tali-temali dalam persiapan Jambore.", displayOrder: 6 },
    { title: "Pentas Seni — Tari Jaipong Juara 1", category: "Prestasi", description: "Tim tari SDS PARADAJI VI yang berhasil meraih juara 1 Festival Tari Tingkat Kota Cimahi 2023.", displayOrder: 7 },
    { title: "Ekskul Robotika — Demo Robot Sederhana", category: "Ekstrakurikuler", description: "Siswa kelas 4 memamerkan robot yang mereka rakit dalam sesi open house ekskul robotika.", displayOrder: 8 },
    { title: "Upacara Bendera Hari Senin", category: "Kegiatan", description: "Upacara bendera rutin setiap Senin dipimpin oleh Kepala Sekolah dan diikuti seluruh siswa.", displayOrder: 9 },
    { title: "Wisata Edukasi ke Museum Geologi Bandung", category: "Kegiatan", description: "Siswa kelas 4 dan 5 melakukan wisata edukasi ke Museum Geologi Bandung untuk belajar ilmu bumi.", displayOrder: 10 },
    { title: "UKS — Pemeriksaan Kesehatan Berkala", category: "Kesehatan", description: "Dokter dari Puskesmas Cimahi Tengah melakukan pemeriksaan kesehatan rutin tiap semester.", displayOrder: 11 },
    { title: "Kantin Sehat — Menu Bergizi Harian", category: "Fasilitas", description: "Kantin SDS PARADAJI VI menyajikan menu bergizi seperti nasi uduk, sup ayam, dan buah segar.", displayOrder: 12 },
    { title: "Peringatan Isra Mi'raj — Lomba Kaligrafi", category: "Kegiatan", description: "Rangkaian acara Isra Mi'raj 1445 H termasuk lomba kaligrafi yang diikuti seluruh kelas.", displayOrder: 13 },
    { title: "Penerimaan Raport Semester 1 — 2024/2025", category: "Kegiatan", description: "Orang tua siswa menghadiri acara pengambilan raport dengan konsultasi langsung bersama wali kelas.", displayOrder: 14 },
    { title: "Fasilitas Parkir & Gerbang Sekolah", category: "Fasilitas", description: "Area parkir tertata dan gerbang sekolah yang dijaga petugas keamanan selama jam operasional.", displayOrder: 15 },
  ];

  for (const item of galleryData) {
    await db
      .insert(schema.galleries)
      .values({
        ...item,
        imageUrl: "/images/gallery-placeholder.jpg",
      })
      .onConflictDoNothing();
  }
  console.log(`  ✅ ${galleryData.length} galleries seeded`);
}

async function seedNews() {
  console.log("🌱 Seeding news...");
  const newsData = [
    {
      title: "SDS PARADAJI VI Raih Juara 1 Festival Tari Tingkat Kota Cimahi 2023",
      slug: "juara-1-festival-tari-kota-cimahi-2023",
      excerpt: "Tim kesenian SDS PARADAJI VI berhasil merebut gelar juara pertama pada Festival Tari Pelajar Kota Cimahi 2023 yang diselenggarakan di Gedung Kesenian Baros.",
      content: `<p>Alhamdulillah, tim kesenian <strong>SDS PARADAJI VI</strong> berhasil meraih prestasi membanggakan dengan menjadi Juara 1 pada Festival Tari Pelajar Kota Cimahi 2023 yang berlangsung pada Sabtu, 18 November 2023 di Gedung Kesenian Baros, Cimahi.</p>

<p>Tim yang beranggotakan 8 siswa kelas 4 dan 5 ini membawakan Tari Jaipong "Kembang Tanjung" dengan penuh semangat dan ekspresi budaya yang memukau para juri. Pelatihan intensif selama 3 bulan di bawah bimbingan Ibu Rini Setiawati, S.Pd. menjadi kunci keberhasilan mereka.</p>

<p>"Kami sangat bangga dengan pencapaian anak-anak. Mereka berlatih dengan sangat tekun dan berdedikasi tinggi. Ini adalah buah dari kerja keras bersama," ujar Kepala Sekolah Drs. H. Ahmad Fauzi, M.Pd.</p>

<p>Kemenangan ini menambah daftar prestasi gemilang SDS PARADAJI VI di bidang seni budaya dan menjadi motivasi bagi seluruh warga sekolah untuk terus berprestasi di berbagai bidang.</p>`,
      category: "prestasi" as const,
      isPublished: true,
      publishedAt: new Date("2023-11-20"),
    },
    {
      title: "PPDB Online SDS PARADAJI VI 2025/2026 Resmi Dibuka",
      slug: "ppdb-online-2025-2026-dibuka",
      excerpt: "Penerimaan Peserta Didik Baru (PPDB) SDS PARADAJI VI Tahun Ajaran 2025/2026 kini dapat dilakukan secara online. Kuota terbatas 60 siswa untuk 2 rombongan belajar.",
      content: `<p><strong>SDS PARADAJI VI</strong> dengan bangga mengumumkan pembukaan Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2025/2026 secara resmi mulai 1 Maret 2025.</p>

<h2>Ketentuan Penerimaan</h2>
<ul>
  <li>Usia calon peserta didik minimal 6 tahun per 1 Juli 2025</li>
  <li>Prioritas diberikan kepada anak dari alumni dan warga sekitar sekolah</li>
  <li>Kuota total: <strong>60 siswa</strong> (2 rombongan belajar @ 30 siswa)</li>
</ul>

<h2>Berkas yang Diperlukan</h2>
<ul>
  <li>Kartu Keluarga (KK) — format PDF/JPG maks. 2MB</li>
  <li>Akta Kelahiran — format PDF/JPG maks. 2MB</li>
  <li>Pas Foto 3x4 terbaru — format JPG maks. 2MB</li>
  <li>Ijazah TK/PAUD atau KIP (jika ada)</li>
</ul>

<p>Pendaftaran dapat dilakukan melalui website ini di menu <strong>PPDB Online</strong>. Informasi lebih lanjut hubungi kami via WhatsApp atau datang langsung ke kantor sekolah.</p>`,
      category: "pengumuman" as const,
      isPublished: true,
      publishedAt: new Date("2025-03-01"),
    },
    {
      title: "Wisata Edukasi Kelas 4 dan 5 ke Museum Geologi Bandung",
      slug: "wisata-edukasi-museum-geologi-2024",
      excerpt: "Siswa kelas 4 dan 5 SDS PARADAJI VI mengunjungi Museum Geologi Bandung untuk mempelajari ilmu kebumian secara langsung dalam program Pembelajaran Berbasis Pengalaman.",
      content: `<p>Sebanyak 58 siswa kelas 4 dan 5 <strong>SDS PARADAJI VI</strong> melakukan wisata edukasi ke Museum Geologi Bandung pada Kamis, 14 Maret 2024. Kegiatan ini merupakan bagian dari program Pembelajaran Berbasis Pengalaman (Project-Based Learning) dalam mata pelajaran IPA.</p>

<p>Di museum, para siswa mendapat kesempatan untuk melihat langsung koleksi fosil purba, batuan dari berbagai era geologi, dan model tiga dimensi struktur bumi. Para siswa terlihat sangat antusias mengajukan pertanyaan kepada pemandu museum.</p>

<p>"Melihat langsung fosil gajah purba yang berumur jutaan tahun membuat saya semakin kagum dengan kebesaran Allah SWT," ungkap Anisa, siswi kelas 5A.</p>

<p>Guru pendamping, Ibu Nurul Hidayah, S.Pd., menyatakan bahwa kegiatan lapangan seperti ini terbukti meningkatkan pemahaman dan minat belajar siswa secara signifikan.</p>`,
      category: "kegiatan" as const,
      isPublished: true,
      publishedAt: new Date("2024-03-15"),
    },
    {
      title: "Program Tahfidz Berhasil Luluskan 12 Siswa Hafalan 3 Juz",
      slug: "tahfidz-luluskan-12-siswa-hafalan-3-juz",
      excerpt: "Program unggulan Tahfidz Al-Qur'an SDS PARADAJI VI kembali mencetak prestasi dengan meluluskan 12 siswa yang berhasil menghafal minimal 3 juz Al-Qur'an dalam satu tahun ajaran.",
      content: `<p>Program Tahfidz Al-Qur'an <strong>SDS PARADAJI VI</strong> terus mengukir prestasi membanggakan. Pada tahun ajaran 2023/2024, sebanyak 12 siswa berhasil menyelesaikan hafalan minimal 3 juz (Juz 28, 29, dan 30) dan resmi diwisuda dalam Ceremony Khatam Quran yang berlangsung khidmat.</p>

<p>Acara wisuda ini dihadiri oleh orang tua siswa, Kepala Dinas Pendidikan Kota Cimahi, dan Ketua Yayasan PARADAJI. Setiap siswa yang lulus mendapatkan syahadah resmi, piagam penghargaan, dan hadiah Al-Qur'an.</p>

<p>Ustadz Muhammad Ridwan, S.Pd.I., selaku pembimbing program Tahfidz, menyampaikan rasa syukur yang mendalam: "Program ini berjalan setiap pagi 30 menit sebelum pelajaran dimulai. Komitmen dan dukungan orang tua adalah kunci keberhasilan anak-anak."</p>

<p>Kepala Sekolah Drs. H. Ahmad Fauzi, M.Pd. berharap program ini terus berkembang dan menjadi keunggulan utama SDS PARADAJI VI di antara sekolah-sekolah dasar di Kota Cimahi.</p>`,
      category: "kegiatan" as const,
      isPublished: true,
      publishedAt: new Date("2024-06-20"),
    },
    {
      title: "Pengumuman Libur Semester Ganjil & Persiapan Penilaian Akhir Semester",
      slug: "pengumuman-libur-semester-penilaian-akhir",
      excerpt: "Informasi resmi jadwal Penilaian Akhir Semester (PAS) Ganjil 2024/2025 dan libur semester. Orang tua dimohon memperhatikan jadwal lengkap berikut.",
      content: `<p>Kepada Yth. Orang Tua/Wali Murid <strong>SDS PARADAJI VI</strong>,</p>

<p>Bersama ini kami sampaikan informasi penting mengenai jadwal kegiatan akhir semester ganjil Tahun Ajaran 2024/2025:</p>

<h2>Jadwal Penilaian Akhir Semester (PAS) Ganjil</h2>
<ul>
  <li><strong>2 – 6 Desember 2024</strong>: PAS untuk kelas 1, 2, dan 3</li>
  <li><strong>2 – 7 Desember 2024</strong>: PAS untuk kelas 4, 5, dan 6</li>
</ul>

<h2>Pembagian Rapor</h2>
<ul>
  <li><strong>Sabtu, 14 Desember 2024</strong>: Pembagian rapor semester ganjil & konsultasi dengan wali kelas</li>
</ul>

<h2>Libur Semester Ganjil</h2>
<ul>
  <li><strong>16 Desember 2024 – 3 Januari 2025</strong>: Libur Semester Ganjil</li>
  <li><strong>Senin, 6 Januari 2025</strong>: Masuk sekolah semester genap</li>
</ul>

<p>Mohon kepada orang tua untuk memastikan putra/putrinya hadir tepat waktu selama PAS berlangsung. Siswa wajib membawa kartu peserta ujian yang akan dibagikan seminggu sebelum pelaksanaan.</p>

<p>Atas perhatian Bapak/Ibu, kami ucapkan terima kasih.</p>`,
      category: "pengumuman" as const,
      isPublished: true,
      publishedAt: new Date("2024-11-25"),
    },
  ];

  for (const item of newsData) {
    await db
      .insert(schema.news)
      .values({
        ...item,
        category: item.category === "prestasi" ? "berita" : item.category,
        thumbnailUrl: null,
        authorId: null,
      })
      .onConflictDoNothing();
  }
  console.log(`  ✅ ${newsData.length} news articles seeded`);
}

async function seedPpdbCounters() {
  console.log("🌱 Seeding ppdb_counters...");
  const currentYear = new Date().getFullYear();
  await db
    .insert(schema.ppdbCounters)
    .values({ year: currentYear, lastNumber: 3 })
    .onConflictDoNothing();
  console.log(`  ✅ PPDB counter for year ${currentYear} seeded`);
}

async function seedSamplePpdbRegistrations() {
  console.log("🌱 Seeding sample ppdb_registrations...");
  const samples = [
    {
      registrationNumber: "PPDB-2025-001",
      fullName: "Muhammad Farhan Akbar",
      nisn: null,
      gender: "L",
      birthPlace: "Bandung",
      birthDate: "2018-04-12",
      religion: "Islam",
      address: "Jl. Melong Asih No. 45, RT 03/RW 07",
      kelurahan: "Melong",
      kecamatan: "Cimahi Selatan",
      city: "Kota Cimahi",
      province: "Jawa Barat",
      postalCode: "40534",
      parentName: "Asep Saepuloh",
      parentRelation: "Ayah",
      parentPhone: "6281234567001",
      parentEmail: "asep.saepuloh@gmail.com",
      parentOccupation: "Wiraswasta",
      previousSchool: "TK Raudhatul Athfal Nurul Hikmah",
      status: "verified" as const,
      adminNotes: "Berkas lengkap dan valid. Akte kelahiran asli telah diverifikasi.",
    },
    {
      registrationNumber: "PPDB-2025-002",
      fullName: "Siti Aisyah Ramadhani",
      nisn: null,
      gender: "P",
      birthPlace: "Cimahi",
      birthDate: "2018-07-22",
      religion: "Islam",
      address: "Jl. Cihanjuang Raya No. 12, RT 05/RW 02",
      kelurahan: "Cihanjuang",
      kecamatan: "Parongpong",
      city: "Kabupaten Bandung Barat",
      province: "Jawa Barat",
      postalCode: "40559",
      parentName: "Rina Mulyani",
      parentRelation: "Ibu",
      parentPhone: "6285678901002",
      parentEmail: "rina.mulyani@yahoo.com",
      parentOccupation: "Guru SD Negeri",
      previousSchool: "TK Islam Terpadu Bina Insani",
      status: "pending" as const,
      adminNotes: null,
    },
    {
      registrationNumber: "PPDB-2025-003",
      fullName: "Ahmad Zaky Maulana",
      nisn: null,
      gender: "L",
      birthPlace: "Jakarta",
      birthDate: "2019-01-08",
      religion: "Islam",
      address: "Perumahan Cimahi Permai Blok C5 No. 8",
      kelurahan: "Cigugur Tengah",
      kecamatan: "Cimahi Tengah",
      city: "Kota Cimahi",
      province: "Jawa Barat",
      postalCode: "40522",
      parentName: "Dodi Irawan",
      parentRelation: "Ayah",
      parentPhone: "6282345678003",
      parentEmail: "dodi.irawan@gmail.com",
      parentOccupation: "Pegawai BUMN",
      previousSchool: null,
      status: "accepted" as const,
      adminNotes: "Semua berkas lengkap. Diterima jalur reguler.",
    },
  ];

  for (const reg of samples) {
    await db
      .insert(schema.ppdbRegistrations)
      .values({
        ...reg,
        nisn: reg.nisn ?? null,
        previousSchool: reg.previousSchool ?? null,
        adminNotes: reg.adminNotes ?? null,
      })
      .onConflictDoNothing();
  }
  console.log(`  ✅ ${samples.length} sample PPDB registrations seeded`);
}

// ============================================================
// MAIN SEED FUNCTION
// ============================================================
async function main() {
  console.log("🚀 Memulai proses seeding database SDS PARADAJI VI...\n");

  try {
    await seedSiteSettings();
    await seedTeachers();
    await seedFacilities();
    await seedExtracurriculars();
    await seedGalleries();
    await seedNews();
    await seedPpdbCounters();
    await seedSamplePpdbRegistrations();

    console.log("\n✅ Seeding database selesai!");
    console.log("📊 Ringkasan:");
    console.log("   - 13 site settings");
    console.log("   - 8 guru");
    console.log("   - 12 fasilitas");
    console.log("   - 6 ekstrakurikuler");
    console.log("   - 15 galeri");
    console.log("   - 5 berita/pengumuman");
    console.log("   - 1 ppdb counter (tahun ini)");
    console.log("   - 3 sample pendaftar PPDB");
  } catch (error) {
    console.error("❌ Error saat seeding:", error);
    process.exit(1);
  }
}

main();
