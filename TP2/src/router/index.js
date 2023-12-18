import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/movies",
            name: "movies",
            component: () => import("../views/MoviesView.vue")
        },
        {
            path: "/movie/:id",
            name: "movie",
            component: () => import("../views/MovieDetailsView.vue"),
            props: castRouteParams
        },
    ],
});

function castRouteParams(route) {
    return {
        id: Number(route.params.id),
    };
}

export default router;