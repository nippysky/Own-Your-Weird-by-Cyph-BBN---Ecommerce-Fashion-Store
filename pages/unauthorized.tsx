import React from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <>
      <Head>
        <title>Unathorized Page - Access Denied</title>
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

        <div className="flex lg:justify-start justify-center text-center lg:text-left text-white">
          <div>
            <p className="tracking-widest uppercase">
              UNATHORIZED PAGE - {message}
            </p>
            <h1 className="lg:text-[3rem] text-2xl my-5 font-thin">
              Kindly Login To View This Page...
            </h1>

            <div className="lg:w-1/3 w-full text-center flex justify-center">
              <Link href={"/login"}>
                <div className="flex text-white mt-5">
                  <span>
                    <BsArrowRight size={22} />
                  </span>
                  <span className="relative bottom-[1px] left-2 font-bold uppercase">
                    Click To Login
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
