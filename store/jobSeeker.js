import {defineStore} from "pinia";

export const jobSeeker = defineStore('jobSeeker', {
    state: () => ({
        activeRequest: 0,
        allRequest: 0
    }),
    actions: {
        getActiveRequest() {
            return this.activeRequest;
        },

        getAllRequest() {
            return this.allRequest;
        }
    }
})