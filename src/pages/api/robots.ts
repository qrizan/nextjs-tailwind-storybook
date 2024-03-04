const URL = 'http://localhost:3000'

export default function handler(req: any, res: any) {
    res.send(`User-agent: *\nDisallow: /\n\nSitemap: ${URL}/sitemap.xml`);
}