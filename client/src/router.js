import Vue from 'vue';
import Router from 'vue-router';
import Notes from './components/Notes.vue';
import Note from './components/Note.vue';
import Addnote from './components/Addnote.vue';

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
  ],
});
