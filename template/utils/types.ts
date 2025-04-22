import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
}

export interface Month {
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
}

export interface Day {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
}

export interface GetKpisResponse {
    id: string;
    _id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
    createdAt: string;
    updatedAt: string;
}

export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface Subscription {
    _id: string;
    subscriber: string;
    user: string;
    createdAt: string;
}

export interface Product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}

export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}

export interface ExpenseSummary {
    expenseSummarId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
}

export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface UserNew {
    userId: string;
    name: string;
    email: string;
}

export interface PaymentMethod {
    methodId: string;
    type: string;
    lastFour: string;
    expiry: string;
}

export interface UserSettings {
    theme?: "light" | "dark";
    emailAlerts?: boolean;
    smsAlerts?: boolean;
    courseNotifications?: boolean;
    notificationFrequency?: "immediate" | "daily" | "weekly";
}

export interface User {
    userId: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email: string;
    publicMetadata: {
        userType: "teacher" | "student";
    };
    privateMetadata: {
        settings?: UserSettings;
        paymentMethods?: Array<PaymentMethod>;
        defaultPaymentMethodId?: string;
        stripeCustomerId?: string;
    };
    unsafeMetadata: {
        bio?: string;
        urls?: string[];
    };
}

export interface Course {
    courseId: string;
    teacherId: string;
    teacherName: string;
    title: string;
    description?: string;
    category: string;
    image?: string;
    price?: number; // Stored in cents (e.g., 4999 for $49.99)
    level: "Beginner" | "Intermediate" | "Advanced";
    status: "Draft" | "Published";
    sections: Section[];
    enrollments?: Array<{
        userId: string;
    }>;
}

export interface Transaction {
    userId: string;
    transactionId: string;
    dateTime: string;
    courseId: string;
    paymentProvider: "stripe";
    paymentMethodId?: string;
    amount: number; // Stored in cents
    savePaymentMethod?: boolean;
}

export interface DateRange {
    from: string | undefined;
    to: string | undefined;
}

export interface UserCourseProgress {
    userId: string;
    courseId: string;
    enrollmentDate: string;
    overallProgress: number;
    sections: SectionProgress[];
    lastAccessedTimestamp: string;
}

export interface CourseCardProps {
    course: Course;
    onGoToCourse: (course: Course) => void;
}

export interface TeacherCourseCardProps {
    course: Course;
    onEdit: (course: Course) => void;
    onDelete: (course: Course) => void;
    isOwner: boolean;
}

export interface Comment {
    commentId: string;
    userId: string;
    text: string;
    timestamp: string;
}

export interface Chapter {
    chapterId: string;
    title: string;
    content: string;
    video?: string | File;
    freePreview?: boolean;
    type: "Text" | "Quiz" | "Video";
}

export interface ChapterProgress {
    chapterId: string;
    completed: boolean;
}

export interface SectionProgress {
    sectionId: string;
    chapters: ChapterProgress[];
}

export interface Section {
    sectionId: string;
    sectionTitle: string;
    sectionDescription?: string;
    chapters: Chapter[];
}

export interface WizardStepperProps {
    currentStep: number;
}

export interface AccordionSectionsProps {
    sections: Section[];
}

export interface SearchCourseCardProps {
    course: Course;
    isSelected?: boolean;
    onClick?: () => void;
}

export interface CoursePreviewProps {
    course: Course;
}

export interface CustomFixedModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export interface HeaderProps {
    title: string;
    subtitle: string;
    rightElement?: ReactNode;
}

export interface SharedNotificationSettingsProps {
    title?: string;
    subtitle?: string;
}

export interface SelectedCourseProps {
    course: Course;
    handleEnrollNow: (courseId: string) => void;
}

export interface ToolbarProps {
    onSearch: (search: string) => void;
    onCategoryChange: (category: string) => void;
}

export interface ChapterModalProps {
    isOpen: boolean;
    onClose: () => void;
    sectionIndex: number | null;
    chapterIndex: number | null;
    sections: Section[];
    setSections: Dispatch<SetStateAction<Section[]>>;
    courseId: string;
}

export interface SectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    sectionIndex: number | null;
    sections: Section[];
    setSections: Dispatch<SetStateAction<Section[]>>;
}

export interface DroppableComponentProps {
    sections: Section[];
    setSections: (sections: Section[]) => void;
    handleEditSection: (index: number) => void;
    handleDeleteSection: (index: number) => void;
    handleAddChapter: (sectionIndex: number) => void;
    handleEditChapter: (sectionIndex: number, chapterIndex: number) => void;
    handleDeleteChapter: (sectionIndex: number, chapterIndex: number) => void;
}

export interface CourseFormData {
    courseTitle: string;
    courseDescription: string;
    courseCategory: string;
    coursePrice: string;
    courseStatus: boolean;
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

export enum PropertyTypeEnum {
    Rooms = "Rooms",
    Tinyhouse = "Tinyhouse",
    Apartment = "Apartment",
    Villa = "Villa",
    Townhouse = "Townhouse",
    Cottage = "Cottage",
}

export interface SidebarLinkProps {
    href: string;
    icon: never;
    label: string;
}

export interface PropertyOverviewProps {
    propertyId: number;
}

export interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId: number;
}

export interface ContactWidgetProps {
    onOpenModal: () => void;
}

export interface ImagePreviewsProps {
    images: string[];
}

export interface PropertyDetailsProps {
    propertyId: number;
}

export interface PropertyOverviewProps {
    propertyId: number;
}

export interface PropertyLocationProps {
    propertyId: number;
}

export interface ApplicationCardProps {
    application: never;
    userType: "manager" | "renter";
    children: ReactNode;
}

export interface CardProps {
    property: never;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
}

export interface CardCompactProps {
    property: never;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
}

export interface HeaderProps {
    title: string;
    subtitle: string;
}

export interface NavbarProps {
    isDashboard: boolean;
}

export interface AppSidebarProps {
    userType: "manager" | "tenant";
}