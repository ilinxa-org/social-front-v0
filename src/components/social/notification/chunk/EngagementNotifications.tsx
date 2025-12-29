// import { Heart, MessageCircle, AtSign } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// type NotifType = "like" | "comment" | "mention";

// interface EngagementNotif {
//   id: string;
//   type: NotifType;
//   user: {
//     name: string;
//     avatar: string;
//   };
//   content: string;
//   postPreview?: string;
//   timestamp: string;
//   isRead: boolean;
// }

// const mockNotifications: EngagementNotif[] = [
//   {
//     id: "1",
//     type: "like",
//     user: {
//       name: "Ayşe Yılmaz",
//       avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
//     },
//     content: "gönderinizi beğendi",
//     postPreview: "Bugün harika bir toplantı geçirdik...",
//     timestamp: "5 dk önce",
//     isRead: false,
//   },
//   {
//     id: "2",
//     type: "comment",
//     user: {
//       name: "Mehmet Kara",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
//     },
//     content: "gönderinize yorum yaptı",
//     postPreview: "Harika bir proje olmuş, tebrikler!",
//     timestamp: "15 dk önce",
//     isRead: false,
//   },
//   {
//     id: "3",
//     type: "mention",
//     user: {
//       name: "Fatma Demir",
//       avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//     },
//     content: "sizi bir gönderide etiketledi",
//     postPreview: "@kullanici ile birlikte harika bir etkinlikteyiz!",
//     timestamp: "1 saat önce",
//     isRead: true,
//   },
//   {
//     id: "4",
//     type: "like",
//     user: {
//       name: "Ali Öztürk",
//       avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
//     },
//     content: "ve 5 kişi daha gönderinizi beğendi",
//     postPreview: "Yeni projemizden kareler...",
//     timestamp: "2 saat önce",
//     isRead: true,
//   },
// ];

// const iconMap: Record<NotifType, { icon: typeof Heart; color: string }> = {
//   like: { icon: Heart, color: "text-red-500" },
//   comment: { icon: MessageCircle, color: "text-blue-500" },
//   mention: { icon: AtSign, color: "text-purple-500" },
// };

// export function EngagementNotifications() {
//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <CardTitle className="text-base flex items-center gap-2">
//           <Heart className="h-5 w-5 text-red-500" />
//           Beğeni, Yorum ve Etiketler
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         {mockNotifications.map((notif) => {
//           const IconComponent = iconMap[notif.type].icon;
//           const iconColor = iconMap[notif.type].color;

//           return (
//             <div
//               key={notif.id}
//               className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
//                 notif.isRead ? "bg-muted/30" : "bg-primary/5 border-l-2 border-primary"
//               }`}
//             >
//               <div className="relative">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage src={notif.user.avatar} alt={notif.user.name} />
//                   <AvatarFallback>{notif.user.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div className={`absolute -bottom-1 -right-1 p-1 rounded-full bg-background ${iconColor}`}>
//                   <IconComponent className="h-3 w-3" />
//                 </div>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm">
//                   <span className="font-medium">{notif.user.name}</span>{" "}
//                   <span className="text-muted-foreground">{notif.content}</span>
//                 </p>
//                 {notif.postPreview && (
//                   <p className="text-xs text-muted-foreground mt-1 truncate bg-muted/50 p-2 rounded">
//                     "{notif.postPreview}"
//                   </p>
//                 )}
//                 <p className="text-xs text-muted-foreground mt-1">{notif.timestamp}</p>
//               </div>
//             </div>
//           );
//         })}
//       </CardContent>
//     </Card>
//   );
// }
