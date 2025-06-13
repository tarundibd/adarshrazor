"use client";
import React, { useEffect } from 'react';
import { useBucketListStore } from '@/store/bucketlistStore';

export default function BucketList() {
  const { bucketList, isLoading, error, fetchBucketListData } = useBucketListStore();

  useEffect(() => {
    fetchBucketListData();
  }, [fetchBucketListData]);

  // Extract and flatten the data for easier rendering
  const items = bucketList.map((item) => {
    return {
      id: item.id,
      goal: item.properties.goal?.title?.[0]?.plain_text || '',
      checked: item.properties.checked?.checkbox || false,
      value: item.properties.value?.number ?? 0,
      link: item.properties.link?.url || '',
      icon: item.properties.icon?.rich_text?.[0]?.plain_text || '',
    };
  });

  const total = items.length;
  const done = items.filter((item) => item.checked).length;

  // Styles
  const pad = { padding: 15, fontSize: 18 };
  const listItemStyle = {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: '1.6em',
  };
  const completedStyle = { ...listItemStyle, color: 'green' };
  const inProgressStyle = { ...listItemStyle, color: 'orange' };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading bucket list...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Bucket List</h1>
      <div className="mb-6 text-lg">
        I was inspired by Chip Hyuen's{' '}
        <a href="https://huyenchip.com/list-100/" target="_blank" rel="noreferrer" className="text-blue-600 underline">List 100</a>{' '}
        to create and maintain this list. This list is a collection of moments that I want to experience before I drop off the face of this planet.<br />
        <span className="font-semibold">Current status: {done} / {total}</span>
      </div>
      <ol className="list-decimal pl-6">
        {items.map((item, index) => (
          <li
            key={item.id}
            style={item.checked ? completedStyle : (item.value > 0 ? inProgressStyle : listItemStyle)}
            
          >
            {item.goal} {item.icon && <span>{item.icon}</span>}
            {item.checked && ' ✅'}
            {item.value > 0 && (
              <span className="ml-2 text-sm text-gray-500">({item.value})</span>
            )}
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" className="ml-2 text-blue-500 hover:underline">🏷️</a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
