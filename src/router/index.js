import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/menu",
    name: "menu",
    component: () => import("../components/Menus.vue"),
  },

  {
    path: "/",
    name: "home",
    component: () => import("../views/Homeofficial"),
  },

  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register"),
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login"),
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/Account"),
  },
  {
    path: "/trainer",
    name: "trainers",
    component: () => import("../views/trainer"),
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import("../views/Courses"),
  },
  {
    path: "/course/:courseId",
    name: "course",
    component: () => import("../views/Course-view"),
  },
  {
    path: "/book",
    name: "book",
    component: () => import("../components/Book.vue"),
  },
  {
    path: "/manageTrainer",
    name: "Admintrainer",
    component: () => import("../views/Admintrainer.vue"),
  },
  {
    path: "/manageTrainerAdd",
    name: "AdmintrainerAdd",
    component: () => import("../views/AdmintrainerAdd.vue"),
  },
  {
    path: "/manageCourse",
    name: "Admincourse",
    component: () => import("../views/Admincourse.vue"),
  },
  {
    path: "/manageCourseAdd",
    name: "AdmincourseAdd",
    component: () => import("../views/AdmincourseAdd.vue"),
  },
  {
    path: "/mybook",
    name: "mybook",
    component: () => import("../views/MyBook.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
