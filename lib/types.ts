export type Category = {
  id: string;
  name: string;
};

export type Mixer = {
  id: string;
  name: string;
};

export type Drink = {
  id: string;
  name: string;
  categoryId: string;
  image?: string; // URL or filename
  mixerIds: string[];
};

export type Booking = {
  id: string;
  guestName: string;
  selfieUrl?: string; // or null
  eventId: string;
  eventName: string;
  drinkId: string;
  drinkName: string;
  mixerIds: string[];
  mixerNames: string[];
  timestamp: string;
};

export type AppData = {
  categories: Category[];
  mixers: Mixer[];
  drinks: Drink[];
  nonAlcoholicMixerIds: string[];
  events: EventConfig[];
  bookings: Booking[];
};

export type EventConfig = {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
};
