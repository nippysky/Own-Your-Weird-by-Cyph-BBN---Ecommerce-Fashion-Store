import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function Page404() {
  return (
    <>
      <Head>
        <title>404 Error Page - Own Your Weird</title>
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

        <div className="flex lg:justify-start justify-center text-center lg:text-left text-white">
          <div>
            <p className="tracking-widest">404 ERROR</p>
            <h1 className="lg:text-[3rem] text-2xl my-5 font-thin">
              This Page Doesn't Exist...
            </h1>

            <div className="lg:w-1/3 w-full text-center flex justify-center">
              <Link href={"/"}>
                <div className="flex text-white">
                  <span>
                    <BsArrowLeft size={22} />
                  </span>
                  <span className="relative bottom-[1px] left-2 font-medium uppercase">
                    Go Back Home
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
