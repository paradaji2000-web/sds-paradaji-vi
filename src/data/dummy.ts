export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: "Berita" | "Kegiatan" | "Pengumuman";
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface TeacherItem {
  id: string;
  name: string;
  role: string;
  subject: string;
  education: string;
  bio: string;
  imageUrl: string;
  order: number;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: "Ruang Belajar" | "Olahraga & Ibadah" | "Penunjang";
  description: string;
  imageUrl: string;
  features: string[];
}

export interface ExtracurricularItem {
  id: string;
  name: string;
  category: "Keagamaan" | "Akademik & Teknologi" | "Olahraga & Seni" | "Kepemimpinan";
  description: string;
  schedule: string;
  coach: string;
  imageUrl: string;
  achievements: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  category: "Kegiatan" | "Fasilitas" | "Prestasi" | "Keagamaan";
  imageUrl: string;
  date: string;
}

export interface TestimonialItem {
  id: string;
  parentName: string;
  studentName: string;
  grade: string;
  content: string;
  avatarUrl: string;
}

export interface PPDBRegistration {
  id: string;
  registrationNumber: string;
  fullName: string;
  nickname: string;
  gender: "Laki-laki" | "Perempuan";
  nik: string;
  birthPlace: string;
  birthDate: string;
  religion: string;
  previousSchool: string;
  parentName: string;
  parentJob: string;
  parentPhone: string;
  address: string;
  status: "pending" | "verified" | "accepted" | "rejected";
  createdAt: string;
  adminNotes?: string;
  documents: {
    kk: boolean;
    akta: boolean;
    foto: boolean;
    ijazahTk: boolean;
  };
}

export const schoolInfo = {
  name: "SDS PARADAJI VI",
  shortName: "SDS Paradjai VI",
  tagline: "Sekolah Dasar Berkarakter Islami, Cerdas, dan Berakhlak Mulia",
  motto: "Membentuk Generasi Berakhlak Mulia, Cerdas, dan Berprestasi",
  address: "Jl. Paradjai No. 6, Cilandak, Jakarta Selatan, DKI Jakarta 12430",
  phone: "0812-3456-7890",
  landline: "(021) 7590-1234",
  whatsapp: "6281234567890",
  email: "kontak@sdsparadjai6.sch.id",
  npsn: "20108976",
  accreditation: "A (Unggul)",
  operationalHours: "Senin - Jumat: 07.00 - 15.30 WIB",
  headmaster: {
    name: "Hj. Siti Nurhaliza, M.Pd.",
    welcomeMessage:
      "Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SDS Paradjai VI. Kami berkomitmen menyelenggarakan pendidikan dasar yang seimbang antara kecerdasan intelektual, kematangan emosional, dan keluhuran akhlak Islami. Di era globalisasi ini, anak-anak kami bimbing untuk memiliki literasi digital yang sehat, kecintaan pada Al-Qur'an, dan rasa percaya diri tinggi dalam meraih prestasi.",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  },
};

