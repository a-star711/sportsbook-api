export interface ApiResponse {
  XmlSports: {
    Sport: ApiSport[];

  };
}

export interface ApiSport {
  $: {
    Name: string;
    ID: string;
  };
  Event: ApiEvent[];
}

export interface ApiEvent {
  $: {
    Name: string;
    ID: string;
    IsLive: string;
    CategoryID: string;
  };
  Match: ApiMatch[];
}

export interface ApiMatch {
  $: {
    Name: string;
    ID: string;
    StartDate: string;
    MatchType: string;
  };
  Bet: ApiBet[];
}

export interface ApiBet {
  $: {
    Name: string;
    ID: string;
    IsLive: string;
  };
  Odd: ApiOdd[];
}

export interface ApiOdd {
  $: {
    Name: string;
    ID: string;
    Value: string;
  };
}
