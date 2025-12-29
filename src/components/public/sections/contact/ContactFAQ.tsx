
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Derneğe nasıl üye olabilirim?",
    answer: "Derneğimize üyelik başvurusu için web sitemizden online başvuru formunu doldurabilir veya merkez ofisimizi ziyaret edebilirsiniz. Başvurunuz yönetim kurulu tarafından değerlendirildikten sonra size dönüş yapılacaktır."
  },
  {
    question: "Etkinliklere nasıl katılabilirim?",
    answer: "Etkinliklerimiz web sitemizde yayınlanmaktadır. İlgilendiğiniz etkinliğin detay sayfasından online kayıt yapabilirsiniz. Üyelere özel etkinlikler için öncelikli kayıt hakkınız bulunmaktadır."
  },
  {
    question: "İşbirliği teklifleri için kiminle iletişime geçmeliyim?",
    answer: "Kurumsal işbirliği ve sponsorluk teklifleri için isbirligi@kasder.org.tr adresine e-posta gönderebilir veya +90 212 555 01 23 numaralı telefondan bize ulaşabilirsiniz."
  },
  {
    question: "Basın ve medya talepleri için ne yapmalıyım?",
    answer: "Basın talepleri için basin@kasder.org.tr adresimize ulaşabilirsiniz. Basın bültenlerimiz ve kurumsal görseller talep üzerine paylaşılmaktadır."
  },
  {
    question: "Derneğin çalışma alanları nelerdir?",
    answer: "Derneğimiz kentsel planlama, sürdürülebilir şehircilik, kentsel dönüşüm, akıllı şehir teknolojileri ve çevre politikaları alanlarında çalışmalar yürütmektedir."
  },
  {
    question: "Yayınlarınıza nasıl erişebilirim?",
    answer: "Derneğimizin raporları, araştırmaları ve yayınları web sitemizin Yayınlar bölümünden ücretsiz olarak indirilebilir. Bazı kapsamlı raporlar için üyelik gerekebilir."
  }
];

const ContactFAQ = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Sıkça Sorulan Sorular</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Yardım mı Gerekiyor?
            </h2>
            <p className="text-muted-foreground text-lg">
              En sık sorulan soruların cevaplarını burada bulabilirsiniz.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
