// "use client";
// import { useState } from "react";
// import { Search, X, Users, Building2, Newspaper, Calendar, FileText, Globe } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { ExploreSearchResults } from "./ExploreSearchResults";

// export type SearchCategory = "all" | "users" | "businesses" | "news" | "events" | "posts";

// interface CategoryOption {
//   id: SearchCategory;
//   label: string;
//   icon: React.ElementType;
// }

// const categories: CategoryOption[] = [
//   { id: "all", label: "Tümü", icon: Globe },
//   { id: "users", label: "Kullanıcılar", icon: Users },
//   { id: "businesses", label: "İşletmeler", icon: Building2 },
//   { id: "news", label: "Haberler", icon: Newspaper },
//   { id: "events", label: "Etkinlikler", icon: Calendar },
//   { id: "posts", label: "Gönderiler", icon: FileText },
// ];

// export function ExploreSearchTab() {
//   const [query, setQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
//   const [hasSearched, setHasSearched] = useState(false);

//   const handleSearch = (searchQuery?: string) => {
//     const q = searchQuery ?? query;
//     if (q.trim()) {
//       if (searchQuery) setQuery(searchQuery);
//       setHasSearched(true);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const clearSearch = () => {
//     setQuery("");
//     setHasSearched(false);
//   };

//   const handleTrendingClick = (term: string) => {
//     setQuery(term);
//     setHasSearched(true);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Search Input */}
//       <div className="relative">
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//         <Input
//           type="text"
//           placeholder="Kullanıcı, işletme, haber veya etkinlik ara..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="pl-12 pr-12 h-12 text-base rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
//         />
//         {query && (
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={clearSearch}
//             className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-muted"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         )}
//       </div>

//       {/* Category Filters */}
//       <div className="flex flex-wrap gap-2">
//         {categories.map((category) => {
//           const Icon = category.icon;
//           const isActive = activeCategory === category.id;
          
//           return (
//             <Badge
//               key={category.id}
//               variant={isActive ? "default" : "outline"}
//               className={cn(
//                 "cursor-pointer px-3 py-1.5 text-sm font-medium transition-all",
//                 "hover:scale-105 active:scale-95",
//                 isActive 
//                   ? "bg-primary text-primary-foreground shadow-sm" 
//                   : "bg-background hover:bg-muted border-border/50"
//               )}
//               onClick={() => setActiveCategory(category.id)}
//             >
//               <Icon className="h-3.5 w-3.5 mr-1.5" />
//               {category.label}
//             </Badge>
//           );
//         })}
//       </div>

//       {/* Search Results */}
//       <ExploreSearchResults 
//         query={query} 
//         category={activeCategory} 
//         hasSearched={hasSearched}
//         onTrendingClick={handleTrendingClick}
//       />
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { Search, X, Users, Building2, Newspaper, Calendar, FileText, Globe, MapPin, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ExploreSearchResults } from "./ExploreSearchResults";

// Location data with countries and cities
const locationData: Record<string, string[]> = {
  "Türkiye": ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Gaziantep", "Konya"],
  "Almanya": ["Berlin", "Münih", "Hamburg", "Frankfurt", "Köln", "Düsseldorf"],
  "Amerika": ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Boston"],
  "İngiltere": ["Londra", "Manchester", "Birmingham", "Liverpool", "Leeds"],
  "Hollanda": ["Amsterdam", "Rotterdam", "Lahey", "Utrecht"],
};

export interface LocationFilter {
  country: string | null;
  city: string | null;
}

export type SearchCategory = "all" | "users" | "businesses" | "news" | "events" | "posts";

interface CategoryOption {
  id: SearchCategory;
  label: string;
  icon: React.ElementType;
}

const categories: CategoryOption[] = [
  { id: "all", label: "Tümü", icon: Globe },
  { id: "users", label: "Kullanıcılar", icon: Users },
  { id: "businesses", label: "İşletmeler", icon: Building2 },
  { id: "news", label: "Haberler", icon: Newspaper },
  { id: "events", label: "Etkinlikler", icon: Calendar },
  { id: "posts", label: "Gönderiler", icon: FileText },
];

