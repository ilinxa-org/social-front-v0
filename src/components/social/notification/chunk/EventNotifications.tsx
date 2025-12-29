// import { Calendar, MapPin, Clock, Users } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface EventNotif {
//   id: string;
//   title: string;
//   type: "reminder" | "invitation" | "update";
//   date: string;
//   time: string;
//   location: string;
//   attendees?: number;
//   timestamp: string;
//   isRead: boolean;
// }

// const mockNotifications: EventNotif[] = [
//   {
//     id: "1",
//     type: "reminder",
//     title: "Sürdürülebilir Şehircilik Zirvesi",
//     date: "15 Ocak 2025",
//     time: "09:00",
//     location: "İstanbul Kongre Merkezi",
//     attendees: 234,
//     timestamp: "Yarın",
//     isRead: false,
//   },
//   {
//     id: "2",
//     type: "invitation",
//     title: "Akıllı Ulaşım Semineri",
//     date: "20 Ocak 2025",
//     time: "14:00",
//     location: "Ankara Ticaret Odası",
//     attendees: 89,
//     timestamp: "5 gün sonra",
//     isRead: false,
//   },
//   {
//     id: "3",
//     type: "update",
//     title: "Kentsel Dönüşüm Çalıştayı",
//     date: "28 Ocak 2025",
//     time: "10:00",
//     location: "İzmir Kültür Merkezi",
//     timestamp: "Güncellendi",
//     isRead: true,
//   },
// ];

// const typeLabels: Record<string, { label: string; color: string }> = {
//   reminder: { label: "Hatırlatma", color: "bg-amber-500" },
//   invitation: { label: "Davet", color: "bg-green-500" },
//   update: { label: "Güncelleme", color: "bg-blue-500" },
// };

// export function EventNotifications() {
//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <CardTitle className="text-base flex items-center gap-2">
//           <Calendar className="h-5 w-5 text-primary" />
//           Etkinlik Bildirimleri
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         {mockNotifications.map((notif) => {
//           const typeStyle = typeLabels[notif.type];

//           return (
//             <div
//               key={notif.id}
//               className={`p-4 rounded-lg border transition-colors ${
//                 notif.isRead ? "bg-muted/30" : "bg-primary/5 border-primary/20"
//               }`}
//             >
//               <div className="flex items-start justify-between gap-3 mb-3">
//                 <div>
//                   <span
//                     className={`inline-block text-xs text-white px-2 py-0.5 rounded ${typeStyle.color} mb-2`}
//                   >
//                     {typeStyle.label}
//                   </span>
//                   <h4 className="font-medium text-sm">{notif.title}</h4>
//                 </div>
//                 <span className="text-xs text-muted-foreground flex-shrink-0">
//                   {notif.timestamp}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
//                 <div className="flex items-center gap-1">
//                   <Calendar className="h-3 w-3" />
//                   <span>{notif.date}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Clock className="h-3 w-3" />
//                   <span>{notif.time}</span>
//                 </div>
//                 <div className="flex items-center gap-1 col-span-2">
//                   <MapPin className="h-3 w-3" />
//                   <span>{notif.location}</span>
//                 </div>
//                 {notif.attendees && (
//                   <div className="flex items-center gap-1">
//                     <Users className="h-3 w-3" />
//                     <span>{notif.attendees} katılımcı</span>
//                   </div>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <Button size="sm" variant="outline" className="flex-1">
//                   Detaylar
//                 </Button>
//                 {notif.type === "invitation" && (
//                   <Button size="sm" className="flex-1">
//                     Katıl
//                   </Button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </CardContent>
//     </Card>
//   );
// }
