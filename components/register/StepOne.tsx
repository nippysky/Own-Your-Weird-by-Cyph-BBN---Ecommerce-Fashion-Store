import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";
import Head from "next/head";

export default function StepOne({ setScreen }: any) {
  return (
    <>
      <Head>
        <title>Step One - Read Register Terms</title>
        <meta
          name="description"
          content="Own Your Weird is an urban street clothing and lifestyle brand which embodies the weird in everyone."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full lg:h-screen flex-col lg:flex lg:flex-row">
        {/* LEFT */}
        <div className="lg:w-1/2 w-full lg:h-screen bg-clayBrown pt-5 pb-20 px-10 flex flex-col justify-between">
          {/* go back home */}
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

          {/* logo */}
          <div className="flex justify-center">
            <Image
              src={"/brand/CyphFootLogo.svg"}
              alt={"Cyph's Logo"}
              height={300}
              width={300}
              priority
            />
          </div>

          {/* link */}
          <div className="flex justify-center text-white">
            <div className="text-center">
              <p className="mb-5">Do Not Have An Account Yet?</p>
              <Link href={"/login"}>
                <p className="underline tracking-widest font-bold">LOGIN</p>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-1/2 w-full lg:h-screen lg:flex lg:flex-col lg:justify-between bg-white px-20 py-10">
          {/* terms and agreement */}
          <div>
            <p className="my-10 tracking-wider text-chocoBrown font-normal text-justify">
              Kindly note that data collected from the registration form is
              solely used for the purpose of identification for owners of
              product that will be ordered on this web store.
            </p>

            <p className="my-10 tracking-wider text-chocoBrown font-normal text-justify">
              Cyph will only occasionally send you emails on orders or new
              products available for sale.
            </p>

            <p className="my-10 tracking-wider text-chocoBrown font-normal text-justify">
              By proceeding, you agree to the aformentioned terms.
            </p>
          </div>

          {/* continue button */}
          <div className="flex justify-end">
            <button
              className="w-[35%] bg-clayBrown text-white py-4 tracking-wide text-center"
              onClick={() => setScreen(1)}
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
