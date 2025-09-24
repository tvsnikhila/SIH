export type Activity = {
  id: string;
  date: Date;
  activityType: 'Sowing' | 'Irrigation' | 'Fertilizer' | 'Pest Control' | 'Harvest' | 'Other';
  notes: string;
};
