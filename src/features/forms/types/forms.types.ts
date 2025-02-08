import { WeatherSearchVariant } from '@features/weather/types';

export interface EmailFormFields {
  userName: string;
  message: string;
}

export interface UseEmailFormReturn {
  loading: boolean;
  sendEmail: ({ message, userName }: EmailFormFields) => Promise<void>;
}

export interface EmailFormFields {
  search: string;
}

export interface SearchBarProps {
  placeholder: string;
  onSearch: (type: WeatherSearchVariant, cityName?: string) => void;
  loading: boolean;
}
