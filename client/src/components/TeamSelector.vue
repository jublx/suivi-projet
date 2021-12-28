<template>
  <div v-if="clicked" @click="clicked = !clicked" class="absolute top-0 left-0 w-full h-full z-1"></div>
  <div class="relative w-full md:w-1/2 xl:w-1/3 min-h-[40px]">
    <div @click="clicked = !clicked" class="flex h-full hover:cursor-pointer justify-between w-full mt-1 rounded-md px-5 items-center border shadow-sm border-gray-300 placeholder-gray-400 transition-all" :class="clicked ? 'border-blue-500':''">
      <span class="uppercase font-medium mt-px">{{ selectedTeam ? selectedTeam.name : '' }}</span>
      <i class="fas fa-sort text-gray-700"/>
    </div>
    <transition enter-active-class="scale-in-ver-top" leave-active-class="">
      <div v-if="clicked" class="absolute w-full bg-white py-1 border shadow-lg border-gray-300 rounded-md mt-1 z-4">
        <div v-for="team in teams" :key="team.id" @click="teamChanged(team); clicked = false" class="flex justify-between px-5 uppercase items-center hover:cursor-pointer py-2 hover:text-white hover:bg-blue-600">
          <p>{{ team.name }}</p>
          <i v-if="team.id == selectedTeam.id" :class="`fas fa-check text-blue-600`"/>
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
        name: "toutes",
        color: "gray"
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
  },
  methods: {
    teamChanged(team) {
      this.selectedTeam = team
      this.$emit('change', team.name)
    }
  },
  emits: ['change']
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