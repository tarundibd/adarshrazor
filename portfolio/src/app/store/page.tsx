'use client'

import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HoverEffect } from '@/components/ui/card-hover-effect';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'AI Agents' | 'Automation Scripts';
  onSale?: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Template',
    description: 'Tesatea Scrion with some additional information that makes this card bigger than the others and shows how the dynamic sizing works.',
    icon: '/path-to-icon.svg',
    type: 'AI Agents',
    onSale: true
  },
  {
    id: '2',
    title: 'AI/guts',
    description: 'Acce platian Acce platianAcce platianAcce platcce platianAcce platianAcce platian',
    icon: '/path-to-icon.svg',
    type: 'AI Agents',
    onSale: true
  },
  {
    id: '3',
    title: 'Template',
    description: 'Tesatea Scrion',
    icon: '/path-to-icon.svg',
    type: 'Automation Scripts',
    onSale: true
  },
  {
    id: '4',
    title: 'AI/guts',
    description: 'Acce platian',
    icon: '/path-to-icon.svg',
    type: 'AI Agents',
    onSale: true
  },
  {
    id: '5',
    title: 'Template',
    description: 'Tesatea Scrion',
    icon: '/path-to-icon.svg',
    type: 'AI Agents',
    onSale: true
  },
  {
    id: '6',
    title: 'AI/guts',
    description: 'Acce platian',
    icon: '/path-to-icon.svg',
    type: 'AI Agents',
    onSale: true
  },
];

function ProductCard({ product }: { product: Product }) {
  // Determine card size based on content length
  const getCardSize = (description: string) => {
    const length = description.length;
    if (length > 200) return 'col-span-2 row-span-2 md:col-span-2 md:row-span-2';
    if (length > 100) return 'col-span-2 row-span-1 md:col-span-2';
    return 'col-span-1 row-span-1';
  };

  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow",
        getCardSize(product.description),
        "flex flex-col"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
          <img src={product.icon} alt={product.title} className="h-8 w-8" />
        </div>
        {product.onSale && (
          <span className="text-sm text-gray-500 dark:text-gray-400">Sale</span>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-1 dark:text-white">{product.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-sm text-gray-500">Sale</span>
        <Button 
          variant="outline" 
          className="hover:bg-purple-50 dark:hover:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

function Store() {
  const [selectedType, setSelectedType] = React.useState<'AI Agents' | 'Automation Scripts' | null>(null);

  const filteredProducts = selectedType 
    ? mockProducts.filter(product => product.type === selectedType)
    : mockProducts;

  return (
    <div className="container mx-auto px-4 py-8 my-16">
      {/* Filter Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Filter by Type</h2>
        <div className="flex gap-4">
          <Button
            variant={selectedType === 'AI Agents' ? 'default' : 'outline'}
            onClick={() => setSelectedType(selectedType === 'AI Agents' ? null : 'AI Agents')}
            className="dark:border-gray-700"
          >
            🤖 AI Agents
          </Button>
          <Button
            variant={selectedType === 'Automation Scripts' ? 'default' : 'outline'}
            onClick={() => setSelectedType(selectedType === 'Automation Scripts' ? null : 'Automation Scripts')}
            className="dark:border-gray-700"
          >
            🔄 Automation Scripts
          </Button>
        </div>
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Store;