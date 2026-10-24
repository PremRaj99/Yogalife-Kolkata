"use client";
import { useQuery } from "@tanstack/react-query";
import { programsSchema } from "./schemas";
export function usePrograms() {
  return useQuery({
    queryKey: ["design-system", "programs"],
    queryFn: async ({ signal }) => {
      const response = await fetch("/api/design-system/programs", { signal });
      if (!response.ok)
        throw new Error("We couldn’t load the examples. Please try again.");
      return programsSchema.parse(await response.json());
    },
  });
}
