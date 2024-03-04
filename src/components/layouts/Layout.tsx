import Head from 'next/head';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Fira_Sans } from 'next/font/google';

export interface ILayout {
  children: any
}

const firaSans = Fira_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Base Application</title>
        <meta name="description" content="Build SEO website using Nextjs and tailwind" />
        <meta name="keywords" content="nextjs, tailwind, seo" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="rizan" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar title="Base Application" />
      <div className="flex flex-col min-h-screen">
        <main className={`${firaSans.className} mt-20 flex-grow`}>
          {children}
        </main>
        <Footer title="Base Application" />
      </div>


    </>
  )
};

export default Layout;
