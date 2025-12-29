// "use client";
// import { useState, useCallback } from "react";
// import { ChevronDown, ChevronUp, Users, Loader2 } from "lucide-react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { motion, AnimatePresence } from "framer-motion";
// import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

// interface NetworkNotif {
//   id: string;
//   user: {
//     name: string;
//     avatar: string;
//   };
//   action: string;
//   content?: string;
//   timestamp: string;
// }

// const generateNotifications = (page: number): NetworkNotif[] => {
//   const baseNotifications: NetworkNotif[] = [
//     {
//       id: `${page}-1`,
//       user: {
//         name: "Elif Şahin",
//         avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
//       },
//       action: "yeni bir gönderi paylaştı",
//       content: "Bugün ofiste harika bir toplantı yaptık...",
//       timestamp: "10 dk önce",
//     },
//     {
//       id: `${page}-2`,
//       user: {
//         name: "Murat Demir",
//         avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
//       },
//       action: "bir fotoğraf paylaştı",
//       timestamp: "25 dk önce",
//     },
//     {
//       id: `${page}-3`,
//       user: {
//         name: "Ayşe Yılmaz",
//         avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
//       },
//       action: "profilini güncelledi",
//       timestamp: "1 saat önce",
//     },
//     {
//       id: `${page}-4`,
//       user: {
//         name: "Can Öztürk",
//         avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
//       },
//       action: "bir etkinliğe katıldı",
//       content: "Sürdürülebilir Şehircilik Zirvesi",
//       timestamp: "2 saat önce",
//     },
//     {
//       id: `${page}-5`,
//       user: {
//         name: "Zeynep Kaya",
//         avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//       },
//       action: "yeni bir proje ekledi",
//       content: "Yeşil Kampüs Projesi",
//       timestamp: "3 saat önce",
//     },
//     {
//       id: `${page}-6`,
//       user: {
//         name: "Ahmet Yıldız",
//         avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
//       },
//       action: "bir makale yazdı",
//       content: "Akıllı Şehirlerin Geleceği",
//       timestamp: "4 saat önce",
//     },
//     {
//       id: `${page}-7`,
//       user: {
//         name: "Fatma Kara",
//         avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//       },
//       action: "yeni bir bağlantı ekledi",
//       timestamp: "5 saat önce",
//     },
//   ];
//   return baseNotifications;
// };

// export function NetworkActivityCard() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notifications, setNotifications] = useState<NetworkNotif[]>(generateNotifications(1));
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const totalCount = 42;

//   const loadMore = useCallback(async () => {
//     await new Promise((resolve) => setTimeout(resolve, 800));
//     const nextPage = page + 1;
//     const newNotifications = generateNotifications(nextPage);
//     setNotifications((prev) => [...prev, ...newNotifications]);
//     setPage(nextPage);
//     if (nextPage >= 6) {
//       setHasMore(false);
//     }
//   }, [page]);

//   const { loadMoreRef, isLoading } = useInfiniteScroll(loadMore, hasMore);

//   return (
//     <Card className="border-muted">
//       <CardHeader className="pb-2">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center justify-between w-full text-left"
//         >
//           <div className="flex items-center gap-2">
//             <Users className="h-5 w-5 text-muted-foreground" />
//             <h3 className="font-semibold text-foreground">Ağınızdaki Aktiviteler</h3>
//             <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
//               {totalCount}
//             </span>
//           </div>
//           {isOpen ? (
//             <ChevronUp className="h-5 w-5 text-muted-foreground" />
//           ) : (
//             <ChevronDown className="h-5 w-5 text-muted-foreground" />
//           )}
//         </button>
//         {!isOpen && (
//           <p className="text-sm text-muted-foreground mt-2">
//             Bağlantılarınızdan {totalCount} yeni aktivite
//           </p>
//         )}
//       </CardHeader>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <CardContent className="pt-2">
//               <ScrollArea className="h-[400px] pr-4">
//                 <div className="space-y-2">
//                   {notifications.map((notif) => (
//                     <div
//                       key={notif.id}
//                       className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
//                     >
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src={notif.user.avatar} alt={notif.user.name} />
//                         <AvatarFallback>{notif.user.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm">
//                           <span className="font-medium">{notif.user.name}</span>{" "}
//                           <span className="text-muted-foreground">{notif.action}</span>
//                         </p>
//                         {notif.content && (
//                           <p className="text-xs text-muted-foreground mt-1 truncate">
//                             {notif.content}
//                           </p>
//                         )}
//                         <p className="text-xs text-muted-foreground mt-1">{notif.timestamp}</p>
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={loadMoreRef} className="flex justify-center py-4">
//                     {isLoading && (
//                       <div className="flex items-center gap-2 text-muted-foreground text-sm">
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         <span>Yükleniyor...</span>
//                       </div>
//                     )}
//                     {!hasMore && (
//                       <p className="text-muted-foreground text-xs">
//                         Tüm aktiviteleri gördünüz
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Card>
//   );
// }
