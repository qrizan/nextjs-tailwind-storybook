import { useState } from 'react';
import Link from 'next/link';

export interface ISearch {
    value: string
    onChange: any
}

const Search: React.FC<ISearch> = (props) => {
    const { value, onChange } = props

    return (
        <input
            className="h-12 border px-4 w-full bg-white focus:outline-none mb-2"
            autoComplete="off"
            type="text"
            name="search"
            value={value}
            onChange={onChange}
            placeholder="Search article"

        />
    )
};

export default Search;
