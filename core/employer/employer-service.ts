import {BaseApi} from "../base/base-api";
import {RegisterEmployer} from "../models/employer/register-employer";

export class EmployerService extends BaseApi {
    static registerEmployer(body: RegisterEmployer) {
        const url = this.getEmployerEnv() + 'person/jobSeeker'
        return this.postApi(url, body);
    }

    static getEmployerBusinessId(nationalCode: string) {
        const url = `EmployerPerson/getBusinessId/${nationalCode}`;
        return this.getApi(this.getEmployerEnv() + url);
    }

    static getEmployerInfo(businessID: number) {
        const url = `EmployerPerson/employer/single`;
        return this.postApi(this.getEmployerEnv() + url, {businessID: businessID});
    }

    static getEmployerSocialInfo(businessID: number) {
        const url = `EmployerPerson/socialNetwork/get/list`;
        return this.postApi(this.getEmployerEnv() + url, {businessID: businessID});
    }

    static getEmployerAddress(businessID: number) {
        const url = `Person/address/get/list/`;
        return this.getApi(this.getEmployerEnv() + url + businessID);
    }

    static editEmployerInfo(body: any) {
        const url = 'EmployerPerson/employer/set';
        return this.postApi(this.getEmployerEnv() + url, body);
    }

    static setEmployerPersons(body: any) {
        const url = 'EmployerPerson/personnel/set';
        return this.postApi(this.getEmployerEnv() + url, body);
    }

    static getJobOpportunityList(body: any) {
        const url = 'JobOpportunity/list';
        return this.postApi(this.getEmployerEnv() + url, body);
    }

    static setAddressInfo(body: any) {
        const url = 'Person/address/set';
        return this.postApi(this.getEmployerEnv() + url, body);
    }

    static getAddressInfo(id: number) {
        const url = 'Person/address/get/single/' + id;
        return this.getApi(this.getEmployerEnv() + url);
    }

    static deleteAddress(id: number) {
        const url = 'Person/address/remove/' + id;
        return this.postApi(this.getEmployerEnv() + url, null);
    }

    static getSocial(id: number) {
        const url = 'EmployerPerson/socialNetwork/get/id';
        return this.postApi(this.getEmployerEnv() + url, {id: id});
    }

    static setSocial(body: any) {
        const url = 'EmployerPerson/socialNetwork/set';
        return this.postApi(this.getEmployerEnv() + url, body);
    }

    static deleteSocial(body: any) {
        const url = 'EmployerPerson/socialNetwork/remove/id';
        return this.postApi(this.getEmployerEnv() + url, body);
    }

    static closeOpportunity(id: number) {
        const url = `JobOpportunity/set/closing/${id}`;
        return this.getApi(this.getEmployerEnv() + url);
    }

    static introList(body: any) {
        const url = `Letters/introduction/list`;
        return this.postApi(this.getPlacementEnv() + url, body);
    }
}