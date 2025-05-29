"use client";

import React, { useEffect } from 'react';
import { Timeline } from '@/components/ui/timeline';
import { useExperienceStore } from '@/store/experiencestore';
import Image from 'next/image';

function Experience() {
  const { experiences, isLoading, error, fetchExperienceData } = useExperienceStore();

  useEffect(() => {
    fetchExperienceData();
  }, [fetchExperienceData]);

  const experienceData = experiences.map((exp) => {
    console.log('Processing experience:', exp);
    
    const duration = exp.properties.Duration?.rich_text?.[0]?.plain_text || 'Present';
    const role = exp.properties.Role?.rich_text?.[0]?.plain_text || 'Role';
    const experienceType = exp.properties['ExperienceType']?.select?.name || 'Unkown Experience Type';
    const experienceColor =
      experienceType === 'Full Time' ? 'purple' :
      experienceType === 'Education' ? 'green' :
      experienceType === 'Internship' ? 'orange' :
      'gray';
    
    const getBgColor = (color: string) => {
      const colorMap: { [key: string]: string } = {
        purple: 'bg-purple-100 text-purple-700',
        gray: 'bg-gray-100 text-gray-700',
        blue: 'bg-blue-100 text-blue-700'
      };
      return colorMap[color] || 'bg-purple-100 text-purple-700';
    };
    
    return {
      title: (
        <div>
          {exp.properties.Name?.title[0]?.plain_text || ''}
          {exp.properties.Image?.files[0] && (
              <div className="w-[100] h-[100] relative mt-2">
                <Image
                  src={exp.properties.Image.files[0].file.url}
                  alt={exp.properties.Name?.title[0]?.plain_text || 'Company logo'}
                  fill
                  className="object-contain"
                />
              </div>
            )}
        </div>
      ),
      content: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-md text-sm ${getBgColor(experienceColor)}`}>
              {experienceType}
            </span>
            <span className="text-neutral-500">
              {duration}
            </span>
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-semibold">{role}</h4>
            
          </div>
          <div className="flex flex-wrap gap-2">
            {exp.properties.Badges?.multi_select?.map((badge) => (
              <span 
                key={badge.id}
                className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm"
              >
                {badge.name}
                
              </span>
            )) || []}
          </div>
          <div className="text-neutral-700 dark:text-neutral-300 space-y-2">
            {exp.properties.Description?.rich_text.map((text, index) => {
              // Skip HTML entity codes for line breaks
              if (text.plain_text === '&#103;' || text.plain_text === '&#13;') {
                return null;
              }
              return (
                <p key={index} className="pl-4">
                  {text.plain_text}
                </p>
              );
            })}
          </div>
        </div>
      )
    };
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <Timeline data={experienceData} />
    </div>
  );
}

export default Experience;