export const newsList: NewsItem[] = [
  {
    id: "news-1",
    slug: "siswa-sds-paradjai-vi-raih-juara-1-cerdas-cermat-tingkat-kota",
    title: "Siswa SDS Paradjai VI Raih Juara 1 Lomba Cerdas Cermat Islami Tingkat Jakarta Selatan",
    category: "Berita",
    author: "Ust. Ahmad Fauzan, S.Pd.I",
    date: "2025-02-15",
    isFeatured: true,
    excerpt:
      "Tim cerdas cermat SDS Paradjai VI berhasil mengungguli 24 sekolah lainnya dalam ajang festival anak shaleh tahun 2025 dengan skor akhir memukau.",
    content: `
      Prestasi membanggakan kembali diukir oleh murid-murid berprestasi SDS Paradjai VI. Dalam Festival Anak Shaleh & Prestasi Islam tingkat Kota Administrasi Jakarta Selatan yang diselenggarakan pada hari Sabtu lalu, tim perwakilan sekolah berhasil menyabet Juara 1 Lomba Cerdas Cermat Islami.
      
      Tim yang beranggotakan Muhammad Rayyan (Kelas 5A), Zahra Aulia (Kelas 5B), dan Fatih Al-Habsyi (Kelas 4A) tampil solid sejak babak penyisihan hingga babak final yang penuh ketegangan. Pertanyaan seputar sejarah peradaban Islam, hukum tajwid, pengetahuan umum sains, dan hafalan juz 30 berhasil dijawab dengan tenang dan tangkas.
      
      Kepala Sekolah SDS Paradjai VI, Ibu Hj. Siti Nurhaliza, M.Pd., mengungkapkan rasa syukur dan apresiasinya: "Kemenangan ini adalah buah dari ketekunan para murid dalam program mentoring tahfidz dan bimbingan sains harian kami. Kami senantiasa memfasilitasi setiap potensi ananda agar tumbuh percaya diri."
    `,
    imageUrl:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    tags: ["Prestasi", "Akademik", "Cerdas Cermat", "Islami"],
  },
  {
    id: "news-2",
    slug: "pemberitahuan-jadwal-ppdb-tahun-ajaran-2025-2026",
    title: "Pemberitahuan Resmi: Pembukaan PPDB Tahun Ajaran 2025/2026 Jalur Reguler & Prestasi",
    category: "Pengumuman",
    author: "Panitia PPDB 2025",
    date: "2025-02-01",
    isFeatured: true,
    excerpt:
      "Pendaftaran Peserta Didik Baru (PPDB) SDS Paradjai VI Tahun Ajaran 2025/2026 resmi dibuka mulai tanggal 10 Februari 2025. Kuota terbatas 60 siswa.",
    content: `
      Panitia Penerimaan Peserta Didik Baru (PPDB) SDS Paradjai VI mengumumkan secara resmi dibukanya pendaftaran untuk tahun pelajaran 2025/2026. Mengingat komitmen sekolah dalam menjaga rasio guru dan murid ideal (maksimal 28 murid per kelas), tahun ini SDS Paradjai VI hanya membuka 2 rombongan belajar dengan total kuota 60 murid baru.
      
      Pendaftaran dapat dilakukan secara online melalui portal resmi ini pada menu PPDB Online. Calon wali murid dapat mengisi formulir digital, mengunggah berkas identitas, dan langsung melakukan konfirmasi otomatis melalui nomor WhatsApp resmi panitia.
      
      Jadwal Gelombang 1 dibuka mulai 10 Februari hingga 31 Maret 2025 dengan fasilitas gratis seragam olahraga dan bebas biaya formulir bagi 20 pendaftar pertama yang berkasnya terverifikasi.
    `,
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    tags: ["PPDB", "Pengumuman", "Pendaftaran", "Tahun Ajaran Baru"],
  },
  {
    id: "news-3",
    slug: "kegiatan-kemah-pramuka-siaga-dan-edukasi-alam-kebun-raya",
    title: "Keseruan Persari Pramuka Siaga SDS Paradjai VI: Menanam Karakter Mandiri Sejak Dini",
    category: "Kegiatan",
    author: "Kak Bambang Hendarto, S.Pd.",
    date: "2025-01-20",
    excerpt:
      "Sebanyak 110 murid kelas 1-3 mengikuti kegiatan Perkemahan Satu Hari (Persari) Pramuka Siaga dengan agenda jelajah rintangan dan bakti lingkungan.",
    content: `
      Keceriaan terpancar dari wajah para murid SDS Paradjai VI saat mengikuti kegiatan Perkemahan Satu Hari (Persari) Gugus Depan SDS Paradjai VI. Kegiatan ini mengusung tema 'Siaga Berani, Terampil, dan Berbudi Luhur'.
      
      Berbagai lomba ketangkasan regu diadakan, mulai dari lomba memasang tenda mini, mengenal simpul tali dasar, estafet air kejujuran, hingga pentas seni islami. Melalui kegiatan ini, siswa dilatih kemandirian, kerja sama kelompok, dan kepekaan terhadap kebersihan lingkungan sekitar.
    `,
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    tags: ["Pramuka", "Karakter", "Kegiatan Luar Kelas"],
  },
  {
    id: "news-4",
    slug: "peluncuran-program-tahfidz-dan-tahsin-metode-ummi-terpadu",
    title: "Tingkatkan Kualitas Bacaan Al-Qur'an, SDS Paradjai VI Luncurkan Program Terpadu Metode Ummi",
    category: "Kegiatan",
    author: "Ustazah Nurul Hidayah, Lc.",
    date: "2025-01-10",
    excerpt:
      "Penerapan metode Ummi yang menyenangkan dan terukur diresmikan untuk memastikan lulusan SDS Paradjai VI hafal minimal 2 Juz dan fasih bertajwid.",
    content: `
      Sebagai ikhtiar mencetak generasi qur'ani, SDS Paradjai VI secara resmi mengintegrasikan Metode Ummi dalam kurikulum pembinaan Al-Qur'an harian. Melalui metode ini, proses pembelajaran membaca dan menghafal Al-Qur'an disesuaikan dengan psikologi perkembangan anak melalui pendekatan kasih sayang, nada tartil yang mudah dipelajari, dan evaluasi berkala bersama orang tua.
    `,
    imageUrl:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800",
    tags: ["Tahfidz", "Kurikulum", "Islami"],
  },
  {
    id: "news-5",
    slug: "sosialisasi-gaya-hidup-sehat-dan-dokter-kecil-bersama-puskesmas",
    title: "Edukasi Gizi Seimbang & Pelantikan Dokter Kecil Angkatan 2025",
    category: "Kegiatan",
    author: "Ibu Rahmawati, S.K.M.",
    date: "2024-12-18",
    excerpt:
      "Bekerjasama dengan Puskesmas Kecamatan, 20 siswa perwakilan dilantik menjadi duta kesehatan sekolah yang peduli jajanan sehat dan P3K.",
    content: `
      Kesehatan fisik anak adalah fondasi utama keberhasilan belajar di kelas. SDS Paradjai VI bekerjasama dengan tim medis Puskesmas mengadakan pelatihan intensif Dokter Kecil selama dua hari, mencakup penanganan luka ringan, pengukuran tinggi dan berat badan berkala, serta kampanye cuci tangan 6 langkah pakai sabun.
    `,
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
    tags: ["UKS", "Dokter Kecil", "Kesehatan"],
  },
];

