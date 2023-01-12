// @ts-nocheck
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import client from "../../../utils/client";
import urlFor from "../../../utils/sanity-image";
import { BsArrowLeft } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { addToBag } from "../../../redux/slices/bagSlice";

export default function SweatshirtProductDetails(props: any) {
  const { slug } = props;
  const [state, setState] = useState({
    sweatshirt: null,
    loading: true,
  });
  const { sweatshirt, loading } = state;

  const [moreState, setMoreState] = useState({
    moreSweatshirt: null,
    moreLoading: true,
  });
  const { moreSweatshirt, moreLoading } = moreState;

  // store order details for color,size and amount
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const sweatshirt = await client.fetch(
        `*[_type == "sweatshirt" && slug.current == $slug][0]`,
        { slug }
      );

      const moreSweatshirt = await client.fetch(`*[_type == "sweatshirt"]`);
      setState({ ...state, sweatshirt: sweatshirt, loading: false });
      setMoreState({
        ...moreState,
        moreSweatshirt: moreSweatshirt,
        moreLoading: false,
      });
    };
    fetchData();
  }, []);

  // Redux Dispatch
  const dispatch = useDispatch();

  // ADD ITEM TO BAG
  const addItemToBag = () => {
    if (size === "" || color === "") return;
    const newSweatshirt = { ...sweatshirt, price: sweatshirt.price * quantity };
    const product = { ...newSweatshirt, size, color, quantity };
    // send product as an action to redux store.. The Bag Slice
    dispatch(addToBag(product));
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
            <Link href={"/shop/sweatshirt"}>
              <div className="flex text-black">
                <span>
                  <BsArrowLeft size={22} />
                </span>
                <span className="relative bottom-[1px] left-2 font-medium">
                  Go Back
                </span>
              </div>
            </Link>
          </div>

          {/* product details */}
          <section className="w-full flex-col lg:flex lg:flex-row gap-10 my-10">
            {/* image */}
            <div className="lg:w-1/2 w-full flex justify-center lg:justify-start">
              <div>
                <Image
                  src={`${urlFor(sweatshirt.image)}`}
                  alt={sweatshirt.name}
                  width={400}
                  height={500}
                  priority
                />
              </div>
            </div>

            {/* shopping details */}
            <div className="lg:w-1/2 w-full mt-5 lg:mt-0">
              <div>
                {/* title- Long name */}
                <h1 className="font-medium tracking-wider capitalize text-2xl">
                  {sweatshirt.longName}
                </h1>

                {/* Price and Size */}
                <div className="w-full flex-col lg:flex lg:flex-row gap-10 justify-between my-10">
                  <div className="lg:w-1/2 w-full">
                    <small className="font-semibold text-gray-500">Price</small>
                    <h4 className="font-bold text-clayBrown text-2xl mt-3">
                      ₦{sweatshirt.price * quantity}
                    </h4>
                  </div>

                  <div className="lg:w-1/2 w-full mt-7 lg:mt-0">
                    <small className="font-semibold text-gray-500">Size</small>
                    <select
                      onChange={(event) => setSize(event.target.value)}
                      value={size}
                      required
                      id="reason"
                      name="reason"
                      className="w-full h-14 bg-formBG2 border-none focus:ring-0 mt-3"
                    >
                      <option value="" disabled selected hidden>
                        Select
                      </option>
                      {sweatshirt.size.map((size: any) => (
                        <option value={size}>{size}</option>
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
                      id="reason"
                      name="reason"
                      className="w-full h-14 bg-formBG2 border-none focus:ring-0 mt-3"
                    >
                      <option value="" disabled selected hidden>
                        Select
                      </option>
                      {sweatshirt.color.map((color: any) => (
                        <option value={color}>{color}</option>
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
            </div>
          </section>

          {/* MORE FROM THIS COLLECTION */}
          {moreLoading ? (
            <p>...loading</p>
          ) : (
            <section className="my-32">
              <h1 className="font-semibold tracking-wide text-2xl text-center lg:text-left">
                More From This Collection
              </h1>

              <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center place-content-center mt-10">
                {moreSweatshirt
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 3)
                  .map((outfit: any) => (
                    <div key={outfit._id}>
                      <a href={`/shop/sweatshirt/${outfit.slug.current}`}>
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
                <Link href={"/shop/sweatshirt"}>
                  <button className="font-semibold bg-transparent border border-chocoBrown text-center text-clayBrown py-3 px-20">
                    Load More
                  </button>
                </Link>
              </div>
            </section>
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
