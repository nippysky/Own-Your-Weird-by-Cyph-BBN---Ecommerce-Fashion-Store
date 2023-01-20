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
            <p className="tracking-widest">404 ERROR</p>
            <h1 className="text-[3rem] my-5 font-thin">
              This Page Doesn't Exist...
            </h1>

            <div className="lg:w-1/4 w-full">
              <Link href={"/"}>
                <div className="flex text-white">
                  <span>
                    <BsArrowLeft size={22} />
                  </span>
                  <span className="relative bottom-[1px] left-2 font-medium">
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
