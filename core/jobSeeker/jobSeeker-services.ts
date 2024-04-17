import {BaseApi} from "../base/base-api";
import {JobRequest} from "~/core/models/jobSeeker/job-request";


export class JobSeekerServices extends BaseApi {

    static getActiveProfile(body: any) {
        const url = 'jobSeeker/flag/set';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }

    static AddressGet(body: any) {
        const url = 'jobSeeker/address/get';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }

    static SocialNetworkGet(body: any) {
        const url = 'jobSeeker/socialNetwork/get';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }


    static JobSeekerGet(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/get';
        return BaseApi.postApi(url, body);
    }

    static RegJobSeeker(body: any) {
        const url = "jobSeeker/set"
        return this.postApi(this.getPublicEnv() + url, body);
    }

    static getPersonResume(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/resume/get';
        return BaseApi.postApi(url, body);
    }

    static SetJobSeekerInfo(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/info/set';
        return BaseApi.postApi(url, body);
    }

    static SetJob(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/job/set';
        return BaseApi.postApi(url, body);
    }

    static GetJob(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/job/list';
        return BaseApi.postApi(url, body);
    }

    static GetExtraInfoJob(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/job/extraInfo/get';
        return BaseApi.postApi(url, body);
    }
    static SetExtraInfoJob(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/job/extraInfo/set';
        return BaseApi.postApi(url, body);
    }

    static DeleteJobRecorde(body: number) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/job/delete/' + body;
        return BaseApi.getApi(url);
    }


    static SetForeignLanguage(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/foreignLanguage/set';
        return BaseApi.postApi(url, body);
    }

    static GetForeignLanguage(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/foreignLanguage/get';
        return BaseApi.postApi(url, body);
    }

    static DeleteForeignLanguage(body: number) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/foreignLanguage/remove/' + body;
        return BaseApi.getApi(url);
    }


    static SetFavoriteJob(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/job/favorite/set';
        return BaseApi.postApi(url, body);
    }

    static GetFavoriteJob(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/job/favorite/get';
        return BaseApi.postApi(url, body);
    }

    static SetSkill(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/skill/set';
        return BaseApi.postApi(url, body);
    }

    static GetSkill(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/skill/get';
        return BaseApi.postApi(url, body);
    }

    static GetExtraInfo(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/skill/extraInfo/get';
        return BaseApi.postApi(url, body);
    }

    static SetExtraInfo(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/skill/extraInfo/set';
        return BaseApi.postApi(url, body);
    }
    static DeleteSkill(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/skill/remove/'+body;
        return BaseApi.getApi(url);
    }



    static SetEducation(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/education/set';
        return BaseApi.postApi(url, body);
    }

    static GetEducation(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/education/get';
        return BaseApi.postApi(url, body);
    }


    static DeleteEducation(body: number) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/education/delete/'+body;
        return BaseApi.getApi(url);
    }


    static SetPersonResearch(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/personResearch/set';
        return BaseApi.postApi(url, body);
    }

    static GetPersonResearch(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/personResearch/get';
        return BaseApi.postApi(url, body);
    }

    static DeletePersonResearch(body: any) {
        const url = this.getJobSeekerEnv() + 'jobSeeker/personResearch/delete/'+body;
        return BaseApi.getApi(url);
    }


    static getJobSeekerRequests(body: any) {
        const url = this.getJobSeekerEnv() + 'jobRequest/get';
        return BaseApi.postApi<JobRequest>(url, body);
    }

    static getJobSeekerRelatedEducations(nationalCode: string) {
        const url = 'jobSeeker/education/get';
        return this.postApi(this.getJobSeekerEnv() + url, {nationalCode: nationalCode})
    }

    static setRequestedJob(body: any) {
        const url = 'jobRequest/set';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }

    static closeJobRequest(id: number) {
        const url = `jobRequest/closing/${id}`;
        return this.getApi(this.getJobSeekerEnv() + url);
    }

    static getJobRequestOfferList(body: any) {
        const url = 'JobRequest/publish/offer/list';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }

    static getSendOfferList(body: any) {
        const url = 'jobRequest/jobOpportunity/list/Get';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }

    static getIntroductionLetterPrintByID(id: number) {
        const url = `Letters/introduction/print/${id}`
        return this.getApi(this.getPlacementEnv() + url, {responseType: 'blob'});
    }

    static addLetterOtherResult(body: any) {
        const url = 'Letters/introduction/other/result/set';
        return this.postApi(this.getPlacementEnv() + url, body);
    }

    static addJobRequestOfferResult(body: any) {
        const url = 'JobRequest/publish/offer/result/set';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }

    static closeJobOffer(body: any) {
        const url = 'JobRequest/publish/offer/Closing/set';
        return this.postApi(this.getJobSeekerEnv() + url, body);
    }

    static jobOfferedLetterResult(body: any) {
        const url = 'Letters/result/others/list';
        return this.postApi(this.getPlacementEnv() + url, body);
    }
}