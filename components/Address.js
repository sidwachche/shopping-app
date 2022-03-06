export default function Address({ address }) {
    return (<div>
        <div>{address?.streetAddress}</div>
        <div>{address?.addressLocality}</div>
        <div>{address?.postalCode}</div>
    </div>)
}