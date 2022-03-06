import create from "zustand";
import { devtools } from 'zustand/middleware';
// import books from './books.json'

export const ETabType = {
    shop: "shop",
    address: "address",
    cart: "cart",
}
const baseUrl = "http://localhost:4000/"

const store = (set) => ({
    selectedTab: ETabType.shop,
    bookList: [],
    addressList: [],
    loading: true,
    isSuccessFull: false,
    setSelectedTab: (selectedTab) => set({ selectedTab }),
    fetchAllData: async () => {
        try {
            const [bookResponse, addressResponse] = await Promise.all([fetch(baseUrl + "books"), fetch(baseUrl + "address")]);
            const [bookList, addressList] = await Promise.all([bookResponse.json(), addressResponse.json()]);
            if (Array.isArray(addressList) && addressList.length > 0)
                addressList[0].isSelected = true;
            setTimeout(() => {
                set({ bookList, addressList, loading: false })
            }, 500)
            // setTimeout(() => {
            //     set({ bookList: books, loading: false })
            // }, 500)
        } catch (error) {
            set({ bookList: [], loading: false, error: error.message || 'Something went wrong' })
        }
    },
    onAddressSelect: (index) => set(state => {
        const updatedList = state.addressList.map((address, i) => {
            if (i === index) return { ...address, isSelected: !address.isSelected }
            return { ...address, isSelected: false };
        })
        return { addressList: updatedList }
    }),
    updateBookCount: (count, index) => set(state => {
        const updatedList = state.bookList.map((book, i) => {
            if (i === index) return { ...book, count: (book.count || 0) + count }

            return book;
        })

        return { bookList: updatedList }
    }),
    toggleSuccessStatus: () => set(state => ({ isSuccessFull: !state.isSuccessFull })),
});

export const useStore = create(devtools(store));