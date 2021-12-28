<template>
  <div class="relative w-full md:w-1/2 lg:w-1/6">
    <div @click="clicked = !clicked" class="flex h-full hover:cursor-pointer justify-between w-full mt-1 rounded-md px-5 items-center border shadow-sm border-gray-300 placeholder-gray-400 transition-all" :class="clicked ? 'border-blue-500':''">
      <span class="uppercase font-medium mt-px">{{ selectedTeam ? selectedTeam.name : '' }}</span>
      <i class="fas fa-sort text-gray-700"/>
    </div>
    <transition enter-active-class="scale-in-ver-top" leave-active-class="">
      <div v-if="clicked" class="absolute w-full bg-white py-1 border shadow-lg border-gray-300 rounded-md mt-1 z-10">
        <div v-for="team in teams" :key="team.id" @click="selectedTeam = team; clicked = false" class="flex px-5 uppercase items-center hover:cursor-pointer py-2 hover:text-white hover:bg-blue-600">
          {{ team.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: false,
      teams: [{
        id: 0,
        name: "toutes"
      }],
      selectedTeam: null
    }
  },
  mounted() {
    this.axios
      .get('http://localhost:8080/teams')
      .then((response) => {
        this.teams = this.teams.concat(response.data)
        this.selectedTeam = this.teams[0]
      })
  }
}
</script>

<style scoped>
.scale-in-ver-top {
	-webkit-animation: scale-in-ver-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-ver-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/**
 * ----------------------------------------
 * animation scale-in-ver-top
 * ----------------------------------------
 */
@-webkit-keyframes scale-in-ver-top {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
}
@keyframes scale-in-ver-top {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
}

</style>