export const teachersList: TeacherItem[] = [
  {
    id: "teacher-1",
    name: "Hj. Siti Nurhaliza, M.Pd.",
    role: "Kepala Sekolah",
    subject: "Manajemen Pendidikan Dasar",
    education: "S2 Manajemen Pendidikan - Universitas Negeri Jakarta",
    bio: "Berpengalaman lebih dari 18 tahun dalam tata kelola sekolah dasar unggulan dan peraih penghargaan Kepala Sekolah Berprestasi Tingkat DKI.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    order: 1,
  },
  {
    id: "teacher-2",
    name: "Ust. Ahmad Fauzan, S.Pd.I",
    role: "Wakil Kepala Sekolah Bidang Kesiswaan",
    subject: "Pendidikan Agama Islam & Bahasa Arab",
    education: "S1 Pendidikan Agama Islam - UIN Syarif Hidayatullah",
    bio: "Mengampu pembinaan akhlak, kepramukaan, dan koordinator harian pembiasaan salat dhuha serta dzikir pagi bagi murid-murid.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    order: 2,
  },
  {
    id: "teacher-3",
    name: "Rina Kusumawardani, S.Pd.",
    role: "Koordinator Kurikulum & Guru Kelas 1",
    subject: "Tematik Terpadu & Calistung Ramah Anak",
    education: "S1 PGSD - Universitas Pendidikan Indonesia",
    bio: "Pakar transisi PAUD-SD yang menerapkan pembelajaran berbasis bermain (play-based learning) sehingga murid kelas 1 ceria dan tidak stres.",
    imageUrl:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=400",
    order: 3,
  },
  {
    id: "teacher-4",
    name: "Bambang Hendarto, S.Pd.",
    role: "Guru PJOK & Pembina Pramuka",
    subject: "Pendidikan Jasmani, Olahraga, & Kesehatan",
    education: "S1 Pendidikan Jasmani - Universitas Negeri Jakarta",
    bio: "Pelatih berlisensi atletik pelajar dan pembina pramuka teladan yang fokus pada kebugaran motorik serta sportivitas anak.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    order: 4,
  },
  {
    id: "teacher-5",
    name: "Ustazah Nurul Hidayah, Lc.",
    role: "Koordinator Program Tahfidz",
    subject: "Tahsin & Tahfidz Al-Qur'an (Metode Ummi)",
    education: "S1 Syariah - Universitas Al-Azhar Kairo (Mesir)",
    bio: "Pemegang sanad hafalan Al-Qur'an 30 Juz dan trainer tersertifikasi Ummi Foundation dengan pendekatan sabar dan telaten bagi anak usia dini.",
    imageUrl:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    order: 5,
  },
  {
    id: "teacher-6",
    name: "Dedi Suhendar, S.Kom., M.Cs.",
    role: "Guru TIK & Pembina Robotik",
    subject: "Informatika Dasar & Coding Cilik",
    education: "S2 Ilmu Komputer - Institut Teknologi Bandung",
    bio: "Mengenalkan logika komputasi dan pemrograman visual Scratch sejak dini agar murid menjadi pencipta teknologi, bukan sekadar konsumen.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    order: 6,
  },
  {
    id: "teacher-7",
    name: "Dewi Lestari, S.Pd.",
    role: "Guru Bahasa Inggris & Literasi",
    subject: "English for Kids & Public Speaking",
    education: "S1 Pendidikan Bahasa Inggris - Universitas Negeri Semarang",
    bio: "Membangun kepercayaan diri murid dalam berkomunikasi bahasa Inggris aktif melalui metode storytelling, lagu interaktif, dan drama kelas.",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    order: 7,
  },
  {
    id: "teacher-8",
    name: "Agus Prasetyo, S.Pd.",
    role: "Guru IPA & Koordinator Sains Club",
    subject: "Ilmu Pengetahuan Alam & Eksperimen Cilik",
    education: "S1 Pendidikan Biologi - UIN Walisongo",
    bio: "Menghadirkan pembelajaran sains seru melalui eksperimen praktikum langsung, penjelajahan kebun sekolah, dan hidroponik mini.",
    imageUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400",
    order: 8,
  },
];

