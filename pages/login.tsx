import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import LoginForm from "../components/login/LoginForm";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - Own Your Weird</title>
        <meta
          name="description"
          content="Own Your Weird is an urban street clothing and lifestyle brand which embodies the weird in everyone."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full lg:h-screen flex-col lg:flex lg:flex-row">
        {/* LEFT */}
        <div className="lg:w-1/2 w-full lg:h-screen bg-chocoBrown pt-5 pb-20 px-10 flex flex-col justify-between">
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
              <Link href={"/register"}>
                <p className="underline tracking-widest font-bold">REGISTER</p>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-1/2 w-full lg:h-screen bg-white px-20 py-10 relative">
          <div className="relative top-[25%]">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
