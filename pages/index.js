import Head from "next/head";
import Image from "next/image";
import ShoppingContainer from "../components/shopping-container";

export default function Home() {
  return (
    <>
      <Head>
        <title>Intuit App</title>
        <meta name="description" content="Intuit app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <ShoppingContainer />
      </main>
    </>
  );
}
