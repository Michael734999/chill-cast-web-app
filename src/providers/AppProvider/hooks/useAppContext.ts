import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { AppContextState } from '../AppProviderTypes';

export const useAppContext = (): AppContextState => useContext(AppContext);
