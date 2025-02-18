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
  cacheKey: string | null;
  cachedResult: Record<string, { date: string; matches: Match[] }[]> | null;
  setCache: (result: Record<string, { date: string; matches: Match[] }[]>) => void;
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
  cacheKey: null,
  cachedResult: null,
  setCache: (result) => {
    const newCacheKey = JSON.stringify({
      tournaments: get().tournaments.map(t => t.id),
      displayedMatches: get().getDisplayedMatches().map(m => m.id),
    });
    set({ cacheKey: newCacheKey, cachedResult: result });
  },

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
    const { tournaments, getDisplayedMatches, cacheKey: cachedKey, cachedResult } = get();
    const displayedMatches = getDisplayedMatches();
  
    const newCacheKey = JSON.stringify({
      tournaments: tournaments.map(t => t.id),
      displayedMatches: displayedMatches.map(m => m.id),
    });

    if (cachedKey === newCacheKey) {
      return cachedResult!;
    }
  
    const grouped: Record<string, { date: string; matches: Match[] }[]> = {};

    const tournamentMap = new Map<string, Event>();
    tournaments.forEach(tournament => {
      tournament.matches.forEach(match => {
        tournamentMap.set(match.id.toString(), tournament);
      });
    });
  
    displayedMatches.forEach((match) => {
      const parentTournament = tournamentMap.get(match.id.toString());
      const league = parentTournament?.leagueName || "Unknown League";
  
      if (!grouped[league]) {
        grouped[league] = [];
      }
  
      const matchDate = new Date(match.startDate);
      const dateKey = getDateKey(matchDate);
  
      let dateGroup = grouped[league].find((group) => group.date === dateKey);
      if (!dateGroup) {
        dateGroup = { date: dateKey, matches: [] };
        grouped[league].push(dateGroup);
      }
  
      dateGroup.matches.push(match);
    });
  
    return grouped;
  },
}));

export const useGroupedTournaments = () => useTournamentStore(useShallow((state) => state.getGroupedTournaments()));
export const useTimeAwareGroupedMatches = () => useTournamentStore(useShallow((state) => state.getTimeAwareGroupedMatches()));
export const useLoadingState = () => useTournamentStore((state) => state.loading);
export const useErrorState = () => useTournamentStore((state) => state.error);
export const useFetchTournaments = () => useTournamentStore(useShallow((state) => state.fetchTournaments));
export const useLoadMoreMatches = () => useTournamentStore(useShallow((state) => state.loadMoreMatches));
