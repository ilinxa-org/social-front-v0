
import Header from "@/components/navbars/Header";
import Footer from "@/components/navbars/Footer";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <div className="">

      {/* <div className="lg:pl-20 xl:pl-64"> */}
        {/* <TopBarSocial/> */}
        {/* <Navbar /> */}
        <Header />
        <main className="pb-20 -mt-20 lg:pb-0 relative">
          {children}
          
        <Footer/>
          </main>
      </div>


  );
}
