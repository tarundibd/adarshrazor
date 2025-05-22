"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";


function TechStack() {
  // List of icon filenames without paths
  const iconses = [
    "Next.js.svg", "React.svg", "Tailwind-CSS.svg", "TypeScript.svg", "Figma.svg", "Git.svg", "GitHub.svg", "Vite.js.svg", "JavaScript.svg", "HTML5.svg", "CSS3.svg", "Node.js.svg", "MongoDB.svg", "PostgresSQL.svg", "Firebase.svg", "AWS.svg", "Docker.svg", "Express.svg", "Apache-Airflow.svg", "Apache-Cassandra.svg", "Apache-Groovy.svg", "Apache-Hadoop.svg", "Apache-Kafka.svg", "Apache-Maven.svg", "Apache-Spark.svg", "Apache-Subversion.svg", "Apache-Tomcat.svg", "Bootstrap.svg", "C.svg", "Django.svg", "Flask.svg", "GraphQL.svg", "Java.svg", "Kubernetes.svg", "Linux.svg", "MariaDB.svg", "MySQL.svg", "Nginx.svg", "PHP.svg", "Python.svg", "Redis.svg", "Sass.svg", "Spring.svg", "SQLite.svg", "Vue.js.svg", "Webpack.svg", "Zustand.svg"
  ];

  // Map the icon names to their full paths
  const iconPaths = iconses.map(icon => `/images/techicons/${icon}`);

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Powered by <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Modern Tech Stack
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