import React from "react";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import {
  emptyCart,
  selectItems,
  selectTotal,
} from "../../../redux/slices/bagSlice";

import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import db from "../../../mongodb/connection";
import User from "../../../mongodb/schema";

export default function Checkout({ user }: any) {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const email = user.email;

  const router = useRouter();

  // Redux Dispatch
  const dispatch = useDispatch();

  const items: object[] = useSelector(selectItems);
  const total: number = useSelector(selectTotal);

  const deliveryFee: number = 2500;
  const finalTotal: number = total + deliveryFee;

  // Handle Paystack Payment
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: finalTotal * 100,
    publicKey: "pk_test_c2269f877802b324fdb3abc7554c34d137d13780",
  };

  const initializePayment = usePaystackPayment(config);

  // HANDLE ON SUCCESS EVENT
  // @ts-ignore
  const onSuccess = (ref) => {
    toast.success(
      `You payment was of  ₦${finalTotal} : ${ref.reference} was successfull`
    );

    const orderdItems = { email, items };

    // Submit Cart Items To Orders API
    fetch("/api/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderdItems),
    });

    // redirect to profile page
    router.push("/order-successfull");

    // empty cart items
    dispatch(emptyCart());
  };

  // HANDLE CLOSE EVENT ON PAYSTACK MODAL
  const onClose = () => {
    toast.warn(`You dismissed the transaction.`);
  };

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
                    {user.email}
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
                    {user.firstName + " " + user.lastName}
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
                    {user.phoneNumber}
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
                    {user.dAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <Link href={`/profile/${userId}`}>
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
          <button
            className="w-full bg-clayBrown text-white font-medium tracking-wide py-3"
            onClick={() => {
              // @ts-ignore
              initializePayment(onSuccess, onClose);
            }}
          >
            PAY
          </button>
        )}
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

Checkout.auth = true;
