import React from 'react';
import { US_STATES } from '../../types/USStates';
import { Subject } from '../../util/reactive/Subject';

export type Provider = {
  _id: string;
  providerId: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  hospitalReferralRegionDesc: string;
  totalDischarges: number;
  avgCoveredCharges: number;
  avgTotalPayments: number;
  avgMedicarePayments: number;
  drgDefinition: string;
};

export interface ProvidersProjection {
  providerId?: boolean;
  name?: boolean;
  street?: boolean;
  city?: boolean;
  state?: boolean;
  zipcode?: boolean;
  hospitalReferralRegionDesc?: boolean;
  totalDischarges?: boolean;
  avgCoveredCharges?: boolean;
  avgTotalPayments?: boolean;
  avgMedicarePayments?: boolean;
  drgDefinition?: boolean;
}

export interface ProvidersSearchState {
  max_discharges?: number;
  min_discharges?: number;
  max_average_covered_charges?: number;
  min_average_covered_charges?: number;
  max_average_medicare_payments?: number;
  min_average_medicare_payments?: number;
  state?: US_STATES;
  projection?: ProvidersProjection;
}

export interface ProvidersSubjectData {
  providers: Provider[];
  searchState: ProvidersSearchState;
  isLoading: boolean;
  errorMessage?: string;
}

export type ProvidersSearchFunc = (
  stateFunc: (prevState: ProvidersSearchState) => ProvidersSearchState
) => Promise<void>;

export interface ProvidersContextValues {
  providersSubject: Subject<ProvidersSubjectData>;
  providersSearch: ProvidersSearchFunc;
}

export const ProvidersContext = React.createContext<ProvidersContextValues>(
  {} as any
);

const providersSubject = new Subject<ProvidersSubjectData>({
  providers: [],
  searchState: {},
  isLoading: false,
});

export const ProvidersProvider: React.FC = ({ children }) => {
  const isFirst = React.useRef(true);

  React.useEffect(() => {
    providersSubject.next({
      providers: [],
      searchState: {},
      isLoading: false,
    });

    isFirst.current = false;

    return () => {
      providersSubject.destroy();
    };
  }, [isFirst]);

  const providersSearch: ProvidersSearchFunc = async stateFunc => {
    const { searchState } = providersSubject.getValue();
    const newSearchState = stateFunc(searchState);
    providersSubject.next({ providers: [], searchState, isLoading: true });

    // TODO: Fetch
  };

  return (
    <ProvidersContext.Provider value={{ providersSearch, providersSubject }}>
      {children}
    </ProvidersContext.Provider>
  );
};
