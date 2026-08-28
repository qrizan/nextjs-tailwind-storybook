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
    // Alternatifnya — network alias supaya api.localhost bisa di-resolve dari
    // dalam container — ditolak karena Node tetap akan menolak sertifikat yang
    // CA-nya tidak dipercaya, sehingga root CA development harus disuntikkan ke
    // dalam image ini.
    unoptimized: true,
  },
  experimental: {
    // Output file tracing over-includes @storybook/* build tooling (esbuild,
    // giget/tar) into .next/standalone: none of it is reachable from app
    // code, all of it is devDependency-only, but the tracer's static
    // require/import analysis doesn't know that. Confirmed via Trivy image
    // scan finding the esbuild binary (with its own outdated Go stdlib CVEs)
    // and tar physically present in the runner image. Excluded explicitly
    // instead of accepting the CVEs, since none of this should ship at all.
    outputFileTracingExcludes: {
      "/*": [
        "./node_modules/@storybook/**/*",
        "./node_modules/esbuild/**/*",
        "./node_modules/@esbuild/**/*",
        "./node_modules/giget/**/*",
        "./node_modules/tar/**/*",
      ],
    },
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
