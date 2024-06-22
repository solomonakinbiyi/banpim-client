"use client"

import React, { useContext } from "react";
import { BackgroundBeams } from "./background-beams";
import { Button } from "./button";
import Link from "next/link";
import { UserContext } from "@/context/app";

type Props = {};

const Hero = (props: Props) => {
  const { session, setSession } = useContext(UserContext);

  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          This test was created for BanPIM
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Introducing the Mini Product Information Management System: a compact,
          efficient solution for organizing and managing your product data.
          Streamline updates, ensure data accuracy, and enhance collaboration
          across teams. Ideal for small businesses seeking to optimize their
          inventory and improve overall productivity.
        </p>
        <div className="flex justify-center mt-10 relative z-50">
          <Link href={session ? "/dashboard" : "/signin"}>
            <Button variant={"secondary"} className="cursor-pointer">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Hero;
