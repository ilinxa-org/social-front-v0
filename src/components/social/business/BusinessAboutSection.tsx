import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Target, Eye, Award } from "lucide-react";

interface BusinessAboutSectionProps {
  about: {
    description: string;
    mission?: string;
    vision?: string;
    values?: string[];
  };
}

export function BusinessAboutSection({ about }: BusinessAboutSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Hakkımızda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Description */}
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {about.description}
        </p>

        {/* Mission */}
        {about.mission && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Misyonumuz</h3>
            </div>
            <p className="text-sm text-muted-foreground">{about.mission}</p>
          </div>
        )}

        {/* Vision */}
        {about.vision && (
          <div className="p-4 bg-accent/30 rounded-lg border border-accent/50">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Vizyonumuz</h3>
            </div>
            <p className="text-sm text-muted-foreground">{about.vision}</p>
          </div>
        )}

        {/* Values */}
        {about.values && about.values.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Değerlerimiz</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {about.values.map((value, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
