import Head from "next/head";
import Image from "next/image";
import React from "react";

export default function OrderSuccessfull() {
  return (
    <>
      <Head>
        <title>Order Successfull</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full h-screen bg-chocoBrown px-20 pt-2 pb-10 flex flex-col justify-between">
        <div className="flex justify-end">
          <Image
            src={"/brand/CyphFootLogo.svg"}
            alt={"Cyph's Logo"}
            height={250}
            width={250}
            priority
          />
        </div>

        <div className="flex justify-start text-white">
          <div>
            <p className="tracking-widest">PAYMENT SUCCESSFULL</p>
            <h1 className="text-[3rem] my-5 font-thin animate-pulse">
              Order On It's Way...
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
