import { createWebHistory, createRouter } from "vue-router";


const routes = [
  {
    path: '/',
    redirect: '/projects/current',
  },
  {
    path: '/projects',
    component: () => import('./views/Home.vue'),
    children: [
      {
        path: 'current',
        component: () => import('./views/CurrentProjects.vue')
      },
      {
        path: 'archived',
        component: () => import('./views/ArchivedProjects.vue')
      }
    ]
  },
  {
    path: '/projects/:id',
    component: () => import('./views/Project.vue')
  },
  {
    path: '/projects/add',
    component: () => import('./views/AddProject.vue')
  },
  {
    path: '/settings',
    component: () => import('./views/Settings.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;