export const facilitiesList: FacilityItem[] = [
  {
    id: "fac-1",
    name: "Ruang Kelas Ber-AC & Proyektor Interaktif",
    category: "Ruang Belajar",
    description:
      "Setiap ruang kelas dilengkapi pendingin udara (AC), Smart TV/Proyektor layar lebar, pencahayaan alami optimal, dan meja-kursi ergonomis yang mendukung kerja kelompok dinamis.",
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
    features: ["AC Daikin 2 PK", "Proyektor Full HD", "CCTV 24 Jam", "Maksimal 28 Siswa"],
  },
  {
    id: "fac-2",
    name: "Laboratorium Komputer & Multimedia",
    category: "Ruang Belajar",
    description:
      "Lab komputer modern dengan 32 unit PC all-in-one terkoneksi internet filter sehat untuk pembelajaran coding dasar Scratch, literasi digital, dan tes berbasis komputer (ANBK).",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    features: ["32 Unit PC Core i5", "Internet Fiber Optic 100 Mbps", "Software Edukasi Lengkap"],
  },
  {
    id: "fac-3",
    name: "Perpustakaan Ramah Anak & Pojok Baca Digital",
    category: "Penunjang",
    description:
      "Koleksi lebih dari 3.500 buku anak, ensiklopedia bergambar, buku cerita islami, dan tablet baca digital dalam ruangan nyaman beralaskan karpet santai.",
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
    features: ["3.500+ Judul Buku", "Pojok Dongeng", "Sirkulasi Peminjaman Digital", "Ruang Hening"],
  },
  {
    id: "fac-4",
    name: "Musholla Al-Barokah Sekolah",
    category: "Olahraga & Ibadah",
    description:
      "Tempat ibadah bersih dan berkarpet tebal yang menjadi pusat pelaksanaan sholat dzuhur berjamaah, mentoring tahfidz Al-Qur'an, dan kajian keputrian.",
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    features: ["Kapasitas 150 Jamaah", "Tempat Wudhu Terpisah", "Sound System Tartil", "AC Dingin"],
  },
  {
    id: "fac-5",
    name: "Lapangan Olahraga Multifungsi",
    category: "Olahraga & Ibadah",
    description:
      "Lapangan berlantai khusus anti-slip untuk upacara bendera, senam irama pagi, pertandingan futsal, bola voli mini, basket, dan kegiatan kepramukaan.",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    features: ["Standar Futsal & Basket", "Pagar Pelindung Aman", "Tribun Mini Murid"],
  },
  {
    id: "fac-6",
    name: "Ruang UKS & Fasilitas Dokter Kecil",
    category: "Penunjang",
    description:
      "Ruang perawatan medis pertama yang bersih, dilengkapi tempat tidur istirahat medis, alat ukur gizi, obat-obatan P3K standar, dan perawat jaga.",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    features: ["3 Tempat Tidur Periksa", "Tabung Oksigen", "Kerjasama Puskesmas", "Timbangan Digital"],
  },
];

