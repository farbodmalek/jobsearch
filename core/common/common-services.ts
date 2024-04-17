import {BaseApi} from "../base/base-api";
import {IscoDto} from "~/core/models/common/isco-dto";
import {CodingDto} from "~/core/models/common/coding-dto";
import {PlacementInfo} from "~/core/models/common/placement-info";
import {JobOpportunityModelDto} from "~/core/models/common/opportunity-detail";
import {Intro} from "../models/common/intro";

export class CommonServices extends BaseApi {

    static login(body: any) {
        const url = this.getCommonEnv() + 'token';
        return BaseApi.postApiLogin(url, body);
    }

    static AttachmentGet(body: any) {
        const url = this.getCommonEnv() + 'Common/attachment/list';
        return BaseApi.postApiLogin(url, body);
    }

    static getCountry() {
        const url = this.getJobSeekerEnv() + 'coding/CountryDivision';
        return BaseApi.getApi(url);
    }

    static captchaCode() {
        const url = this.getCommonEnv() + 'Token/captcha-endpoint';
        return BaseApi.getApiLogin(url);
    }

    static getTicketList(body: any) {
        const url = this.getCommonEnv() + 'Support/users/ticket/list';
        return BaseApi.postApi(url, body);
    }

    static getCityProvince(body: any) {
        const url = this.getCommonEnv() + 'coding/City/list/get';
        return BaseApi.postApi(url, body);
    }

    static GetJobiscoID(body: any) {
        const url = "coding/IRIsco/list"
        return this.postApi(this.getCommonEnv() + url, body);
    }

    static GetSkill(body: any): Promise<CodingDto> {
        const url = "coding/skills/flat"
        return this.postApi<CodingDto>(this.getCommonEnv() + url, body);
    }

    static GetTypeList(body: number[]): Promise<CodingDto[]> {
        const url = "coding/type/list/get"
        return this.postApi<CodingDto[]>(this.getCommonEnv() + url, body);
    }

    static GetLevelList(): Promise<CodingDto[]> {
        const url = "coding/educationLevel/list"
        return this.getApi<CodingDto[]>(this.getCommonEnv() + url,);
    }

    static GetEduField(body: any): Promise<CodingDto[]> {
        const url = "coding/defaultEducationField/list"
        return this.postApi<CodingDto[]>(this.getCommonEnv() + url, body);
    }

    static GetCityList(body: any) {
        const url = "coding/City/list/get"
        return this.postApi(this.getCommonEnv() + url, body);
    }

    static getIscoJobs(body: any): Promise<IscoDto[]> {
        const url = 'coding/IRIsco/list';
        return this.postApi<IscoDto[]>(this.getCommonEnv() + url, body);
    }
    static getIscoSkill(body: any): Promise<IscoDto[]> {
        const url = 'coding/skills/flat';
        return this.postApi<IscoDto[]>(this.getCommonEnv() + url, body);
    }

    static getPlacementList(body: any): Promise<PlacementInfo> {
        const url = 'placement/publishing/list';
        return this.postApi<PlacementInfo>(this.getJobSeekerEnv() + url, body)
    }

    static getIntroductionLetters(body: any): Promise<Intro[]> {
        const url = 'Letters/introduction/list';
        return this.postApi<Intro[]>(this.getPlacementEnv() + url, body);
    }

    static JobOpportunityDetailById(id: number): Promise<JobOpportunityModelDto> {
        const url = 'JobOpportunity/get/' + id;
        return this.getApi<JobOpportunityModelDto>(this.getEmployerEnv() + url);
    }

    static setJobResume(body: any) {
        const url = 'JobOpportunity/resume/set';
        return this.postApi(this.getEmployerEnv() + url, body);
    }

    static searchJobRequest(body: any) {
        const url = 'jobRequest/all/get';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }

    static reSendConfirmCode(body: any) {
        const url = 'Public/verificationCode/generate';
        return this.postApi(this.getPublicEnv() + url, body);
    }

    static setConfirmCode(body: any) {
        const url = 'jobSeeker/confirm';
        return this.postApi(this.getPublicEnv() + url, body);
    }
}
