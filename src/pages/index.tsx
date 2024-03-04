import axios from "axios";
import { Key } from "react";

import Layout from "@/components/layouts/Layout"
import Category from "@/components/categories/Category";
import Post from "@/components/posts/Post";


export async function getServerSideProps() {
    const reqPosts = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/public/posts`)
    const reqCategories = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/public/categories`)

    const resreqPosts = await reqPosts.data.data.data
    const resCategories = await reqCategories.data.data.data

    return {
        props: {
            posts: resreqPosts,
            categories: resCategories
        },
    }
}


function PostIndex(props: any) {

    const { posts, categories } = props;

    return (
        <Layout>
            <div className="grid grid-flow-col justify-between sm:w-7/12 mx-auto overflow-auto max-w-3xl">
                {
                    categories.length > 0 ? (
                        categories.map((category: any, index: Key) => (
                            <div className="sm:mb-6 sm:mx-0 sm:mt-2 mx-1 mt-0" key={index} >
                                <Category
                                    name={category.name}
                                    image={category.image}
                                    slug={category.slug}
                                />
                            </div>
                        )).slice(0, 5)
                    ) : null
                }
            </div>
            <div className="sm:w-7/12 mx-auto max-w-3xl">
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

                        )).slice(0, 7)
                    ) : null
                }
            </div>
        </Layout>
    )
}

export default PostIndex