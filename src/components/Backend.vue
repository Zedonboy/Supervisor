<template>
  <v-container>
    <v-row>
      <student-card
        :key="idx"
        v-for="(data, idx) in dataList"
        :studentData="data.student"
        :original_sig="data.sig"
      />
      <v-btn @click="add" color="pink" fab dark bottom right fixed>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import StudentCard from "./StudentCard.vue";
export default {
  computed: {
    dataList() {
      return this.$store.state.dataList
    }
  },
  methods : {
      add () {
          this.$router.back()
      }
  },
  components: {
    StudentCard
  }
};
</script>