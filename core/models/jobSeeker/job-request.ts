export interface JobRequest {
    id: number;
    personID: number;
    nationalCode: string;
    salaryTypeId: number;
    salaryTypeTitle: string;
    agreedAmount: string;
    iscoId: number;
    iscoTitle: string;
    iscoDesc: string;
    placementTitle: string;
    placementID: number;
    publishStatus: number;
    placementCount: number;
    expireDate: string;
    regMoment: string;
    publishDate: string;
    closeDate: string;
    expireDateEn: string;
    regMomentEn: string;
    publishDateEn: string;
    closeDateEn: string;
    lastUpdateDateEn: string;
    lastUpdateDate: string;
    isAutoFreePublish: boolean;
    pendForPublishExpireDate: number;
    status: number;
    statusTitle: string;
    isInsurance: boolean;
    educationFieldId: number;
    educationFieldTitle: string;
    eduLevelId: number;
    eduLevelTitle: string;
    hasEmployerViewPermision: boolean;
    declarationOfReadinessCount: number;
    letterCount: number;
    acceptCount: number;
    rejectCount: number;
    receiveOfferCount: number;
    sendOfferCount: number;
    rejectionAcceptedCount: number;
    pendingCount: number;
    isPublic: boolean;
    cooperationTypeId: number;
    cooperationTypeTitle: string;
    isShow: boolean;
    jobRequestID: number;
    cityList: any[],
    cooperationTypeList: any[],
    provinceList: any[]
}