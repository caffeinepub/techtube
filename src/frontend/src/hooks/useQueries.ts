import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Tutorial } from "../backend.d";
import { useActor } from "./useActor";

export function useAllTutorials() {
  const { actor, isFetching } = useActor();
  return useQuery<Tutorial[]>({
    queryKey: ["tutorials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTutorials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTutorialsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Tutorial[]>({
    queryKey: ["tutorials", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllTutorials();
      return actor.getTutorialsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTrendingTutorials() {
  const { actor, isFetching } = useActor();
  return useQuery<Tutorial[]>({
    queryKey: ["tutorials", "trending"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingTutorials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIncrementViewCount() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) return;
      return actor.incrementViewCount(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorials"] });
    },
  });
}
