import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from "isomorphic-dompurify";
import dayjs from 'dayjs'

export interface IPost {
    title: string,
    slug: string,
    content: string,
    image: string,
    user: string,
    category: string,
    updated_at: string
}

const Post: React.FC<IPost> = (props) => {

    const { title, slug, content, image, user, category, updated_at } = props

    const cleanContent = DOMPurify.sanitize(content, { USE_PROFILES: { html: false } });

    return (
        <Link href={`/posts/${slug}`}>
            <div className="bg-white shadow-md hover:shadow-lg border m-2 sm:m-0">
                <div className='flex items-center'>
                    <Image
                        width={150}
                        height={150}
                        className="
                    sm:h-48 h-24
                    sm:w-48 w-24 
                    p-2 object-cover object-center"
                        src={image} alt={title} />
                    <div className='xl:p-4 lg:p-4 md:p-4 p-1'>
                        <div className="flex justify-between items-center">
                            <h3 className="
                            sm:text-xl text-md 
                            text-gray-700 font-bold hover:text-gray-700">{title}
                            </h3>

                            <span className=" hidden sm:block
                            px-2 py-1 bg-lime-400 text-gray-600 
                            font-bold text-xs">
                                {category}
                            </span>
                        </div>

                        <div className='sm:flex items-center text-sm hidden'>
                            by <span className="text-gray-700 font-bold ml-2 mr-4">{user}</span>
                            Updated <span className="font-light text-gray-600 ml-2"> {dayjs(updated_at).toString()}</span>
                        </div>
                        <span className="
                        mt-2 text-gray-600 	
                         sm:text-md text-sm sm:line-clamp-4 line-clamp-2
                         " style={{ fontWeight: 'normal' }} dangerouslySetInnerHTML={{ __html: cleanContent }}></span>
                    </div>
                </div>
            </div>
        </Link>

    )
};

export default Post;
