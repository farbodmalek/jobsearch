export class BasePage {

    public static loggedUserInfo: any;

    public static config = {};

    static getJobSeekerEnv() {
        return useRuntimeConfig().public.jobSeeker;
    }

    static getEmployerEnv() {
        return useRuntimeConfig().public.employer;
    }

    static getCommonEnv() {
        return useRuntimeConfig().public.common;
    }

    static getPlacementEnv() {
        return useRuntimeConfig().public.placement;
    }

    static getMediaEnv() {
        return useRuntimeConfig().public.media;
    }

    static getPublicEnv() {
        return useRuntimeConfig().public.Public;
    }

    static getPersonId() {
        return +JSON.parse(<string>localStorage.getItem('personId'));
    }

    static getBusinessId() {
        return +JSON.parse(<string>localStorage.getItem('businessId'));
    }

    public static getLoggedUser() {
        this.loggedUserInfo = JSON.parse(<string>localStorage.getItem('user-data'));
        if (this.loggedUserInfo) {
            this.config = {headers: {'Authorization': 'Bearer ' + this.loggedUserInfo.token}};
            return this.loggedUserInfo;
        } else {
            localStorage.removeItem('user-data');
            // navigateTo("/authorization/login");
            return null;
        }
    }
}