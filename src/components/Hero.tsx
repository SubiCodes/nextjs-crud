import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HeaderSection() {

  return (
    <div className="border min-h-screen flex items-center justify-center">
      <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center max-w-5xl grid-cols-1 mx-auto gap-y-8 lg:grid-cols-5 gap-x-16">
            <div className="max-w-md mx-auto text-center lg:max-w-none lg:col-span-3">
              <h1 className="text-4xl font-normal uppercase sm:text-5xl lg:text-6xl xl:text-8xl">
                All about <span>PC PARTS</span>
              </h1>
              <p className="mt-6 text-lg font-normal sm:text-xl">
                Join other PC Parts enthusiast, post and view information about components to help grow the community.
              </p>
              <div className="mt-8 sm:mt-10">
                <Button variant={'default'} asChild>
                    <Link href={'/parts'}>Browse Now</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 lg:order-first">
              <img
                className="w-full max-w-sm mx-auto"
                src="https://png.pngtree.com/png-vector/20230109/ourmid/pngtree-pc-monitor-component-isometric-png-image_6557574.png"
                alt="App mockup"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
