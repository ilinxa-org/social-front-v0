// import { Megaphone, Star, AlertCircle, ArrowRight } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface PlatformNotif {
//   id: string;
//   title: string;
//   message: string;
//   type: "announcement" | "feature" | "important";
//   link?: string;
//   timestamp: string;
//   isRead: boolean;
// }

// const mockNotifications: PlatformNotif[] = [
//   {
//     id: "1",
//     type: "important",
//     title: "Yeni Özellik: İş Profilleri",
//     message: "Artık işletmeniz için ayrı bir profil oluşturabilirsiniz. Hemen deneyin!",
//     link: "/sosyal/profil",
//     timestamp: "Bugün",
//     isRead: false,
//   },
//   {
//     id: "2",
//     type: "announcement",
//     title: "KASDER Yılsonu Toplantısı",
//     message: "2025 yılsonu değerlendirme toplantımıza davetlisiniz. Detaylar için tıklayın.",
//     link: "/etkinlikler",
//     timestamp: "Dün",
//     isRead: false,
//   },
//   {
//     id: "3",
//     type: "feature",
//     title: "Profil Güncelleme Hatırlatması",
//     message: "Profilinizi güncelleyerek daha fazla kişiye ulaşabilirsiniz.",
//     timestamp: "3 gün önce",
//     isRead: true,
//   },
// ];

// const typeStyles: Record<string, { bg: string; icon: typeof Megaphone; iconBg: string }> = {
//   announcement: {
//     bg: "bg-blue-500/10 border-blue-500/20",
//     icon: Megaphone,
//     iconBg: "bg-blue-500",
//   },
//   feature: {
//     bg: "bg-purple-500/10 border-purple-500/20",
//     icon: Star,
//     iconBg: "bg-purple-500",
//   },
//   important: {
//     bg: "bg-amber-500/10 border-amber-500/20",
//     icon: AlertCircle,
//     iconBg: "bg-amber-500",
//   },
// };

// export function PlatformNotifications() {
//   return (
//     <Card className="border-2 border-primary/20">
//       <CardHeader className="pb-2 bg-primary/5">
//         <CardTitle className="text-base flex items-center gap-2">
//           <Megaphone className="h-5 w-5 text-primary" />
//           KASDER Duyuruları
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="pt-4 space-y-3">
//         {mockNotifications.map((notif) => {
//           const style = typeStyles[notif.type];
//           const IconComponent = style.icon;

//           return (
//             <div
//               key={notif.id}
//               className={`p-4 rounded-lg border ${style.bg} ${
//                 !notif.isRead ? "ring-2 ring-primary/30" : ""
//               }`}
//             >
//               <div className="flex items-start gap-3">
//                 <div className={`p-2 rounded-lg ${style.iconBg} text-white`}>
//                   <IconComponent className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between gap-2">
//                     <h4 className="font-semibold text-sm">{notif.title}</h4>
//                     <span className="text-xs text-muted-foreground flex-shrink-0">
//                       {notif.timestamp}
//                     </span>
//                   </div>
//                   <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
//                   {notif.link && (
//                     <Button variant="link" size="sm" className="px-0 mt-2 h-auto">
//                       Detayları Gör <ArrowRight className="h-3 w-3 ml-1" />
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </CardContent>
//     </Card>
//   );
// }
