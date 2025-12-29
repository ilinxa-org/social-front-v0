// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Send, Loader2, CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // import { useToast } from "@/hooks/use-toast";

// const contactSchema = z.object({
//   name: z.string().trim().min(2, "İsim en az 2 karakter olmalıdır").max(100, "İsim en fazla 100 karakter olabilir"),
//   email: z.string().trim().email("Geçerli bir e-posta adresi giriniz").max(255, "E-posta en fazla 255 karakter olabilir"),
//   phone: z.string().trim().optional(),
//   subject: z.string().min(1, "Lütfen bir konu seçiniz"),
//   message: z.string().trim().min(10, "Mesaj en az 10 karakter olmalıdır").max(2000, "Mesaj en fazla 2000 karakter olabilir"),
// });

// type ContactFormData = z.infer<typeof contactSchema>;

// const subjects = [
//   { value: "genel", label: "Genel Bilgi" },
//   { value: "uyelik", label: "Üyelik" },
//   { value: "etkinlik", label: "Etkinlik Bilgisi" },
//   { value: "isbirligi", label: "İşbirliği Teklifi" },
//   { value: "basin", label: "Basın & Medya" },
//   { value: "diger", label: "Diğer" },
// ];

// const ContactForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const { toast } = useToast();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<ContactFormData>({
//     resolver: zodResolver(contactSchema),
//   });

//   const onSubmit = async (data: ContactFormData) => {
//     setIsSubmitting(true);
    
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500));
    
//     setIsSubmitting(false);
//     setIsSubmitted(true);
    
//     toast({
//       title: "Mesajınız Gönderildi",
//       description: "En kısa sürede size dönüş yapacağız.",
//     });

//     // Reset form after 3 seconds
//     setTimeout(() => {
//       setIsSubmitted(false);
//       reset();
//     }, 3000);
//   };

//   if (isSubmitted) {
//     return (
//       <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 text-center">
//         <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
//           <CheckCircle className="w-8 h-8 text-success" />
//         </div>
//         <h3 className="text-2xl font-bold text-foreground mb-2">Teşekkürler!</h3>
//         <p className="text-muted-foreground">
//           Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 shadow-lg">
//       <h2 className="text-2xl font-bold text-foreground mb-2">Mesaj Gönderin</h2>
//       <p className="text-muted-foreground mb-8">
//         Formu doldurarak bize ulaşabilirsiniz.
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Name */}
//           <div className="space-y-2">
//             <Label htmlFor="name">Ad Soyad *</Label>
//             <Input
//               id="name"
//               placeholder="Adınız ve soyadınız"
//               {...register("name")}
//               className={errors.name ? "border-destructive" : ""}
//             />
//             {errors.name && (
//               <p className="text-sm text-destructive">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <Label htmlFor="email">E-posta *</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="ornek@email.com"
//               {...register("email")}
//               className={errors.email ? "border-destructive" : ""}
//             />
//             {errors.email && (
//               <p className="text-sm text-destructive">{errors.email.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Phone */}
//           <div className="space-y-2">
//             <Label htmlFor="phone">Telefon</Label>
//             <Input
//               id="phone"
//               type="tel"
//               placeholder="+90 5XX XXX XX XX"
//               {...register("phone")}
//             />
//           </div>

//           {/* Subject */}
//           <div className="space-y-2">
//             <Label htmlFor="subject">Konu *</Label>
//             <Select onValueChange={(value) => setValue("subject", value)}>
//               <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
//                 <SelectValue placeholder="Konu seçiniz" />
//               </SelectTrigger>
//               <SelectContent className="bg-card border border-border z-50">
//                 {subjects.map((subject) => (
//                   <SelectItem key={subject.value} value={subject.value}>
//                     {subject.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {errors.subject && (
//               <p className="text-sm text-destructive">{errors.subject.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Message */}
//         <div className="space-y-2">
//           <Label htmlFor="message">Mesajınız *</Label>
//           <Textarea
//             id="message"
//             placeholder="Mesajınızı buraya yazınız..."
//             rows={6}
//             {...register("message")}
//             className={errors.message ? "border-destructive" : ""}
//           />
//           {errors.message && (
//             <p className="text-sm text-destructive">{errors.message.message}</p>
//           )}
//         </div>

//         <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Gönderiliyor...
//             </>
//           ) : (
//             <>
//               <Send className="w-4 h-4 mr-2" />
//               Mesaj Gönder
//             </>
//           )}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
