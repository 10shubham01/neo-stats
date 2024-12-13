export interface Asteroid {
  id: string;
  name: string;
  speed?: number; // in km/h
  distance?: number; // in km
}

export interface AsteroidData {
  near_earth_objects: {
    [date: string]: {
      id: string;
      name: string;
      close_approach_data: Array<{
        relative_velocity: {
          kilometers_per_hour: string;
        };
        miss_distance: {
          kilometers: string;
        };
      }>;
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: number;
          estimated_diameter_max: number;
        };
      };
    }[];
  };
}
