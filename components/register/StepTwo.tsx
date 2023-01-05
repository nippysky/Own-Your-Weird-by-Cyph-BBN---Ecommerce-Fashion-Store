import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

export default function StepTwo({ formData, setFormData, setScreen }: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);

  // Funtion to handle form when it is submitted
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
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

      <section className="w-full lg:h-screen py-5 lg:px-20 px-5 bg-white">
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
        <form className="mt-20 w-full" onClick={handleSubmit}>
          <div className="w-full flex gap-10">
            {/* LEFT */}
            <div className="w-1/2">
              {/* phone number */}
              <div className="">
                <label
                  className="font-semibold relative bottom-5 tracking-wide"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      phoneNumber: event.target.value,
                    })
                  }
                  value={formData.phoneNumber}
                  required
                  className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter Phone Number (+234)"
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
                    onChange={(event) =>
                      setFormData({ ...formData, password: event.target.value })
                    }
                    value={formData.password}
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
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        cPassword: event.target.value,
                      })
                    }
                    value={formData.cPassword}
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

            {/* RIGHT */}
            <div className="w-1/2">
              <div>
                <label
                  className="font-semibold relative bottom-5"
                  htmlFor="message"
                >
                  Delivery Address
                </label>
                <div>
                  <textarea
                    onChange={(event) =>
                      setFormData({ ...formData, dAddress: event.target.value })
                    }
                    value={formData.dAddress}
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
          </div>

          {/* button */}
          <button className="w-full bg-clayBrown text-white mt-14 py-4 tracking-wide text-center">
            Register
          </button>
        </form>
      </section>
    </>
  );
}
