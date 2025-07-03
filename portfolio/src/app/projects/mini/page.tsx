"use client";
import React, { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Project } from '@/types/notion_database';
import { AnimatePresence, motion } from 'framer-motion';

export default function Projects() {
  const { projects, isLoading, error, fetchProjectData } = useProjectStore();
  const [minorProjects, setMinorProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);
  
  // Helper function to sort projects by date (newest first)
  const sortProjectsByDate = (projectsArray: Project[]) => {
    return [...projectsArray].sort((a, b) => {
      // Get date from the date property (as seen in the Notion response)
      const dateA = a?.properties?.date?.date?.start || '';
      const dateB = b?.properties?.date?.date?.start || '';
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1; // B comes first if A has no date
      if (!dateB) return -1; // A comes first if B has no date
      
      // Compare dates - newest first
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  };
  
  // Only keep minor projects (or default to minor if type is not specified)
  useEffect(() => {
    if (projects && projects.length > 0) {
      console.log("Projects in projects page:", projects);
      const minor: Project[] = [];
      projects.forEach(project => {
        const projectType = project?.properties?.type?.select?.name?.toLowerCase() || '';
        if (projectType === 'minor') {
          minor.push(project);
        }
      });
      setMinorProjects(sortProjectsByDate(minor));
    }
  }, [projects]);
  
  // Helper function to get project details
  const getProjectDetails = (project: Project) => {
    const projectName = project?.properties?.name?.title?.[0]?.plain_text || 'Loading...';
    const description = project?.properties?.description?.rich_text?.[0]?.plain_text || 'Loading description...';
    const imageUrl = project?.properties?.images?.files?.[0]?.file?.url;
    // Use Record<string, unknown> for dynamic Notion properties
    const properties = project.properties as Record<string, unknown>;
    const githubUrl = (properties['codeLink'] as { url?: string })?.url || null;
    const liveUrl = (properties['appLink'] as { url?: string })?.url || null;
    return { projectName, description, imageUrl, githubUrl, liveUrl };
  };

  // Animated Project Card
  const ProjectCard = ({ project }: { project: Project }) => {
    const { projectName, description, imageUrl } = getProjectDetails(project);
    const projectType = project?.properties?.type?.select?.name?.toLowerCase() || '';
    return (
      <motion.div
        whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow cursor-pointer bg-white dark:bg-gray-900 group"
        onClick={() => setSelectedProject(project)}
      >
        {imageUrl && (
          <div className="relative w-full h-48">
            <Image 
              src={imageUrl} 
              alt={projectName} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>
        )}
        <div className="p-6 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold">
              {projectName}
            </h2>
            <Badge className={`bg-blue-600 text-white`}>
              {projectType || 'project'}
            </Badge>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 group-hover:text-white">
            {description}
          </p>
        </div>
      </motion.div>
    );
  };

  // Modal for project details
  const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
    const { projectName, description, imageUrl, githubUrl, liveUrl } = getProjectDetails(project);
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-8 relative"
            initial={{ scale: 0.95, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
            {imageUrl && (
              <div className="relative w-full h-56 mb-4">
                <Image 
                  src={imageUrl} 
                  alt={projectName} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded"
                  priority={true}
                />
              </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{projectName}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
            <div className="flex gap-4">
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition font-semibold shadow"
                  whileHover={{ scale: 1.08, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  GithubDocs
                </motion.a>
              )}
              {liveUrl && (
                <motion.a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold shadow"
                  whileHover={{ scale: 1.08, boxShadow: '0 4px 16px rgba(37,99,235,0.18)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  App Link
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading projects...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Mini Projects</h1>
      {(minorProjects.length === 0) ? (
        <p>No mini projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {minorProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
} 