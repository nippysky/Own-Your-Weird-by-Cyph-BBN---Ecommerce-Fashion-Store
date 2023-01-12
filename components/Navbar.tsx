import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RxPerson } from "react-icons/rx";

import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/bagSlice";

export default function Navbar() {
  const { asPath } = useRouter();
  const items = useSelector(selectItems);

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
        <Link href={"/shop/unisex"}>
          <span
            className={`font-medium tracking-widest text-[0.85rem] ${
              asPath === "/shop/unisex"
                ? "bg-chocoBrown text-white px-2 py-1"
                : "null"
            }`}
          >
            UNISEX
          </span>
        </Link>

        <Link href={"/shop/female"}>
          <span
            className={`font-medium tracking-widest text-[0.85rem] ${
              asPath === "/shop/female"
                ? "bg-chocoBrown text-white px-2 py-1"
                : "null"
            }`}
          >
            FEMALE
          </span>
        </Link>

        <Link href={"/shop/sweatshirt"}>
          <span
            className={`font-medium tracking-widest text-[0.85rem] ${
              asPath === "/shop/sweatshirt"
                ? "bg-chocoBrown text-white px-2 py-1"
                : "null"
            }`}
          >
            SWEATSHIRT
          </span>
        </Link>
      </nav>

      {/* Nav Icons */}
      <nav className="flex gap-5 lg:gap-10 justify-end items-center">
        <Link href={"/"}>
          <RxPerson size={22} />
        </Link>

        <div
          className={` ${
            asPath === "/shop/bag"
              ? "bg-clayBrown text-white px-4 py-3"
              : "null"
          }`}
        >
          <Link href={"/shop/bag"}>
            <div className={`flex relative`}>
              {/* bag */}
              <HiOutlineShoppingBag size={25} />
              {/* count circle */}
              <div
                className={`w-[15px] h-[15px] bg-chocoBrown rounded-full absolute bottom-0 -right-2 flex justify-center items-center text-white ${
                  asPath === "/shop/bag" ? "bg-white text-black" : "null"
                }`}
              >
                <small className="text-[0.65rem] font-bold">
                  {items.length}
                </small>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
