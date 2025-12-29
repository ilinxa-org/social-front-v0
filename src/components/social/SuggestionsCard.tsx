
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Suggestion {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutualFriends?: number;
}

const suggestions: Suggestion[] = [
  { id: "1", name: "Elif Yılmaz", username: "elif_yilmaz", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", mutualFriends: 12 },
  { id: "2", name: "Burak Öztürk", username: "burak_ozturk", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100", mutualFriends: 8 },
  { id: "3", name: "Selin Demir", username: "selin_demir", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100", mutualFriends: 5 },
  { id: "4", name: "Emre Aydın", username: "emre_aydin", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100", mutualFriends: 3 },
];

export function SuggestionsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Önerilen Hesaplar
          </CardTitle>
          <Link href="/social/discover" className="text-xs text-primary hover:underline">
            Tümünü Gör
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.mutualFriends} ortak arkadaş
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              Takip Et
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
