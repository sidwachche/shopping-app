import React, { useCallback, useState, useEffect } from 'react'
import { ETabType, useStore } from "../store";
import Address from './Address'

function TableCell({ children, isPrimaryText, className }) {
    return (<td className={`p-4 ${isPrimaryText ? 'text-primary' : 'text-gray-500'} ${className || ''}`}>{children}</td>);
}
function Message({ }) {
    const { isSuccessFull } = useStore();

    if (isSuccessFull)
        return (<div className="text-xl text-primary text-right">Order Confirmed</div>)

    return (<div className="text-xl text-error text-right">Something went wrong?. <br /> Please try again?.</div>)
}

function getBookPrice(book) {
    if (!book?.price) return 0;

    return ((book?.count || 0) * (book?.price || 0) * (1 - book?.discount / 100))
}

function Cart() {
    const { bookList, isSuccessFull, toggleSuccessStatus, addressList } = useStore();
    const inCartBooks = bookList?.filter(({ count }) => count);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const selectedAddress = addressList?.filter(address => address?.isSelected)[0];

    const onCheckout = useCallback(() => {
        toggleSuccessStatus();
        setIsMessageVisible(true);
        setTimeout(() => { setIsMessageVisible(false); }, 2000)
    }, [])

    if (inCartBooks?.length === 0) {
        return <div className="text-3xl text-error text-center p-2 my-4 border-b">Cart is empty</div>;
    }

    return (
        <div className="">
            <div className="p-4 mb-8">
                <h5 className="text-secondary py-2">Selected Address</h5>
                <Address address={selectedAddress} />
            </div>
            <table className="table w-2/3">
                <thead>
                    <tr>
                        <th></th>
                        <th>Book Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {inCartBooks?.map((book, index) => {
                        return <tr key={book?.id} className="">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell isPrimaryText>
                                {book?.title}
                            </TableCell>
                            <TableCell>{book?.count}</TableCell>
                            <TableCell>${book?.price}</TableCell>
                            <TableCell>{book?.discount}%</TableCell>
                            <TableCell>${getBookPrice(book)?.toFixed(2)}</TableCell>
                        </tr>

                    })}
                    <tr className="">
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-primary text-xl">Total</TableCell>
                        <TableCell className="text-primary text-xl">${(inCartBooks?.reduce((acc, book) => {
                            const price = getBookPrice(book);
                            return acc += price;
                        }, 0))?.toFixed(2)}</TableCell>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-end">
                <button className="btn" onClick={onCheckout}>Checkout</button>
            </div>
            <div className="py-4">
                {isMessageVisible && <Message />}
            </div>
        </div>
    )
}

export default Cart
