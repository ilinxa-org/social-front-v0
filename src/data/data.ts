import { Home, Search, Bell, User, Briefcase, Settings, PlusCircle } from "lucide-react";
export const SocialNavItems = [
  { icon: Home, label: "Home", path: "/home", need_stuff_condition:false},
  { icon: Search, label: "Search", path: "/explore", need_stuff_condition:false },
  { icon: Bell, label: "Notifications", path: "/notifications", need_stuff_condition:false  },
  { icon: User, label: "Profile", path: "/user", need_stuff_condition:false },
  { icon: Briefcase, label: "Business", path: "/business", need_business_condition:false },

];
