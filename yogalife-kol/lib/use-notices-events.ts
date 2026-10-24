"use client";

import { useQuery } from "@tanstack/react-query";
import { timelineFeedSchema } from "./event-schemas";

export function useNoticesEvents() {
  return useQuery({
    queryKey: ["notices-events"],
    staleTime: 5 * 60_000,
    queryFn: async ({ signal }) => {
      const response = await fetch("/api/notices-events", { signal });
      if (!response.ok)
        throw new Error("We couldn’t load the noticeboard. Please try again.");
      return timelineFeedSchema.parse(await response.json());
    },
  });
}
