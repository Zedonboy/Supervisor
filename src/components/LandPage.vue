<template>
  <div>
    <TopBar/>
    <v-content>
      <router-view/>
    </v-content>
  </div>
</template>
<script>
import TopBar from './TopBap.vue';
import Collect from './CollectInput.vue';
export default {
  components : {
    TopBar,
    Collect
  }
}
</script>