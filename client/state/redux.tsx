import { ReactNode, useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
    Provider,
} from "react-redux";
import globalReducer from "@/state"; // Đảm bảo đường dẫn này đúng
import { api } from "@/state/api"; // Đảm bảo đường dẫn này đúng
import { setupListeners } from "@reduxjs/toolkit/query";

// Kết hợp các reducers
const rootReducer = combineReducers({
    global: globalReducer,
    [api.reducerPath]: api.reducer,
});

/* REDUX STORE */
export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                // Cấu hình serializableCheck để bỏ qua các action/path nhất định
                // Thường hữu ích khi làm việc với File, FormData hoặc các dữ liệu lớn, không tuần tự hóa được trong action/state
                serializableCheck: {
                    ignoredActions: [
                        // Bỏ qua các action của RTK Query mutation lifecycle nếu cần
                        "api/executeMutation/pending",
                        "api/executeMutation/fulfilled",
                        "api/executeMutation/rejected",
                        // Thêm các action type khác nếu cần thiết
                    ],
                    ignoredActionPaths: [
                        // Các đường dẫn trong action payload/meta cần bỏ qua kiểm tra
                        "meta.arg.originalArgs.file",
                        "meta.arg.originalArgs.formData",
                        "payload.chapter.video",
                        "meta.baseQueryMeta.request",
                        "meta.baseQueryMeta.response",
                        // Thêm các action path khác nếu cần
                    ],
                    ignoredPaths: [
                        // Các đường dẫn trong state cần bỏ qua kiểm tra
                        "global.courseEditor.sections", // Ví dụ: nếu sections chứa dữ liệu phức tạp
                        // "entities.videos.data", // Ví dụ khác
                        "api.mutations", // Thường chứa request/response objects
                        "api.queries",   // Thường chứa request/response objects
                        // Thêm các state path khác nếu cần
                    ],
                },
            }).concat(api.middleware), // Thêm middleware của RTK Query
    });
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Typed hooks - nên sử dụng các hook này trong components của bạn
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER COMPONENT */
export default function StoreProvider({ children }: { children: ReactNode }) {
    // Sử dụng useRef để đảm bảo store chỉ được tạo một lần
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        // Tạo store instance nếu chưa có
        storeRef.current = makeStore();
        // Thiết lập listeners cho RTK Query (cho caching, invalidation, polling, ...)
        setupListeners(storeRef.current.dispatch);
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}

// import { ReactNode, useRef } from "react";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//     TypedUseSelectorHook,
//     useDispatch,
//     useSelector,
//     Provider,
// } from "react-redux";
// import globalReducer from "@/state";
// import { api } from "@/state/api";
// import { setupListeners } from "@reduxjs/toolkit/query";
//
//
// /* REDUX PERSISTENCE */
// // const createNoopStorage = () => {
// //     return {
// //         getItem(_key: any) {
// //             return Promise.resolve(null);
// //         },
// //         setItem(_key: any, value: any) {
// //             return Promise.resolve(value);
// //         },
// //         removeItem(_key: any) {
// //             return Promise.resolve();
// //         },
// //     };
// // };
// //
// // const storage =
// //     typeof window === "undefined"
// //         ? createNoopStorage()
// //         : createWebStorage("local");
//
// // const persistConfig = {
// //     key: "root",
// //     storage,
// //     whitelist: ["global"],
// // };
//
// const rootReducer = combineReducers({
//     global: globalReducer,
//     [api.reducerPath]: api.reducer,
// });
//
// /* REDUX STORE */
// export const makeStore = () => {
//     return configureStore({
//         reducer: rootReducer,
//         middleware: (getDefaultMiddleware) =>
//             getDefaultMiddleware({
//                 serializableCheck: {
//                     ignoredActions: [
//                         "api/executeMutation/pending",
//                         "api/executeMutation/fulfilled",
//                         "api/executeMutation/rejected",
//                     ],
//                     ignoredActionPaths: [
//                         "meta.arg.originalArgs.file",
//                         "meta.arg.originalArgs.formData",
//                         "payload.chapter.video",
//                         "meta.baseQueryMeta.request",
//                         "meta.baseQueryMeta.response",
//                     ],
//                     ignoredPaths: [
//                         "global.courseEditor.sections",
//                         "entities.videos.data",
//                         "meta.baseQueryMeta.request",
//                         "meta.baseQueryMeta.response",
//                     ],
//                 },
//             }).concat(api.middleware),
//     });
// };
//
// // const persistedReducer = persistReducer(persistConfig, rootReducer);
// //
// // export const makeStore = () => {
// //     return configureStore({
// //         reducer: persistedReducer,
// //         middleware: (getDefault) =>
// //             getDefault({
// //                 serializableCheck: {
// //                     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// //                 },
// //             }).concat(api.middleware),
// //     });
// // };
//
// /* REDUX TYPES */
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// /* PROVIDER */
// export default function StoreProvider({ children, }: { children: ReactNode; }) {
//     const storeRef = useRef<AppStore>();
//     if (!storeRef.current) {
//         storeRef.current = makeStore();
//         setupListeners(storeRef.current.dispatch);
//     }
//     return <Provider store={storeRef.current}>{children}</Provider>;
// }
//
// // export default function StoreProvider({ children, }: { children: ReactNode; }) {
// //     const storeRef = useRef<AppStore>();
// //     if (!storeRef.current) {
// //         storeRef.current = makeStore();
// //         setupListeners(storeRef.current.dispatch);
// //     }
// //     const persistor = persistStore(storeRef.current);
// //
// //     return (
// //         <Provider store={storeRef.current}>
// //             <PersistGate loading={null} persistor={persistor}>
// //                 {children}
// //             </PersistGate>
// //         </Provider>
// //     );
// // }
