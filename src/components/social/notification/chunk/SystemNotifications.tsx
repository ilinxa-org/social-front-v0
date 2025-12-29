// import { Shield, AlertTriangle, Settings, Key, CheckCircle } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface SystemNotif {
//   id: string;
//   type: "security" | "action" | "update" | "success";
//   title: string;
//   message: string;
//   actionLabel?: string;
//   timestamp: string;
//   isRead: boolean;
// }

// const mockNotifications: SystemNotif[] = [
//   {
//     id: "1",
//     type: "security",
//     title: "Yeni Cihazdan Giriş",
//     message: "Hesabınıza İstanbul, Türkiye konumundan yeni bir cihazla giriş yapıldı.",
//     actionLabel: "İncele",
//     timestamp: "2 saat önce",
//     isRead: false,
//   },
//   {
//     id: "2",
//     type: "action",
//     title: "E-posta Doğrulama",
//     message: "Hesap güvenliğiniz için e-posta adresinizi doğrulayın.",
//     actionLabel: "Doğrula",
//     timestamp: "1 gün önce",
//     isRead: false,
//   },
//   {
//     id: "3",
//     type: "update",
//     title: "Gizlilik Politikası Güncellendi",
//     message: "Gizlilik politikamız güncellendi. Lütfen yeni koşulları inceleyin.",
//     actionLabel: "Oku",
//     timestamp: "3 gün önce",
//     isRead: true,
//   },
//   {
//     id: "4",
//     type: "success",
//     title: "Şifre Değiştirildi",
//     message: "Hesap şifreniz başarıyla değiştirildi.",
//     timestamp: "1 hafta önce",
//     isRead: true,
//   },
// ];

// const typeStyles: Record<string, { icon: typeof Shield; color: string; bgColor: string }> = {
//   security: {
//     icon: Shield,
//     color: "text-red-500",
//     bgColor: "bg-red-500/10",
//   },
//   action: {
//     icon: AlertTriangle,
//     color: "text-amber-500",
//     bgColor: "bg-amber-500/10",
//   },
//   update: {
//     icon: Settings,
//     color: "text-blue-500",
//     bgColor: "bg-blue-500/10",
//   },
//   success: {
//     icon: CheckCircle,
//     color: "text-green-500",
//     bgColor: "bg-green-500/10",
//   },
// };

// export function SystemNotifications() {
//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <CardTitle className="text-base flex items-center gap-2">
//           <Key className="h-5 w-5 text-muted-foreground" />
//           Sistem Bildirimleri
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         {mockNotifications.map((notif) => {
//           const style = typeStyles[notif.type];
//           const IconComponent = style.icon;

//           return (
//             <div
//               key={notif.id}
//               className={`flex items-start gap-3 p-3 rounded-lg border ${
//                 notif.isRead ? "bg-muted/30" : `${style.bgColor} border-l-2 border-l-current ${style.color}`
//               }`}
//             >
//               <div className={`p-2 rounded-lg ${style.bgColor} ${style.color}`}>
//                 <IconComponent className="h-4 w-4" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between gap-2">
//                   <h4 className="font-medium text-sm">{notif.title}</h4>
//                   <span className="text-xs text-muted-foreground flex-shrink-0">
//                     {notif.timestamp}
//                   </span>
//                 </div>
//                 <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
//                 {notif.actionLabel && (
//                   <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
//                     {notif.actionLabel}
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
