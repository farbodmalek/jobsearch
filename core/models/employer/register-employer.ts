export interface RegisterEmployer {
    captchaId: string;
    captchaCode: string;
    nationalCode: string;
    companyNationalCode: string;
    mobile: string;
    islegal: boolean;
    password: string;
    rePassword: string;
    sectorID: number;
    activitySectionID: number;
    birthDate: string;
    fromPlacement: boolean;
    employerTitle: string;
    placementID: number;
    docNumber: string;
    provinceID: number;
    cityID: number;
}