import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  // Funtion to handle form when it is submitted
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Notify user with a toast message of pending sending of message
    toast.info("Kindly hold on for few seconds....");

    const form = {
      email,
    };

    // Submit Data To API
    await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((response) => {
      if (response.status === 200) {
        // Notify user with a toast message of successfully sending their message
        toast.success("You Have Subscribed Successfully");
      } else {
        if (response.status === 501 || 502 || 503 || 504 || 401 || 403) {
          // Notify user with a toast message of error trying to send their message
          toast.error("Error, Check connection");
        }
      }
    });

    // Clear Form Fields
    setEmail("");
  }

  return (
    <section
      className="w-full lg:h-screen bg-center bg-cover lg:flex relative py-10"
      style={{
        backgroundImage: "url('/brand/NewsletterCover.svg')",
      }}
    >
      <div className="m-auto lg:px-80 px-5">
        <h1 className="lg:text-3xl text-xl font-semibold text-clayBrown text-center lg:px-20">
          Connect With CYPH , Get Updates by Joining Our Newsletter
        </h1>

        {/* Email Field */}
        <form className="flex gap-0 mt-20" onSubmit={handleSubmit}>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
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
      <div className="lg:absolute lg:bottom-10 lg:left-20 flex justify-start gap-5 mt-10 px-5">
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
