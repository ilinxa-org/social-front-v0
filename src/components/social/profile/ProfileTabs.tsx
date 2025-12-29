import { cn } from "@/lib/utils";
import { Grid3X3, Bookmark, AtSign, Heart } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOwnProfile?: boolean;
}

const tabs = [
  { id: "posts", label: "Gönderiler", icon: Grid3X3 },
  { id: "saved", label: "Kaydedilenler", icon: Bookmark, ownProfileOnly: true },
  { id: "liked", label: "Beğenilenler", icon: Heart,  ownProfileOnly: true },
//   { id: "tagged", label: "Etiketlenenler", icon: AtSign },
];

export function ProfileTabs({ activeTab, onTabChange, isOwnProfile = false }: ProfileTabsProps) {
  const visibleTabs = tabs.filter(tab => !tab.ownProfileOnly || isOwnProfile);

  return (
    <div className="bg-card rounded-lg shadow-sm">
      <div className="flex border-b border-border">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4 px-2 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
