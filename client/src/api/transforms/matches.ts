import { parseBool, splitEventName } from "@/utils/helpers";
import { ApiResponse, ApiMatch, ApiBet, ApiOdd } from "../types";
import { Bet, Event, Match } from "@/types/types";

export const memoizedTransformMatches = (() => {
  let cache: { key: string; value: Event[] } | null = null;

  return (data: ApiResponse): Event[] => {
    const dataKey = JSON.stringify(data.XmlSports.Sport.map((sport) => sport.$.Name));
    const dataXMLSport = data.XmlSports.Sport;


    if (cache && cache.key === dataKey) {
      return cache.value;
    }

    const tournaments: Event[] = [];

    dataXMLSport.forEach((sport) => {
      if (sport.$.Name === "eSports") {
        sport.Event.forEach((event) => {
          const { game, league } = splitEventName(event.$.Name);
          const matches: Match[] = event.Match.map((apiMatch: ApiMatch) => {
            const bets: Bet[] = apiMatch.Bet.map((apiBet: ApiBet) => ({
              name: apiBet.$.Name,
              id: Number(apiBet.$.ID),
              isLive: parseBool(apiBet.$.IsLive),
              odds: apiBet.Odd.map((apiOdd: ApiOdd) => ({
                name: apiOdd.$.Name,
                id: Number(apiOdd.$.ID),
                value: apiOdd.$.Value,
              })),
            }));

            return {
              id: Number(apiMatch.$.ID),
              name: apiMatch.$.Name,
              startDate: new Date(apiMatch.$.StartDate),
              matchType: apiMatch.$.MatchType,
              bets: bets,
              league: league,
            };
          });

          tournaments.push({
            id: Number(event.$.ID),
            gameName: game,
            leagueName: league,
            isLive: parseBool(event.$.IsLive),
            categoryId: Number(event.$.CategoryID),
            matches: matches,
          });
        });
      }
    });

    cache = { key: dataKey, value: tournaments };

    return tournaments;
  };
})();
