import React from 'react';

import { US_STATES } from '../../types/USStates';
import { Subject } from '../../util/reactive/Subject';
import {
  AuthenticationContext,
  FetchAPIFunc,
} from '../AuthenticationContext/AuthenticationContext';
import { PaginationType } from '../../types/PaginationType';
import { ProviderType } from '../../types/ProviderType';

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
  max_discharges?: number | null;
  min_discharges?: number | null;
  max_average_covered_charges?: number | null;
  min_average_covered_charges?: number | null;
  max_average_medicare_payments?: number | null;
  min_average_medicare_payments?: number | null;
  state?: US_STATES | null;
  projection?: ProvidersProjection;
  page?: number | null;
  limit?: number | null;
}

export interface ProvidersSubjectData {
  providers: ProviderType[];
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
    providers: ProviderType[];
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
    const {
      min_discharges,
      max_discharges,
      min_average_covered_charges,
      max_average_covered_charges,
      min_average_medicare_payments,
      max_average_medicare_payments,
      state,
      page,
      limit,
    } = searchState;
    const query = {
      ...(min_discharges !== null ? { min_discharges } : {}),
      ...(max_discharges !== null ? { max_discharges } : {}),
      ...(max_average_covered_charges !== null
        ? { max_average_covered_charges }
        : {}),
      ...(min_average_covered_charges !== null
        ? { min_average_covered_charges }
        : {}),
      ...(max_average_medicare_payments !== null
        ? { max_average_medicare_payments }
        : {}),
      ...(min_average_medicare_payments !== null
        ? { min_average_medicare_payments }
        : {}),
      ...(state !== null ? { state } : {}),
      ...(page !== null ? { page } : {}),
      ...(limit !== null ? { limit } : {}),
    };
    const response = await fetchAPI<ProvidersGetAllPayload>(
      `/api/v1/providers`,
      {},
      query
    );

    if (!response) return { providers: [] as ProviderType[] };

    const {
      data: { providers },
      pagination,
    } = response;
    return { providers, pagination };
  } catch (error) {
    console.error(error);
    return { providers: [] as ProviderType[] };
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

    providersSubject.next({
      providers: [],
      searchState: newSearchState,
      isLoading: true,
    });

    const { providers, pagination } = await fetchProviders(
      newSearchState,
      fetchAPI
    );

    providersSubject.next({
      providers,
      pagination,
      searchState: newSearchState,
      isLoading: false,
    });
  };

  return (
    <ProvidersContext.Provider value={{ providersSearch, providersSubject }}>
      {children}
    </ProvidersContext.Provider>
  );
};
