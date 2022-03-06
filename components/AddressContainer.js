import React from 'react'
import { ETabType, useStore } from "../store";
import Address from './Address'

function AddressContainer() {
    const { addressList, onAddressSelect } = useStore()
    return (
        <div className="flex flex-col space-y-8">
            {addressList.map((address, index) => (
                <div key={address.id} className="flex space-x-8 items-center text-gray-500 p-4">
                    <div>
                        <input type="radio" name='address' value={address.streetAddress} className="radio radio-accent" onChange={(e) => {
                            console.log(index, e.target.value)
                            onAddressSelect(index)
                        }}
                            checked={!!address.isSelected}
                        />
                    </div>
                    <Address address={address} />
                </div>
            ))}
        </div>
    )
}

export default AddressContainer