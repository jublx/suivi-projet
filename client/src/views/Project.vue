<template>
  <div v-if="!loading">
    <div class="flex justify-between w-11/12 mx-auto">
      <div class="flex">
        <h1 class="text-4xl font-thin">{{ projectData.name }}</h1>
        <div :class="`ml-4 text-xs h-4 pb-1 rounded-full mt-4 px-2 text-white font-bold uppercase bg-${projectData.team.color}-600`">{{ projectData.team.name }}</div>
      </div>
      <div class="flex text-xl mt-3">
        <i class="fas fa-user"/><p class="ml-3 -mt-[2px]">{{ projectData.tasks.map(a => a.responsibles.length).reduce((tmp, a) => tmp + a, 0) }}</p>
      </div>
    </div>
    <div class="relative pt-10 w-11/12 lg:w-5/6 mx-auto">
      <div class="flex mb-2 items-center justify-between">
        <div>
          <span class="text-md font-bold inline-block py-1 uppercase text-blue-500">
            Progression globale
          </span>
        </div>
        <div class="text-right">
          <span class="text-md font-semibold inline-block text-blue-600">
            {{ progression }} %
          </span>
        </div>
      </div>
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div :style="`width:${progression}%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-l from-rose-400 via-fuchsia-500 to-indigo-500 transition-all"></div>
      </div>
    </div>
    <div v-for="task in projectData.tasks" :key="task.id">
      
    </div>
  </div>
  <div v-if="loading" class="flex justify-center lg:w-11/12 w-[98%] mx-auto mt-96">
    <spinner></spinner>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'

export default {
  data() {
    return {
      loading: true,
      projectData: {}
    }
  },
  methods: {
    getProjectData() {
      this.axios
        .get(`/projects/${this.$route.params.id}`)
        .then((response) => {
          this.projectData = response.data
          this.loading = false
          console.log(this.projectData)
        })
    },

  },
  computed: {
    progression() {
      if(this.projectData) {
        let avg = this.projectData.tasks.map(a => a.state).reduce((a, b) => a + b, 0) / this.projectData.tasks.length
        return Math.round(avg)
      }
      else
        return 0
    }
  },
  mounted() {
    this.getProjectData()
  },
  components: {
    Spinner
  }
}
</script>