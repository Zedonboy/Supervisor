<template>
  <v-carousel
    light
    :cycle="cycle"
    v-model="idx"
    height="100vh"
    hide-delimiter-background
    interval="2000"
    :show-arrows="false"
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet color="white" height="100%">
        <v-row class="fill-height d-flex flex-column" align="center" justify="center">
          <img  width="200" :src="slideImg[i]"/>
          <div style="margin-top: 20px" class="display-3">{{ slide }}</div>
          <v-btn style="margin-top: 20px" @click="home" v-if="showGetstarted(i)" color="primary">Get Started</v-btn>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

</template>
<script>
export default {
  data() {
    return {
      cycle : true,
      idx : 0,
      enable: false,
      slideImg : ["assets/planet.svg", "assets/smart.png", "assets/server.png", "assets/message.png"],
      slides: ["Final Update", "Smart Grade Calculation", "Intelligent Database", "Watch Dog Notification System"],
      
    };
  },

  watch : {
    idx (old, newV){
      if(newV == 2) this.cycle = false
    }
  },

  methods : {
    showGetstarted (idx) {
      return idx == 3 ? true : false
    },

    home () {
      this.$router.push("/home")
    }
  },

  mounted() {
    setTimeout(() => {
      this.enable = true;
    }, 3000);
  }
};
</script>