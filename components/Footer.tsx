import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <section className="w-full bg-clayBrown lg:px-20 px-5">
      {/* Logo */}
      <div className="flex justify-start items-center">
        <Link href={"/"}>
          <Image
            src={"/brand/CyphFootLogo.svg"}
            alt={"Cyph's Footer Logo"}
            height={50}
            width={150}
            priority
          />
        </Link>
      </div>
    </section>
  );
}
