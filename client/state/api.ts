import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
// import { User, Course, Transaction, UserCourseProgress, SectionProgress } from "@clerk/nextjs/server";
// import { Clerk } from "@clerk/clerk-js";
import { toast } from "sonner";
import { User } from "./types";
import { RegisterInput } from "@/constants/schemas";
const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: async (headers) => {
      // const token = await window.Clerk?.session?.getToken();
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  });

  try {
    const result = await baseQuery(args, api, extraOptions);

    // 1) Nếu fetchBaseQuery trả lỗi
    if (result.error) {
      const msg =
        (result.error.data as any)?.message ||
        result.error.status?.toString() ||
        'Unknown error';
      toast.error(`Error: ${msg}`);

      return {
        error: {
          status: result.error.status ?? 'FETCH_ERROR',
          error: msg,
        },
      };
    }

    // 2) Nếu fetchBaseQuery trả data
    if (result.data !== undefined) {
      // unwrap payload { data, message? }
      const raw = result.data as { data: any; message?: string };

      // nếu đây là mutation và có thông báo thành công
      const method =
        typeof (args as FetchArgs).method === 'string'
          ? (args as FetchArgs).method!.toUpperCase()
          : 'GET';
      if (method !== 'GET' && raw.message) {
        toast.success(raw.message);
      }

      return { data: raw.data };
    }

    // 3) Trường hợp không error, không data (ví dụ 204 No Content)
    return { data: null };
  } catch (e: any) {
    // 4) Nếu throw exception
    const msg = e?.message ?? 'Unknown exception';
    toast.error(`Error: ${msg}`);
    return {
      error: {
        status: 'FETCH_ERROR',
        error: msg,
      },
    };
  }

  // try {
  //   const result: any = await baseQuery(args, api, extraOptions);
  //
  //   if (result.error) {
  //     const errorData = result.error.data;
  //     const errorMessage =
  //       errorData?.message ||
  //       result.error.status.toString() ||
  //       "An error occurred";
  //     toast.error(`Error: ${errorMessage}`);
  //   }
  //
  //   const isMutationRequest =
  //     (args as FetchArgs).method && (args as FetchArgs).method !== "GET";
  //
  //   if (isMutationRequest) {
  //     const successMessage = result.data?.message;
  //     if (successMessage) toast.success(successMessage);
  //   }
  //
  //   if (result.data) {
  //     result.data = result.data.data;
  //   } else if (
  //     result.error?.status === 204 ||
  //     result.meta?.response?.status === 24
  //   ) {
  //     return { data: null };
  //   }
  //
  //   return result;
  // } catch (error: unknown) {
  //   const errorMessage =
  //     error instanceof Error ? error.message : "Unknown error";
  //
  //   return { error: { status: "FETCH_ERROR", error: errorMessage } };
  // }
};

