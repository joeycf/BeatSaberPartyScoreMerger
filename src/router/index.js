import Vue from 'vue';
import VueRouter from 'vue-router';
import ScoreMerger from '@/components/ScoreMerger.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UnderConstruction.vue'),
  },
  {
    path: '/score-merger',
    name: 'Score Merger',
    component: ScoreMerger,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
