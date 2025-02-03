
import { ApiResponse } from "./types";

export const fetchMatches = async (): Promise<ApiResponse> => {
  const response = await fetch("/api/matches");

  if (!response.ok) throw new Error("Failed to fetch matches");
  const data: ApiResponse = await response.json();

  return data;
};




