"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

function TechStack() {
  // List of icon filenames without paths
  const iconses = [
    "Next.js.svg", "React.svg", "Tailwind-CSS.svg", "TypeScript.svg", "Figma.svg", "Git.svg", "GitHub.svg", "Vite.js.svg", "JavaScript.svg", "HTML5.svg", "CSS3.svg", "Node.js.svg", "MongoDB.svg", "PostgresSQL.svg", "Firebase.svg", "AWS.svg", "Docker.svg", "Express.svg", "Apache-Airflow.svg", "Apache-Cassandra.svg", "Apache-Groovy.svg", "Apache-Hadoop.svg", "Apache-Kafka.svg", "Apache-Maven.svg", "Apache-Spark.svg", "Apache-Subversion.svg", "Apache-Tomcat.svg", "Bootstrap.svg", "C.svg", "Django.svg", "Flask.svg", "GraphQL.svg", "Java.svg", "Kubernetes.svg", "Linux.svg", "MariaDB.svg", "MySQL.svg", "Nginx.svg", "PHP.svg", "Python.svg", "Redis.svg", "Sass.svg", "Spring.svg", "SQLite.svg", "Vue.js.svg", "Webpack.svg", "Zustand.svg"
  ];

  // Map the icon names to their full paths
  const iconPaths = iconses.map(icon => `/images/techicons/${icon}`);

  return (
    <>
      {/* Top gradient - dark blue to transparent */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-900/70 via-blue-950/50 to-transparent z-10"></div>
      
      {/* Bottom gradient - transparent to dark blue/black */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-blue-950/70 to-transparent z-10"></div>
      
      <div className="mt-[10rem] relative">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
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
          </motion.h1>
        </LampContainer>
      </div>
    </>
  )
}

export default TechStack