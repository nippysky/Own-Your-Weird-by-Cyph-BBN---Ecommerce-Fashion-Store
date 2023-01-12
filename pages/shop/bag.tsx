import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import {
  removeFromBag,
  selectItems,
  selectTotal,
} from "../../redux/slices/bagSlice";
import urlFor from "../../utils/sanity-image";
import { IoClose } from "react-icons/io5";

import { useDispatch } from "react-redux";

export default function Bag() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  // Redux Dispatch
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Shopping Bag - Own Your Weird</title>
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

      <section className="w-full px-5 lg:px-20 my-5">
        {/* Button */}
        <div className="w-full flex justify-between items-center">
          <div className="w-1/2 flex justify-start">
            <h1 className="font-medium text-clayBrown text-xl">
              {items.length === 0
                ? "Your Bag Is Empty"
                : "Your Weird Shopping Bag"}
            </h1>
          </div>

          <div className="w-1/2 flex justify-end">
            {items.length > 0 ? (
              <Link href={"/"}>
                <button className="bg-clayBrown py-3 px-14 text-center font-semibold text-white">
                  Proceed To Pay
                </button>
              </Link>
            ) : (
              <Link href={"/shop"}>
                <button className="bg-clayBrown py-3 px-14 text-center font-semibold text-white">
                  Continue Shopping
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Map Cart Items From Redux Global Store */}
        {items.map((item: any, index: any) => (
          <section
            key={item._id}
            className={`w-full ${
              index % 2 === 0 ? "bg-clayBrown" : "bg-chocoBrown"
            } p-10 my-10 flex justify-between items-start`}
          >
            {/* IMAGE, QUANTITY, COLOR, SIZE */}
            <div className="flex gap-5 w-1/2 justify-start">
              <Image
                src={`${urlFor(item.image)}`}
                alt={item.name}
                width={200}
                height={200}
              />

              <div className="text-white flex flex-col justify-between">
                {/* size */}
                <div>
                  <span className="font-regular">Size: </span>
                  <span className="font-bold">{item.size}</span>
                </div>

                {/* color */}
                <div>
                  <span className="font-regular">Color: </span>
                  <span className="font-bold">{item.color}</span>
                </div>

                {/* quantity */}
                <div>
                  <span className="font-regular">Quantity: </span>
                  <span className="font-bold">{item.quantity}</span>
                </div>
              </div>
            </div>

            {/* DELETE-BUTTON, NAME, PRICE */}
            <div className="w-1/2 text-white flex justify-end">
              <div className="flex flex-col gap-20 items-end">
                {/* delete button */}
                <div
                  className="cursor-pointer"
                  onClick={() => dispatch(removeFromBag(item._id))}
                >
                  <IoClose color="white" size={30} />
                </div>

                {/* name, price */}
                <div className="flex flex-col items-end">
                  <h4 className="text-white tracking-widest uppercase text-xl font-medium">
                    {item.name}
                  </h4>

                  <h4 className="mt-5 text-xl font-bold tracking-wide">
                    ₦{item.price}
                  </h4>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Other Details */}
        {items.length > 0 && (
          <section className="w-full mt-20">
            <div className="w-full flex justify-between items-center mb-5">
              <p className="font-medium tracking-widest">PRODUCTS IN BAG:</p>
              <p className="font-bold text-chocoBrown text-[1.2rem]">
                {items.length}
              </p>
            </div>

            <div className="w-full flex justify-between items-center mb-5">
              <p className="font-medium tracking-widest">TOTAL:</p>
              <p className="font-bold text-chocoBrown text-[1.2rem]">
                ₦{total}
              </p>
            </div>

            <button className="my-10 bg-clayBrown text-center py-3 w-full text-white font-semibold">
              Proceed To Pay
            </button>
          </section>
        )}
      </section>
    </>
  );
}
