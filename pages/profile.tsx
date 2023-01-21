// @ts-nocheck
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { signOut, useSession } from "next-auth/react";
import { requireAuthentication } from "../utils/requireAuthentication";
import axios from "axios";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import EditProfile from "../components/profile/EditProfile";
import Orders from "../components/profile/Orders";

export default function UserProfile() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [person, setPerson] = useState<object[]>([]);

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
        <title>My Profile - Own Your Weird</title>
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
        {/* Title */}
        <h1 className="lg:text-3xl text-2xl tracking-wider font-medium">
          {email &&
            `    ${person[0]?.firstName + " " + person[0]?.lastName}'s Profile`}
        </h1>

        {/* Tabs */}
        <div className="w-full mt-10">
          <Tab.Group>
            <Tab.List className="flex flex-col md:flex-row space-x-1 p-2 bg-formBG2">
              {/* Edit Profile */}
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm font-medium leading-5",
                    selected
                      ? "bg-chocoBrown text-white ring-white ring-opacity-60 focus:outline-none focus:ring-1"
                      : null
                  )
                }
              >
                Orders
              </Tab>

              {/* Orders */}
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm font-medium leading-5",
                    selected
                      ? "bg-chocoBrown text-white ring-white ring-opacity-60 focus:outline-none focus:ring-1"
                      : null
                  )
                }
              >
                Edit Profile
              </Tab>

              {/* Sign Out */}
              <Tab
                onClick={() => signOut()}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm font-medium leading-5",
                    selected
                      ? "bg-red-600 text-white ring-white ring-opacity-60 focus:outline-none focus:ring-1"
                      : null
                  )
                }
              >
                Sign Out
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-5">
              <Tab.Panel className="bg-white p-3">
                <Orders person={person} />
              </Tab.Panel>

              <Tab.Panel className="bg-white p-3">
                <EditProfile person={person} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
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
