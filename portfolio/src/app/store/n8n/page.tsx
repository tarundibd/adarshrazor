"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useStoreWebsite } from "@/store/n8nstore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// Mock stats and categories for now
const mockStats = {
  total: 42,
  active: 30,
  total_nodes: 123,
  unique_integrations: 12,
};
const mockCategories = ["All", "Automation", "Data", "DevOps", "Uncategorized"];
const mockTriggers = ["All", "Webhook", "Scheduled", "Manual", "Complex"];
const mockComplexities = ["All", "Low", "Medium", "High"];

function Header({ stats }: { stats: typeof mockStats }) {
  return (
    <header className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 pt-32 py-16 text-center mb-4">
        <div className="text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-2">⚡ N8N Workflow</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Lightning-fast workflow browser with instant search</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="text-center">
          <span className="block text-2xl font-bold text-blue-600">{stats.total}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">Total</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-blue-600">{stats.active}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">Active</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-blue-600">{stats.total_nodes}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">Total Nodes</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-blue-600">{stats.unique_integrations}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">Integrations</span>
        </div>
      </div>
    </header>
  );
}

function Filters({
  search,
  setSearch,
  trigger,
  setTrigger,
  complexity,
  setComplexity,
  category,
  setCategory,
  activeOnly,
  setActiveOnly,
  theme,
  setTheme,
}: any) {
  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-4 sticky top-0 z-10 mb-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search workflows by name, description, or integration..."
            className="flex-1 min-w-[200px]"
          />
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-auto"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Trigger:</span>
            <select
              value={trigger}
              onChange={e => setTrigger(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm"
            >
              {mockTriggers.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Complexity:</span>
            <select
              value={complexity}
              onChange={e => setComplexity(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm"
            >
              {mockComplexities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Category:</span>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm"
            >
              {mockCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <Switch checked={activeOnly} onCheckedChange={setActiveOnly} />
            <span className="text-sm text-gray-500">Active only</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to derive complexity
function getComplexity(nodeCount: number): string {
  if (nodeCount <= 5) return "Low";
  if (nodeCount <= 10) return "Medium";
  return "High";
}

// Helper to generate a simple Mermaid diagram from nodes/connections
type NodeType = { id: string; name?: string; type?: string };
type ConnectionType = { [key: string]: { main?: { node: string }[] } };
function generateMermaid(nodes: unknown = [], connections: unknown = {}): string {
  const safeNodes = Array.isArray(nodes) ? (nodes as NodeType[]) : [];
  const safeConnections = (connections as ConnectionType) || {};
  if (safeNodes.length === 0) return 'graph TD\n';
  let diagram = 'graph TD\n';
  // Map node ids to names for readability
  const idToName: Record<string, string> = Object.fromEntries(safeNodes.map((n: NodeType) => [n.id, n.name || n.type || n.id]));
  Object.entries(safeConnections).forEach(([from, outs]) => {
    const outsTyped = outs as { main?: { node: string }[] };
    if (outsTyped && Array.isArray(outsTyped.main)) {
      outsTyped.main.forEach((conn: { node: string }) => {
        diagram += `  "${idToName[from] || from}" --> "${idToName[conn.node] || conn.node}"\n`;
      });
    }
  });
  return diagram;
}

function WorkflowCard({ workflow, onClick }: any) {
  // Show node_count, integrations, complexity if present
  const { node_count, integrations, complexity } = workflow;
  // Card color/complexity/status logic can be improved
  return (
    <div
      className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer flex flex-col gap-2 relative"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 items-center">
          <span className={`w-2 h-2 rounded-full ${workflow.verified ? "bg-green-500" : "bg-gray-400"}`}></span>
          <span className="text-xs text-gray-400">{workflow.type}</span>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{workflow.category || ""}</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <Image src={workflow.icon} alt={workflow.title} width={32} height={32} className="rounded" unoptimized />
        <h3 className="font-semibold text-lg dark:text-white">{workflow.title}</h3>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-2">{workflow.summary}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {/* Integrations */}
        {integrations && integrations.length > 0 && (
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            {integrations.join(", ")}
          </span>
        )}
        {/* Node count */}
        {typeof node_count === 'number' && (
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
            {node_count} nodes
          </span>
        )}
        {/* Complexity */}
        {complexity && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
            {complexity} complexity
          </span>
        )}
      </div>
      <div className="flex gap-2 mt-auto">
        <Button size="sm" className="flex-1" variant="outline">View Details</Button>
      </div>
    </div>
  );
}

function WorkflowModal({ open, onClose, workflow }: any) {
  const [tab, setTab] = useState("details");
  const [loading, setLoading] = useState(false);
  const [enriched, setEnriched] = useState<any>(null);

  React.useEffect(() => {
    if (!open || !workflow) return;
    let ignore = false;
    async function fetchAndEnrich() {
      setLoading(true);
      setEnriched(null);
      try {
        // Fetch JSON from githubLink
        const url = workflow.githubLink;
        if (!url) throw new Error("No githubLink");
        const res = await fetch(url);
        const data = await res.json();
        // Derive fields
        const node_count = Array.isArray(data.nodes) ? data.nodes.length : 0;
        const integrations = Array.isArray(data.nodes)
          ? [...new Set(data.nodes.map((n: any) => n.type?.split(".").pop() || n.type))]
          : [];
        const triggerNode = Array.isArray(data.nodes)
          ? data.nodes.find((n: any) => /trigger/i.test(n.type) || /trigger/i.test(n.name))
          : null;
        const trigger = triggerNode?.type || triggerNode?.name || "";
        const complexity = getComplexity(node_count);
        const filename = url.split("/").pop() || workflow.title;
        const diagram = generateMermaid(data.nodes, data.connections);
        setEnriched({
          ...workflow,
          node_count,
          integrations,
          trigger,
          complexity,
          filename,
          raw_json: data,
          diagram,
        });
      } catch (e: any) {
        setEnriched({ ...workflow, error: e.message });
      } finally {
        setLoading(false);
      }
    }
    fetchAndEnrich();
    return () => { ignore = true; };
  }, [open, workflow]);

  if (!open || !workflow) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading workflow details...</div>
        ) : enriched && !enriched.error ? (
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-4 mt-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="diagram">Diagram</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="flex flex-col items-center gap-4 p-4 w-full">
                {/* Icon and Title */}
                <Image src={enriched.icon} alt={enriched.title} width={64} height={64} unoptimized />
                <h3 className="text-2xl font-bold mb-2 dark:text-white">{enriched.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 text-center">{enriched.summary}</p>
                {enriched.image && (
                  <Image src={enriched.image} alt={enriched.title + " image"} width={400} height={220} className="rounded-xl object-cover w-full max-w-md" unoptimized />
                )}
                <p className="text-gray-400 dark:text-gray-300 text-sm mb-4 text-center">{enriched.description}</p>

                {/* STATISTICS */}
                <div className="w-full mb-2">
                  <div className="uppercase text-xs text-gray-400 font-semibold mb-1">Statistics</div>
                  <div className="flex flex-wrap gap-6 mb-2">
                    <div><span className="font-bold">Status:</span> {enriched.verified ? "Active" : "Inactive"}</div>
                    <div><span className="font-bold">Trigger:</span> {enriched.trigger || "Unknown"}</div>
                    <div><span className="font-bold">Complexity:</span> {enriched.complexity?.toLowerCase()}</div>
                    <div><span className="font-bold">Nodes:</span> {enriched.node_count}</div>
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Category:</span>
                    <div>{enriched.category || "Uncategorized"}</div>
                  </div>
                </div>

                {/* INTEGRATIONS */}
                <div className="w-full mb-2">
                  <div className="uppercase text-xs text-gray-400 font-semibold mb-1">Integrations</div>
                  <div className="flex flex-wrap gap-2">
                    {enriched.integrations && enriched.integrations.length > 0 ? (
                      enriched.integrations.map((integration: string) => (
                        <span key={integration} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{integration}</span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">None</span>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="w-full mb-2">
                  <div className="uppercase text-xs text-gray-400 font-semibold mb-1">Actions</div>
                  <a
                    href={enriched.githubLink}
                    download
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-center block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="json">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-xs overflow-x-auto max-h-64">
                <pre>{JSON.stringify(enriched.raw_json, null, 2)}</pre>
              </div>
            </TabsContent>
            <TabsContent value="diagram">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-xs overflow-x-auto max-h-64">
                <Mermaid chartDefinition={enriched.diagram} />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="p-8 text-center text-red-400">Failed to load workflow details: {enriched?.error}</div>
        )}
      </div>
    </div>
  );
}

export default function N8n() {
  const { storeItems, isLoading, fetchStoreData } = useStoreWebsite();

  // Filters and state
  const [search, setSearch] = React.useState("");
  const [trigger, setTrigger] = React.useState("All");
  const [complexity, setComplexity] = React.useState("All");
  const [category, setCategory] = React.useState("All");
  const [activeOnly, setActiveOnly] = React.useState(false);
  const [theme, setTheme] = React.useState("light");
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<any>(null);

  React.useEffect(() => {
    fetchStoreData();
  }, [fetchStoreData]);

  React.useEffect(() => {
    if (storeItems.length > 0) {
      console.log('n8nStore database contents:', storeItems);
    }
  }, [storeItems]);

  // Filter logic (mocked for now)
  const filtered = storeItems.filter((item: any) => {
    const p = item.properties;
    const title = p.title?.title?.[0]?.plain_text || "";
    const type = p.type?.select?.name || "";
    const summary = p.summary?.rich_text?.[0]?.plain_text || "";
    const tags = p.tags?.multi_select?.map((t: any) => t.name) || [];
    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      summary.toLowerCase().includes(search.toLowerCase()) ||
      tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesTrigger = trigger === "All" || type === trigger;
    const matchesCategory = category === "All" || tags.includes(category);
    // Complexity and activeOnly are not implemented in data
    return matchesSearch && matchesTrigger && matchesCategory;
  });

  // Map to workflow shape for cards
  const mapped = filtered.map((item: any) => {
    const p = item.properties;
    return {
      id: item.id,
      title: p.title?.title?.[0]?.plain_text || "",
      type: p.type?.select?.name || "",
      summary: p.summary?.rich_text?.[0]?.plain_text || "",
      description: p.description?.rich_text?.[0]?.plain_text || "",
      icon: p.icon?.files?.[0]?.file?.url || "/placeholder.svg",
      link: p.link?.files?.[0]?.file?.url || "",
      image: p.image?.files?.[0]?.file?.url || "",
      verified: p.verified?.select?.name?.toLowerCase() === "yes",
      tags: p.tags?.multi_select?.map((t: any) => t.name) || [],
      category: p.category?.select?.name || "",
      githubLink: p.githubLink?.url || "",
    };
  });

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
        <Header stats={mockStats} />
        <Filters
          search={search}
          setSearch={setSearch}
          trigger={trigger}
          setTrigger={setTrigger}
          complexity={complexity}
          setComplexity={setComplexity}
          category={category}
          setCategory={setCategory}
          activeOnly={activeOnly}
          setActiveOnly={setActiveOnly}
          theme={theme}
          setTheme={setTheme}
        />
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-4 text-gray-500 dark:text-gray-400 text-sm">
            {isLoading ? "Loading..." : `${mapped.length} workflows found`}
          </div>
          {mapped.length === 0 && !isLoading ? (
            <div className="text-center py-16 text-gray-400">No workflows found. Try adjusting your search or filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mapped.map((workflow: any) => (
                <WorkflowCard key={workflow.id} workflow={workflow} onClick={() => setSelectedWorkflow(workflow)} />
              ))}
            </div>
          )}
        </div>
        <WorkflowModal
          open={!!selectedWorkflow}
          onClose={() => setSelectedWorkflow(null)}
          workflow={selectedWorkflow}
        />
      </div>
    </div>
  );
}