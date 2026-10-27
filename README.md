# SIPANDU Publik

**Layanan Informasi OJK untuk Masyarakat**

Website informasi publik yang menyediakan panduan layanan OJK untuk masyarakat umum — pengaduan konsumen, pengecekan riwayat kredit (SLIK), waspada investasi ilegal, dan tanya jawab seputar layanan keuangan.

> ⚠️ Project ini adalah versi **publik** yang terpisah dari SIPANDU (versi internal petugas). Tidak mengandung data sensitif, kredensial, atau prosedur internal.

---

## 🚀 Cara Menjalankan Lokal

Project ini adalah website statis (HTML + CSS + JS), tidak memerlukan build tool.

### Opsi 1: Python HTTP Server
```bash
cd "SIPANDU PUBLIK"
python3 -m http.server 8080
```
Buka `http://localhost:8080` di browser.

### Opsi 2: VS Code Live Server
1. Install extension "Live Server" di VS Code
2. Klik kanan pada `index.html` → "Open with Live Server"

### Opsi 3: Node.js
```bash
npx -y serve .
```

---

## 📝 Cara Mengedit FAQ

Data FAQ tersimpan di file `data/faq.public.json`. Format setiap entry:

```json
{
  "id": 1,
  "kategori": "Pengecekan Riwayat Kredit (SLIK)",
  "pertanyaan": "Pertanyaan di sini?",
  "jawaban": "Jawaban lengkap di sini."
}
```

### Langkah mengedit:
1. Buka file `data/faq.public.json`
2. Untuk **menambah FAQ baru**: salin salah satu objek, ubah `id` (harus unik), `kategori`, `pertanyaan`, dan `jawaban`
3. Untuk **mengedit FAQ**: cari berdasarkan `id`, ubah isi yang diinginkan
4. Untuk **menghapus FAQ**: hapus objek yang dimaksud
5. Simpan file, refresh browser

### Kategori yang tersedia:
- `Pengecekan Riwayat Kredit (SLIK)`
- `Pengaduan Konsumen`
- `Penipuan & Keamanan`
- `Kredit & Pinjaman`

> Untuk menambah kategori baru, cukup tulis nama kategori di field `kategori`. Filter otomatis muncul.

---

## 🌐 Cara Deploy ke Vercel

### Pertama kali:
1. Push repository ke GitHub/GitLab/Bitbucket
2. Buka [vercel.com](https://vercel.com) dan login
3. Klik "New Project" → Import repository ini
4. **Penting**: pastikan ini adalah project Vercel **baru**, jangan sambungkan ke project SIPANDU yang lama
5. Framework Preset: pilih "Other" (static site)
6. Klik "Deploy"

### Update:
Setiap push ke branch `main` akan otomatis di-deploy oleh Vercel.

### Custom domain:
1. Di dashboard Vercel project → Settings → Domains
2. Tambahkan domain yang diinginkan
3. Update `robots.txt` dan `sitemap.xml` dengan domain baru

---

## 🔒 Keamanan

- Tidak mengandung data sensitif, kredensial, atau informasi internal
- Security headers dikonfigurasi di `vercel.json` (CSP, X-Frame-Options, dll.)
- Tidak ada fitur login atau area terlindungi
- Lihat `AUDIT-KEAMANAN.md` untuk detail audit

---

## 📁 Struktur File

```
SIPANDU PUBLIK/
├── index.html              # Halaman utama
├── css/
│   └── style.css           # Stylesheet
├── js/
│   └── app.js              # Logic (navigasi, FAQ, animasi)
├── data/
│   └── faq.public.json     # Data FAQ (mudah diedit)
├── assets/
│   └── favicon.png         # Favicon OJK
├── vercel.json             # Konfigurasi deploy & security headers
├── robots.txt              # Izin crawler
├── sitemap.xml             # Peta situs untuk SEO
├── AUDIT-KEAMANAN.md       # Laporan audit keamanan
├── README.md               # Dokumentasi ini
└── .gitignore              # File yang diabaikan git
```

---

## 📞 Kontak Resmi OJK

| Kanal | Info |
|-------|------|
| Telepon | Kontak OJK **157** |
| WhatsApp | **081-157-157-157** |
| Email | konsumen@ojk.go.id |
| Website | [ojk.go.id](https://www.ojk.go.id) |
| APPK | [kontak157.ojk.go.id](https://kontak157.ojk.go.id/appkpublicportal/) |
| SIPASTI | [sipasti.ojk.go.id](https://sipasti.ojk.go.id/) |
| IASC | [iasc.ojk.go.id](https://iasc.ojk.go.id/) |
