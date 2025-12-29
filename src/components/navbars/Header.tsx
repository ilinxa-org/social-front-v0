"use client";
import { useState, useEffect } from "react";

import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { tr } from "date-fns/locale";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/about" },
  { label: "Projeler", href: "/projects" },
  { label: "Etkinlikler", href: "/events" },
  { label: "Haberler", href: "/news" },
  { label: "İletişim", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasDashboardAccess = false; // Replace with your authentication logic

  // //////////////////////////////////////////////////
  // //////////////////////////////////////////////////
  const isAuthenticated = true; // Replace with your authentication logic
  // //////////////////////////////////////////////////
  // //////////////////////////////////////////////////
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky bg-background   flex items-center -pt-10 top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-5ss"
          : "bg-transparent py-5ss",
        isAuthenticated ? "min-h-17" : "min-h-20"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 ">
        <nav className={cn("flex items-center py-4 w-full justify-between")} >
          {/* Logo */}
          {/* {!isAuthenticated &&  ( */}
            
          
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-xl transition-all duration-300",
              isScrolled 
                ? "bg-primary text-primary-foreground" 
                : "bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20"
            )}>
              K
            </div>
            <div className={cn(
              "hidden sm:flex flex-col transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-primary-foreground"
            )}>
              <span className="font-heading font-bold text-xl tracking-tight leading-none">KASDER</span>
              <span className={cn(
                "text-xs tracking-wider transition-colors duration-300",
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/70"
              )}>
                Kamu Arazi ve Şehircilik Derneği
              </span>
            </div>
          </Link>
          {/* )} */}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 link-underline",
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-muted"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          {!isAuthenticated ? (
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              asChild
              className={cn(
                "font-medium transition-all duration-300",
                !isScrolled && "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              <Link href="/login">Giriş Yap</Link>
            </Button>
            <Button
              variant="default"
              asChild
              className={cn(
                "font-medium transition-all duration-300",
                !isScrolled && "bg-accent text-accent-foreground hover:bg-accent/90 "
              )}
            >
              <Link href="/register">Kayıt Ol</Link>
            </Button>
          </div>
          ) : null}
          
          { hasDashboardAccess && (
              <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="default"
              asChild
              className={cn(
                "font-medium transition-all duration-300",
                !isScrolled && "bg-accent text-accent-foreground hover:bg-accent/90 ")}
                >
                <Link href="/admin"> Dashboard</Link>
                </Button>                   
            </div>
          
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors ",
              isScrolled
                ? " text-foreground hover:bg-muted"
                : "  text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {/* <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-content  mt-4 pb-8" : "max-h-0"
          )}
        >
          <div className="bg-card rounded-2xl shadow-lg border p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
            <div className="pt-3 border-t mt-3 space-y-2">
                
                <Button className="w-full" variant="outline" asChild>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Giriş Yap</Link>
              </Button>
              <Button className="w-full" variant="default" asChild>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Kayıt Ol</Link>
              </Button>
            </div>
              ) : (
                <div>
              <Button className="w-full" variant="default" asChild>
                <Link href="/signout" onClick={() => setIsMobileMenuOpen(false)}>Cıkıs Yap</Link>
              </Button>
                </div>
              )}
          </div>
        </div> */}

<div
  className={cn(
    "lg:hidden overflow-hidden transition-all duration-300",
    "absolute left-0 right-0 mt-4 pb-8", // Add these classes
    isMobileMenuOpen ? "max-h-content opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
  )}
  style={{ top: '100%' }} // This positions it right below the header
>
  <div className="container mx-auto px-4 lg:px-8">
    <div className="bg-card rounded-2xl shadow-lg border p-4 space-y-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className="block px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
        >
          {link.label}
        </Link>
      ))}
      {!isAuthenticated ? ( // Fixed your logic here - was inverted
        <div className="pt-3 border-t mt-3 space-y-2">
          <Button className="w-full" variant="outline" asChild>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Giriş Yap</Link>
          </Button>
          <Button className="w-full" variant="default" asChild>
            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Kayıt Ol</Link>
          </Button>
        </div>
      ) : (
        <div className="pt-3 border-t mt-3">
          <Button className="w-full" variant="default" asChild>
            <Link href="/signout" onClick={() => setIsMobileMenuOpen(false)}>Çıkış Yap</Link>
          </Button>
        </div>
      )}
    </div>
  </div>
</div>

      </div>
    </header>
  );
};

export default Header;
