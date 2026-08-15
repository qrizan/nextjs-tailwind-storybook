/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    // Optimasi gambar Next.js bekerja dengan MENGUNDUH gambarnya di sisi
    // server, lalu menyajikan hasilnya lewat /_next/image. Server itu berjalan
    // di dalam container `public`, tempat hostname publik `api.localhost`
    // tidak bisa di-resolve — DNS internal Docker tidak mengenalnya.
    //
    // Menambahkan api.localhost ke `domains`/`remotePatterns` tidak menolong:
    // daftar itu hanya mengizinkan, bukan membuat namanya bisa di-resolve.
    //
    // Dengan `unoptimized`, Next.js menaruh URL aslinya langsung di `src` dan
    // browser yang mengambilnya — browser tahu arti api.localhost. Tidak ada
    // pengunduhan dari dalam container sama sekali.
    //
    // Harganya: tidak ada penyesuaian ukuran maupun konversi WebP oleh Next.js.
    // Alternatifnya (network alias api.localhost + menyuntikkan root CA mkcert
    // ke image ini) sudah ditolak — lihat DECISION.md di repo news-article.
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
};

export default nextConfig;
