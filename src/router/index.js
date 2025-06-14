import { createRouter, createWebHashHistory } from 'vue-router';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import PfCustom from '../views/PfCustom.vue';
import PfMixtape from '../views/PfMixtape.vue';
import Welcome from '../views/Welcome.vue';
import ResetPassword from '../views/ResetPassword.vue';
import Discover from '../views/Discover.vue';
import Favorites from '../views/Favorites.vue';
import Feed from '../views/Feed.vue';
import Profile from '../views/Profile.vue';
import OtpVerification from '../views/OtpVerification.vue'; // Add this import

const routes = [
  { 
    path: '/#/', 
    name: 'Root',
    beforeEnter: (to, from, next) => {
      const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      const onboardingStep = localStorage.getItem('onboardingStep');

      if (!isLoggedIn) {
        next('/signup');
      } else {
        if (onboardingStep === 'pfcustom') next('/pfcustom');
        else if (onboardingStep === 'pfmixtape') next('/pfmixtape');
        else if (onboardingStep === 'welcome') next('/welcome');
        else next('/discover'); 
      }
    }
  },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { path: '/otp-verification', component: OtpVerification }, // Add this line
  { path: '/discover', component: () => import('../views/Discover.vue') },
  { path: '/forgot-password', component: ForgotPassword }, 
  { path: '/pfcustom', component: PfCustom }, 
  { path: '/pfmixtape', component: PfMixtape },
  { path: '/welcome', component: Welcome },
  { path: '/reset-password', component: ResetPassword },
  { path: '/favorites', component: Favorites },
  { path: '/feed', component: Feed },
  { path: '/profile/:id', component: Profile },
  { path: '/profile', component: Profile },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

  const publicPages = ['/login', '/signup', '/terms', '/forgot-password', '/reset-password', '/otp-verification']; // Add '/otp-verification' here
  const isPublic = publicPages.includes(to.path);

  if (!isLoggedIn && !isPublic) {
    return next('/login');
  }

  next(); 
});

export default router;
