import React from "react";
import Image from "next/image";

export default function RegisterionSuccessfull() {
  return (
    <section className="w-full h-screen bg-clayBrown px-20 pt-2 pb-10 flex flex-col justify-between">
      <div className="flex justify-end">
        <Image
          src={"/brand/CyphFootLogo.svg"}
          alt={"Cyph's Logo"}
          height={250}
          width={250}
          priority
        />
      </div>

      <div className="flex justify-start text-white">
        <div>
          <p className="tracking-widest">ACCOUNT CREATION SUCCESSFULL</p>
          <h1 className="text-[3rem] my-5 font-thin animate-pulse">
            Owning Your Weird...
          </h1>
        </div>
      </div>
    </section>
  );
}
