export const splitEventName = (apiName: string): { game: string; league: string } => {
  const [game, ...leagueParts] = apiName.split(',').map(s => s.trim());
  return {
    game: game,
    league: leagueParts.join(', ') 
  };
};

export const parseBool = (value: string): boolean => value === 'true';

export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return getDateKey(date) === getDateKey(today);
};

export  const getDateKey = (date: Date) => {
  return date.toISOString().split('T')[0];
};


export const typeOfbets = {
  optionOne: '1',
  optionTie: 'X',
  optionTwo: '2'
}