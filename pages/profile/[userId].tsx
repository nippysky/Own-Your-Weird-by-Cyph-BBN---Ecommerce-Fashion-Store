import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import bcryptjs from "bcryptjs";
import Navbar from "../../components/Navbar";
import ProfileSecondaryNav from "../../components/ProfileSecondaryNav";
import db from "../../mongodb/connection";
import User from "../../mongodb/schema";

export default function UserProfile({ user }: any) {
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [dAddress, setDAddress] = useState<string>(user.dAddress);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const email: string = user.email;

  // Handle Details Change
  async function handleDetailsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      dAddress.length === 0 ||
      firstName === "" ||
      lastName === "" ||
      dAddress === ""
    ) {
      toast.error("No Field Should Be Left Empty");
      return;
    }

    const editData = {
      email,
      firstName,
      lastName,
      dAddress,
    };

    // Submit Data To API
    await fetch("/api/edit-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })
      .then((res) => res.json())
      .then((data) => {
        {
          data && toast.success("Your Details Have Been Changed Successfully");
        }
      });

    router.reload();
  }

  // Handle Change Password
  async function handlePasswordChange(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      oldPassword === newPassword ||
      bcryptjs.compareSync(newPassword, user.password)
    ) {
      toast.error("You Cannot Use The Same Password");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be up to 8 characters");
      return;
    }

    if (bcryptjs.compareSync(oldPassword, user.password)) {
      const passwordData = {
        email,
        newPassword,
      };

      // Submit Data To API
      await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      })
        .then((res) => res.json())
        .then((data) => {
          {
            data && toast.success("Password Successfully Changed");
          }
        });
      router.replace("/login");
    } else {
      toast.error("Your Old Password Is Incorrect");
      return;
    }
  }

  return (
    <>
      <Head>
        <title>{user.firstName}'s Profile</title>
        <meta
          name="description"
          content="Own Your Weird is an urban street clothing and lifestyle brand which embodies the weird in everyone."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full px-5 lg:px-20">
        <Navbar />
      </header>

      <section>
        <ProfileSecondaryNav />
      </section>

      <section className="w-full px-5 lg:px-20 my-10">
        {/* EDIT DETAILS */}
        <form onSubmit={handleDetailsSubmit}>
          <section className="w-full flex flex-col lg:flex-row">
            {/* LEFT */}
            <div className="lg:w-1/2 w-full flex flex-col item-start">
              {/* email */}
              <div>
                <h3 className="font-semibold tracking-widest">EMAIL:</h3>
                <p className="tracking-wide my-3">{user.email}</p>
              </div>

              {/* phone number */}
              <div className="my-10">
                <h3 className="font-semibold tracking-widest">PHONE NUMBER:</h3>
                <p className="tracking-wide my-3">{user.phoneNumber}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:w-1/2 w-full flex flex-col mt-5">
              {/* firstname */}
              <div>
                <label
                  className="font-semibold relative bottom-5 tracking-widest"
                  htmlFor="fName"
                >
                  FIRST NAME:
                </label>
                <input
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                  required
                  className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
                  type="text"
                  id="fName"
                  name="fName"
                  placeholder={user.firstName}
                />
              </div>

              {/* lastname */}
              <div className="mt-14">
                <label
                  className="font-semibold relative bottom-5 tracking-widest"
                  htmlFor="fName"
                >
                  LAST NAME:
                </label>
                <input
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                  required
                  className="w-full h-14 p-5 bg-formBG border-none focus:ring-0"
                  type="text"
                  id="fName"
                  name="fName"
                  placeholder={user.lastName}
                />
              </div>

              {/* delivery address */}
              <div className="mt-14">
                <label
                  className="font-semibold relative bottom-5 tracking-widest"
                  htmlFor="message"
                >
                  DELIVERY ADDRESS:
                </label>
                <div>
                  <textarea
                    onChange={(event) => setDAddress(event.target.value)}
                    value={dAddress}
                    required
                    rows={3}
                    placeholder={user.dAddress}
                    className="w-full p-5 bg-formBG border-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full bg-clayBrown text-white mt-14 py-4 tracking-wide text-center active:bg-chocoBrown">
                Save
              </button>
            </div>
          </section>
        </form>

        {/* CHNAGE PASSWORD */}
        <form className="mt-20" onSubmit={handlePasswordChange}>
          <h1 className="text-center text-3xl font-semibold">
            Change Password
          </h1>

          <section className="w-full lg:px-40">
            {/* current password */}
            <div className="mt-14">
              <label
                className="font-semibold relative bottom-5 tracking-widest"
                htmlFor="paspassword"
              >
                CURRENT PASSWORD
              </label>
              <div className="w-full bg-formBG flex justify-between">
                <input
                  onChange={(event) => setOldPassword(event.target.value)}
                  value={oldPassword}
                  required
                  className="w-[90%] h-14 p-5 bg-formBG border-none focus:ring-0"
                  type={showOldPassword ? "text" : "password"}
                  id="password"
                  name="name"
                  placeholder="Enter Current Password"
                />

                <div className="flex justify-center items-center px-2 w-[10%]">
                  {showOldPassword ? (
                    <div
                      className=" cursor-pointer"
                      onClick={() => setShowOldPassword(false)}
                    >
                      <AiFillEyeInvisible size={22} color="#8A8484" />
                    </div>
                  ) : (
                    <div
                      className=" cursor-pointer"
                      onClick={() => setShowOldPassword(true)}
                    >
                      <AiFillEye size={22} color="#8A8484" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* new password */}
            <div className="mt-14">
              <label
                className="font-semibold relative bottom-5 tracking-widest"
                htmlFor="paspassword"
              >
                NEW PASSWORD
              </label>
              <div className="w-full bg-formBG flex justify-between">
                <input
                  onChange={(event) => setNewPassword(event.target.value)}
                  value={newPassword}
                  required
                  className="w-[90%] h-14 p-5 bg-formBG border-none focus:ring-0"
                  type={showNewPassword ? "text" : "password"}
                  id="password"
                  name="name"
                  placeholder="Enter New Password"
                />

                <div className="flex justify-center items-center px-2 w-[10%]">
                  {showNewPassword ? (
                    <div
                      className=" cursor-pointer"
                      onClick={() => setShowNewPassword(false)}
                    >
                      <AiFillEyeInvisible size={22} color="#8A8484" />
                    </div>
                  ) : (
                    <div
                      className=" cursor-pointer"
                      onClick={() => setShowNewPassword(true)}
                    >
                      <AiFillEye size={22} color="#8A8484" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* chnage password button */}
            <button className="w-full bg-clayBrown text-white mt-14 py-4 tracking-wide text-center active:bg-chocoBrown">
              Save New Password
            </button>
          </section>
        </form>
      </section>
    </>
  );
}

export async function getServerSideProps(context: { query: { userId: any } }) {
  const { userId } = context.query;
  await db.connect();
  const user = await User.findById(userId).lean();

  return { props: { user: JSON.parse(JSON.stringify(user)) } };
}

UserProfile.auth = true;
