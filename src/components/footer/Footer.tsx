import { useState } from 'react';
import Link from 'next/link';

export interface IFooter {
    title: string
}

const Footer: React.FC<IFooter> = (props) => {
    const { title } = props

    return (
        <footer className="p-4 bg-white shadow md:px-6 md:py-8 xl:mt-10 lg:mt-10 md:mt-10 min-w-full bottom-0 ">
            <span className="block text-sm text-gray-500 text-center">© 2024 . All Rights Reserved.
            </span>
        </footer>


    )
};

export default Footer;
