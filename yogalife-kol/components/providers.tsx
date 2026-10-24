"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";
import {
  PiCheckThin,
  PiInfoThin,
  PiWarningThin,
  PiSpinnerGapThin,
  PiXThin,
} from "react-icons/pi";
import { Icon } from "./ui";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false },
          mutations: { retry: 0 },
        },
      }),
  );
  return (
    <QueryClientProvider client={client}>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.22 }}>
        {children}
        <Toaster
          position="top-right"
          closeButton
          icons={{
            success: <Icon icon={PiCheckThin} size="sm" />,
            info: <Icon icon={PiInfoThin} size="sm" />,
            warning: <Icon icon={PiWarningThin} size="sm" />,
            error: <Icon icon={PiWarningThin} size="sm" />,
            loading: (
              <span className="toast-spinner">
                <Icon icon={PiSpinnerGapThin} size="sm" />
              </span>
            ),
            close: <Icon icon={PiXThin} size="sm" />,
          }}
          toastOptions={{ className: "toast" }}
        />
      </MotionConfig>
    </QueryClientProvider>
  );
}
