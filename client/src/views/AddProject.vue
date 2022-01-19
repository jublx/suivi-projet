<template>
  <div class="flex items-start mx-10">
    <h1 class="text-4xl font-thin">Nouveau projet</h1>
  </div>
  <div class="flex flex-wrap mx-auto w-full mt-[20vh] md:w-2/3 xl:w-1/2 shadow-xl rounded-xl">
    <div class="flex justify-between bg-gray-800 text-white w-full rounded-t-xl px-6 py-2">
      <h1 class="font-bold text-xl">Nouveau projet</h1>
    </div>
    <div class="grid grid-cols-1 w-full lg-grid-cols-2 gap-6 p-4">
      <div class="flex flex-wrap">
        <label class="text-gray-700 font-bold text-left" for="username">Nom du projet</label>
        <input id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring">
      </div>
      <div class="flex flex-wrap">
        <label class="text-gray-700 font-bold text-left" for="username">Équipe du projet</label>
        <team-selector class="w-full"></team-selector>
      </div>
    </div>
    <div class="flex justify-end px-6 py-2 w-full mb-2">
      <button class="bg-gray-100 hover:bg-gray-200 rounded shadow-md font-bold p-2 border">Annuler</button>
      <button class="bg-green-500 hover:bg-green-600 rounded shadow-md text-white font-bold px-4 py-2 ml-4">Créer</button>
    </div>
  </div>
</template>

<script>
import TeamSelector from '../components/TeamSelector.vue'

export default {
  components: {
    TeamSelector
  }
}
</script>