import {defineNuxtRouteMiddleware} from "#app";

export default defineNuxtRouteMiddleware(async (to) => {
    if (process.browser) {
        const token = localStorage.getItem('user-data');
        const allowedPaths = [
            "/authorization/jobSeeker/register",
            "/authorization/login",
        ];
        if (!token && !allowedPaths.includes(to.path)) {
            return navigateTo("/authorization/login");
        } else {
        }
    }
})
