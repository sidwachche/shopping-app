import React, { useCallback, useState, useEffect } from 'react'
import { ETabType, useStore } from "../store";
import Address from './Address'

const p = [
    {
        id: 'base-1',
        name: 'Base 1',
        pricing: {
            currency: 'INR',
            charges: [
                {
                    type: 'RECURRING',
                    charge: '100',
                },
                {
                    type: 'RECURRING',
                    charge: '25',
                },
            ],
        },
        addOns: [
            {
                id: 'base-1-addOn-1',
                name: 'AddOn 1',
                pricing: {
                    currency: 'INR',
                    charges: [
                        {
                            type: 'RECURRING',
                            charge: '10',
                        },
                        {
                            type: 'FLAT',
                            charge: '5',
                        },
                        {
                            type: 'RECURRING',
                            charge: '6',
                        },
                    ],
                },
                features: [
                    {
                        id: 'base-1-addon-1-feature-1',
                        name: 'Optional 2',
                        pricing: {
                            currency: 'INR',
                            charges: [
                                {
                                    type: 'FLAT',
                                    charge: '5',
                                },
                            ],
                        },
                    },
                    {
                        id: 'base-1-addon-1-feature-2',
                        name: 'Optional 2',
                        pricing: {
                            currency: 'INR',
                            charges: [
                                {
                                    type: 'RECURRING',
                                    charge: '5',
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        features: [
            {
                id: 'base-1-feature-1',
                name: 'Optional 1',
                pricing: {
                    currency: 'INR',
                    charges: [
                        {
                            type: 'RECURRING',
                            charge: '5',
                        },
                    ],
                },
            },
        ],
    },
    {
        id: 'base-2',
        name: 'Base 2',
        pricing: {
            currency: 'INR',
            charges: [
                {
                    type: 'FLAT',
                    charge: '100',
                },
                {
                    type: 'RECURRING',
                    charge: '125',
                },
            ],
        },
        addOns: [
            {
                id: 'base-2-addOn-1',
                name: 'AddOn 1',
                pricing: {
                    currency: 'INR',
                    charges: [
                        {
                            type: 'FLAT',
                            charge: '15',
                        },
                    ],
                },
            },
        ],
    },
    {
        id: 'base-3',
        name: 'Base 3',
        pricing: {
            currency: 'INR',
            charges: [
                {
                    type: 'FLAT',
                    charge: '75',
                },
            ],
        },
        addOns: null,
        features: null,
    },
    {
        id: 'base-4',
        name: 'Base 4',
        pricing: {
            currency: 'INR',
            charges: [
                {
                    type: 'RECURRING',
                    charge: '30',
                },
            ],
        },
        addOns: null,
        features: [
            {
                id: 'base-1-feature-1',
                name: 'Optional 1',
                pricing: {
                    currency: 'INR',
                    charges: [
                        {
                            type: 'FLAT',
                            charge: '5',
                        },
                    ],
                },
            },
        ],
    },
    {
        id: 'base-5',
        name: 'Base 4',
        pricing: {
            currency: 'INR',
            charges: [
                {
                    type: 'FLAT',
                    charge: '60',
                },
            ],
        },
        addOns: null,
        features: [
            {
                id: 'base-1-feature-1',
                name: 'Optional 3',
                pricing: {
                    currency: 'INR',
                    charges: [
                        {
                            type: 'FLAT',
                            charge: '45',
                        },
                    ],
                },
            },
        ],
    },
];

function TableCell({ children, isPrimaryText, className }) {
    return (<td className={`p-4 ${isPrimaryText ? 'text-primary' : 'text-gray-500'} ${className || ''}`}>{children}</td>);
}
function Message({ }) {
    const { isSuccessFull } = useStore();

    if (isSuccessFull)
        return (<div className="text-xl text-primary text-right">Order Confirmed</div>)

    return (<div className="text-xl text-error text-right">Something went wrong. <br /> Please try again.</div>)
}

function getCharges(products) {
    const rec = []
    const flat = []
    const calcCharge = (charges, name) => {
        if (Array.isArray(charges)) charges.forEach(({ charge, type }) => {
            // console.log(charges)
            if (type === 'RECURRING') rec.push({ charge, name })
            if (type === 'FLAT') flat.push({ charge, name })
        })
    }
    const calcFeatureCharge = (features) => {
        // console.log(JSON.stringify(features))
        if (Array.isArray(features)) {
            features.forEach(feature => {
                // console.log(feature.pricing.charges)
                calcCharge(feature?.pricing?.charges, feature.name)
            })
        }
    }
    products.forEach(product => {
        const charges = product.pricing.charges;
        calcCharge(charges, product.name)
        calcFeatureCharge(product.features)
        const addOnList = product.addOns
        if (Array.isArray(addOnList)) {
            addOnList.forEach(addOn => {
                // console.log(addOn.pricing)
                calcCharge(addOn.pricing.charges, addOn.name)
                calcFeatureCharge(addOn.features)
            })
        }
    })

    return { rec, flat }
}

function Cart() {
    const { bookList, isSuccessFull, toggleSuccessStatus, addressList } = useStore();
    const inCartBooks = bookList.filter(({ count }) => count);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const selectedAddress = addressList.filter(address => address.isSelected)[0];

    const { rec, flat } = getCharges(p);
    console.log(rec, flat);

    const onCheckout = useCallback(() => {
        toggleSuccessStatus();
        setIsMessageVisible(true);
        setTimeout(() => { setIsMessageVisible(false); }, 2000)
    }, [])

    if (inCartBooks.length === 0) {
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
                    {inCartBooks.map((book, index) => {
                        return <tr key={book.id} className="">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell isPrimaryText>
                                {book.title}
                            </TableCell>
                            <TableCell>{book.count}</TableCell>
                            <TableCell>${book.price}</TableCell>
                            <TableCell>{book.discount}%</TableCell>
                            <TableCell>${(book.count * book.price * (1 - book.discount / 100)).toFixed(2)}</TableCell>
                        </tr>

                    })}
                    <tr className="">
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-primary text-xl">Total</TableCell>
                        <TableCell className="text-primary text-xl">${(inCartBooks.reduce((acc, book) => {
                            const price = (book.count * book.price * (1 - book.discount / 100))
                            return acc += price;
                        }, 0)).toFixed(2)}</TableCell>
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
