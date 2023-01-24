import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function OrderSuccessfull() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/profile/orders");
    }, 3000);
  }, [router]);

  return (
    <>
      <Head>
        <title>Order Successfull</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full h-screen bg-chocoBrown px-20 pt-2 pb-10 flex flex-col justify-between">
        <div className="flex lg:justify-end justify-center">
          <Image
            src={"/brand/CyphFootLogo.svg"}
            alt={"Cyph's Logo"}
            height={200}
            width={200}
            priority
          />
        </div>

        <div className="flex justify-start text-white">
          <div>
            <p className="tracking-widest">PAYMENT SUCCESSFULL</p>
            <h1 className="lg:text-[3rem] text-2xl text-center lg:text-left my-5 font-thin animate-pulse">
              Order On It's Way...
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
