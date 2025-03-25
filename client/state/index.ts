import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
    location: string;
    beds: string;
    baths: string;
    propertyType: string;
    amenities: string[];
    availableFrom: string;
    priceRange: [number, number] | [null, null];
    squareFeet: [number, number] | [null, null];
    coordinates: [number, number];
}

interface InitialStateTypes {
    filters: FiltersState;
    isFiltersFullOpen: boolean;
    viewMode: "grid" | "list";
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

export const initialState: InitialStateTypes = {
    filters: {
        location: "Los Angeles",
        beds: "any",
        baths: "any",
        propertyType: "any",
        amenities: [],
        availableFrom: "any",
        priceRange: [null, null],
        squareFeet: [null, null],
        coordinates: [-118.25, 34.05],
    },
    isFiltersFullOpen: false,
    viewMode: "grid",
    isSidebarCollapsed: false,
    isDarkMode: false,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
        setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        toggleFiltersFullOpen: (state) => {
            state.isFiltersFullOpen = !state.isFiltersFullOpen;
        },
        setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
            state.viewMode = action.payload;
        },
    },
});

export const {
    setIsSidebarCollapsed,
    setIsDarkMode,
    setFilters,
    toggleFiltersFullOpen,
    setViewMode
} = globalSlice.actions;

export default globalSlice.reducer;
