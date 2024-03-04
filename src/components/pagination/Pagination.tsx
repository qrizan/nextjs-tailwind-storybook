import { useState } from 'react';
import Link from 'next/link';

export interface IPagination {
    currentPage: number,
    total: number,
    perPage: number,
    onClickPrevious: any,
    onClickNext: any
}

const Pagination: React.FC<IPagination> = (props) => {
    const { currentPage, total, perPage, onClickPrevious, onClickNext } = props

    return (
        <div className="flex items-center justify-between min-w-full  sm:text-pd text-sm">
            <div className='w-1/3 text-left'>
                {
                    <button
                        disabled={currentPage > 1 ? false : true}
                        className={`py-2 sm:px-3 px-1 border rounded-sm cursor-pointer ${currentPage > 1 ? "border-gray-500 bg-gray-500 text-white" : "border-gray-500 bg-white text-gray-500 cursor-not-allowed"}`}
                        onClick={onClickPrevious}>
                        Previous page
                    </button>
                }
            </div>

            <div className='w-1/3 text-center'>
                <span className='text-gray-600'>Page {currentPage} / {Math.ceil(total / perPage)}</span>
            </div>

            <div className='w-1/3 text-right'>
                {
                    <button
                        disabled={currentPage < Math.ceil(total / perPage) ? false : true}
                        className={`py-2 sm:px-3 px-1 border rounded-sm cursor-pointer ${currentPage < Math.ceil(total / perPage) ? "border-gray-500 bg-gray-500 text-white" : "border-gray-500 bg-white text-gray-500 cursor-not-allowed"}`}
                        onClick={onClickNext}>
                        Next page
                    </button>

                }
            </div>
        </div>
    )
};

export default Pagination;
