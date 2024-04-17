export interface EmployerInfo {
    activeStatus: string;
    activeStatusTitle: string;
    activitySectionID: number;
    activitySectionTitle: string;
    activityTypeID: number;
    activityTypeTitle: string;
    businessId: number;
    businessName: string;
    cityID: number;
    cityName: string;
    docNumber: number;
    id: number;
    insuranceCode: string;
    isLegal: boolean;
    isLegalTitle: string;
    jobOpportunitieCount: number;
    mobile: string;
    nationalNumber: string;
    personID: number;
    persons: Person[];
    provinceID: number;
    provinceName: string;
    regMoment: string;
    regMomentEn: string;
    sectorID: number;
    sectorTitle: string;
    title: string;
    registerNumber: number;
}

export interface Person {
    birthDate: string;
    fullName: string;
    id: number;
    mobile: string;
    nationalCode: string;
    positionID: number;
}