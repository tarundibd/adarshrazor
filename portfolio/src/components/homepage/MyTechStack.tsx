import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

function MyTechStack() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden h-[60rem]">
      <div className="relative w-full flex items-center justify-center">
        <div className="text-7xl font-bold text-blue-950 dark:text-blue-500 my-16">
          My Tech Stack
        </div>
      </div>
      <div className="relative w-full flex items-center justify-center">
        <div className="text-4xl font-bold text-gray-700 dark:text-white m-4">
          Programming & DB
        </div>
      </div>
      <Marquee pauseOnHover className="[--duration:70s]">
        {Programming.map((programming) => (
          <ReviewCard key={programming.name} {...programming} />
        ))}
      </Marquee>
      <div className="relative w-full flex items-center justify-center mt-7">
        <div className="text-4xl font-bold text-gray-700 dark:text-white m-4">
          Frameworks & Libraries
        </div>
      </div>
      <Marquee reverse pauseOnHover className={`[--duration:90s]`}>
        {Frameworks.map((framework) => (
          <ReviewCard key={framework.name} {...framework} />
        ))}
      </Marquee>
      <div className="relative w-full flex items-center justify-center mt-7">
        <div className="text-4xl font-bold text-gray-700 dark:text-white m-4">
          Developer Tools
        </div>
      </div>
      <Marquee pauseOnHover className={`[--duration:110s]`}>
        {Dev_Tools.map((tools) => (
          <ReviewCard key={tools.name} {...tools} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}

export default MyTechStack;

const ReviewCard = ({
  img,
  name,
}: {
  img: string;
  name: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-auto overflow-hidden rounded-xl p-4 px-7",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2 grayscale hover:grayscale-0">
        <img className="rounded-full" width="42" height="42" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-lg font-bold text-gray-500 dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

const Programming = [
  { name: "Typescript", img: "/images/techicons/Typescript.svg" },
  { name: "Python", img: "/images/techicons/Python.svg" },
  { name: "C-Programming", img: "/images/techicons/C.svg" },
  { name: "HTML5", img: "/images/techicons/HTML5.svg" },
  { name: "CSS3", img: "/images/techicons/CSS3.svg" },
  { name: "JavaScript", img: "/images/techicons/JavaScript.svg" },
  { name: "PostgresSQL", img: "/images/techicons/PostgresSQL.svg" },
  { name: "MongoDB", img: "/images/techicons/MongoDB.svg" },
  { name: "SQL", img: "/images/techicons/SQL-Developer.svg" },
  { name: "PowerShell", img: "/images/techicons/PowerShell.svg" },
  { name: "Firebase", img: "/images/techicons/Firebase.svg" },
];

const Frameworks = [
  { name: "NextJS", img: "/images/techicons/Next.js.svg" },
  { name: "NodeJS", img: "/images/techicons/Node.js.svg" },
  { name: "ReactJS", img: "/images/techicons/React.svg" },
  { name: "TailwindCSS", img: "/images/techicons/Tailwind-CSS.svg" },
  { name: "ExpressJS", img: "/images/techicons/Express.svg" },
  { name: "Redux", img: "/images/techicons/Redux.svg" },
  { name: "Pandas", img: "/images/techicons/Pandas.svg" },
  { name: "NumPy", img: "/images/techicons/NumPy.svg" },
  { name: "Bootstrap", img: "/images/techicons/Bootstrap.svg" },
  { name: "MaterialUI", img: "/images/techicons/Material-UI.svg" },
  { name: "WordPress", img: "/images/techicons/WordPress.svg" },
];

const Dev_Tools = [
  { name: "Git", img: "/images/techicons/Git.svg" },
  { name: "Docker", img: "/images/techicons/Docker.svg" },
  { name: "Azure", img: "/images/techicons/Azure.svg" },
  { name: "Ansible", img: "/images/techicons/Ansible.svg" },
  { name: "Supabase", img: "/images/techicons/Supabase.svg" },
  { name: "AWS", img: "/images/techicons/AWS.svg" },
  { name: "Jenkins", img: "/images/techicons/Jenkins.svg" },
  { name: "Redis", img: "/images/techicons/Redis.svg" },
  { name: "GCP", img: "/images/techicons/Google-Cloud.svg" },
  { name: "Vercel", img: "/images/techicons/Vercel.svg" },
  { name: "GitHub", img: "/images/techicons/GitHub.svg" },
  { name: "Swagger", img: "/images/techicons/Swagger.svg" },
  { name: "Kubernetes", img: "/images/techicons/Kubernetes.svg" },
  { name: "Apache", img: "/images/techicons/Apache.svg" },
  { name: "Bitbucket", img: "/images/techicons/Bitbucket.svg" },
  { name: "Visual Studio", img: "/images/techicons/Visual-Studio.svg" },
  { name: "Postman", img: "/images/techicons/Postman.svg" },
  { name: "Jira", img: "/images/techicons/Jira.svg" },
];