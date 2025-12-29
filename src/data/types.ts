export interface SocialNavItem {
  icon: React.ComponentType<any>;
  label: string;
  path: string;
  need_stuff_condition?: boolean;
  need_business_condition?: boolean;
}