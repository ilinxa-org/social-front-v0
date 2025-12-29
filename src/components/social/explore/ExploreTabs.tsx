"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, Search } from "lucide-react";
import { ExploreSearchTab } from "./ExploreSearchTab";

export function ExploreTabs() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full grid grid-cols-2 h-12 bg-muted/50 p-1 rounded-xl">
        <TabsTrigger 
          value="feeds" 
          className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Compass className="h-4 w-4" />
          <span>Akış</span>
        </TabsTrigger>
        <TabsTrigger 
          value="search" 
          className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Search className="h-4 w-4" />
          <span>Arama</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="feeds" className="mt-6">
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Compass className="h-16 w-16 mb-4 opacity-30" />
          <p className="text-lg">Akış yakında burada olacak</p>
        </div>
      </TabsContent>

      <TabsContent value="search" className="mt-6">
        <ExploreSearchTab />
      </TabsContent>
    </Tabs>
  );
}
