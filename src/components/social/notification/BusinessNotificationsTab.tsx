import { Building2, TrendingUp, Star, MessageSquare, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockNotifications } from "@/data/notificationsData";


const typeIcons: Record<string, { icon: typeof Building2; color: string }> = {
  review: { icon: Star, color: "text-yellow-500" },
  inquiry: { icon: MessageSquare, color: "text-blue-500" },
  follower: { icon: Users, color: "text-green-500" },
  stats: { icon: TrendingUp, color: "text-purple-500" },
  event: { icon: Calendar, color: "text-primary" },
};

export function BusinessNotificationsTab() {
  return (
    <div className="space-y-4">
      {/* Stats Summary */}
      <Card className="bg-linear-to-r from-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">127</p>
              <p className="text-xs text-muted-foreground">Görüntülenme</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">15</p>
              <p className="text-xs text-muted-foreground">Yeni Takipçi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-xs text-muted-foreground">Mesaj</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            İşletme Bildirimleri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockNotifications.map((notif) => {
            const typeStyle = typeIcons[notif.type];
            const IconComponent = typeStyle.icon;

            return (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  notif.isRead ? "bg-muted/30" : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className={`p-2 rounded-lg bg-muted ${typeStyle.color}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-sm">{notif.title}</h4>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {notif.timestamp}
                    </span>
                  </div>
                  {notif.user && (
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={notif.user.avatar} alt={notif.user.name} />
                        <AvatarFallback>{notif.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">{notif.user.name}</span>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                  {notif.type === "inquiry" && (
                    <Button size="sm" className="mt-2 h-7 text-xs">
                      Yanıtla
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
