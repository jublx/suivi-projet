<template>  
  <div class="flex justify-between w-11/12 mx-auto">
    <h1 class="text-4xl font-thin">Tableau de bord</h1>
  </div>
  <div class="container mx-auto mt-10">
    <router-link to="/projects/current">
      <button @click="view = 0" :class="view == 0 ? 'text-blue-600 border-blue-500':'text-gray-700 hover:border-gray-500'" class="h-10 px-4 py-2 -mb-px text-center text-xl bg-transparent border-b-2 whitespace-nowrap focus:outline-none">
          <i class="fas fa-hourglass-half text-base"/> En cours
      </button>
    </router-link>
    <router-link to="/projects/archived">
      <button @click="view = 1" :class="view == 1 ? 'text-blue-600 border-blue-500':'text-gray-700 hover:border-gray-500'" class="h-10 px-4 py-2 -mb-px text-center text-xl bg-transparent border-b-2 whitespace-nowrap focus:outline-none ">
          <i class="fas fa-box text-base"/> Archivés
      </button>
    </router-link>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      view: 0,
    }
  },
}
</script>