export const extracurricularList: ExtracurricularItem[] = [
  {
    id: "ekskul-1",
    name: "Tahfidz & Tilawah Al-Qur'an",
    category: "Keagamaan",
    description:
      "Program bimbingan menghafal Al-Qur'an juz 30 dan juz 29 dengan talaqqi langsung bersama asatidz bersanad, disertai pemantapan tajwid dan makhorijul huruf.",
    schedule: "Setiap Selasa & Kamis, 15.30 - 17.00 WIB",
    coach: "Ustazah Nurul Hidayah, Lc.",
    imageUrl:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
    achievements: ["Juara 1 MHQ Tingkat Kota 2024", "Kelulusan 45 Siswa Wisuda Tahfidz"],
  },
  {
    id: "ekskul-2",
    name: "Pramuka Siaga & Penggalang",
    category: "Kepemimpinan",
    description:
      "Wadah pembentukan karakter mandiri, cinta tanah air, survival skill, kepedulian sosial, dan kekompakan kelompok melalui penjelajahan dan perkemahan berkala.",
    schedule: "Setiap Jumat, 14.00 - 15.30 WIB",
    coach: "Kak Bambang Hendarto, S.Pd.",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    achievements: ["Regu Tergiat Jambore Ranting 2024", "Juara 2 Lomba Yel-Yel Kreatif"],
  },
  {
    id: "ekskul-3",
    name: "Robotik & Coding Cilik (Scratch)",
    category: "Akademik & Teknologi",
    description:
      "Melatih cara berpikir komputasi, merakit kit robot edukatif berbasis sensor, dan membuat game edukatif sederhana dengan bahasa visual Scratch.",
    schedule: "Setiap Rabu, 15.30 - 17.00 WIB",
    coach: "Dedi Suhendar, S.Kom., M.Cs.",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    achievements: ["Finalis Olimpiade Robotik Pelajar Nasional 2024"],
  },
  {
    id: "ekskul-4",
    name: "Futsal Garuda Cilik",
    category: "Olahraga & Seni",
    description:
      "Mengasah kebugaran jasmani, koordinasi motorik kasar, teknik menggiring dan menembak bola, serta menanamkan nilai sportivitas antar tim.",
    schedule: "Setiap Sabtu, 07.30 - 09.30 WIB",
    coach: "Coach Rian Hidayat (Lisensi D PSSI)",
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    achievements: ["Juara 2 Turnamen Antar SD Se-Jakarta Selatan 2024"],
  },
  {
    id: "ekskul-5",
    name: "Seni Tari Tradisional & Saman",
    category: "Olahraga & Seni",
    description:
      "Menumbuhkan kecintaan terhadap warisan budaya nusantara melalui gerak tari kreasi daerah, tari Saman Aceh, dan tari Betawi.",
    schedule: "Setiap Senin, 15.30 - 17.00 WIB",
    coach: "Ibu Ayu Lestari, S.Sn.",
    imageUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
    achievements: ["Penyaji Terbaik FLS2N Tingkat Kecamatan"],
  },
  {
    id: "ekskul-6",
    name: "Dokter Kecil & Palang Merah (PMR Mula)",
    category: "Kepemimpinan",
    description:
      "Pelatihan dasar pertolongan pertama pada kecelakaan (P3K), kampanye gizi sehat, kebersihan diri, dan pendampingan teman sebaya di UKS.",
    schedule: "Setiap Kamis, 14.00 - 15.30 WIB",
    coach: "Ibu Rahmawati, S.K.M.",
    imageUrl:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    achievements: ["Duta Sekolah Sehat Tingkat Kota"],
  },
];

