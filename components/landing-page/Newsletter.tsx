import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section
      className="w-full h-screen bg-center bg-cover flex relative"
      style={{
        backgroundImage: "url('/brand/NewsletterCover.svg')",
      }}
    >
      <div className="m-auto lg:px-80 px-5">
        <h1 className="text-3xl font-semibold text-clayBrown text-center lg:px-20">
          Connect With CYPH , Get Updates by Joining Our Newsletter
        </h1>

        {/* Email Field */}
        <form className="flex gap-0 mt-20">
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            className="w-full h-14 p-5 bg-formBG dark:bg-darkBG2 border-none focus:ring-1 focus:ring-chocoBrown"
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
          />

          <button className="tracking-widest text-[0.85rem] font-semibold text-white bg-clayBrown px-4">
            SUBSCRIBE
          </button>
        </form>
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-10 left-20 flex justify-start gap-10">
        {/* twitter */}
        <Link href={"/"}>
          <div className="w-[50px] h-[50px] bg-clayBrown rounded-full flex justify-center items-center">
            <AiOutlineTwitter size={30} color="white" />
          </div>
        </Link>

        {/* instagram */}
        <Link href={"/"}>
          <div className="w-[50px] h-[50px] bg-clayBrown rounded-full flex justify-center items-center">
            <AiOutlineInstagram size={30} color="white" />
          </div>
        </Link>
      </div>
    </section>
  );
}
