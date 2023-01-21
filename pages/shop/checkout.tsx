// @ts-nocheck
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { requireAuthentication } from "../../utils/requireAuthentication";
import { selectItems, selectTotal } from "../../redux/slices/bagSlice";
import Link from "next/link";

export default function Checkout() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [person, setPerson] = useState<object[]>([]);

  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const deliveryFee = 2500;
  const finalTotal = total + deliveryFee;

  useEffect(() => {
    axios
      .get("/api/user")
      .then(function (response) {
        // handle success
        const gottenArray = response.data.data;
        function filterByValue(array: any[], value: any) {
          return array.filter(
            (data) =>
              JSON.stringify(data)
                .toLowerCase()
                .indexOf(value.toLowerCase()) !== -1
          );
        }
        setPerson(filterByValue(gottenArray, email));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [session]);

  return (
    <>
      <Head>
        <title>Checkout - Own Your Weird</title>
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
        <div className="w-full mb-10">
          <Link href={"/shop/bag"}>
            <span className="font-semibold underline">Bag</span>
          </Link>
          <span> / Checkout</span>
        </div>

        {/* ITEMS AND USER DETAILS */}
        <div className="w-full flex flex-col lg:flex-row gap-10">
          {/* items */}
          <div className="lg:w-[30%] h-[300px] w-full bg-clayBrown py-5 px-10 text-white">
            <p className="text-left font-medium tracking-widest">
              WE ARE SHIPPING:
            </p>
            <h2 className="text-center font-black text-[7rem] my-5">
              {items.length}
            </h2>
            <p className="text-right font-medium tracking-widest">
              ITEMS TO YOU
            </p>
          </div>

          {/* user details */}
          <div className="lg:w-[70%] w-full bg-chocoBrown py-5 px-10 text-white">
            <h2 className="font-medium tracking-wide text-2xl">
              Custsomer Delivery Details
            </h2>

            <div className="w-full my-10">
              {/* email */}
              <div className="flex items-center w-full mb-7">
                <div className="flex justify-start w-1/2">
                  <p className="font-bold tracking-widest">EMAIL:</p>
                </div>
                <div className="flex justify-end w-1/2">
                  <p className="font-medium tracking-wide text-[0.85rem] text-right">
                    {person[0]?.email}
                  </p>
                </div>
              </div>

              {/* name */}
              <div className="flex items-center w-full mb-7">
                <div className="flex justify-start w-1/2">
                  <p className="font-bold tracking-widest">NAME:</p>
                </div>
                <div className="flex justify-end w-1/2">
                  <p className="font-medium tracking-wide text-[0.85rem] text-right">
                    {person[0]?.firstName + " " + person[0]?.lastName}
                  </p>
                </div>
              </div>

              {/* phone number */}
              <div className="flex items-center w-full mb-7">
                <div className="flex justify-start w-1/2">
                  <p className="font-bold tracking-widest">PHONE NUMBER:</p>
                </div>
                <div className="flex justify-end w-1/2">
                  <p className="font-medium tracking-wide text-[0.85rem] text-right">
                    {person[0]?.phoneNumber}
                  </p>
                </div>
              </div>

              {/* address */}
              <div className="flex items-center w-full mb-7">
                <div className="flex justify-start w-1/2">
                  <p className="font-bold tracking-widest">ADDRESS:</p>
                </div>
                <div className="flex justify-end w-1/2">
                  <p className="font-medium tracking-wide text-[0.85rem] text-right">
                    {person[0]?.dAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <Link href={"/"}>
              <button className="w-full bg-white text-clayBrown font-medium tracking-wide py-3">
                Edit Delivery Details
              </button>
            </Link>
          </div>
        </div>

        {/* TOTAL, DELIVERY FEE, FINAL PAYMENT */}
        {total > 0 && (
          <div className="my-10 bg-white border border-chocoBrown py-5 px-10">
            {/* total */}
            <div className="flex items-center w-full mb-7">
              <div className="flex justify-start w-1/2">
                <p className="font-semibold tracking-widest text-gray-400">
                  TOTAL BAG PRICE:
                </p>
              </div>
              <div className="flex justify-end w-1/2">
                <p className="font-medium tracking-wide text-gray-400 text-right">
                  ₦{total}
                </p>
              </div>
            </div>

            {/* delivery fee */}
            <div className="flex items-center w-full mb-7">
              <div className="flex justify-start w-1/2">
                <p className="font-semibold tracking-widest text-gray-400">
                  DELIVERY FEE:
                </p>
              </div>
              <div className="flex justify-end w-1/2">
                <p className="font-medium tracking-wide text-gray-400 text-right">
                  {total <= 0 ? ` ₦${0}` : ` ₦${deliveryFee}`}
                </p>
              </div>
            </div>

            {/* final total */}
            <div className="flex items-center w-full my-7">
              <div className="flex justify-start w-1/2">
                <p className="font-semibold tracking-widest text-gray-400">
                  FINAL PAYMENT:
                </p>
              </div>
              <div className="flex justify-end w-1/2">
                <p className="font-semibold tracking-wide text-xl text-chocoBrown text-right">
                  {total <= 0 ? ` ₦${0}` : ` ₦${finalTotal}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT GATEWAY BUTTON */}
        {total > 0 && (
          <button className="w-full bg-clayBrown text-white font-medium tracking-wide py-3">
            PAY
          </button>
        )}
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return requireAuthentication(context, ({ session }: any) => {
    return {
      props: { session },
    };
  });
}
