import { EventDetail, EventType } from "@/types/eventsType";

export const mockEventDetails: Record<string, EventDetail> = {
  "1": {
    id: "1",
    title: "Sürdürülebilir Kentleşme Konferansı 2025",
    description: "Türkiye'nin önde gelen şehir plancıları ve çevre uzmanlarının katılımıyla düzenlenen yıllık konferans.",
    fullDescription: `Sürdürülebilir Kentleşme Konferansı 2025, Türkiye'nin en kapsamlı kentsel gelişim etkinliğidir. Bu yıl "Geleceğin Şehirleri: Yeşil, Akıllı ve Kapsayıcı" temasıyla düzenlenen konferans, ulusal ve uluslararası uzmanları bir araya getirmektedir.

Konferansta ele alınacak konular arasında iklim değişikliğine uyum, akıllı şehir teknolojileri, sosyal kapsayıcılık, sürdürülebilir ulaşım ve yeşil altyapı yer almaktadır. Katılımcılar, interaktif çalıştaylar, panel tartışmaları ve networking oturumlarına katılma fırsatı bulacaktır.`,
    type: "Konferans",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: "09:00 - 18:00",
    location: "İstanbul Kongre Merkezi",
    address: "Darülbedai Caddesi No:3, 34367 Harbiye/Şişli/İstanbul",
    capacity: 500,
    registered: 423,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    speakers: [
      { name: "Prof. Dr. Ahmet Yılmaz", title: "Şehir Plancısı", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
      { name: "Dr. Elif Kaya", title: "Çevre Mühendisi", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
      { name: "Mehmet Demir", title: "Akıllı Şehir Uzmanı", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" }
    ],
    schedule: [
      { time: "09:00", title: "Kayıt ve Karşılama Kahvaltısı", description: "Katılımcı kayıtları ve networking" },
      { time: "10:00", title: "Açılış Konuşması", description: "Dernek Başkanı tarafından açılış" },
      { time: "11:00", title: "Panel: Geleceğin Şehirleri", description: "Uzman panelimizle interaktif tartışma" },
      { time: "13:00", title: "Öğle Yemeği", description: "Networking lunch" },
      { time: "14:30", title: "Çalıştaylar", description: "Paralel çalıştay oturumları" },
      { time: "17:00", title: "Kapanış ve Networking", description: "Sonuç bildirisi ve kokteyl" }
    ],
    organizer: { name: "Etkinlik Koordinatörlüğü", phone: "+90 212 555 0123", email: "etkinlik@tkb.org.tr" },
    requirements: ["Laptop", "Kimlik belgesi", "Kayıt onay e-postası"],
    featured: true
  }
};




// 
// Mock events data with various dates
export const generateMockEvents = (): EventType[] => {
  const today = new Date();
  
  return [
    {
      id: "1",
      title: "Sürdürülebilir Kentleşme Konferansı 2025",
      description: "Türkiye'nin önde gelen şehir plancıları ve çevre uzmanlarının katılımıyla düzenlenen yıllık konferans.",
      type: "Konferans",
      date: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "09:00 - 18:00",
      location: "İstanbul Kongre Merkezi, İstanbul",
      capacity: 500,
      registered: 423,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      featured: true
    },
    {
      id: "2",
      title: "Akıllı Şehir Teknolojileri Çalıştayı",
      description: "IoT, yapay zeka ve büyük veri analitiğinin kentsel yönetimdeki uygulamaları.",
      type: "Çalıştay",
      date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "10:00 - 16:00",
      location: "Teknopark İstanbul, Pendik",
      capacity: 80,
      registered: 78,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
    },
    {
      id: "3",
      title: "Kentsel Dönüşüm Paneli",
      description: "Deprem riski altındaki bölgelerde kentsel dönüşüm stratejileri ve uygulamaları.",
      type: "Panel",
      date: today.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      time: "14:00 - 17:00",
      location: "Ankara Sheraton Hotel, Ankara",
      capacity: 200,
      registered: 156,
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800"
    },
    {
      id: "4",
      title: "Yeşil Altyapı Semineri",
      description: "Kentsel yeşil alanların planlanması ve sürdürülebilir peyzaj tasarımı.",
      type: "Seminer",
      date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "13:00 - 17:00",
      location: "İTÜ Taşkışla, İstanbul",
      capacity: 120,
      registered: 120,
      image: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=800"
    },
    {
      id: "5",
      title: "Ulaşım Planlama Eğitimi",
      description: "Entegre ulaşım sistemleri ve sürdürülebilir mobilite çözümleri üzerine kapsamlı eğitim.",
      type: "Eğitim",
      date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(today.getTime() + 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "09:00 - 17:00",
      location: "ODTÜ Kültür Merkezi, Ankara",
      capacity: 50,
      registered: 32,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
    },
    {
      id: "6",
      title: "Tarihi Kent Dokularının Korunması",
      description: "UNESCO Dünya Mirası listesindeki Türk kentlerinin koruma stratejileri.",
      type: "Konferans",
      date: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "10:00 - 18:00",
      location: "Kapadokya Kültür Merkezi, Nevşehir",
      capacity: 300,
      registered: 287,
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800"
    },
    {
      id: "7",
      title: "Dijital Belediyecilik Zirvesi",
      description: "E-devlet uygulamaları ve vatandaş odaklı dijital hizmetler.",
      type: "Konferans",
      date: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "09:00 - 17:00",
      location: "Hilton İstanbul Bomonti",
      capacity: 400,
      registered: 156,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
      featured: true
    },
    {
      id: "8",
      title: "Afet Dirençli Kentler Çalıştayı",
      description: "Deprem, sel ve iklim değişikliğine karşı kentsel dayanıklılık.",
      type: "Çalıştay",
      date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "09:00 - 15:00",
      location: "İzmir Fuar Alanı, İzmir",
      capacity: 100,
      registered: 100,
      image: "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=800"
    },
    {
      id: "9",
      title: "Kentsel Veri Analitiği Kursu",
      description: "GIS, uzaktan algılama ve kentsel veri görselleştirme teknikleri.",
      type: "Eğitim",
      date: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(today.getTime() + 65 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "10:00 - 16:00",
      location: "Online",
      capacity: 200,
      registered: 45,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    },
    {
      id: "10",
      title: "Kapsayıcı Kentler Paneli",
      description: "Engelli ve yaşlı dostu şehir tasarımı ve erişilebilirlik standartları.",
      type: "Panel",
      date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "14:00 - 17:00",
      location: "Antalya Kongre Merkezi",
      capacity: 150,
      registered: 132,
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800"
    }
  ];
};

