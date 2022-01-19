<template>
  <div class="mt-10">
    <div class="grid md:grid-cols-5 lg:grid-cols-4 grid-flow-row gap-y-2 lg:w-11/12 w-[98%] mx-auto px-px mb-10">
      <team-selector @change="changeSelectedTeam" :addOptionAll="true" class="md:w-full lg:w-2/3"></team-selector>
      <input v-model="search" class="md:col-span-3 lg:col-span-2 justify-self-center mt-1 px-3 py-2 w-full bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Rechercher par nom"/>
      <button @click="showAddProject = true" class="mt-8 md:mt-1 w-full md:w-fit justify-self-end font-bold bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-md"><i class="fas fa-plus"/> Ajouter</button>
    </div>
    <transition-group name="list" tag="div" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
      <div v-for="(project, index) in filteredProjectList" :key="project.id" :data-index="index">
        <router-link :to="`/projects/${project.id}`">
          <div class="group grid grid-cols-1 xl:grid-cols-5 gap-y-8 mx-auto w-[98%] hover:cursor-pointer lg:w-11/12 shadow-md rounded-xl border-2 border-gray-100 hover:shadow-lg transition-all p-8 my-5">
            <div class="xl:col-span-4">
              <div class="flex">
                <h1 class="text-2xl font-medium text-left text-gray-700 uppercase">{{ project.name }}</h1>
                <div :class="`ml-4 text-xs h-4 pb-1 rounded-full mt-2 px-2 text-white font-bold uppercase bg-${project.team.color}-600`">{{ project.team.name }}</div>
              </div>
              <div class="text-left -mt-2">
                <span class="inline-block w-16 h-1 rounded-full bg-blue-500 group-hover:w-32 transition-all"></span>
                <span class="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500"></span>
                <span class="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500"></span>
              </div>
            </div>
            <div class="grid grid-cols-1 md:gap-12 p-2 sm:p-12 xl:p-0 gap-y-8">
              <div class="justify-self-center h-16 flex w-full rounded-xl shadow-md">
                <div class="w-16 h-16 bg-amber-100 rounded-bl-xl">
                  <i class="fas fa-tasks text-amber-700 text-3xl mt-4"/>
                </div>
                <div class="place-self-center w-full -ml-8">
                  <span class="text-amber-700 text-2xl">{{ project.tasks.length }}</span> {{ project.tasks.length > 1 ? "tâches":"tâche" }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </transition-group>
  </div>
  <div v-if="loading" class="flex justify-center lg:w-11/12 w-[98%] mx-auto mt-24">
    <spinner></spinner>
  </div>
  <transition v-on:before-enter="beforeEnterFade" v-on:enter="enterFade" v-on:leave="leaveFade">
    <add-project-modal v-if="showAddProject" @close="showAddProject = false" @projectCreated="onProjectCreated"></add-project-modal>
  </transition>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import TeamSelector from '../components/TeamSelector.vue'
import AddProjectModal from '../components/AddProjectModal.vue'
import gsap from 'gsap'

export default {
  data() {
    return {
      loading: true,
      projectData: [],
      search: "",
      projectFilter: {
        team: "toutes"
      },
      showAddProject: false
    }
  },
  mounted() {
    this.getProjectData()
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
      this.projectFilter.team = team.name
    },
    beforeEnter: function (el, done) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      gsap.to(el, {
        opacity: 1,
        height: "auto",
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    },
    leave: function (el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        onComplete: done
      })
    },
    beforeEnterFade: function (el, done) {
      el.style.opacity = 0
    },
    enterFade: function (el, done) {
      gsap.to(el, {
        opacity: 1,
        duration: 0.2,
        onComplete: done
      })
    },
    leaveFade: function (el, done) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.1,
        onComplete: done
      })
    },
    getProjectData() {
      this.axios
        .get('/projects/current')
        .then((response) => {
          this.projectData = response.data
          this.loading = false
        })
    },
    onProjectCreated() {
      this.showAddProject = false,
      this.getProjectData()
    }
  },
  components: {
    Spinner,
    TeamSelector,
    AddProjectModal
  }
}
</script>
