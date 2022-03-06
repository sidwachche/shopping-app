import Image from 'next/image';
import React from 'react';
import { useStore } from "../store";


function BookList({ lazyRoot }) {
    const { bookList, updateBookCount } = useStore();

    return (
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3">
            {bookList?.map((book, index) => (
                <div key={book?.id} className="flex flex-col border-0 border-b border-solid border-gray-200 py-10 space-y-6">
                    <div className="flex flex-row items-start space-x-3">
                        <Image
                            src={book?.imageLink}
                            width={150}
                            height={210}
                            alt={book?.title}
                            lazyBoundary="200px"
                            lazyRoot={lazyRoot}
                        />
                        <div className="flex flex-col space-y-4">
                            <div className="text-gray-700 text-2xl">
                                {book?.title}
                            </div>
                            <div className="text-gray-500">- by {book?.author}</div>
                            <div className="text-gray-500">Pages: {book?.pages}</div>
                            <div className="text-warning text-lg">Discount: {book?.discount}%</div>
                            <div className="text-primary text-xl font-semibold">Price: ${book?.price}</div>
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <button className="text-white bg-gradient-blue btn-circle" onClick={() => updateBookCount(1, index)}>+</button>
                        <div className="w-8 text-center">
                            {book?.count || 0}
                        </div>
                        <button disabled={!book?.count} className="btn btn-circle btn-warning" onClick={() => updateBookCount(-1, index)}>-</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookList