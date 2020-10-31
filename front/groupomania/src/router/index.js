import {createRouter, createWebHistory} from "vue-router";
//import Home from "../views/Home.vue";

const routes = [

    {
        path: "/",
        name: "login",
        component: () => import("../components/Login")
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("../components/Signup")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
