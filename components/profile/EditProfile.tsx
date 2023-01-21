import React, { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bcryptjs from "bcryptjs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function EditProfile({ person }: any) {
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>(person[0].firstName);
  const [lastName, setLastName] = useState<string>(person[0].lastName);
  const [dAddress, setDAddress] = useState<string>(person[0].dAddress);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const email: string = person[0].email;

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
      bcryptjs.compareSync(newPassword, person[0].password)
    ) {
      toast.error("You Cannot Use The Same Password");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be up to 8 characters");
      return;
    }

    if (bcryptjs.compareSync(oldPassword, person[0].password)) {
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
            data &&
              toast.success("Your Details Have Been Changed Successfully");
          }
        });
      router.reload();
    } else {
      toast.error("Your Old Password Is Incorrect");
      return;
    }
  }

  return (
    <>
      {/* EDIT DETAILS */}
      <form onSubmit={handleDetailsSubmit}>
        <section className="w-full flex flex-col lg:flex-row">
          {/* LEFT */}
          <div className="lg:w-1/2 w-full flex flex-col item-start">
            {/* email */}
            <div>
              <h3 className="font-semibold tracking-widest">EMAIL:</h3>
              <p className="tracking-wide my-3">{person[0].email}</p>
            </div>

            {/* phone number */}
            <div className="my-10">
              <h3 className="font-semibold tracking-widest">PHONE NUMBER:</h3>
              <p className="tracking-wide my-3">{person[0].phoneNumber}</p>
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
                placeholder={person[0].firstName}
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
                placeholder={person[0].lastName}
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
                  placeholder={person[0].dAddress}
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
        <h1 className="text-center text-3xl font-semibold">Change Password</h1>

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
    </>
  );
}
