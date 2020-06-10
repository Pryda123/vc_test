import {dataQuestions, dataResults} from '../data';
import homeComponent from './homeComponent';
import questionsComponent from './questionsComponent';
import resultsComponent from './resultsComponent';
import VueSocialSharing from 'vue-social-sharing';

Vue.use(VueSocialSharing);
// Vue.component('question-component', questionsComponent);
Vue.component('results-component', resultsComponent);

const routes = [
    { 
        path: '/', 
        component: homeComponent,
    },
    { 
        path: '/test', 
        component: questionsComponent,
        props: {questions: dataQuestions, results: dataResults}
    },
  ]
const router = new VueRouter({
    routes 
});

let app = new Vue({
    el: '#app',
    router,
    data: {
      dataQuestions,
      dataResults,
    },
    methods: {
        openMenu() {
            this.$refs.mobile.classList.add('mobile-menu--active');
        },
        closeMenu() {
            this.$refs.mobile.classList.remove('mobile-menu--active');
        }
    }
})

