'use client'

import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { usePayment } from '@/hooks/usePayment';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/ui/animated-modal';
import { useStoreWebsite } from '@/store/storeWebsite';

// Define mapped product type
interface MappedProduct {
  id: string;
  title: string;
  type: string;
  summary: string;
  description: string;
  icon: string;
  link: string;
  image: string;
  verified: boolean;
  tags: string[];
}

function ProductCard({ product, onSelect }: { product: MappedProduct, onSelect: (product: MappedProduct) => void }) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Determine card size based on content length
  const getCardSize = (description: string) => {
    const length = description.length;
    if (length > 200) return 'col-span-2 row-span-2 md:col-span-2 md:row-span-2';
    if (length > 100) return 'col-span-2 row-span-1 md:col-span-2';
    return 'col-span-1 row-span-1';
  };

  // tags badges
  const tags = product.tags || [];
  return (
    <div 
      className={cn(
        "relative bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm transition-all duration-200",
        getCardSize(product.summary),
        "flex flex-col"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Image src={product.icon} alt={product.title} className="h-8 w-8" width={32} height={32} unoptimized />
          </div>
          {product.verified && (
            <Image src="/images/website/verify.png" alt="Verified" className="h-6 w-6 ml-2" width={24} height={24} title="Verified" unoptimized />
          )}
        </div>
        <h3 className="text-lg font-semibold mb-1 dark:text-white">{product.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">{product.summary}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag: string) => (
            <span key={tag} className="bg-pink-200 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-gray-500">{tags[0] || ''}</span>
          <div onClick={() => onSelect(product)}>
            <ModalTrigger className="bg-green-600 dark:bg-white dark:text-black text-white flex justify-center items-center group/modal-btn relative overflow-hidden rounded-md px-4 py-2 cursor-pointer">
              <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                View Details
              </span>
              <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                👁️
              </div>
            </ModalTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}

function Store() {
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<MappedProduct | null>(null);
  const [search, setSearch] = React.useState('');
  const [donationAmount, setDonationAmount] = React.useState<number>(0);
  const [showDonationInput, setShowDonationInput] = React.useState(false);
  
  const { storeItems, isLoading: storeLoading, error: storeError, fetchStoreData } = useStoreWebsite();
  
  // Add payment hook
  const { 
    handlePayment, 
    isLoading: paymentLoading, 
    error: paymentError 
  } = usePayment({
    onSuccess: (response) => {
      console.log('Payment successful:', response);
      alert('Thank you for your donation!');
      setShowDonationInput(false);
      setDonationAmount(0);
    },
    onError: (error) => {
      console.error('Payment error:', error);
      alert(error.message);
    },
  });

  // Handle donation
  const handleDonation = async (product: MappedProduct) => {
    if (!donationAmount || donationAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    try {
      await handlePayment(
        donationAmount,
        product.title,
        `Donation for ${product.title}`
      );
    } catch (error) {
      // Error is already handled by onError callback
      console.error('Payment failed:', error);
    }
  };

  React.useEffect(() => {
    fetchStoreData();
  }, [fetchStoreData]);

  // Map Notion data to UI fields
  const mappedProducts = storeItems.map((item) => {
    const p = item.properties;
    return {
      id: item.id,
      title: p.title?.title?.[0]?.plain_text || '',
      type: p.type?.select?.name || '',
      summary: p.summary?.rich_text?.[0]?.plain_text || '',
      description: p.description?.rich_text?.[0]?.plain_text || '',
      icon: p.icon?.files?.[0]?.file?.url || '/placeholder.svg',
      link: p.link?.files?.[0]?.file?.url || '',
      image: p.image?.files?.[0]?.file?.url || '',
      verified: p.verified?.select?.name?.toLowerCase() === 'yes',
      tags: p.tags?.multi_select?.map((t) => t.name) || [],
    };
  });

  // Filter by type and search
  const filteredProducts = mappedProducts.filter(product => {
    const matchesType = selectedType ? product.type === selectedType : true;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <Modal>
      <div className="container mx-auto px-4 py-8 my-16">
        {/* Local Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="inline-block">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
        {/* Filter Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Featured Types 🏷️</h2>
          <div className="flex gap-4">
            {[...new Set(mappedProducts.map(p => p.type))].filter(Boolean).map(type => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className="dark:border-gray-700"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading and Error States */}
        {(storeLoading || paymentLoading) && <div className="text-center py-8">Loading...</div>}
        {(storeError || paymentError) && <div className="text-center text-red-500 py-8">{storeError || paymentError}</div>}

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>

        {/* Animated Modal */}
        <ModalBody className="!p-0">
          <AnimatePresence>
            {selectedProduct && (
              <ModalContent>
                <div className="flex flex-col items-center justify-center gap-4">
                  <Image src={selectedProduct.icon} alt={selectedProduct.title} width={64} height={64} unoptimized />
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-2xl font-bold mb-2 dark:text-white">{selectedProduct.title}</h3>
                    {selectedProduct.verified && (
                      <Image src="/images/website/verify.png" alt="Verified" className="h-6 w-6" width={24} height={24} title="Verified" unoptimized />
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-base mb-2 text-center">{selectedProduct.summary}</p>
                  {selectedProduct.image && (
                    <Image src={selectedProduct.image} alt={selectedProduct.title + ' image'} width={400} height={220} className="rounded-xl object-cover w-full max-w-md" unoptimized />
                  )}
                  <p className="text-gray-400 dark:text-gray-300 text-sm mb-4 text-center">{selectedProduct.description}</p>
                  
                  <div className='flex flex-col gap-4 w-full max-w-md'>
                    {showDonationInput ? (
                      <div className="flex flex-col gap-2">
                        <input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(Number(e.target.value))}
                          placeholder="Enter donation amount (INR)"
                          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          min="1"
                          disabled={paymentLoading}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDonation(selectedProduct)}
                            disabled={paymentLoading}
                            className="flex-1 px-6 py-2 bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black rounded-md dark:hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
                          >
                            {paymentLoading ? 'Processing...' : 'Proceed to Pay'}
                          </button>
                          <button
                            onClick={() => {
                              setShowDonationInput(false);
                              setDonationAmount(0);
                            }}
                            disabled={paymentLoading}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowDonationInput(true)}
                        disabled={paymentLoading}
                        className="w-full px-6 py-2 bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black rounded-md dark:hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
                      >
                        Donate 💸
                      </button>
                    )}
                    <a
                      href={selectedProduct.link}
                      download
                      className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </ModalContent>
            )}
          </AnimatePresence>
        </ModalBody>
      </div>
    </Modal>
  );
}

export default Store;