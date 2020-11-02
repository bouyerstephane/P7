import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("@/components/Login")
    },
    {
        path: "/",
        name: "disconnect",
        component: () => import("@/components/Login")
    },
    {
        path: "*",
        redirect: "/"
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("@/components/Signup")
    },
    {
        path: "/forum",
        name: "forum",
        component: () => import("@/components/Forum"),
    },
    {
        path: "/forum:id",
        component: () => import("@/components/ForumCommentary")
    },
    {
        path: "/account",
        component: () => import("@/components/Account")
    }


];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});


export default router;
