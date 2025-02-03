export type Event = {
  gameName: string
  leagueName: string
  id: number
  isLive: boolean
  categoryId: number
  matches: Match[]
}


export type Match = {
  name: string
  id: number
  startDate: Date
  matchType: string
  bets: Bet[]
  league: string
}

export type Bet = {
  name: string
  id: number
  isLive: boolean
  odds: Odd[]
}

export type Odd = {
  name: string
  id: number
  value: string
}

export interface TournamentSectionProps {
  tournament: Event;
}


export interface MatchTableProps {
  matches: Match[];
  league: string;
}

