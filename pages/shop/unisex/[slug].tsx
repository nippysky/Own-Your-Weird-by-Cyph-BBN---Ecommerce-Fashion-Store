// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import client from "../../../utils/client";
import urlFor from "../../../utils/sanity-image";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToBag } from "../../../redux/slices/bagSlice";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function UnisexProductDetails(props: any) {
  const router = useRouter();
  const { slug } = props;
  const [state, setState] = useState({
    unisex: null,
    loading: true,
  });
  const { unisex, loading } = state;

  const [moreState, setMoreState] = useState({
    moreUnisex: null,
    moreLoading: true,
  });
  const { moreUnisex, moreLoading } = moreState;

  // store order details for color,size and amount
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const unisex = await client.fetch(
        `*[_type == "unisex" && slug.current == $slug][0]`,
        { slug }
      );

      const moreUnisex = await client.fetch(`*[_type == "unisex"]`);
      setState({ ...state, unisex: unisex, loading: false });
      setMoreState({
        ...moreState,
        moreUnisex: moreUnisex,
        moreLoading: false,
      });
    };
    fetchData();
  }, [moreState, slug, state]);

  // Redux Dispatch
  const dispatch = useDispatch();

  // ADD ITEM TO BAG
  const addItemToBag = () => {
    if (size === "" || color === "") {
      toast.error("Kindly select your Size and Color");
      return;
    }
    const newUnisex = { ...unisex, price: unisex.price * quantity };
    const product = { ...newUnisex, size, color, quantity };

    // send product as an action to redux store.. The Bag Slice
    dispatch(addToBag(product));
    toast.success(`${unisex.name} added to cart successfully`);
  };

  return (
    <>
      <Head>
        <title>Details - Own Your Weird</title>
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

      {loading ? (
        <p>...loading</p>
      ) : (
        <section className="w-full px-5 lg:px-32 py-3">
          {/* go back arrow */}
          <div className="lg:w-1/4 w-full">
            <div
              className="flex text-black cursor-pointer"
              onClick={() => router.back()}
            >
              <span>
                <BsArrowLeft size={22} />
              </span>
              <span className="relative bottom-[1px] left-2 font-medium">
                Go Back
              </span>
            </div>
          </div>

          {/* product details */}
          <section className="w-full flex-col lg:flex lg:flex-row gap-10 my-10">
            {/* image */}
            <motion.div
              className="lg:w-1/2 w-full flex justify-center lg:justify-start"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              <div>
                <Image
                  src={`${urlFor(unisex.image)}`}
                  alt={unisex.name}
                  width={400}
                  height={500}
                  priority
                />
              </div>
            </motion.div>

            {/* shopping details */}
            <motion.div
              className="lg:w-1/2 w-full mt-5 lg:mt-0"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              <div>
                {/* title- Long name */}
                <h1 className="font-medium tracking-wider capitalize text-2xl">
                  {unisex.longName}
                </h1>

                {/* Price and Size */}
                <div className="w-full flex-col lg:flex lg:flex-row gap-10 justify-between my-10">
                  <div className="lg:w-1/2 w-full">
                    <small className="font-semibold text-gray-500">Price</small>
                    <h4 className="font-bold text-clayBrown text-2xl mt-3">
                      ₦{unisex.price * quantity}
                    </h4>
                  </div>

                  <div className="lg:w-1/2 w-full mt-7 lg:mt-0">
                    <small className="font-semibold text-gray-500">Size</small>
                    <select
                      onChange={(event) => setSize(event.target.value)}
                      value={size}
                      required
                      className="w-full h-14 bg-formBG2 border-none focus:ring-0 mt-3"
                    >
                      <option value="" disabled selected hidden>
                        Select
                      </option>
                      {unisex.size.map((size: any) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quantuty and Color */}
                <div className="w-full flex-col lg:flex lg:flex-row gap-10 justify-between my-10">
                  <div className="lg:w-1/2 w-full">
                    <small className="font-semibold text-gray-500">
                      Number Of Items
                    </small>

                    <div className="w-full mt-3 flex gap-5 items-center justify-start">
                      {/* minus */}
                      <div
                        className="text-[2.5rem] text-clayBrown cursor-pointer active:bg-formBG2"
                        onClick={() => {
                          if (quantity === 1) return;
                          setQuantity(quantity - 1);
                        }}
                      >
                        -
                      </div>

                      {/* count box */}
                      <div className="bg-formBG2 w-[50px] h-[50px] text-center text-clayBrown flex justify-center items-center text-[2rem] font-bold">
                        {quantity}
                      </div>

                      {/* plus */}
                      <div
                        className="text-[2.5rem] text-clayBrown cursor-pointer active:bg-formBG2"
                        onClick={() => {
                          setQuantity(quantity + 1);
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 w-full mt-7 lg:mt-0">
                    <small className="font-semibold text-gray-500">Color</small>
                    <select
                      onChange={(event) => setColor(event.target.value)}
                      value={color}
                      required
                      className="w-full h-14 bg-formBG2 border-none focus:ring-0 mt-3"
                    >
                      <option value="" disabled selected hidden>
                        Select
                      </option>
                      {unisex.color.map((color: any) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Add To Bag Button */}
                <button
                  className="w-full bg-clayBrown text-center font-semibold text-white py-4 mt-3 active:bg-chocoBrown"
                  onClick={addItemToBag}
                >
                  Add To Bag
                </button>
              </div>
            </motion.div>
          </section>

          {/* MORE FROM THIS COLLECTION */}
          {moreLoading ? (
            <p>...loading</p>
          ) : (
            <motion.section
              className="my-32"
              initial={{ opacity: 0, y: 100 }}
              transition={{ ease: "easeOut", duration: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <h1 className="font-semibold tracking-wide text-2xl text-center lg:text-left">
                More From This Collection
              </h1>

              <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center place-content-center mt-10">
                {moreUnisex.slice(0, 3).map((outfit: any) => (
                  <div key={outfit._id}>
                    <a href={`/shop/unisex/${outfit.slug.current}`}>
                      {/* image */}
                      <div className="">
                        <Image
                          src={`${urlFor(outfit.image)}`}
                          alt={outfit.name}
                          width={360}
                          height={360}
                          priority
                        />
                      </div>

                      {/* name */}
                      <p className="tracking-widest uppercase font-medium my-2">
                        {outfit.name}
                      </p>
                      {/* price */}
                      <p className="text-chocoBrown font-bold text-xl my-2">
                        ₦{outfit.price}
                      </p>
                    </a>
                  </div>
                ))}
              </section>

              <div className="w-full flex justify-center items-center mt-20">
                <Link href={"/shop/unisex"}>
                  <button className="font-semibold bg-transparent border border-chocoBrown text-center text-clayBrown py-3 px-20">
                    Load More
                  </button>
                </Link>
              </div>
            </motion.section>
          )}
        </section>
      )}
    </>
  );
}

export function getServerSideProps(context: any) {
  return {
    props: { slug: context.params.slug },
  };
}