export const testimonialsList: TestimonialItem[] = [
  {
    id: "testi-1",
    parentName: "Bapak Hendra Gunawan",
    studentName: "Muhammad Al-Fatih",
    grade: "Kelas 4",
    content:
      "Perkembangan karakter anak saya luar biasa sejak masuk SDS Paradjai VI. Dulu pemalu dan sulit diajak mengaji, sekarang setiap maghrib sudah inisiatif membaca Al-Qur'an dan hafalannya lancar. Gurunya sangat mengayomi dan komunikatif ke orang tua.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "testi-2",
    parentName: "Ibu Dr. Maya Kartika",
    studentName: "Naila Syahira",
    grade: "Kelas 2",
    content:
      "Sebagai orang tua yang bekerja, saya sangat tenang menitipkan putri saya di sekolah ini. Lingkungannya aman, bersih, dan ramah anak. Program calistungnya tidak membebani tapi hasilnya nyata, anak saya gemar membaca buku cerita sendiri.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "testi-3",
    parentName: "Bapak Ir. Agus Wibowo",
    studentName: "Kenzi Danendra",
    grade: "Kelas 5",
    content:
      "Ekskul robotik dan sainsnya sangat menarik! Kenzi dilatih berpikir kritis dan berhasil ikut kejuaraan robotik pelajar. Fasilitas lab komputernya juga sangat representatif untuk anak SD zaman sekarang.",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "gal-1",
    title: "Upacara Bendera Hari Senin — Pembacaan Janji Siswa",
    category: "Kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600",
    date: "2025-02-17",
  },
  {
    id: "gal-2",
    title: "Lomba Cerdas Cermat Islami Tingkat Kota",
    category: "Prestasi",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    date: "2025-02-15",
  },
  {
    id: "gal-3",
    title: "Kegiatan Tahfidz Pagi di Musholla Al-Barokah",
    category: "Keagamaan",
    imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=600",
    date: "2025-02-10",
  },
  {
    id: "gal-4",
    title: "Praktikum Sains Cilik — Eksperimen Gunung Berapi Mini",
    category: "Kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
    date: "2025-02-08",
  },
  {
    id: "gal-5",
    title: "Persari Pramuka Siaga — Jelajah Rintangan dan Yel-Yel",
    category: "Kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    date: "2025-01-20",
  },
  {
    id: "gal-6",
    title: "Ruang Kelas Ber-AC dengan Proyektor Interaktif",
    category: "Fasilitas",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    date: "2025-01-15",
  },
  {
    id: "gal-7",
    title: "Latihan Futsal Garuda Cilik di Lapangan Multifungsi",
    category: "Kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
    date: "2025-01-10",
  },
  {
    id: "gal-8",
    title: "Pelantikan Dokter Kecil Angkatan 2025",
    category: "Prestasi",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    date: "2024-12-18",
  },
  {
    id: "gal-9",
    title: "Perpustakaan Ramah Anak — Pojok Baca Digital",
    category: "Fasilitas",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600",
    date: "2024-12-10",
  },
  {
    id: "gal-10",
    title: "Pentas Seni Tari Saman Peringatan Maulid Nabi",
    category: "Keagamaan",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600",
    date: "2024-12-05",
  },
  {
    id: "gal-11",
    title: "Wisuda Tahfidz 45 Siswa Hafal Juz 30",
    category: "Prestasi",
    imageUrl: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=600",
    date: "2024-11-28",
  },
  {
    id: "gal-12",
    title: "Kelas Coding Cilik dengan Scratch — Lab Komputer",
    category: "Kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    date: "2024-11-20",
  },
];

