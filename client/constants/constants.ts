import {
  Wifi,
  Waves,
  Dumbbell,
  Car,
  PawPrint,
  Tv,
  Thermometer,
  Cigarette,
  Cable,
  Maximize,
  Bath,
  Phone,
  Sprout,
  Hammer,
  Bus,
  Mountain,
  VolumeX,
  Home,
  Warehouse,
  Building,
  Castle,
  Trees,
  LucideIcon,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  Layers2,
  SquareTerminal,
  SquareLibrary,
  Bot,
  Frame,
  Map,
  PieChart,
  BookOpen,
  Settings2,
  ArchiveX,
  Inbox,
  File,
  Send,
  Trash2,
  Banknote,
  CreditCard,
  CircleDollarSign,
  CircleCheck,
  Package,
  ShieldCheck,
  Wallet,
  Expand,
  Info,
} from "lucide-react"; 

export const appGlobal = {
  name: "Schweitzenburg",
  description: "Design by Japtor Gorthenburg"
}

export const demoSidebar = {
  user: {
    name: "Japtor",
    email: "japtor@gorth.org",
    avatar: "/avatars/waddles.jpeg",
  },
  item: [
    {
      title: "Inbox",
      url: "/message",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "/message/drafts",
      icon: File,
      isActive: false,
    },
    {
      title: "Sent",
      url: "/message/sent",
      icon: Send,
      isActive: false,
    },
    {
      title: "Junk",
      url: "/message/junk",
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: "Trash",
      url: "/message/trash",
      icon: Trash2,
      isActive: false,
    },
  ],
}

export const managerSidebar = {
  user: {
    name: "japtor",
    email: "japtor@gorth.org",
    avatar: "/avatars/waddles.jpeg",
  },
  route: "/manager",
  teams: [
    {
      name: "Gorth Inc.",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Goraria Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Waddles Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Demo",
      url: "#",
      icon: Layers2,
      // isActive: true,
      items: [
        {
          title: "Manage",
          url: "/manager",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      // isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Manager",
      url: "#",
      icon: SquareLibrary,
      // isActive: true,
      items: [
        {
          title: "User",
          url: "/manager/user-management",
        },
        {
          title: "Product",
          url: "/manager/product-management",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export const footerLinks = {
  paymentIcons: [
    { id: 1, name: "Banking", icon: CircleDollarSign, link: "#" },
    { id: 2, name: "Cash", icon: Banknote, link: "#" },
    { id: 3, name: "ATM Card", icon: CreditCard, link: "#" },
    { id: 4, name: "PayPal", box: "paypal", link: "#" },
    // { id: 5, name: "VISA Card", box: "bxl-visa", link: "#" },
    // { id: 6, name: "Mastercard", box: "bx-credit-card", link: "#" },
  ],

  usefulInfo: [
    { id: 1, name: "Warranty Policy", icon: CircleCheck, link: "#" },
    { id: 2, name: "Return Policy", box: "bx-rotate-left", link: "#" },
    { id: 3, name: "Shipping Policy", icon: Package, link: "#" },
    { id: 4, name: "Privacy Policy", icon: ShieldCheck, link: "#" },
    { id: 5, name: "Payment Policy", icon: Wallet, link: "#" },
    { id: 6, name: "Inspection Policy", icon: Expand, link: "#" },
    { id: 7, name: "Online Shopping Guide", box: "bx-planet", link: "#" },
    { id: 8, name: "About Us", icon: Info, link: "/about" }
  ],

  socialIcons: [
    { id: 1, name: "Github", box: "github", link: "https://github.com/goraria/e-commerce" },
    { id: 2, name: "Facebook", box: "facebook-circle", link: "#" },
    { id: 3, name: "Youtube", box: "youtube", link: "#" },
    { id: 4, name: "Tiktok", box: "tiktok", link: "#" },
    { id: 5, name: "Twitter", box: "twitter", link: "#" },
    // { id: 6, name: "Threads" box: "thread", link: "#" },
    { id: 7, name: "Instagram", box: "instagram", link: "#" },
    // { id: 8, name: "Pinterest", box: "pinterest", link: "#" },
    // { id: 9, name: "Whatsapp", box: "whatsapp", link: "#" },
    { id: 10, name: "Reddit", box: "reddit", link: "#" },
    // { id: 11, name: "Steam", box: "steam", link: "#" },
    // { id: 12, name: "Snapchat", box: "snapchat", link: "#" },
    { id: 13, name: "Telegram", box: "telegram", link: "#" }
  ],
}

export enum AmenityEnum {
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Dishwasher = "Dishwasher",
  HighSpeedInternet = "HighSpeedInternet",
  HardwoodFloors = "HardwoodFloors",
  WalkInClosets = "WalkInClosets",
  Microwave = "Microwave",
  Refrigerator = "Refrigerator",
  Pool = "Pool",
  Gym = "Gym",
  Parking = "Parking",
  PetsAllowed = "PetsAllowed",
  WiFi = "WiFi",
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Dishwasher: Waves,
  HighSpeedInternet: Wifi,
  HardwoodFloors: Home,
  WalkInClosets: Maximize,
  Microwave: Tv,
  Refrigerator: Thermometer,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  PetsAllowed: PawPrint,
  WiFi: Wifi,
};

export enum HighlightEnum {
  HighSpeedInternetAccess = "HighSpeedInternetAccess",
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Heating = "Heating",
  SmokeFree = "SmokeFree",
  CableReady = "CableReady",
  SatelliteTV = "SatelliteTV",
  DoubleVanities = "DoubleVanities",
  TubShower = "TubShower",
  Intercom = "Intercom",
  SprinklerSystem = "SprinklerSystem",
  RecentlyRenovated = "RecentlyRenovated",
  CloseToTransit = "CloseToTransit",
  GreatView = "GreatView",
  QuietNeighborhood = "QuietNeighborhood",
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
  HighSpeedInternetAccess: Wifi,
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Heating: Thermometer,
  SmokeFree: Cigarette,
  CableReady: Cable,
  SatelliteTV: Tv,
  DoubleVanities: Maximize,
  TubShower: Bath,
  Intercom: Phone,
  SprinklerSystem: Sprout,
  RecentlyRenovated: Hammer,
  CloseToTransit: Bus,
  GreatView: Mountain,
  QuietNeighborhood: VolumeX,
};

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Home,
  Cottage: Trees,
};

// Add this constant at the end of the file
export const NAVBAR_HEIGHT = 52; // in pixels

// Test users for development
export const testUsers = {
  tenant: {
    username: "Carol White",
    userId: "us-east-2:76543210-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "carol.white@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  tenantRole: "tenant",
  manager: {
    username: "John Smith",
    userId: "us-east-2:12345678-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "john.smith@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  managerRole: "manager",
};
