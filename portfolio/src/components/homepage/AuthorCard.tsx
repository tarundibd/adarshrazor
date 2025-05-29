"use client";
import { CardStack } from "../ui/card-stack";
import { cn } from "@/lib/utils";
export function AuthorCard() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Saket Savarn",
    designation: "ML Engineer 👩‍💻",
    content: (
      <p>
        Demonstrated exceptional <Highlight>leadership and collaboration</Highlight> skills by effectively guiding projects from conception to completion. His ability to foster positive working relationships significantly contributed to our collective success.
      </p>
    ),
  },
  {
    id: 1,
    name: "Dr. Srinivas",
    designation: "Professor, IISc Bangalore 🥼",
    content: (
      <p>
        Possesses an impressive ability to <Highlight>quickly grasp complex concepts</Highlight> and translate them into actionable solutions. His <Highlight>innovative thinking and adaptability</Highlight> are invaluable in dynamic environments.
      </p>
    ),
  },
  {
    id: 2,
    name: "Sunilkumar S. Manvi",
    designation: "HOD, Computer Science Department 🎓",
    content: (
      <p>
        A highly <Highlight>reliable and dedicated professional</Highlight> who consistently delivers impactful results. Their commitment to <Highlight>continuous improvement</Highlight> and willingness to take on new challenges make them a standout contributor.
      </p>
    ),
  },
];
