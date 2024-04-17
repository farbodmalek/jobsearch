import {CodingDto} from "./coding-dto";

export interface PlacementInfo {
  placementID: number;
  placementTitle: string;
  logoPath: string;
  licenseNo: string;
  issuanceLicenseDate: string;
  validityDate: string;
  countryDivisionID: number;
  countryDivision: CodingDto;
  jobOpportunityCount: number;
  jobRequestCount: number;
  letterCount: number;
  employerCount: number;
  jobseekerCount: number;
  countryDivisionTitle: string;
  employedCount: number
  lastTwoMonthsEmployedCount: number;
  lastTwoMonthsLetterCount: number;
  statusID: number;
  parentCountryDivisionTitle: string;
  address: string;
  phone: string;
  statusTitle: string;
  acceptExpireDate: string;
  showRejectReason: boolean;
  description: string;
}