export const api = createApi({
  // baseQuery: customBaseQuery,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: async (headers) => {
      // const session = await fetchAuthSession();
      // const { idToken } = session.tokens ?? {};
      // if (idToken) {
      //   headers.set("Authorization", `Bearer ${idToken}`);
      // }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Courses", "Users", "UserCourseProgress"],
  endpoints: (builder) => ({
    register: builder.mutation<User, RegisterInput>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),

    getUsers: builder.query<User[], { category?: string }>({
      query: () => "/manage/users",
      providesTags: ["Users"],
    }),

    // getUsers: build.query<User[], { category?: string }>({
    //   query: () => ({
    //     url: "/manage/users",
    //     method: "GET"
    //   }),
    //   providesTags: ["Users"],
    // }),

    // getUsersNew: build.query<User[], { category?: string }>({
    //   query: ({ category }) => ({
    //     url: "/manage/users",
    //     params: { category },
    //     method: "GET"
    //   }),
    //   providesTags: ["Users"],
    // }),

    // getCourse: build.query<Course, string>({
    //   query: (id) => `courses/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Courses", id }],
    // }),
    //
    // createCourse: build.mutation<
    //   Course,
    //   { teacherId: string; teacherName: string }
    // >({
    //   query: (body) => ({
    //     url: `courses`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Courses"],
    // }),
    //
    // updateCourse: build.mutation<
    //   Course,
    //   { courseId: string; formData: FormData }
    // >({
    //   query: ({ courseId, formData }) => ({
    //     url: `courses/${courseId}`,
    //     method: "PUT",
    //     body: formData,
    //   }),
    //   invalidatesTags: (result, error, { courseId }) => [
    //     { type: "Courses", id: courseId },
    //   ],
    // }),
    //
    // deleteCourse: build.mutation<{ message: string }, string>({
    //   query: (courseId) => ({
    //     url: `courses/${courseId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Courses"],
    // }),
    //
    // getUploadVideoUrl: build.mutation<
    //   { uploadUrl: string; videoUrl: string },
    //   {
    //     courseId: string;
    //     chapterId: string;
    //     sectionId: string;
    //     fileName: string;
    //     fileType: string;
    //   }
    // >({
    //   query: ({ courseId, sectionId, chapterId, fileName, fileType }) => ({
    //     url: `courses/${courseId}/sections/${sectionId}/chapters/${chapterId}/get-upload-url`,
    //     method: "POST",
    //     body: { fileName, fileType },
    //   }),
    // }),

    /*
    ===============
    TRANSACTIONS
    ===============
    */
    // getTransactions: build.query<Transaction[], string>({
    //   query: (userId) => `transactions?userId=${userId}`,
    // }),
    // createStripePaymentIntent: build.mutation<
    //   { clientSecret: string },
    //   { amount: number }
    // >({
    //   query: ({ amount }) => ({
    //     url: `/transactions/stripe/payment-intent`,
    //     method: "POST",
    //     body: { amount },
    //   }),
    // }),
    // createTransaction: build.mutation<Transaction, Partial<Transaction>>({
    //   query: (transaction) => ({
    //     url: "transactions",
    //     method: "POST",
    //     body: transaction,
    //   }),
    // }),

    /*
    ===============
    USER COURSE PROGRESS
    ===============
    */
    // getUserEnrolledCourses: build.query<Course[], string>({
    //   query: (userId) => `users/course-progress/${userId}/enrolled-courses`,
    //   providesTags: ["Courses", "UserCourseProgress"],
    // }),
    //
    // getUserCourseProgress: build.query<
    //   UserCourseProgress,
    //   { userId: string; courseId: string }
    // >({
    //   query: ({ userId, courseId }) =>
    //     `users/course-progress/${userId}/courses/${courseId}`,
    //   providesTags: ["UserCourseProgress"],
    // }),
    //
    // updateUserCourseProgress: build.mutation<
    //   UserCourseProgress,
    //   {
    //     userId: string;
    //     courseId: string;
    //     progressData: {
    //       sections: SectionProgress[];
    //     };
    //   }
    // >({
    //   query: ({ userId, courseId, progressData }) => ({
    //     url: `users/course-progress/${userId}/courses/${courseId}`,
    //     method: "PUT",
    //     body: progressData,
    //   }),
    //   invalidatesTags: ["UserCourseProgress"],
    //   async onQueryStarted(
    //     { userId, courseId, progressData },
    //     { dispatch, queryFulfilled }
    //   ) {
    //     const patchResult = dispatch(
    //       api.util.updateQueryData(
    //         "getUserCourseProgress",
    //         { userId, courseId },
    //         (draft) => {
    //           Object.assign(draft, {
    //             ...draft,
    //             sections: progressData.sections,
    //           });
    //         }
    //       )
    //     );
    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       patchResult.undo();
    //     }
    //   },
    // }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useGetMeQuery,
  // useUpdateUserMutation,
  // useCreateCourseMutation,
  // useUpdateCourseMutation,
  // useDeleteCourseMutation,
  // useGetCoursesQuery,
  // useGetCourseQuery,
  // useGetUploadVideoUrlMutation,
  // useGetTransactionsQuery,
  // useCreateTransactionMutation,
  // useCreateStripePaymentIntentMutation,
  // useGetUserEnrolledCoursesQuery,
  // useGetUserCourseProgressQuery,
  // useUpdateUserCourseProgressMutation,
} = api;



// export interface Product {
//     productId: string;
//     name: string;
//     price: number;
//     rating?: number;
//     stockQuantity: number;
// }
//
// export interface NewProduct {
//     name: string;
//     price: number;
//     rating?: number;
//     stockQuantity: number;
// }
//
// export interface SalesSummary {
//     salesSummaryId: string;
//     totalValue: number;
//     changePercentage?: number;
//     date: string;
// }
//
// export interface PurchaseSummary {
//     purchaseSummaryId: string;
//     totalPurchased: number;
//     changePercentage?: number;
//     date: string;
// }
//
// export interface ExpenseSummary {
//     expenseSummaryId: string;
//     totalExpenses: number;
//     date: string;
// }
//
// export interface ExpenseByCategorySummary {
//     expenseByCategorySummaryId: string;
//     category: string;
//     amount: string;
//     date: string;
// }
//
// export interface DashboardMetrics {
//     popularProducts: Product[];
//     salesSummary: SalesSummary[];
//     purchaseSummary: PurchaseSummary[];
//     expenseSummary: ExpenseSummary[];
//     expenseByCategorySummary: ExpenseByCategorySummary[];
// }
//
// export interface User {
//     userId: string;
//     name: string;
//     email: string;
// }
//
// export const api = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
//     reducerPath: "api",
//     tagTypes: ["Users", "DashboardMetrics", "Products", "Expenses"],
//     endpoints: (build) => ({
//         getUsers: build.query<User[], void>({
//             query: (id) => `/users/${id}`,
//             providesTags: ["Users"],
//         }),
//         getDashboardMetrics: build.query<DashboardMetrics, void>({
//             query: () => "/dashboard",
//             providesTags: ["DashboardMetrics"],
//         }),
//         getProducts: build.query<Product[], string | void>({
//             query: (search) => ({
//                 url: "/products",
//                 params: search ? { search } : {},
//             }),
//             providesTags: ["Products"],
//         }),
//         createProduct: build.mutation<Product, NewProduct>({
//             query: (newProduct) => ({
//                 url: "/products",
//                 method: "POST",
//                 body: newProduct,
//             }),
//             invalidatesTags: ["Products"],
//         }),
//         getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
//             query: () => "/expenses",
//             providesTags: ["Expenses"],
//         }),
//     }),
// });
//
// export const {
//     useGetDashboardMetricsQuery,
//     useGetProductsQuery,
//     useCreateProductMutation,
//     useGetUsersQuery,
//     useGetExpensesByCategoryQuery,
// } = api;
