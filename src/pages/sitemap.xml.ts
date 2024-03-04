import axios from "axios";

const URL = 'http://localhost:3000'


function generateSiteMap(posts: { slug: string; updated_at: string; }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
   <loc>${URL}</loc>
   <priority>1</priority>
 </url>
 <url>
   <loc>${`${URL}/posts/`}</loc>
   <changefreq>weekly</changefreq>
   <priority>0.8</priority>
 </url>   
     ${posts
      .map((post: { slug: string; updated_at: string; }) => {
        return `
       <url>
           <loc>${`${URL}/posts/${post.slug}`}</loc>
           <lastmod>${post.updated_at}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.8</priority>           
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
}

export async function getServerSideProps({ res }: any) {
  const reqPosts = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/public/posts`)
  const resreqPosts = await reqPosts.data.data.data
  const sitemap = generateSiteMap(resreqPosts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;