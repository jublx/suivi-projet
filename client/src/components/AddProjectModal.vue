<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900/50"></div>
    <div class="mx-auto bg-white w-11/12 md:w-2/3 2xl:w-1/3 shadow-xl rounded-xl z-50">
      <div class="flex justify-between bg-gray-800 text-white w-full rounded-t-xl px-6 py-2">
        <h1 class="font-bold text-xl">Nouveau projet</h1>
      </div>
      <div class="grid grid-cols-1 w-full lg-grid-cols-2 gap-6 p-4">
        <div class="flex flex-wrap">
          <label class="text-gray-700 font-bold text-left" for="username">Nom du projet</label>
          <input v-model="form.name" type="text" :class="[errors.name ? 'border-red-500 ring-red-100':'']" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring">
          <small v-if="errors.name" class="text-red-500 italic mt-2 text-sm">{{ errors.name.msg }}</small>
        </div>
        <div class="flex flex-wrap">
          <label class="text-gray-700 font-bold text-left" for="username">Équipe du projet</label>
          <team-selector @change="changeSelectedTeam" class="w-full"></team-selector>
        </div>
      </div>
      <div class="flex justify-end px-6 py-2 w-full mb-2">
        <button @click="close" class="bg-gray-100 hover:bg-gray-200 rounded shadow-md font-bold p-2 border">Annuler</button>
        <button @click="send" class="bg-green-500 hover:bg-green-600 rounded shadow-md text-white font-bold px-4 py-2 ml-4">Créer</button>
      </div>
    </div>
  </div>
</template>

<script>
import TeamSelector from '../components/TeamSelector.vue'

export default {
  data() {
    return {
      form: {
        name: null,
        teamId: null,
      },
      errors: {}
    }
  },
  components: {
    TeamSelector
  },
  methods: {
    send() {
      this.axios
        .post('/projects', this.form)
        .then((response) => {
          if(response.data.errors) {
            this.errors = response.data.errors
            console.log(response.data)
          }
          else
            this.projectCreated()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeSelectedTeam(team) {
      this.form.teamId = team ? team.id : null
    },
    close() {
      this.$emit('close')
    },
    projectCreated() {
      console.log("projectCreated function")
      this.$emit('projectCreated')
    }
  },
  emits: ['close', 'projectCreated']
}
</script>