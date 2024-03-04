import React from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export interface IBreadcrumb {
    capitalizeLinks?: boolean
}


const Breadcrumb = ({ capitalizeLinks }: IBreadcrumb) => {
    const activeClasses = 'text-gray-600 font-bold capitalize'
    const listClasses = 'hover:underline mx-1 px-2'

    const paths = usePathname()
    const pathNames = (paths) ? paths.split('/').filter(path => path) : []

    console.log(pathNames)

    return (
        <div>
            <ul className="flex sm:text-sm text-xs my-2 items-center">
                <li className={listClasses}><Link href={'/'}>Home</Link></li>
                {pathNames.length > 0 && <svg className="w-5 h-auto fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>}
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                        let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                        return (
                            <React.Fragment key={index}>
                                <li className={itemClasses} >
                                    <Link href={href}>{itemLink.replaceAll('-',' ')}</Link>
                                </li>
                                {pathNames.length !== index + 1 && <svg className="w-5 h-auto fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>}
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Breadcrumb