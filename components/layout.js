export default function Layout({ children }) {
    return (
        <>
            <header className="flex justify-between items-center shadow-md  px-4 py-2">
                <span className="bg-gray-100 rounded p-2 text-3xl text-gradient-blue">Bux</span>
                <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span>Sid</span>
                    </div>
                </div>
            </header>
            <main className="">{children}</main>
            <footer className=""></footer>
        </>
    )
}