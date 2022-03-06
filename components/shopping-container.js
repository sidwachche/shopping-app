import React, { useEffect } from "react";
import { ETabType, useStore } from "../store";
import AddressContainer from "./AddressContainer";
import BookList from "./book-list";
import Cart from "./cart";
import Navigation from "./navigation";

export function Heading({ children }) {
    return (<div className="text-6xl text-gradient font-bold my-10">{children}</div>)
}

export function Container({ children }) {
    return (<div className="max-h-[65vh] overflow-auto">{children}</div>)
}

function getTabComponent({ selectedTab, setSelectedTab }) {
    switch (selectedTab) {
        case ETabType.address: {
            return (<>
                <Heading >Select Address</Heading>
                <Container>
                    <AddressContainer />
                </Container>
                <div className="flex justify-end">
                    <button className="btn" onClick={() => setSelectedTab(ETabType.cart)}>Continue</button>
                </div>
            </>)
        }
        case ETabType.shop: {
            return (<>
                <Heading >Classical Books of All Time</Heading>
                <Container>
                    <BookList />
                </Container>
                <div className="flex justify-end">
                    <button className="btn" onClick={() => setSelectedTab(ETabType.address)}>Continue</button>
                </div>
            </>)
        }
        case ETabType.cart: {
            return (<>
                <Heading >Your Cart</Heading>
                <Container>
                    <Cart />
                </Container>

            </>)
        }
    }
}

function ShoppingContainer() {
    const { fetchAllData, setSelectedTab, selectedTab, loading, error } = useStore()
    const lazyRoot = React.useRef(null)

    useEffect(() => {
        fetchAllData();
    }, [])

    if (loading) return (<div className="bg-gray-50 flex justify-center items-center h-[65vh]">
        <svg className="animate-spin -ml-1 mr-3 h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="pink" strokeWidth="4"></circle>
            <path className="opacity-75" fill="pink" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>)

    return (
        <div className="p-4 h-full">
            <Navigation />
            <div className="py-10 pl-8  mx-auto space-y-10" ref={lazyRoot}>
                {error ? (<div className="text-center p-10 text-gray-400 space-y-4">
                    <div className="text-2xl">Something went wrong</div>
                    <div>
                        {error}
                    </div>
                </div>) :
                    getTabComponent({ selectedTab, setSelectedTab })
                }
            </div>
        </div>
    );
}

export default ShoppingContainer;
