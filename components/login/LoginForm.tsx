import React, { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Funtion to handle form when it is submitted
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = {
      email,
      password,
    };

    // Clear Form Fields
    setEmail("");
    setPassword("");
  }

  return (
    <form onSubmit={handleSubmit}>
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
          className="w-full h-14 p-5 bg-formBG2 border-none focus:ring-0"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
      </div>

      {/* password */}
      <div className="mt-14">
        <label
          className="font-semibold relative bottom-5 tracking-wide"
          htmlFor="paspassword"
        >
          Password
        </label>
        <div className="w-full bg-formBG2 flex justify-between">
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
            className="w-[90%] h-14 p-5 bg-formBG2 border-none focus:ring-0"
            type={showPassword ? "text" : "password"}
            id="password"
            name="name"
            placeholder="Enter Your Password"
          />

          <div className="flex justify-center items-center px-2 w-[10%]">
            {showPassword ? (
              <div
                className=" cursor-pointer"
                onClick={() => setShowPassword(false)}
              >
                <AiFillEyeInvisible size={22} color="#AB734F" />
              </div>
            ) : (
              <div
                className=" cursor-pointer"
                onClick={() => setShowPassword(true)}
              >
                <AiFillEye size={22} color="#AB734F" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* button */}
      <button className="w-full bg-chocoBrown text-white mt-14 py-4 tracking-wide text-center">
        Login
      </button>
    </form>
  );
}
