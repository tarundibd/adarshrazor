"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import {useThemeStore} from "@/store/useThemeStore";

function TechStack() {
  // List of icon filenames without paths
  const iconses = [
    "Typescript.svg", "Python.svg", "C.svg", "HTML5.svg", "CSS3.svg", "JavaScript.svg", "PostgresSQL.svg", "MongoDB.svg", "SQL-Developer.svg", "PowerShell.svg", "Firebase.svg", "Next.js.svg", "Node.js.svg", "React.svg", "Tailwind-CSS.svg", "Express.svg", "Redux.svg", "Pandas.svg", "NumPy.svg", "Bootstrap.svg", "Material-UI.svg", "WordPress.svg", "Git.svg", "Node.js.svg", "Azure.svg", "Ansible.svg", "Supabase.svg", "AWS.svg", "Jenkins.svg", "Google-Cloud.svg", "Vercel.svg", "GitHub.svg", "Swagger.svg", "Kubernetes.svg", "Apache.svg", "Bitbucket.svg", "Visual-Studio.svg", "Postman.svg", "Jira.svg"
  ];

  const theme = useThemeStore((state) => state.theme);
  const shadowColor = theme === "dark" ? "white" : "black";

  // Map the icon names to their full paths
  const iconPaths = iconses.map(icon => `/images/techicons/${icon}`);

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Powered by <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none tracking-tighter">
                <LineShadowText className="italic" shadowColor={shadowColor}>Modern Tech Stack</LineShadowText>
              </span>
            </h1>
          </>
        }
      >
        <ThreeDMarquee images={iconPaths} />
      </ContainerScroll>
    </div>
  )
}

export default TechStack