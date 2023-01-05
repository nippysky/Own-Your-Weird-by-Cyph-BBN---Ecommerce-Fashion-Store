import React, { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";
import Head from "next/head";

export default function StepOne({ formData, setFormData, setScreen }: any) {
  // Funtion to handle form when it is submitted
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>Step One - Register</title>
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
        <div className="lg:w-1/2 w-full lg:h-screen bg-white px-20 py-10 relative">
          <div className="mt-10">
            <form onClick={handleSubmit}>
              {/* email */}
              <div className="">
                <label
                  className="font-semibold relative bottom-5 tracking-wide"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  value={formData.email}
                  required
                  className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                />
              </div>

              {/* firstname */}
              <div className="mt-14">
                <label
                  className="font-semibold relative bottom-5 tracking-wide"
                  htmlFor="fName"
                >
                  First Name
                </label>
                <input
                  onChange={(event) =>
                    setFormData({ ...formData, firstName: event.target.value })
                  }
                  value={formData.firstName}
                  required
                  className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
                  type="text"
                  id="fName"
                  name="fName"
                  placeholder="Enter Your First Name"
                />
              </div>

              {/* lastName */}
              <div className="mt-14">
                <label
                  className="font-semibold relative bottom-5 tracking-wide"
                  htmlFor="lName"
                >
                  Last Name
                </label>
                <input
                  onChange={(event) =>
                    setFormData({ ...formData, lastName: event.target.value })
                  }
                  value={formData.lastName}
                  required
                  className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
                  type="text"
                  id="lName"
                  name="lName"
                  placeholder="Enter Your Last Name"
                />
              </div>

              {/* continue button */}
              <div className="mt-20 flex justify-end">
                <button
                  className="w-[35%] bg-clayBrown text-white py-4 tracking-wide text-center"
                  onClick={() => setScreen(1)}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
