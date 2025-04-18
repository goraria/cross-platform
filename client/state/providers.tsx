"use client";

import React, { ReactNode, ReactElement } from "react";
import StoreProvider from "@/state/redux";

const Providers = (
  { children }: { children: ReactNode }
): ReactElement => {
    return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
