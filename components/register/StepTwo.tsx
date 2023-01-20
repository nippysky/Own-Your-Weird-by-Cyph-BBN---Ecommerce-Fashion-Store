import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function StepTwo({ setScreen }: any) {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [dAddress, setDAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);

  const router = useRouter();

  // Funtion to handle form when it is submitted
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Notify user with a toast message of pending sending of message
    toast.info("Kindly hold on as we process your information.");

    if (email === "" || firstName === "" || lastName === "") {
      toast.error("All Fields are required.");
      return;
    }

    if (email.length === 0 || firstName.length === 0 || lastName.length === 0) {
      toast.error("All Fields are required.");
      return;
    }

    if (email.indexOf("@") < 0) {
      toast.warning("Check that you entered your email address correctly");
      return;
    }

    if (password !== cPassword) {
      toast.error("Password does not match. Check your password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be up to 8 characters");
      return;
    }

    const data = {
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
      dAddress,
    };

    // Submit Data To API
    await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Already Registered") {
          toast.error("Your Email Address Already Exist.");
          return;
        } else {
          // Submit Email To API
          const form = {
            email,
          };
          fetch("/api/reg-newsletter", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });

          // redirect to register successfully page
          router.push("/registration-successfull");

          // Clear Form Fields
          setEmail("");
          setFirstName("");
          setLastName("");
          setPhoneNumber("");
          setDAddress("");
          setPassword("");
          setCPassword("");
        }
      });
  }

  return (
    <>
      <Head>
        <title>Step Two - Register</title>
        <meta
          name="description"
          content="Own Your Weird is an urban street clothing and lifestyle brand which embodies the weird in everyone."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full py-5 lg:px-20 px-5 bg-white">
        <div className="">
          <div
            className="flex text-black cursor-pointer"
            onClick={() => setScreen(0)}
          >
            <span>
              <BsArrowLeft size={22} />
            </span>
            <span className="relative bottom-[1px] left-2 font-medium">
              Go Back
            </span>
          </div>
        </div>

        {/* Rest Of Reg Form */}
        <form className="mt-20 w-full" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col lg:flex-row gap-10">
            {/* LEFT */}
            <div className="lg:w-1/2 w-full">
              {/* email */}
              <div className="">
                <label
                  className="font-semibold relative bottom-5 tracking-wide"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
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
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
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
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                  required
                  className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
                  type="text"
                  id="lName"
                  name="lName"
                  placeholder="Enter Your Last Name"
                />
              </div>

              {/* delievery address */}
              <div className="mt-14">
                <label
                  className="font-semibold relative bottom-5"
                  htmlFor="message"
                >
                  Delivery Address
                </label>
                <div>
                  <textarea
                    onChange={(event) => setDAddress(event.target.value)}
                    value={dAddress}
                    required
                    rows={3}
                    placeholder="Enter Your Delivery Address"
                    className="w-full p-5 bg-formBG border-none focus:ring-0"
                  />
                </div>
              </div>

              <small className="font-medium text-gray-600">
                Note that shipping address should be in Nigeria, as we only ship
                within Nigeria for now.
              </small>
            </div>

            {/* RIGHT */}
            <div className="lg:w-1/2 w-full mt-5 lg:mt-0">
              {/* phone number */}
              <div className="">
                <label
                  className="font-semibold relative bottom-5 tracking-wide"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  value={phoneNumber}
                  required
                  className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter Phone Number (+234)"
                  maxLength={15}
                />
              </div>

              {/* password */}
              <div className="mt-14">
                <label
                  className="font-semibold relative bottom-5 tracking-wide"
                  htmlFor="paspassword"
                >
                  Create Password
                </label>
                <div className="w-full bg-formBG flex justify-between">
                  <input
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    required
                    className="w-[90%] h-14 p-5 bg-formBG border-none focus:ring-0"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="name"
                    placeholder="Enter 8 Digits Alphanumeric Password"
                  />

                  <div className="flex justify-center items-center px-2 w-[10%]">
                    {showPassword ? (
                      <div
                        className=" cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      >
                        <AiFillEyeInvisible size={22} color="#8A8484" />
                      </div>
                    ) : (
                      <div
                        className=" cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      >
                        <AiFillEye size={22} color="#8A8484" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mt-14">
                <label
                  className="font-semibold relative bottom-5 tracking-wide"
                  htmlFor="paspassword"
                >
                  Confirm Your Password
                </label>
                <div className="w-full bg-formBG flex justify-between">
                  <input
                    onChange={(event) => setCPassword(event.target.value)}
                    value={cPassword}
                    required
                    className="w-[90%] h-14 p-5 bg-formBG border-none focus:ring-0"
                    type={showCPassword ? "text" : "password"}
                    id="password"
                    name="name"
                    placeholder="Confirm Your Password"
                  />

                  <div className="flex justify-center items-center px-2 w-[10%]">
                    {showCPassword ? (
                      <div
                        className=" cursor-pointer"
                        onClick={() => setShowCPassword(false)}
                      >
                        <AiFillEyeInvisible size={22} color="#8A8484" />
                      </div>
                    ) : (
                      <div
                        className=" cursor-pointer"
                        onClick={() => setShowCPassword(true)}
                      >
                        <AiFillEye size={22} color="#8A8484" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* button */}
          <button className="w-full bg-clayBrown text-white mt-14 py-4 tracking-wide text-center active:bg-chocoBrown">
            Register
          </button>
        </form>
      </section>
    </>
  );
}
