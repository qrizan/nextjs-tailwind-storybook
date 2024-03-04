import axios from "axios";
import { ChangeEvent, Key, SetStateAction, useState } from "react";

import Layout from "@/components/layouts/Layout"
import Post from "@/components/posts/Post";
import router from "next/router";
import Search from "@/components/search/Search";
import Pagination from "@/components/pagination/Pagination";
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'


export async function getServerSideProps(context: {
    query: {
        page: number; keyword: string;
    };
}) {

    const keyword = context.query.keyword ?? ""
    const page = context.query.page ?? 1

    const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/public/posts?search=${keyword}&page=${page}`)

    const res = await req.data.data.data
    const currentPage = req.data.data.current_page
    const perPage = req.data.data.per_page
    const total = req.data.data.total


    return {
        props: {
            posts: res,
            currentPage: currentPage,
            perPage: perPage,
            total: total,
        },
    }

}

function PostIndex(props: { posts: any; currentPage: string; perPage: string; total: string; }) {
    const { posts, currentPage, perPage, total } = props;

    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1)

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
        router.push(`/posts?keyword=${keyword}&page=${pageNumber}`);
    };

    const handlePagination = async (pageNumber: SetStateAction<number>) => {
        setPageNumber(pageNumber)
        router.push(`/posts?keyword=${keyword}&page=${pageNumber}`);
    }

    return (
        <Layout>
            <div className="sm:w-7/12 mx-auto m-2 max-w-3xl">
                <Breadcrumb capitalizeLinks />
                <Search
                    value={keyword}
                    onChange={(e: any) => handleSearch(e)}
                />

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
                    )
                }

                <div className="sm:p-0 p-2">
                    <Pagination
                        currentPage={currentPage}
                        total={total}
                        perPage={perPage}
                        onClickNext={() => handlePagination(currentPage + 1)}
                        onClickPrevious={() => handlePagination(currentPage - 1)}
                    />
                </div>

            </div>


        </Layout>
    )
}

export default PostIndex