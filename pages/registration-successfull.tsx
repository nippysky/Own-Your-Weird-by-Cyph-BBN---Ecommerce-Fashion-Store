import React, { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

export default function RegisterionSuccessfull() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/login");
    }, 5000);
  }, []);

  return (
    <>
      <Head>
        <title>Registration Successfull</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full h-screen bg-clayBrown px-20 pt-2 pb-10 flex flex-col justify-between">
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
            <p className="tracking-widest">ACCOUNT CREATION SUCCESSFULL</p>
            <h1 className="lg:text-[3rem] text-2xl text-center lg:text-left my-5 font-thin animate-pulse">
              Owning Your Weird. Please Wait...
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
