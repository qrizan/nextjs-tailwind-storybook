import Image from 'next/image';
import Link from 'next/link';

export interface ICategory {
    name: string,
    slug: string,
    image: string,
}

const Category: React.FC<ICategory> = (props) => {
    const { name, slug, image } = props

    return (
        <Link href={`/categories/${slug}`}>
            <div className="
            bg-white shadow-md hover:shadow-lg 
            border w-36
            ">
                <div className='flex sm:flex-col items-center'>
                    <Image
                        width={150}
                        height={150}
                        className="
                        sm:w-36 sm:h-36 h-12 w-12
                        object-cover object-center"
                        src={image} alt={name} />

                    <div className='text-sm p-1 text-gray-600 sm:ml-0 ml-2'>{name}</div>
                </div>
            </div>
        </Link>
    )
};

export default Category;
