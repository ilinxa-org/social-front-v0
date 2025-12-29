import { NewsEventsCard } from "@/components/social/NewsEventsCard";
import { SuggestionsCard } from "@/components/social/SuggestionsCard";


export default function SocialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-4">
          {children}
        </div>

        {/* Right Sidebar - Desktop Only */}
        <aside className="hidden lg:block lg:col-span-4 space-y-4">
          <div className="sticky top-6 space-y-4">
            {/* <SuggestionsCard />
            <TrendingCard />
             */}

            <SuggestionsCard />
            <NewsEventsCard />
            {/* Footer Links */}
            <div className="px-2 text-xs text-muted-foreground space-y-2">
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <a href="#" className="hover:underline">Hakkımızda</a>
                <a href="#" className="hover:underline">Yardım</a>
                <a href="#" className="hover:underline">Gizlilik</a>
                <a href="#" className="hover:underline">Koşullar</a>
                <a href="#" className="hover:underline">Reklam</a>
              </div>
              <p>© 2026 Kasder <span className="text-blue-600 text-[10px] ">Powerd by ILINXA</span></p>
            </div>
          </div>
        </aside>
      </div>
    </div>






  );
}
