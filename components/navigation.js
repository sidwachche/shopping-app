import React from 'react'
import { ETabType, useStore } from "../store";

const Pill = ({ children, isSelected, ...props }) => (
    <div
        className={`rounded-xl flex items-center mx-2 p-2 text-primary cursor-pointer capitalize border-2 border-solid  ${isSelected ? 'border-success bg-gray-50' : 'border-gray-200'}`}
        {...props}>
        {children}
    </div>
);

function Navigation() {
    const { selectedTab, setSelectedTab } = useStore()

    return (
        <div className="flex md:w-1/2 mx-auto">
            <Pill isSelected={selectedTab === ETabType.shop} onClick={() => setSelectedTab(ETabType.shop)}>{ETabType.shop}</Pill>
            <div className="divider w-full"></div>
            <Pill isSelected={selectedTab === ETabType.address} onClick={() => setSelectedTab(ETabType.address)}>{ETabType.address}</Pill>
            <div className="divider w-full"></div>
            <Pill isSelected={selectedTab === ETabType.cart} onClick={() => setSelectedTab(ETabType.cart)}>{ETabType.cart}</Pill>
        </div>
    )
}

export default Navigation