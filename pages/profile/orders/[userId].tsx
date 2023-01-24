import React from "react";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ProfileSecondaryNav from "../../../components/ProfileSecondaryNav";
import urlFor from "../../../utils/sanity-image";
import { motion } from "framer-motion";

import db from "../../../mongodb/connection";
import User from "../../../mongodb/schema";

export default function UserOrders({ user }: any) {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;

  return (
    <>
      <Head>
        <title>{user.firstName}'s Orders</title>
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

      <section className="w-full px-5 lg:px-20 mt-10">
        {/* Map through User Orders */}
        {user.orders.map((order: any, index: any) => (
          <motion.section
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ease: "easeOut", duration: 1 }}
            key={order._id}
            className={`w-full p-10 ${
              index % 2 === 0 ? "bg-clayBrown" : "bg-chocoBrown"
            } mb-10`}
          >
            <h1 className="text-xl font-semibold text-white mb-5">
              {order.date}
            </h1>

            {/* Grid The Orders */}
            <section className="grid lg:grid-cols-2 gap-10">
              {order.order.map((ord: any) => (
                <div key={ord._id} className="text-white">
                  <div className="my-3 flex gap-10">
                    <Image
                      src={`${urlFor(ord.image)}`}
                      alt={ord.longName}
                      width={100}
                      height={100}
                    />

                    <div>
                      <p className="tracking-wide uppercase mb-2">{ord.name}</p>
                      <p className="tracking-wide uppercase mb-2">
                        {ord.quantity}
                      </p>
                      <p className="tracking-wide uppercase mb-2 font-semibold">
                        {" "}
                        ₦{ord.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </motion.section>
        ))}
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

UserOrders.auth = true;
