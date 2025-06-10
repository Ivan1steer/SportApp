export const fetchOrganizations = async (params: {
  search?: string;
  tags?: string[];
  sports?: string[];
  minRating?: number;
}) => {
  const queryParams = new URLSearchParams();
  
  if (params.search) queryParams.append('search', params.search);
  if (params.tags?.length) queryParams.append('tags', params.tags.join(','));
  if (params.sports?.length) queryParams.append('sports', params.sports.join(','));
  if (params.minRating) queryParams.append('minRating', params.minRating.toString());

  const response = await fetch(`http://localhost:5000/api/organizations?${queryParams}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchFiltersData = async () => {
  const response = await fetch('http://localhost:5000/api/organizations');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  
  const tags = new Set<string>();
  const sports = new Set<string>();
  
  data.forEach((org: any) => {
    org.tags.forEach((tag: string) => tags.add(tag));
    org.sportTypes.forEach((sport: string) => sports.add(sport));
  });

  return {
    allTags: Array.from(tags),
    allSportTypes: Array.from(sports)
  };
};

export const fetchTrainers = async (params: {
  search?: string;
  sports?: string[];
  minRating?: number;
}) => {
  const queryParams = new URLSearchParams();
  
  if (params.search) queryParams.append('search', params.search);
  if (params.sports?.length) queryParams.append('sports', params.sports.join(','));
  if (params.minRating) queryParams.append('minRating', params.minRating.toString());

  const response = await fetch(`http://localhost:5000/api/trainers?${queryParams}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchTrainerSports = async () => {
  const response = await fetch('http://localhost:5000/api/trainers/sports');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchEventsByDate = async (date: string) => {
  const response = await fetch(`http://localhost:5000/api/events?date=${date}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchEventDates = async () => {
  const response = await fetch('http://localhost:5000/api/events/dates');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const login = async (credentials: { username: string; password: string }) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error(await response.text());
  }
  
  return response.json();
};