import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function ProfileSecondaryNav() {
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;
  const { asPath } = useRouter();

  return (
    <header className="w-full px-5 lg:px-20">
      {/* Secondary Profile Nav */}
      <nav className="w-full bg-formBG2 flex flex-col lg:flex-row p-3">
        {/* editprofile */}
        <div
          className={`lg:w-1/3 w-full text-center ${
            asPath === `/profile/${userId}`
              ? "bg-chocoBrown text-white py-3 my-5 lg:my-0"
              : "null"
          }`}
        >
          <Link href={`/profile/${userId}`}>
            <span className={`font-medium tracking-widest text-[0.85rem]`}>
              EDIT PROFILE
            </span>
          </Link>
        </div>

        {/* my orders */}
        <div
          className={`lg:w-1/3 w-full text-center ${
            asPath === `/profile/orders/${userId}`
              ? "bg-chocoBrown text-white py-3 my-5 lg:my-0"
              : "null"
          }`}
        >
          <Link href={`/profile/orders/${userId}`}>
            <span className={`font-medium tracking-widest text-[0.85rem]`}>
              MY ORDERS
            </span>
          </Link>
        </div>

        {/* signout */}
        <div
          onClick={() => signOut()}
          className={`lg:w-1/3 w-full text-center font-medium tracking-widest text-[0.85rem] bg-red-600 py-3 text-white cursor-pointer mt-10 lg:mt-0`}
        >
          SIGN OUT
        </div>
      </nav>
    </header>
  );
}
