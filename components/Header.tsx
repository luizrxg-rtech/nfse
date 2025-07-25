'use client';

import Image from "next/image";
import Nav from "@/components/Nav";

export default function Header() {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center pyh-20">
          <div className="flex items-center space-x-3">
            <Image
              alt="Logo"
              src="/images/logo.png"
              width={2196}
              height={803}
              className="w-auto h-16"
            />
          </div>
          <Nav />
        </div>
      </div>
    </header>
  );
}