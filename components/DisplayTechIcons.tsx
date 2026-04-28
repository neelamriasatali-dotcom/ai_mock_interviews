// import React from 'react'
// import {cn, getTechLogos } from "@/lib/utils"
// import Image from "next/image";
// const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
//   const techIcons = await getTechLogos(techStack);

//   return (
//     <div className="flex flex-row ">
//     {techIcons.slice(0,3).map(({ tech, url }, index) => (
//       <div key={tech}className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && '-ml-3')}>
//             <span className="tech-tooltip">{tech}</span>
//             <Image src={url} alt={tech} width={100} 
//             height={100} className="size-5" />
//       </div>

//     ))}</div>
//   )
// }

// export default DisplayTechIcons









"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn, getTechLogos } from "@/lib/utils";

interface TechIcon {
  tech: string;
  url: string;
}

interface TechIconProps {
  techStack: string[];
}

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<TechIcon[]>([]);

  useEffect(() => {
    const loadIcons = async () => {
      const icons = await getTechLogos(techStack);
      setTechIcons(icons);
    };

    loadIcons();
  }, [techStack]);

  return (
    <div className="flex items-center">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex items-center justify-center",
            index !== 0 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>

          <Image
            src={url}
            alt={tech}
            width={40}
            height={40}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;