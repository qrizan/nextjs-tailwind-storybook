import axios from "axios";
import { Key } from "react";

import Post from "@/components/posts/Post";
import Layout from "../../components/layouts/Layout"
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'


export async function getServerSideProps({ params }: any) {

    const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/public/categories/${params.slug}`)
    const res = await req.data.data

    return {
        props: res,
    }
}

function PostDetail(props: any) {
    const { name, posts } = props

    return (
        <Layout>
            <div className="sm:w-7/12 mx-auto max-w-3xl">
                <Breadcrumb capitalizeLinks />
                {
                    posts.length > 0 ? (
                        posts.map((post: any, index: Key) => (
                            <div className="sm:mb-5 mb-1" key={index} >
                                <Post
                                    title={post.title}
                                    slug={post.slug}
                                    content={post.content}
                                    image={post.image}
                                    user={post.user.name}
                                    category={post.category.name}
                                    updated_at={post.updated_at}
                                />
                            </div>

                        ))
                    ) : (
                        <span className="text-gray-700 text-sm sm:mx-0 mx-4">Data not found</span>
                    )}

            </div>


        </Layout>
    );

}

export default PostDetail