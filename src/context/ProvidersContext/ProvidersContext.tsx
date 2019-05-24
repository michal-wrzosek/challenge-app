import React from 'react';

import { US_STATES } from '../../types/USStates';
import { Subject } from '../../util/reactive/Subject';
import {
  AuthenticationContext,
  FetchAPIFunc,
} from '../AuthenticationContext/AuthenticationContext';
import { PaginationType } from '../../types/PaginationType';

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
  page?: number;
  limit?: number;
}

export interface ProvidersSubjectData {
  providers: Provider[];
  pagination?: PaginationType;
  searchState: ProvidersSearchState;
  isLoading: boolean;
  errorMessage?: string;
}

export type ProvidersSearchFunc = (
  stateFunc: (prevState: ProvidersSearchState) => ProvidersSearchState
) => Promise<void>;

export type ProvidersGetAllPayload = {
  data: {
    providers: Provider[];
  };
  pagination: PaginationType;
};

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

const fetchProviders = async (
  searchState: ProvidersSearchState,
  fetchAPI: FetchAPIFunc
) => {
  try {
    const { page } = searchState;
    const query = { page };
    const response = await fetchAPI<ProvidersGetAllPayload>(
      `/api/v1/providers`,
      {},
      query
    );

    if (!response) return { providers: [] as Provider[] };

    const {
      data: { providers },
      pagination,
    } = response;
    return { providers, pagination };
  } catch (error) {
    console.error(error);
    return { providers: [] as Provider[] };
  }
};

export const ProvidersProvider: React.FC = ({ children }) => {
  const isFirst = React.useRef(true);
  const { fetchAPI } = React.useContext(AuthenticationContext);

  React.useEffect(() => {
    providersSubject.next({
      providers: [],
      searchState: {},
      isLoading: true,
    });

    fetchProviders({}, fetchAPI)
      .then(({ providers, pagination }) => {
        providersSubject.next({
          providers,
          pagination,
          searchState: {},
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
        providersSubject.next({
          providers: [],
          searchState: {},
          isLoading: false,
        });
      });

    isFirst.current = false;

    return () => {
      providersSubject.destroy();
    };
  }, [isFirst, fetchAPI]);

  const providersSearch: ProvidersSearchFunc = async stateFunc => {
    const { searchState } = providersSubject.getValue();
    const newSearchState = stateFunc(searchState);

    providersSubject.next({ providers: [], searchState, isLoading: true });

    const { providers, pagination } = await fetchProviders(
      newSearchState,
      fetchAPI
    );

    providersSubject.next({
      providers,
      pagination,
      searchState,
      isLoading: false,
    });
  };

  return (
    <ProvidersContext.Provider value={{ providersSearch, providersSubject }}>
      {children}
    </ProvidersContext.Provider>
  );
};
