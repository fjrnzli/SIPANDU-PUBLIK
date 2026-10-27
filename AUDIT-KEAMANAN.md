# 🔒 AUDIT KEAMANAN — SIPANDU Publik

**Tanggal Audit:** 19 Oktober 2026  
**Auditor:** Antigravity AI (Senior Front-End Developer & Security Reviewer)  
**Project Asal:** SIPANDU (Panduan Pelayanan OJK - Internal Petugas)  
**Project Baru:** SIPANDU Publik (Informasi Layanan OJK untuk Masyarakat)

---

## 1. Temuan Data Sensitif pada Project Asli

| No | File Asal | Jenis Data Sensitif | Detail (Disensor) | Status |
|----|-----------|---------------------|---------------------|--------|
| 1 | `js/data.js` (baris 112) | **Password / Kredensial** | `password: "P@ss****"` — Password akun Gerai SLIK | ❌ Tidak disalin |
| 2 | `js/data.js` (baris 108-110) | **Username Internal** | `users: ["gerai1.****", "gerai2.****"]` — Akun Gerai SLIK | ❌ Tidak disalin |
| 3 | `js/data.js` (baris 107) | **Informasi Akun Internal** | Judul "Akun Gerai SLIK" beserta kredensialnya | ❌ Tidak disalin |
| 4 | `js/data.js` (baris 98-104) | **Prosedur Internal** | Section "Verifikasi" — langkah login ke Internal OJK | ❌ Tidak disalin |
| 5 | `js/data.js` (baris 409-416) | **Akses Internal APPK** | `aksesInternal` — link, alur, dan info akses APPK Internal untuk pegawai | ❌ Tidak disalin |
| 6 | `js/data.js` (baris 412) | **Info Login Internal** | `akses: "Menggunakan username & password pegawai"` | ❌ Tidak disalin |
| 7 | `js/data.js` (baris 414) | **Alur Kerja Internal** | Alur disposisi internal APPK (proses pegawai) | ❌ Tidak disalin |
| 8 | `js/data.js` (baris 86-96) | **Prosedur Internal** | Checklist persiapan petugas (buka iDebKu, WhatsApp OJK Kalsel, Rekap Data Pengunjung) | ❌ Tidak disalin |
| 9 | `js/data.js` (baris 71-84) | **Jadwal Internal** | Jadwal pelayanan internal FO (sesi pagi pegawai, sesi magang) | ❌ Tidak disalin |
| 10 | `js/main.js` (baris 280-281) | **Rendering Password** | Code yang menampilkan password akun ke halaman | ❌ Tidak disalin |
| 11 | `index.html` (baris 88) | **Label Internal** | Footer bertuliskan "Panduan internal petugas Front Office" | ❌ Tidak disalin |
| 12 | `index.html` (baris 44) | **Info Developer Internal** | Sidebar footer: info mahasiswa magang OJK Kalsel | ❌ Tidak disalin |
| 13 | `index.html` (baris 23-25) | **Halaman Internal** | Navigasi ke halaman "Getting Started" dan "Service Excellence" (panduan petugas) | ❌ Tidak disalin |
| 14 | `js/data.js` (baris 497-505) | **Catatan Petugas** | Section "Catatan untuk Petugas" pada APPK | ❌ Tidak disalin |
| 15 | `js/data.js` (baris 319-323) | **Akses IASC Internal** | Info akses IASC dengan catatan "Gunakan akses yang telah diberikan secara umum untuk pelayanan" | ❌ Tidak disalin |

---

## 2. Fitur/Halaman Internal yang TIDAK Disalin

| Fitur | Alasan |
|-------|--------|
| Halaman "Getting Started" | Berisi panduan internal petugas FO, jadwal shift, persiapan bertugas, akun login |
| Halaman "Service Excellence" | Berisi SOP pelayanan internal, script/skrip jawaban petugas, alur kerja internal |
| Section "Akun Gerai SLIK" | Berisi kredensial login (username & password) |
| Section "Verifikasi" | Berisi prosedur verifikasi internal OJK |
| Section "Catatan untuk Petugas" | Berisi panduan khusus petugas |
| Section "APPK Internal" | Berisi link dan alur akses APPK internal pegawai |
| Section "Akses IASC" (catatan internal) | Berisi info akses internal |
| Modal "Tambah FAQ" | Fitur editor untuk petugas |
| Modal "Edit Jawaban FAQ" | Fitur editor untuk petugas |
| Tombol "Salin Jawaban" | Fitur copy script jawaban petugas |
| Tombol "Edit Jawaban" | Fitur edit FAQ petugas |
| Tombol "+ Tambah FAQ" | Fitur petugas |
| localStorage custom FAQ | Fitur penyimpanan lokal petugas |
| Sidebar navigasi internal | Navigasi ke halaman-halaman petugas |

---

## 3. Pemindaian Ulang (Post-Build)

Pemindaian dilakukan setelah semua file SIPANDU Publik selesai dibuat.

**Kata kunci yang dipindai:**
`password`, `passwd`, `pwd`, `secret`, `token`, `apikey`, `api_key`, `credential`, `NIP`, `internal`, `admin`, `login`, `drive.google`, `docs.google`, `@ojk.go.id`, `gerai`, `P@ss`

**Hasil Pemindaian (19 Oktober 2026):**

| Kata Kunci | Hasil | Keterangan |
|------------|-------|------------|
| password, passwd, pwd | ✅ Bersih | Tidak ditemukan |
| secret, token, apikey, api_key, credential | ✅ Bersih | Tidak ditemukan |
| NIP, admin, login | ✅ Bersih | Tidak ditemukan |
| drive.google, docs.google | ✅ Bersih | Tidak ditemukan |
| gerai, P@ss | ✅ Bersih | Tidak ditemukan |
| internal | ⚠️ False positive | Ditemukan di FAQ: "kebijakan internal masing-masing" — merujuk ke kebijakan bank, BUKAN prosedur internal OJK. **Aman.** |
| @ojk.go.id | ⚠️ False positive | Ditemukan: `konsumen@ojk.go.id` — email resmi publik OJK untuk pengaduan konsumen. **Aman dan disengaja.** |

**Kesimpulan:** ✅ **LULUS** — Tidak ditemukan data sensitif atau informasi internal OJK pada project SIPANDU Publik.

---

## 4. Hal yang Perlu Dicek Manual oleh Pemilik

- [ ] Pastikan nomor Kontak OJK 157 masih aktif dan benar
- [ ] Pastikan WhatsApp resmi OJK 081-157-157-157 masih aktif
- [ ] Pastikan email konsumen@ojk.go.id masih aktif
- [ ] Pastikan link APPK External (kontak157.ojk.go.id/appkpublicportal) masih valid
- [ ] Pastikan link SIPASTI (sipasti.ojk.go.id) masih valid
- [ ] Review ulang seluruh konten FAQ apakah sudah sesuai kebijakan OJK terkini

---

## 5. Catatan Keamanan Tambahan

1. **Tidak ada password di sisi client** — Seluruh konten SIPANDU Publik adalah informasi umum yang boleh dilihat siapa saja.
2. **Tidak ada fitur login** — Website ini murni informasional, tidak ada area yang dilindungi password.
3. **Tidak ada data pegawai** — Tidak menyebut nama, NIP, atau kontak pegawai internal.
4. **Tidak ada sourcemap** — Build production tidak menghasilkan sourcemap.
5. **Security headers** dikonfigurasi di `vercel.json`.
