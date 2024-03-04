import axios from "axios";

import Layout from "@/components/layouts/Layout"
import PostDetailComponent from '@/components/postsDetail/PostDetail';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'


export async function getServerSideProps({ params }: any) {
    const { slug } = params
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/public/posts/${slug}`)
    const res = await req.data.data

    return {
        props: res,
    }
}

function PostDetail(props: { title: string; slug: string; content: string; image: string; user: any; category: any; updated_at: string; }) {


    const { title, slug, content, image, user, category, updated_at } = props

    return (
        <Layout>
            <div className="sm:w-7/12 mx-auto">
                <Breadcrumb capitalizeLinks />
                <PostDetailComponent
                    title={title}
                    slug={slug}
                    content={content}
                    image={image}
                    user={user.name}
                    category={category.name}
                    category_slug={category.slug}
                    updated_at={updated_at}
                />
            </div>

        </Layout>
    );

}

export default PostDetail