export function ExploreSearchTab() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [hasSearched, setHasSearched] = useState(false);
  const [locationFilter, setLocationFilter] = useState<LocationFilter>({ country: null, city: null });
  const [locationOpen, setLocationOpen] = useState(false);

  const handleCountrySelect = (country: string) => {
    if (locationFilter.country === country) {
      setLocationFilter({ country: null, city: null });
    } else {
      setLocationFilter({ country, city: null });
    }
  };

  const handleCitySelect = (city: string) => {
    if (locationFilter.city === city) {
      setLocationFilter({ ...locationFilter, city: null });
    } else {
      setLocationFilter({ ...locationFilter, city });
      setLocationOpen(false);
    }
  };

  const clearLocation = () => {
    setLocationFilter({ country: null, city: null });
  };

  const getLocationLabel = () => {
    if (locationFilter.city && locationFilter.country) {
      return `${locationFilter.city}, ${locationFilter.country}`;
    }
    if (locationFilter.country) {
      return locationFilter.country;
    }
    return "Konum";
  };

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery ?? query;
    if (q.trim()) {
      if (searchQuery) setQuery(searchQuery);
      setHasSearched(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setHasSearched(false);
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    setHasSearched(true);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Kullanıcı, işletme, haber veya etkinlik ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-12 h-12 text-base rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors placeholder:text-xs"
        />
        <div className="absolute top-1/6 right-2">
          
        
        <Popover open={locationOpen} onOpenChange={setLocationOpen}  >
          <PopoverTrigger asChild >
            <button
              className={cn(
                "inline-flex  items-center cursor-pointer px-3 py-1.5 text-sm font-medium transition-all rounded-md border min-h-8 ",
                "hover:scale-105 active:scale-95 gap-1.5",
                locationFilter.country 
                  ? "bg-accent text-accent-foreground border-accent shadow-sm" 
                  : " bg-primary  text-primary-foreground   hover:bg-primary/90 border-border/50"
              )}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span className="max-w-24  truncate hidden sm:inline">{getLocationLabel()}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", locationOpen && "rotate-180")} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="end">
            <div className="p-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Konum Filtresi</span>
                {locationFilter.country && (
                  <Button variant="ghost" size="sm" onClick={clearLocation} className="h-6 px-2 text-xs">
                    Temizle
                  </Button>
                )}
              </div>
            </div>
            <div className="p-2 max-h-64 overflow-y-auto">
              {Object.entries(locationData).map(([country, cities]) => (
                <div key={country} className="mb-1">
                  <button
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between",
                      locationFilter.country === country 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-muted"
                    )}
                  >
                    <span>{country}</span>
                    {locationFilter.country === country && (
                      <span className="text-xs text-muted-foreground">Seçili</span>
                    )}
                  </button>
                  {locationFilter.country === country && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className={cn(
                            "w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors",
                            locationFilter.city === city 
                              ? "bg-accent text-accent-foreground font-medium" 
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        </div>
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-44 border top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Category Filters */}
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <Badge
              key={category.id}
              variant={isActive ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-3 py-1.5 text-sm font-medium transition-all",
                "hover:scale-105 active:scale-95",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-background hover:bg-muted border-border/50"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon className="h-3.5 w-3.5 mr-1.5" />
              {category.label}
            </Badge>
          );
        })}

        {/* Location Filter */}
        {/* <Popover open={locationOpen} onOpenChange={setLocationOpen}>
          <PopoverTrigger asChild >
            <button
              className={cn(
                "inline-flex items-center cursor-pointer px-3 py-1.5 text-sm font-medium transition-all rounded-full border",
                "hover:scale-105 active:scale-95 gap-1.5",
                locationFilter.country 
                  ? "bg-accent text-accent-foreground border-accent shadow-sm" 
                  : "bg-background hover:bg-muted border-border/50"
              )}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span className="max-w-24 truncate">{getLocationLabel()}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", locationOpen && "rotate-180")} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="end">
            <div className="p-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Konum Filtresi</span>
                {locationFilter.country && (
                  <Button variant="ghost" size="sm" onClick={clearLocation} className="h-6 px-2 text-xs">
                    Temizle
                  </Button>
                )}
              </div>
            </div>
            <div className="p-2 max-h-64 overflow-y-auto">
              {Object.entries(locationData).map(([country, cities]) => (
                <div key={country} className="mb-1">
                  <button
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between",
                      locationFilter.country === country 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-muted"
                    )}
                  >
                    <span>{country}</span>
                    {locationFilter.country === country && (
                      <span className="text-xs text-muted-foreground">Seçili</span>
                    )}
                  </button>
                  {locationFilter.country === country && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className={cn(
                            "w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors",
                            locationFilter.city === city 
                              ? "bg-accent text-accent-foreground font-medium" 
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover> */}
      </div>

      {/* Search Results */}
      <ExploreSearchResults 
        query={query} 
        category={activeCategory} 
        hasSearched={hasSearched}
        onTrendingClick={handleTrendingClick}
        locationFilter={locationFilter}
      />
    </div>
  );
}
