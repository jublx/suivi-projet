<template>  
  <header class="text-white bg-gray-800">
    <nav class="h-64">
      <div class="container mx-auto w-11/12 3xl:w-4/5 flex flex-wrap p-5 pt-12 pb justify-between">
        <div>
          <router-link to="/" class="group text-3xl font-bold transition-colors italic" href="#">
            <i class="fas fa-frog group-hover:text-lime-500 transition-all"/> Suivi Projet
          </router-link>
        </div>        
        <router-link to="/settings" class="-my-1 text-sm font-medium text-gray-700" href="#">
          <button class="flex items-center px-2 py-2 font-medium tracking-wide text-black capitalize transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-300 focus:outline-none">
            <i class="fas fa-cog text-xl mr-2 ml-1" />
            <span class="mx-1 font-semibold text-lg mr-2">Paramètres </span>
          </button>
        </router-link>
      </div>
    </nav>
  </header>

  <div class="container min-h-screen px-5 py-10 mx-auto w-11/12 3xl:w-4/5 shadow-xl -mt-[120px] rounded-3xl bg-white">
    <router-view></router-view>
  </div>

  <footer class="container mx-auto py-8">
    <div class="">
      Made with <i class="fas fa-heart text-red-500"/> by Julien Clipet
    </div>
  </footer>
</template>


<script setup>


</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F3F4F6;
}

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

