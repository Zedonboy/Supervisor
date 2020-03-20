<script>
export default {
  methods: {
    calculateSig(data) {
      let total = 0;
      for (let i = 0; i < data.length; i++) {
        let asciiCode = data.charCodeAt(i);
        total += asciiCode;
      }
      let mod = total % 23;
      return this.$store.state.characterTable[mod];
    }
  }
};
</script>