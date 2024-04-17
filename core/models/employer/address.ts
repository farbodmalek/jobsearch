import {CodingDto} from "../common/coding-dto";

export interface Address {
    id: number;
    city: string;
    addressType: number;
    addressTypeName: string;
    businessID: number;
    title: string;
    province: number;
    provinceName: string;
    cityId: number;
    cityInfo: CodingDto;
    cityName: string;
    address: string;
    postalCode: string;
    preCode: string;
    phoneNo: string;
    faxNo: string;
    mobileNo: string
    ownerShipTypeId: number;
    modifiedDate: string;
    latitude: number;
    longitude: number;
    website: string;
    employerAddress: string;
    addressTypeId: number;
}