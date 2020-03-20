<template>
<v-app>
  <router-view/>
</v-app>
</template>
<script>
export default {
  mounted () {
    this.$router.push("/feature")
    this.$store.dispatch("loadData")
  }
}
</script>

