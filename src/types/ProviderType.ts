export type ProviderType = {
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