export const dummyRegistrations: PPDBRegistration[] = [
  {
    id: "reg-1",
    registrationNumber: "PPDB-2025-0001",
    fullName: "Muhammad Rayyan Pratama",
    nickname: "Rayyan",
    gender: "Laki-laki",
    nik: "3174091204180001",
    birthPlace: "Jakarta",
    birthDate: "2018-04-12",
    religion: "Islam",
    previousSchool: "TK Islam Al-Ikhlas",
    parentName: "Bambang Pratama",
    parentJob: "Pegawai Swasta",
    parentPhone: "081298765432",
    address: "Jl. Fatmawati Raya No. 45, Cilandak Barat, Jakarta Selatan",
    status: "accepted",
    createdAt: "2025-02-11T08:30:00Z",
    adminNotes: "Berkas lengkap dan sesuai kriteria usia. Lolos verifikasi.",
    documents: { kk: true, akta: true, foto: true, ijazahTk: true },
  },
  {
    id: "reg-2",
    registrationNumber: "PPDB-2025-0002",
    fullName: "Aisyah Putri Maharani",
    nickname: "Aisyah",
    gender: "Perempuan",
    nik: "3174095508180002",
    birthPlace: "Jakarta",
    birthDate: "2018-08-15",
    religion: "Islam",
    previousSchool: "TK Aisyiyah Bustanul Athfal 02",
    parentName: "Dedi Irawan",
    parentJob: "Wiraswasta",
    parentPhone: "081311223344",
    address: "Jl. Margaguna No. 12, Pondok Indah, Jakarta Selatan",
    status: "verified",
    createdAt: "2025-02-12T09:15:00Z",
    adminNotes: "Menunggu jadwal wawancara pemetaan minat dan observasi santai.",
    documents: { kk: true, akta: true, foto: true, ijazahTk: true },
  },
  {
    id: "reg-3",
    registrationNumber: "PPDB-2025-0003",
    fullName: "Fathan Bilal Ramadhan",
    nickname: "Fathan",
    gender: "Laki-laki",
    nik: "3174092005180003",
    birthPlace: "Depok",
    birthDate: "2018-05-20",
    religion: "Islam",
    previousSchool: "RA Al-Hikmah",
    parentName: "Irwan Susanto",
    parentJob: "Aparatur Sipil Negara",
    parentPhone: "085698761234",
    address: "Jl. Terogong No. 8, Cilandak Barat, Jakarta Selatan",
    status: "pending",
    createdAt: "2025-02-14T14:20:00Z",
    adminNotes: "Menunggu verifikasi pas foto ukuran 3x4.",
    documents: { kk: true, akta: true, foto: false, ijazahTk: true },
  },
  {
    id: "reg-4",
    registrationNumber: "PPDB-2025-0004",
    fullName: "Zahra Shakila Anindita",
    nickname: "Zahra",
    gender: "Perempuan",
    nik: "3174096110180004",
    birthPlace: "Jakarta",
    birthDate: "2018-10-21",
    religion: "Islam",
    previousSchool: "TK Pertiwi",
    parentName: "Hendra Wijaya",
    parentJob: "Karyawan BUMN",
    parentPhone: "087811998877",
    address: "Jl. Gaharu II No. 19, Cipete Selatan, Jakarta Selatan",
    status: "rejected",
    createdAt: "2025-02-15T11:00:00Z",
    adminNotes: "Usia calon murid belum mencukupi batas minimal 6 tahun per Juli 2025.",
    documents: { kk: true, akta: true, foto: true, ijazahTk: false },
  },
  {
    id: "reg-5",
    registrationNumber: "PPDB-2025-0005",
    fullName: "Fajar Nugraha Saputra",
    nickname: "Fajar",
    gender: "Laki-laki",
    nik: "3174090703180005",
    birthPlace: "Tangerang",
    birthDate: "2018-03-07",
    religion: "Islam",
    previousSchool: "TK Mutiara Hati",
    parentName: "Suryono",
    parentJob: "Pedagang",
    parentPhone: "081233445566",
    address: "Jl. RS Fatmawati Kav. 88, Cilandak, Jakarta Selatan",
    status: "accepted",
    createdAt: "2025-02-16T10:45:00Z",
    adminNotes: "Penerima beasiswa prestasi jalur tahfidz 1 Juz. Diterima langsung.",
    documents: { kk: true, akta: true, foto: true, ijazahTk: true },
  },
];

