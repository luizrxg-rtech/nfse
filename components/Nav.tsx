'use client';

import {useRef, useState} from "react";
import NextLink from "next/link";
import {Link} from "@/types/Nav";

export default function Nav() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [backgroundStyle, setBackgroundStyle] = useState<{left: number, width: number}>({left: 0, width: 100});
  const navRef = useRef<HTMLElement>(null);

  const links: Link[] = [
    {href: "/#", text: "Nota Certa"  },
    {href: "/#", text: "Legislação"  },
    {href: "/#", text: "Dúvidas"     },
    {href: "/#", text: "Fale conosco"},
  ]

  const handleLinkHover = (id: number) => {
    console.log("hovered", hovered);
    console.log("id", id);

    if (id !== null) {
      setHovered(id);

      const hoveredElement = document.getElementById(id.toString());
      const navContainer = navRef.current;

      if (hoveredElement && navContainer) {
        const navRect = navContainer.getBoundingClientRect();
        const linkRect = hoveredElement.getBoundingClientRect();

        const left = linkRect.left - navRect.left;
        const width = linkRect.width;

        setBackgroundStyle({ left, width });
      }
    }
  };

  return (
    <nav ref={navRef} className="hidden md:flex items-center gap-4 group relative">
      <div
        style={{
          left: backgroundStyle.left,
          width: backgroundStyle.width,
        }}
        className="absolute bg-transparent h-full py-2 rounded-full transition-all duration-100 group-hover:bg-white"
      />
      {links.map((link, index) =>
        <NextLink
          key={index}
          id={index.toString()}
          href={link.href}
          onMouseEnter={() => handleLinkHover(index)}
          className={`
            transition-colors duration-100 px-4 py-2 rounded-full relative z-10
            text-xl font-medium text-white
            active:text-primary-700 active:bg-black/30 
            ${hovered === index && "group-hover:text-accent"}
          `}
        >
          {link.text}
        </NextLink>
      )}
    </nav>
  );
}