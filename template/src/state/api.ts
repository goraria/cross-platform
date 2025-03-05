import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'main',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_PUBLIC_API_BASE_URL }),
    tagTypes: ['KPIs'],
    endpoints: (builder) => ({
        getKpis: builder.query<void, void>({
            query: () => 'kpi/kpis',
            providesTags: ['KPIs'],
        }),
    }),
})

export const { useGetKpisQuery } = api;