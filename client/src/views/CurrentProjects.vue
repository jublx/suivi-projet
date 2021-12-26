<template>
  <div class="mt-10 text-red-600">
    <h1>Projets en cours</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectData: null
    }
  },
  mounted() {
    this.axios
      .get('http://localhost:8080/projects')
      .then((response) => {
        this.projectData = response.data
      })
  }
}
</script>