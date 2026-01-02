"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventType, FilterType } from "@/types/eventsType";
import { generateMockEvents } from "@/data/eventsData";
import EventCard, { getEventStatus } from "./EventCard";

// import EventCard, { EventType, getEventStatus } from "./EventCard";



const filterConfig: Record<FilterType, { label: string; icon: React.ElementType }> = {
  all: { label: "Tümü", icon: Calendar },
  open: { label: "Kayıt Açık", icon: CheckCircle },
  upcoming: { label: "Yaklaşan", icon: Clock },
  ongoing: { label: "Devam Eden", icon: Clock },
  expired: { label: "Geçmiş", icon: XCircle }
};

const EventsGrid = () => {
  const [events] = useState<EventType[]>(generateMockEvents());
  const [displayedEvents, setDisplayedEvents] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const ITEMS_PER_PAGE = 6;

  // Filter events based on search and status
  const getFilteredEvents = useCallback(() => {
    return events.filter(event => {
      // Search filter
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // Status filter
      if (activeFilter === "all") return true;
      
      const status = getEventStatus(event);
      
      switch (activeFilter) {
        case "open":
          return status === "open" || status === "lastSpots";
        case "upcoming":
          return status === "upcoming" || status === "open" || status === "lastSpots";
        case "ongoing":
          return status === "ongoing";
        case "expired":
          return status === "expired";
        default:
          return true;
      }
    });
  }, [events, searchQuery, activeFilter]);

  // Sort events: ongoing first, then by date
  const getSortedEvents = useCallback((filteredEvents: EventType[]) => {
    return [...filteredEvents].sort((a, b) => {
      const statusA = getEventStatus(a);
      const statusB = getEventStatus(b);
      
      // Ongoing events first
      if (statusA === "ongoing" && statusB !== "ongoing") return -1;
      if (statusB === "ongoing" && statusA !== "ongoing") return 1;
      
      // Expired events last
      if (statusA === "expired" && statusB !== "expired") return 1;
      if (statusB === "expired" && statusA !== "expired") return -1;
      
      // Sort by date
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, []);

  // Reset and load initial events when filters change
  useEffect(() => {
    const filtered = getFilteredEvents();
    const sorted = getSortedEvents(filtered);
    setDisplayedEvents(sorted.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(sorted.length > ITEMS_PER_PAGE);
  }, [searchQuery, activeFilter, getFilteredEvents, getSortedEvents]);

  // Infinite scroll loader
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const filtered = getFilteredEvents();
      const sorted = getSortedEvents(filtered);
      const nextPage = page + 1;
      const start = 0;
      const end = nextPage * ITEMS_PER_PAGE;
      
      setDisplayedEvents(sorted.slice(start, end));
      setPage(nextPage);
      setHasMore(end < sorted.length);
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, page, getFilteredEvents, getSortedEvents]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  const filteredCount = getFilteredEvents().length;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Etkinlik ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg rounded-xl border-border/50 focus:border-primary"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(filterConfig) as FilterType[]).map((filter) => {
              const { label, icon: Icon } = filterConfig[filter];
              return (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              );
            })}
          </div>

          {/* Results count */}
          <p className="text-center text-muted-foreground">
            {filteredCount} etkinlik bulundu
          </p>
        </div>

        {/* Events Grid */}
        {displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Etkinlik Bulunamadı</h3>
            <p className="text-muted-foreground">Arama kriterlerinize uygun etkinlik bulunamamıştır.</p>
          </div>
        )}

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="py-8 flex justify-center">
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          )}
          {!hasMore && displayedEvents.length > 0 && (
            <p className="text-muted-foreground text-sm">Tüm etkinlikler gösterildi</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;
