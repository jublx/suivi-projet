<template>
  <div class="mt-10">
    <div class="grid md:grid-cols-5 lg:grid-cols-4 grid-flow-row gap-y-2 lg:w-11/12 w-[98%] mx-auto px-px mb-10">
      <team-selector @change="changeSelectedTeam"></team-selector>
      <input v-model="search" class="md:col-span-3 lg:col-span-2 justify-self-center mt-1 px-3 py-2 w-full bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Rechercher par nom"/>
      <router-link to="/projects/add" class="mt-8 md:mt-1 w-full md:w-fit justify-self-end font-bold bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-md"><i class="fas fa-plus"/>Ajouter</router-link>
    </div>
    <transition-group name="list" tag="div" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
      <div v-for="(project, index) in filteredProjectList" :key="project.id" :data-index="index">
        <div class="group grid grid-cols-1 xl:grid-cols-5 gap-y-8 mx-auto w-[98%] hover:cursor-pointer lg:w-11/12 shadow-md rounded-xl border-2 border-gray-100 hover:shadow-lg transition-all p-8 my-5">
          <div class="xl:col-span-3">
            <div class="flex">
              <h1 class="text-2xl font-medium text-left text-gray-700 uppercase">{{ project.name }}</h1>
              <div :class="`ml-4 text-xs h-4 pb-1 rounded-full mt-3 px-2 text-white font-bold uppercase bg-${project.team.color}-600`">{{ project.team.name }}</div>
            </div>
            <div class="text-left -mt-2">
              <span class="inline-block w-16 h-1 rounded-full bg-blue-500 group-hover:w-32 transition-all"></span>
              <span class="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500"></span>
              <span class="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500"></span>
            </div>
          </div>
          <div class="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 md:gap-12 p-2 sm:p-12 xl:p-0 gap-y-8">
            <div class="justify-self-center h-16 flex w-full rounded-xl shadow-md">
              <div class="w-16 h-16 bg-amber-100 rounded-bl-xl">
                <i class="fas fa-tasks text-amber-700 text-3xl mt-4"/>
              </div>
              <div class="place-self-center w-full -ml-8">
                <span class="text-amber-700 text-2xl">{{ project.tasks.length }}</span> {{ project.tasks.lenght > 1 ? "tâches":"tâche" }}
              </div>
            </div>
            <div class="justify-self-center h-16 flex w-full rounded-xl shadow-md">
              <div class="w-16 h-16 bg-lime-100 rounded-bl-xl">
                <i class="fas fa-user text-lime-700 text-3xl mt-4"/>
              </div>
              <div class="place-self-center w-full -ml-4">
                <span class="text-lime-700 text-2xl">{{ project.tasks.map(a => a.responsibles.length).reduce((tmp, a) => tmp + a, 0) }}</span> affectations
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
  <div v-if="loading" class="flex justify-center lg:w-11/12 w-[98%] mx-auto mt-24">
    <spinner></spinner>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import TeamSelector from '../components/TeamSelector.vue'
import 'velocity-animate/velocity'

export default {
  data() {
    return {
      loading: true,
      projectData: [],
      search: "",
      projectFilter: {
        team: "toutes"
      }
    }
  },
  mounted() {
    this.axios
      .get('http://localhost:8080/projects/current')
      .then((response) => {
        this.projectData = response.data
        this.loading = false
      })
  },
  computed: {
    filteredProjectList() {
      if(!this.loading) {
        return this.projectData.filter((entry) => {
          return entry.name.toLowerCase().includes(this.search.toLowerCase()) && (entry.team.name == this.projectFilter.team || this.projectFilter.team == "toutes")
        })
      } else {
        return []
      }
    }
  },
  methods: {
    changeSelectedTeam(team) {
      this.projectFilter.team = team
    },
    beforeEnter: function (el, done) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(el, {opacity: 1}, {complete: done})
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          {opacity: 0, height: 0},
          { complete: done }
        )
      }, delay)
    }
  },
  components: {
    Spinner,
    TeamSelector
  }
}
</script>

<style scoped>
/* declare team colors for tailwind to generate them, as FIP mode must be active since tailwindcss 3 */
.bg-red-600 {}
.bg-orange-600 {}
.bg-amber-600 {}
.bg-yellow-600 {}
.bg-lime-600 {}
.bg-green-600 {}
.bg-emerald-600 {}
.bg-teal-600 {}
.bg-cyan-600 {}
.bg-sky-600 {}
.bg-blue-600 {}
.bg-indigo-600 {}
.bg-violet-600 {}
.bg-purple-600 {}
.bg-fuchsia-600 {}
.bg-pink-600 {}
.bg-rose-600 {}
</style>
