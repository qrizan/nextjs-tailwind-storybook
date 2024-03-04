import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from "isomorphic-dompurify";
import dayjs from 'dayjs'


export interface IPostDetail {
    title: string,
    slug: string,
    content: string,
    image: string,
    user: string,
    category: string,
    category_slug: string,
    updated_at: string
}

const PostDetail: React.FC<IPostDetail> = (props) => {
    const { title, category_slug, content, image, user, category, updated_at } = props

    const cleanContent = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });

    return (

        <div className="w-full bg-white shadow-md border min-h-lvh">
            <div className='lg:flex xl:flex md:flex flex-none items-start'>
                <div className='px-5 py-4 xl:w-2/3 lg:w-2/3 md:w-2/3'>
                    <h3 className="
                        lg:text-2xl xl:text-2xl md:text-xl md:text-md sm:text-md 
                        text-gray-700 font-bold hover:text-gray-700">{title}</h3>
                    <span className='text-gray-600 text-sm mr-4'>
                        By {user}
                    </span>
                    <span className='text-gray-600 text-sm'>
                        Updated {dayjs(updated_at).toString()}
                    </span>
                    <hr className='my-3' />
                    <span className="indent-8
                        mt-2 text-gray-600 xl:text-md lg:text-md 
                        text-justify md:text-sm sm:text-sm  text-sm"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}></span>
                </div>
                <div className='px-6 sm:p-2 py-4 xl:w-1/3 lg:w-1/3 md:w-1/3 mt-2'>
                    <Image
                        width={150}
                        height={100}
                        className="
                    lg:h-70 xl:h-70 md:h-70 sm:h-70 xs:h-70 h-70 min-w-64 
                    w-full object-cover object-center"
                        src={image} alt={title} />

                    <div className='w-full items-center mt-2 flex'>
                        <div className="font-light text-gray-600 my-2 mr-3">Category : </div>

                        <Link className="text-indigo-500" href={`/categories/${category_slug}`}>
                            {category}
                        </Link>

                    </div>


                </div>
            </div>

        </div>

    )
};

export default PostDetail;
