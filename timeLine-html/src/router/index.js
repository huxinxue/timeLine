import Vue from 'vue';
import Router from 'vue-router';
import TimeLine from '@/components/timeLine.vue';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'timeLine',
      component: TimeLine
    }
  ]
});
