import { cn } from "@/lib/utils";
import { FileText, FolderKanban, Bell } from "lucide-react";

interface BusinessProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "page", label: "Sayfa", icon: FileText },
  { id: "projects", label: "Projeler", icon: FolderKanban },
  { id: "posts", label: "Paylaşımlar", icon: Bell },
];

export function BusinessProfileTabs({ activeTab, onTabChange }: BusinessProfileTabsProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm">
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
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
