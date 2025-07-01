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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

// Define mapped product type
interface MappedProduct {
  id: string;
  title: string;
  type: string;
  summary: string;
  description: string;
  icon: string;
  link: string;
  verified: boolean;
  tags: string[];
  trigger: string;
  complexity: string;
}

// Type for workflow JSON node
type WorkflowNode = { type?: string; [key: string]: unknown };
type WorkflowJson = { nodes?: WorkflowNode[] };

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
            <div key={tag}>
            <span className="text-sm text-gray-500">Trigger: </span>
            <span  className="bg-pink-200 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">
              {tag}
            </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-gray-500">{product.type || ''}</span>
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
  const [selectedTrigger, setSelectedTrigger] = React.useState<string | null>(null);
  const [selectedComplexity, setSelectedComplexity] = React.useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<MappedProduct | null>(null);
  const [search, setSearch] = React.useState('');
  const [donationAmount, setDonationAmount] = React.useState<number>(0);
  const [showDonationInput, setShowDonationInput] = React.useState(false);
  const [rawJson, setRawJson] = React.useState<WorkflowJson | null>(null);
  const [jsonError, setJsonError] = React.useState<string | null>(null);
  const [jsonLoading, setJsonLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [productsWithComplexity, setProductsWithComplexity] = React.useState<MappedProduct[]>([]);
  const [complexityOptions, setComplexityOptions] = React.useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);
  
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

  React.useEffect(() => {
    if (storeItems.length > 0) {
      console.log('Store database contents:', storeItems);
    }
  }, [storeItems]);

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
      link: p.githublink?.url || '',
      verified: p.verified?.select?.name?.toLowerCase() === 'yes',
      tags: p.trigger?.select?.name ? [p.trigger.select.name] : [],
      trigger: p.trigger?.select?.name || '',
      complexity: '', // Will be filled after fetching JSON
    };
  });

  // On mount or when mappedProducts changes, fetch JSON for all products and compute complexity
  React.useEffect(() => {
    async function fetchAllComplexities() {
      const results = await Promise.all(
        mappedProducts.map(async (product) => {
          if (!product.link) return { ...product, complexity: '' };
          try {
            const res = await fetch(product.link);
            const data: WorkflowJson = await res.json();
            const nodeCount = Array.isArray(data.nodes) ? data.nodes.length : 0;
            let complexity = '';
            if (nodeCount <= 5) complexity = 'low';
            else if (nodeCount <= 10) complexity = 'medium';
            else complexity = 'high';
            return { ...product, complexity };
          } catch {
            return { ...product, complexity: '' };
          }
        })
      );
      setProductsWithComplexity(results);
      setComplexityOptions([...new Set(results.map(p => p.complexity).filter(Boolean))]);
    }
    fetchAllComplexities();
  }, [mappedProducts]);

  // Filter by type, trigger, complexity, and search (using productsWithComplexity)
  const filteredProducts = productsWithComplexity.filter(product => {
    const matchesType = selectedType ? product.type === selectedType : true;
    const matchesTrigger = selectedTrigger ? product.trigger === selectedTrigger : true;
    const matchesComplexity = selectedComplexity ? product.complexity === selectedComplexity : true;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesVerified = verifiedOnly ? product.verified : true;
    return matchesType && matchesTrigger && matchesComplexity && matchesSearch && matchesVerified;
  });

  React.useEffect(() => {
    if (selectedProduct && selectedProduct.link) {
      setJsonLoading(true);
      setJsonError(null);
      fetch(selectedProduct.link)
        .then(res => res.json())
        .then((data: WorkflowJson) => {
          setRawJson(data);
          setJsonError(null);
        })
        .catch(() => {
          setRawJson(null);
          setJsonError("Failed to fetch JSON");
        })
        .finally(() => setJsonLoading(false));
    } else {
      setRawJson(null);
      setJsonError(null);
    }
  }, [selectedProduct]);

  return (
    <Modal>
      <div className="container mx-auto px-4 py-8 my-16">
        <h1 className="text-6xl font-bold text-center mb-8 text-orange-600">⚡ N8N Workflows</h1>
        {/* Local Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search workflows ⚛"
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
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Filter Types 🏷️</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[180px] justify-between">
                  {selectedType || 'Select Category'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSelectedType(null)}>
                  All
                </DropdownMenuItem>
                {[...new Set(mappedProducts.map(p => p.type))].filter(Boolean).map(type => (
                  <DropdownMenuItem key={type} onClick={() => setSelectedType(type)}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
        
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[180px] justify-between">
                  {selectedTrigger || 'Select Trigger'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSelectedTrigger(null)}>
                  All
                </DropdownMenuItem>
                {[...new Set(mappedProducts.map(p => p.trigger).filter(Boolean))].map(trigger => (
                  <DropdownMenuItem key={trigger} onClick={() => setSelectedTrigger(trigger)}>
                    {trigger}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[180px] justify-between">
                  {selectedComplexity || 'Select Complexity'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSelectedComplexity(null)}>
                  All
                </DropdownMenuItem>
                {complexityOptions.map(complexity => (
                  <DropdownMenuItem key={complexity} onClick={() => setSelectedComplexity(complexity)}>
                    {complexity}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Verified Only Checkbox (inline with filters) */}
          <div className="flex items-center h-12 pl-4">
            <input
              type="checkbox"
              id="verifiedOnly"
              checked={verifiedOnly}
              onChange={e => setVerifiedOnly(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
            />
            <label htmlFor="verifiedOnly" className="text-sm text-gray-700 dark:text-gray-300 select-none cursor-pointer ml-2">
              Verified Only
            </label>
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
              <ModalContent className="overflow-y-auto max-h-[80vh]">
                <Tabs defaultValue="details" className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                    <TabsTrigger value="diagram">Diagram</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                    <div className="flex flex-col items-center justify-center gap-4 p-6 w-full">
                      <Image src={selectedProduct.icon} alt={selectedProduct.title} width={64} height={64} unoptimized />
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="text-2xl font-bold mb-2 dark:text-white">{selectedProduct.title}</h3>
                        {selectedProduct.verified && (
                          <Image src="/images/website/verify.png" alt="Verified" className="h-6 w-6" width={24} height={24} title="Verified" unoptimized />
                        )}
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow text-center">{selectedProduct.summary}</p>
                      <p className="text-gray-400 dark:text-gray-300 text-sm mb-4 text-center">{selectedProduct.description}</p>

                      {/* STATISTICS */}
                      <div className="w-full mb-2">
                        <div className="uppercase text-xs text-gray-400 font-semibold mb-1">Statistics</div>
                        <div className="flex flex-wrap gap-6 mb-2">
                          <div><span className="font-bold">Status:</span> {selectedProduct.verified ? "Verified" : "Not Verified"}</div>
                          <div><span className="font-bold">Trigger:</span> {rawJson && Array.isArray(rawJson.nodes) ? (rawJson.nodes.find((n) => /trigger/i.test(n.type ?? ''))?.type || 'Unknown') : 'Unknown'}</div>
                        </div>
                        <div className="flex flex-wrap gap-6 mb-2">
                          <div><span className="font-bold">Complexity:</span> {rawJson && Array.isArray(rawJson.nodes) ? (rawJson.nodes.length <= 5 ? 'low' : rawJson.nodes.length <= 10 ? 'medium' : 'high') : 'Unknown'}</div>
                          <div><span className="font-bold">Nodes:</span> {rawJson && Array.isArray(rawJson.nodes) ? rawJson.nodes.length : 'Unknown'}</div>
                        </div>
                        <div className="mb-2">
                          <span className="font-bold">Category:</span>
                          <div>{selectedProduct.type || "Uncategorized"}</div>
                        </div>
                      </div>

                      {/* INTEGRATIONS */}
                      <div className="w-full mb-2">
                        <div className="uppercase text-xs text-gray-400 font-semibold mb-1">Integrations</div>
                        <div className="flex flex-wrap gap-2">
                          {rawJson && Array.isArray(rawJson.nodes) ? (
                            [...new Set(rawJson.nodes.map((n) => n.type?.split(".").pop() || n.type))].map((integration) => (
                              <span key={integration as string} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{integration as string}</span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">None</span>
                          )}
                        </div>
                      </div>

                      {/* ACTIONS */}
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
                        {/* Download JSON button */}
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            if (!rawJson) return;
                            const blob = new Blob([JSON.stringify(rawJson, null, 2)], { type: "application/json" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = (selectedProduct?.title || "workflow") + ".json";
                            document.body.appendChild(a);
                            a.click();
                            setTimeout(() => {
                              document.body.removeChild(a);
                              URL.revokeObjectURL(url);
                            }, 0);
                          }}
                          className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-center block"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="json">
                    <div className="flex flex-col items-center justify-center gap-4 overflow-y-auto max-h-[80vh] p-6 w-full">
                      {jsonLoading ? (
                        <div className="text-gray-400">Loading JSON...</div>
                      ) : jsonError ? (
                        <div className="text-red-400">{jsonError}</div>
                      ) : rawJson ? (
                        <>
                          <div className="w-full flex justify-end mb-2">
                            <button
                              className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                              onClick={() => {
                                navigator.clipboard.writeText(JSON.stringify(rawJson, null, 2));
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1200);
                              }}
                            >
                              {copied ? 'Copied!' : 'Copy JSON'}
                            </button>
                          </div>
                          <pre className="w-full text-xs bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto">
                            {JSON.stringify(rawJson, null, 2)}
                          </pre>
                        </>
                      ) : (
                        <div className="text-gray-400">No JSON available.</div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="diagram">
                    <div className="flex flex-col items-center justify-center gap-4 overflow-y-auto max-h-[80vh] p-6">
                      <span className="text-gray-400">Diagram view coming soon...</span>
                    </div>
                  </TabsContent>
                </Tabs>
              </ModalContent>
            )}
          </AnimatePresence>
        </ModalBody>
      </div>
    </Modal>
  );
}

export default Store;