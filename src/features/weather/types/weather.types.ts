export interface UseWeatherForsecastReturn {
  handleWeatherCardClick: (
    forecastData: WeatherForecastData,
    isCurrentDate: boolean
  ) => void;
}

export interface UseWeatherDataReturn {
  weatherData?: WeatherApiDataProps;
  fetchWeatherData: (type: WeatherSearchVariant, cityName?: string) => void;
  loading: boolean;
  error?: string;
}

export interface WeatherApiDataProps {
  location: {
    country: string;
    lat: string;
    localtime: string;
    localtime_epoch: number;
    lon: string;
    name: string;
    region: string;
    tz_id: string;
  };
  selected?: SelectedWeatherData;
  current: CurrentWeatherData;
  forecast: {
    forecastday: WeatherForecastData[];
  };
  error?: {
    code: number;
    message: string;
  };
}

export interface SelectedWeatherData {
  condition: {
    icon: string;
    text: string;
  };
  temp_high: number;
  temp_high_f: number;
  date: string;
  avg_temp: number;
  avg_temp_f: number;
  temp_low: number;
  temp_low_f: number;
  uv: number;
  daily_chance_of_rain: number;
  humidity: number;
  wind_kph: number;
}

export interface CurrentWeatherData {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface WeatherForecastData {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
  };
}

export enum WeatherSearchVariant {
  GEO = 'GEO',
  CITY = 'CITY',
}

export enum WeatherUnits {
  CELCIUS = 'CELCIUS',
  FERINHEIGHT = 'FERINHEIGHT',
}
