<template>
  <v-col cols="12" sm="4">
    <v-card outlined class="d-flex flex-row justify-center">
      <v-col cols="12" sm="10">
        <v-text-field
          dense
          :error-messages="surnameError"
          v-model="studentData.surname"
          label="Surname"
          outlined
        ></v-text-field>
        <v-text-field
          dense
          :error-messages="othernameError"
          v-model="studentData.othername"
          label="OtherName"
          hint="For example, 'Obinna'"
          outlined
        ></v-text-field>
        <v-text-field
          dense
          :error-messages="matricNoError"
          v-model="studentData.matric_no"
          label="Matric No"
          hint="For example, 'Obinna'"
          outlined
        ></v-text-field>
        <v-text-field
          dense
          :error-messages="incourseError"
          v-model="studentData.incourse"
          type="number"
          label="Incourse"
          hint="For example, 20"
          outlined
        ></v-text-field>
        <v-text-field
          dense
          type="number"
          v-model="studentData.exam"
          label="Exam"
          hint="For example, 60"
          outlined
        ></v-text-field>
        <v-text-field
          dense
          v-model="studentData.total"
          type="number"
          label="Total"
          hint="For example, A"
          outlined
        ></v-text-field>
        <v-text-field dense v-model="studentData.grade" label="Grade" outlined></v-text-field>
        <div>
          <span>signature:</span>&nbsp;
          <span id="calculated_sig" class="flashing">{{ signature }}</span>
        </div>
        <v-btn color="primary" @click="verify">Verify</v-btn>&nbsp;
        <v-btn color="primary" @click="recorrect">Recorrect</v-btn>
      </v-col>
    </v-card>
  </v-col>
</template>
<script>
import $ from "jquery"

export default {
  data() {
    return {
      originalData: {},
      computedSig: ""
    };
  },
  computed: {
    signature() {
      let value =
        this.computedSig.length > 0 ? this.computedSig : this.original_sig;
      return value;
    }
  },
  props: ["studentData", "original_sig"],
  methods: {
    verify() {
      let new_sig = "";
      for (const key in this.studentData) {
        new_sig += this.calculateSig(this.studentData[key].toString());
      }
      this.computedSig = new_sig;
      this.checker()
    },

    
    recorrect() {
      Object.assign(this.studentData, this.originalData);
      this.computedSig = "";
    },

    checker () {
      if (this.original_sig == this.signature) {
        $("#calculated_sig")
          .removeClass()
          .toggleClass("right-text flashing text-center")
          .text(char);
      } else {
        $("#calculated_sig")
          .removeClass()
          .toggleClass("wrong-text flashing text-center")
          .text(char);
      }
    }
  },

  mounted() {
    Object.assign(this.originalData, this.studentData);
  }
};
</script>
<style>
.right-text {
  color: #41ad48;
}
.wrong-text {
  color: red;
}
.flashing {
  animation: flasher 700ms infinite;
}

@keyframes flasher {
  50% {
    opacity: 0;
  }
}

</style>