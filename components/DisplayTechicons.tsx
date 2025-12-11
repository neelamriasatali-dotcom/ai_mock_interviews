

import Image from "next/image";
import { getTechLogos } from "@/lib/utils";
import { cn } from "@/lib/utils";
import React from "react";

interface TechIconProps {
  techStack: string[];
}

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const TechIcons = await getTechLogos(techStack);

  return (
    <div className="flex flex-row">
      {TechIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            alt={tech}
            width={20}
            height={20}
            className="object-contain size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;



