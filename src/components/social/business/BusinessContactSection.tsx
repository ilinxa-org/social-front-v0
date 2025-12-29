"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  CheckCircle 
} from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

interface BusinessContactSectionProps {
  contact: {
    address?: string;
    phone?: string;
    email?: string;
    mapEmbedUrl?: string;
  };
}

export function BusinessContactSection({ contact }: BusinessContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
//   const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    // toast({
    //   title: "Mesajınız gönderildi",
    //   description: "En kısa sürede size dönüş yapacağız.",
    // });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          İletişim
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-4">
            {contact.address && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Adres</h4>
                  <p className="text-sm text-muted-foreground">{contact.address}</p>
                </div>
              </div>
            )}
            
            {contact.phone && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Telefon</h4>
                  <a href={`tel:${contact.phone}`} className="text-sm text-muted-foreground hover:text-primary">
                    {contact.phone}
                  </a>
                </div>
              </div>
            )}
            
            {contact.email && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">E-posta</h4>
                  <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-primary">
                    {contact.email}
                  </a>
                </div>
              </div>
            )}

            {/* Map placeholder */}
            {contact.mapEmbedUrl && (
              <div className="mt-4 rounded-lg overflow-hidden h-40 bg-muted">
                <iframe 
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-primary/5 rounded-lg">
                <CheckCircle className="h-12 w-12 text-primary mb-3" />
                <h3 className="font-semibold mb-1">Teşekkürler!</h3>
                <p className="text-sm text-muted-foreground">
                  Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsSubmitted(false)}
                >
                  Yeni Mesaj Gönder
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Adınız</Label>
                    <Input id="name" placeholder="Adınızı girin" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input id="email" type="email" placeholder="E-posta adresiniz" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Konu</Label>
                  <Input id="subject" placeholder="Mesajınızın konusu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mesajınız</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Mesajınızı yazın..." 
                    rows={4}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Gönderiliyor...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Mesaj Gönder
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
