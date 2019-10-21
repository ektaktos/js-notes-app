import Vue from 'vue';
import Router from 'vue-router';
import Notes from './components/Notes.vue';
import Note from './components/Note.vue';
import Addnote from './components/Addnote.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Logout from './components/Logout.vue';
import Update from './components/UpdateNote.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'notes',
      component: Notes,
    },
    {
      path: '/note/:id',
      name: 'note',
      component: Note,
      props: true,
    },
    {
      path: '/add',
      name: 'addNote',
      component: Addnote,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/update/:id',
      name: 'update',
      component: Update,
      props: true,
    },
  ],
});
