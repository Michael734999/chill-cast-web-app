import { createContext } from 'react';
import { AppContextState } from './AppProviderTypes';

export const AppContext = createContext<AppContextState>({} as AppContextState);
