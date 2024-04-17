import {CodingDto} from "../common/coding-dto";

export interface JobRequestList {
    cityList: CodingDto[];
    cooperationTypeId: number;
    cooperationTypeTitle: string;
    fullName: string;
    isPublicPublish: boolean;
    isPublicTitle: string;
    iscoTitle: string;
    iscoDesc: string;
    nationalCode: string;
    personID: number;
    placementID: number;
    provinceList: CodingDto[];
    salaryTypeId: number;
    salaryTypeTitle: string;
    cooperationTypeList: any[];
    jobOpportunityID: number;
    cityName: string;
    provinceName: string;
    statusTitle: string;
    publishStatus: number;
    hasEmployerViewPermision: boolean;
    regMoment: string;
    expireDate: string;
    placementCount: string;
    isPublic: boolean;
    requestCooperationTypeList: any[];
    closeDate: string;
    offerCount: number;
    letterCount: number;
    agreedAmount: number;
    eduLevelTitle: string;
    educationFieldTitle: string;
    placementTitle: string;
    status: number;
}