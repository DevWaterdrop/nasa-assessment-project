import axios, { AxiosRequestConfig } from 'axios';

export type NasaData = {
  count: number;
  entries: NasaEntry[];
};

export type NasaEntry = {
  time: Date;
  name: string;
  potentialHazard: boolean;
  estimatedDiameter: number;
  missDistance: number;
  velocity: number;
};

type RawNasaEntry = {
  name: string;
  close_approach_data: {
    close_approach_date_full: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance?: {
      kilometers: string;
    };
  }[];
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    meters: {
      estimated_diameter_max: number;
    };
  };
};

type RawNasaResponse = {
  element_count?: number;
  near_earth_objects: Record<string, RawNasaEntry[]>;
};

const client = axios.create({
  baseURL: 'https://www.neowsapp.com/rest/v1/',
  params: {
    api: import.meta.env.VITE_NASA_API,
  },
});

type ApiRequest = {
  url: string;
  config?: AxiosRequestConfig<unknown>;
};

export class NasaAPI {
  static async getToday() {
    return this.request({ url: 'feed/today' });
  }

  private static transformData = (data: RawNasaResponse) => {
    const { element_count, near_earth_objects } = data;

    function _transformEntries(entries: RawNasaEntry[]): NasaEntry[] {
      return entries.map((entry) => {
        const {
          name,
          close_approach_data: cad,
          is_potentially_hazardous_asteroid,
          estimated_diameter,
        } = entry;

        const { close_approach_date_full, relative_velocity, miss_distance } =
          cad[cad.length - 1];

        return {
          time: new Date(close_approach_date_full),
          name,
          potentialHazard: is_potentially_hazardous_asteroid,
          estimatedDiameter: Number(
            estimated_diameter.meters.estimated_diameter_max
          ),
          missDistance: Number(miss_distance?.kilometers || 0),
          velocity: Number(relative_velocity.kilometers_per_hour),
        };
      });
    }

    const entries = Object.values(near_earth_objects)
      .flatMap((objects) => _transformEntries(objects))
      .sort((first, second) => second.time.getTime() - first.time.getTime());

    return {
      count: element_count || 0,
      entries,
    };
  };

  private static async request({ url, config }: ApiRequest) {
    return client
      .get<RawNasaResponse>(url, config)
      .then((response): NasaData => {
        const data = this.transformData(response.data);

        return data;
      });
  }
}
