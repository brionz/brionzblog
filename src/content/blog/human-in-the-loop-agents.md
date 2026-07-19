---
title: 'Human-in-the-Loop: Kapan Setuju, Kapan Biarkan Agen Berjalan'
description: 'Ambang kepercayaan, gerbang persetujuan, dan pola eskalasi—merancang momen intervensi manusia tanpa jadi penghambat.'
pubDate: 'Jul 22 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'karya'
featured: false
tags:
  - human-in-the-loop
  - automation
---

Human-in-the-loop (HITL) sering dipahami sebagai "minta izin dulu." Padahal keputusan utamanya bukan *apakah* meminta izin, melainkan *kapan*.

Terlalu sering meminta izin membuat agen tidak berguna. Terlalu jarang membuatnya berbahaya. Menemukan titik tengahnya adalah soal desain, bukan keberanian.

## Tiga tingkat kendali

### Automatic (tanpa konfirmasi)

Cocok untuk tindakan yang bisa dibatalkan (draft, baca data, usul) atau yang risikonya sangat rendah. Di sini kecepatan adalah tujuannya.

### Confirmation (konfirmasi eksplisit)

Untuk tindakan yang tidak bisa dibatalkan (kirim email, hapus data, setujui pembayaran) atau yang dampaknya masih belum bisa diprediksi penuh. Manusia melihat ringkasan lalu memutuskan.

### Escalation (serahkan ke manusia)

Saat agen tidak yakin, saat konteks bertentangan, atau saat biaya kesalahan terlalu tinggi. Eskalasi bukan kegagalan—ini desain yang sadar batas.

## Menentukan ambang

Ambang tidak perlu sempurna dari awal. Mulai dengan aturan sederhana:

- Tindakan baca: otomatis
- Tindakan tulis di area terbatas: otomatis tapi tercatat
- Tindakan tulis di area sensitif: konfirmasi
- Tindakan destruktif atau finansial: eskalasi

Lalu kendurkan atau kencangkan berdasarkan data. Jika tingkat eskalasi 90%, mungkin ambang terlalu ketat. Jika konfirmasi selalu "setujui," mungkin tak perlu konfirmasi.

## UX untuk konfirmasi

Antarmuka konfirmasi yang baik menunjukkan:

1. **Apa** yang akan dilakukan agen
2. **Dampak** yang diperkirakan
3. **Konteks** keputusan (mengapa agen memilih ini)
4. **Riwayat** tindakan sebelumnya di sesi ini

Tombol "setujui" dan "tolak" saja tidak cukup. Manusia perlu bisa mengubah instruksi, bukan sekadar memberi izin.

## Deteksi saat manusia tidak ada

Agent tidak boleh berhenti total saat manusia offline. Rancang mode antisipasi: kumpulkan keputusan yang tertunda, jalankan yang otomatis, dan beri ringkasan saat manusia kembali.

## Pola yang sering gagal

- **Minta izin untuk semuanya.** Agen jadi beban, bukan pembantu.
- **Tidak ada mode darurat.** Saat konfirmasi tidak sampai, agen macet.
- **Ringkasan terlalu panjang.** Manusia membaca tiga paragraf untuk menekan satu tombol.

## Prinsip penutup

Makin tinggi otonomi agen, makin penting kualitas intervensi manusia. Bukan frekuensi intervensi yang membuat sistem aman, melainkan ketepatan momennya. Rancang HITL seperti merancang tombol darurat: jarang dipakai, tapi sangat jelas saat harus dipakai.