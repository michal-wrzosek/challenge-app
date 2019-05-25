import { US_STATES } from '../../types/USStates';
import { ProviderType } from '../../types/ProviderType';
import { PaginationType } from '../../types/PaginationType';
import { Subject } from '../../util/reactive/Subject';

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
