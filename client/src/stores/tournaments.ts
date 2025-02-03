import { create } from "zustand";
import { fetchMatches } from "@/api";
import { memoizedTransformMatches } from "@/api/transforms/matches";
import type { Event, Match } from "@/types/types";
import type { ApiResponse } from "@/api/types";
import { getDateKey } from "@/utils/helpers";
import { useShallow } from "zustand/react/shallow";

type TournamentState = {
  rawData: ApiResponse | null;
  tournaments: Event[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  hasMore: boolean;
  hasMoreTournaments: boolean;
  fetchTournaments: () => Promise<void>;
  loadMoreMatches: () => void;
  loadMoreTournaments: () => void;
  getDisplayedMatches: () => Match[];
  getDisplayedTournaments: () => Event[];
  getGroupedTournaments: () => Record<string, Event[]>;
  getTimeAwareGroupedMatches: () => Record<string, { date: string; matches: Match[] }[]>;
};

export const useTournamentStore = create<TournamentState>((set, get) => ({
  rawData: null,
  tournaments: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 20,
  hasMore: true,
  hasMoreTournaments: true,

  fetchTournaments: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchMatches();
      const tournaments = memoizedTransformMatches(data);

      set({
        rawData: data,
        tournaments,
        loading: false,
        hasMore: tournaments.flatMap(event => event.matches).length > get().pageSize,
        hasMoreTournaments: tournaments.length > get().pageSize,
      });

    } catch (err) {
     
      set({ error: err instanceof Error ? err.message : "Unknown error", loading: false });
    }
  },

  loadMoreTournaments: () => {
    const { page, pageSize, tournaments } = get();
    const nextPage = page + 1;
    const hasMoreTournaments = nextPage * pageSize < tournaments.length;

    set({
      page: nextPage,
      hasMoreTournaments,
    });
  },

  loadMoreMatches: () => {
    const { page, pageSize, tournaments } = get();
    const totalMatches = tournaments.flatMap(event => event.matches).length;

    const nextPage = page + 1;
    const hasMore = nextPage * pageSize < totalMatches;

    set({
      page: nextPage,
      hasMore,
    });

  },

  getDisplayedMatches: () => {
    const { tournaments, page, pageSize } = get();
    return tournaments.flatMap(event => event.matches).slice(0, page * pageSize);
  },


  getDisplayedTournaments: () => {
    const { tournaments, page, pageSize } = get();
    return tournaments.slice(0, page * pageSize);
  },

  getGroupedTournaments: () => {
    return get().getDisplayedTournaments().reduce((acc, tournament) => {
      const game = tournament.gameName;
      acc[game] = acc[game] || [];
      acc[game].push(tournament);
      return acc;
    }, {} as Record<string, Event[]>);
  },


  getTimeAwareGroupedMatches: () => {

    const tournaments = get().tournaments;
    const displayedMatches = get().getDisplayedMatches();

    let lastResult: Record<string, { date: string; matches: Match[] }[]> = {};
    let lastTournaments: Event[] | null = null;
    let lastDisplayedMatches: Match[] | null = null;

    if (tournaments !== lastTournaments || displayedMatches !== lastDisplayedMatches) {

      const grouped: Record<string, { date: string; matches: Match[] }[]> = {};

      displayedMatches.forEach((match) => {
        const parentTournament = tournaments.find((tournament) =>
          tournament.matches.some((m) => m.id === match.id)
        );
        const league = parentTournament?.leagueName || "Unknown League";

        if (!grouped[league]) grouped[league] = [];

        const matchDate = new Date(match.startDate);
        const dateKey = getDateKey(matchDate);

        let dateGroup = grouped[league].find((group) => group.date === dateKey);
        if (!dateGroup) {
          dateGroup = { date: dateKey, matches: [] };
          grouped[league].push(dateGroup);
        }

        dateGroup.matches.push(match);
      });

      lastResult = grouped;
      lastTournaments = tournaments;
      lastDisplayedMatches = displayedMatches;
      return grouped;
    }

    return lastResult;
  },
}));

export const useGroupedTournaments = () => useTournamentStore(useShallow((state) => state.getGroupedTournaments()));
export const useTimeAwareGroupedMatches = () => useTournamentStore(useShallow((state) => state.getTimeAwareGroupedMatches()));
export const useLoadingState = () => useTournamentStore((state) => state.loading);
export const useErrorState = () => useTournamentStore((state) => state.error);
export const useFetchTournaments = () => useTournamentStore(useShallow((state) => state.fetchTournaments));
export const useLoadMoreMatches = () => useTournamentStore(useShallow((state) => state.loadMoreMatches));
