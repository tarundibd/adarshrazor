"use client";
import React, { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Project } from '@/types/notion_database';

export default function Projects() {
  const { projects, isLoading, error, fetchProjectData } = useProjectStore();
  const [majorProjects, setMajorProjects] = useState<Project[]>([]);
  const [minorProjects, setMinorProjects] = useState<Project[]>([]);
  
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
  
  // Sort projects and separate into major and minor
  useEffect(() => {
    if (projects && projects.length > 0) {
      console.log("Projects in projects page:", projects);
      
      // Separate major and minor projects
      const major: Project[] = [];
      const minor: Project[] = [];
      
      projects.forEach(project => {
        const projectType = project?.properties?.type?.select?.name?.toLowerCase() || '';
        if (projectType === 'major') {
          major.push(project);
        } else if (projectType === 'minor') {
          minor.push(project);
        } else {
          // Default to minor if type is not specified
          minor.push(project);
        }
      });
      
      // Sort each category by date (newest first)
      setMajorProjects(sortProjectsByDate(major));
      setMinorProjects(sortProjectsByDate(minor));
    }
  }, [projects]);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading projects...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Render a project card
  const renderProjectCard = (project: Project) => {
    // Access the correct properties based on the Notion response structure
    const projectName = project?.properties?.name?.title?.[0]?.plain_text || 
                       'Loading...';
    
    const description = project?.properties?.description?.rich_text?.[0]?.plain_text || 
                       'Loading description...';
    
    const tags = project?.properties?.tags?.multi_select || 
                [];
    
    const imageUrl = project?.properties?.images?.files?.[0]?.file?.url;
    
    const githubUrl = project?.properties?.github_link?.url || 
                     project?.properties?.applink?.url;
    
    const liveUrl = project?.properties?.live_link?.url || 
                   project?.properties?.applink_working?.url;
    
    // Get the project date from the date property
    const projectDate = project?.properties?.date?.date?.start || '';
    const formattedDate = formatDate(projectDate);
    
    const projectType = project?.properties?.type?.select?.name?.toLowerCase() || '';
    
    return (
      <div 
        key={project.id} 
        className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
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
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold">
              {projectName}
            </h2>
            <Badge className={`${projectType === 'major' ? 'bg-red-600' : 'bg-blue-600'} text-white`}>
              {projectType || 'project'}
            </Badge>
          </div>
          
          {formattedDate && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {formattedDate}
            </div>
          )}
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag.id} 
                variant="secondary"
                className="px-2 py-1 text-xs"
              >
                {tag.name}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge 
                variant="outline"
                className="px-2 py-1 text-xs"
              >
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
              >
                GitHub
              </a>
            )}
            
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      
      {(majorProjects.length === 0 && minorProjects.length === 0) ? (
        <p>No projects found.</p>
      ) : (
        <>
          {majorProjects.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Major Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {majorProjects.map(renderProjectCard)}
              </div>
            </>
          )}
          
          {minorProjects.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Minor Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {minorProjects.map(renderProjectCard)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
} 