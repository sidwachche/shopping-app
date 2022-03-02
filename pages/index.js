import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>Intuit App</title>
        <meta name="description" content="Intuit app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <button className="btn btn-primary">Button</button>
      </main>

      <footer className="">

      </footer>
    </div>
  )
}
