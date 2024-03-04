import axios from "axios";
import { Key } from "react";

import Layout from "@/components/layouts/Layout"
import Category from "@/components/categories/Category";
import { ICategory } from "@/components/categories/Category"
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'


export async function getServerSideProps() {

    const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/public/categories`)
    const res = await req.data.data.data

    return {
        props: {
            categories: res
        },
    }
}

function PostIndex(props: { categories: any; }) {
    const { categories } = props;

    return (
        <Layout>
            <div className="sm:w-7/12 mx-auto max-w-3xl">
                <Breadcrumb capitalizeLinks />
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-5 grid-cols-3">

                    {
                        categories.length > 0 ? (
                            categories.map((category: ICategory, index: Key) => (
                                <div className="mt-2" key={index} >
                                    <Category
                                        name={category.name}
                                        image={category.image}
                                        slug={category.slug}
                                    />
                                </div>
                            ))
                        ) : null
                    }
                </div>
            </div>
        </Layout>
    )
}

export default PostIndex