export const ppdbFaqList = [
  {
    question: "Berapa batas usia minimal untuk mendaftar kelas 1 di SDS Paradjai VI?",
    answer:
      "Berdasarkan pedoman dinas pendidikan, usia prioritas adalah minimal 7 tahun pada tanggal 1 Juli tahun ajaran berjalan. Namun anak berusia minimal 6 tahun pada tanggal 1 Juli tetap dapat mendaftar dan dipertimbangkan berdasarkan kesiapan psikologis serta daya tampung kelas.",
  },
  {
    question: "Apa saja dokumen yang wajib diunggah pada formulir PPDB online?",
    answer:
      "Dokumen yang perlu disiapkan antara lain: (1) Scan/Foto Kartu Keluarga (KK), (2) Scan/Foto Akta Kelahiran, (3) Pas foto warna anak ukuran 3x4 berlatar merah/biru, dan (4) Surat Tanda Tamat Belajar TK/RA (opsional/bisa menyusul).",
  },
  {
    question: "Bagaimana cara melakukan konfirmasi setelah formulir online dikirim?",
    answer:
      "Setelah mengisi formulir, sistem akan menampilkan nomor registrasi unik Anda beserta tombol instan 'Kirim Data ke WhatsApp Admin'. Cukup klik tombol tersebut, dan pesan WhatsApp yang memuat ringkasan data pendaftaran akan otomatis terisi dan siap dikirim ke panitia sekolah.",
  },
  {
    question: "Apakah ada tes seleksi akademik tertulis bagi calon murid baru?",
    answer:
      "Tidak ada tes baca, tulis, dan hitung (calistung) yang membebani anak. SDS Paradjai VI hanya melakukan observasi perkembangan motorik santai dan wawancara keramahan keluarga untuk memetakan gaya belajar ananda secara personal.",
  },
  {
    question: "Kapan pengumuman hasil verifikasi dan penerimaan dirilis?",
    answer:
      "Status verifikasi berkas diperbarui dalam 1-3 hari kerja. Calon wali murid dapat mengecek status secara mandiri kapan saja melalui menu 'Cek Status PPDB' dengan memasukkan nomor registrasi dan tanggal lahir anak.",
  },
];
