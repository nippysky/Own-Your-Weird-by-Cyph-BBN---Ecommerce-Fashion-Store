import React from "react";
import Image from "next/image";
import Link from "next/link";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RxPerson } from "react-icons/rx";

export default function Navbar() {
  return (
    <header className="w-full flex flex-1 justify-between items-center relative bottom-5">
      {/* Logo */}
      <div className="flex justify-start items-center">
        <Link href={"/"}>
          <Image
            src={"/brand/CyphLogo.svg"}
            alt={"Cyph's Logo"}
            height={50}
            width={70}
            priority
          />
        </Link>
      </div>

      {/* Menu Links */}
      <nav className="flex gap-10 justify-center items-center">
        <Link href={"/"}>
          <span className="font-medium tracking-widest text-[0.85rem]">
            UNISEX
          </span>
        </Link>

        <Link href={"/"}>
          <span className="font-medium tracking-widest text-[0.85rem]">
            FEMALE
          </span>
        </Link>
      </nav>

      {/* Nav Icons */}
      <nav className="flex gap-5 lg:gap-10 justify-end items-center">
        <Link href={"/"}>
          <RxPerson size={22} />
        </Link>

        <Link href={"/"}>
          <div className="flex relative">
            {/* bag */}
            <HiOutlineShoppingBag size={25} />
            {/* count circle */}
            <div className="w-[15px] h-[15px] bg-chocoBrown rounded-full absolute bottom-0 -right-2 flex justify-center items-center text-white">
              <small className="text-[0.65rem] font-bold">0</small>
            </div>
          </div>
        </Link>
      </nav>
    </header>
  );
}
