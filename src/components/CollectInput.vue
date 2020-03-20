<template>
  <v-form v-model="formValid">
    <v-container>
      <v-row class="d-flex flex-row justify-center">
        <v-col cols="12" sm="10">
          <v-alert v-show="showNotif" type="success">Last Operation was successful</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            :error-messages="surnameError"
            v-model="surname"
            label="Surname"
            hint="For example, 'Obinna'"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :error-messages="othernameError"
            v-model="othername"
            label="OtherName"
            hint="For example, 'Obinna'"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :error-messages="matricNoError"
            v-model="matric_no"
            label="Matric No"
            hint="For example, 'Obinna'"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :error-messages="incourseError"
            v-model="incourse"
            type="number"
            label="Incourse"
            hint="For example, 20"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field :error-messages="examError" type="number" v-model="exam" label="Exam" hint="For example, 60" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            disabled
            v-model="total"
            type="number"
            label="Total"
            hint="For example, A"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="grade"
            disabled
            label="Grade"
            hint="For example, 'Obinna'"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn :disabled="!formValid" large color="primary" @click="next">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import calc from "./SignatureCalc"
import { validationMixin } from "vuelidate";
import { required, alpha, between } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin, calc],
  computed: {
    surnameError() {
      const errors = [];
      if (!this.$v.surname.alpha) errors.push("Surname should be alphabet");
      if (!this.$v.surname.required) errors.push("Surname is required");
      return errors;
    },
    othernameError() {
      const errors = [];
      if (!this.$v.othername.alpha) errors.push("Othername should be alphabet");
      if (!this.$v.othername.required) errors.push("Othername is required");
      return errors;
    },
    incourseError() {
      const errors = [];
      if (!this.$v.incourse.between)
        errors.push("Incourse should be between 0 to 30");
      return errors;
    },
    examError() {
      const errors = [];
      if (!this.$v.exam.between)
        errors.push("Exam should be between 0 to 70");
      return errors;
    },

    matricNoError() {
      const errors = [];
      if (!this.$v.matric_no.required) errors.push("Matric is required");
      return errors;
    }
  },
  validations: {
    matric_no: {
      required
    },
    surname: {
      required,
      alpha
    },
    othername: {
      required,
      alpha
    },

    incourse: {
      required,
      between: between(0, 30)
    },

    exam: {
      required,
      between: between(0, 70)
    }
  },
  data() {
    return {
      showNotif : false,
      formValid: false,
      surname: "",
      othername: "",
      incourse: 0,
      matric_no: "",
      exam: 0,
      grade: "F",
      total: 0
    };
  },

  methods: {
    verify() {
      let new_sig = "";
      let data = {
        surname: this.surname,
        othername: this.othername,
        incourse: this.incourse,
        matric_no: this.matric_no,
        exam: this.exam,
        grade: this.grade,
        total: this.total
      };
      for (const key in data) {
        new_sig += this.calculateSig(data[key].toString());
      }
      return new_sig;
    },

    next() {
      let data = {
        surname: this.surname,
        othername: this.othername,
        incourse: this.incourse,
        matric_no: this.matric_no,
        exam: this.exam,
        grade: this.grade,
        total: this.total
      };
      this.$store.commit("addObject", {
        student: data,
        sig: this.verify()
      });
      this.$store.dispatch("saveData")
      this.showNotif = true
      setTimeout(() => {
        this.showNotif = false
      }, 1500)
      //this.$router.push("/show");
    },

    listen() {
      this.total = parseInt(this.exam) + parseInt(this.incourse);
      this.checkGrade(this.total);
    },
    checkGrade(score) {
      if (score >= 70) {
        this.grade = "A";
        return;
      }
      if (score >= 65) {
        this.grade = "B";
        return;
      }
      if (score >= 60) {
        this.grade = "C";
        return;
      }
      if (score >= 50) {
        this.grade = "D";
        return;
      }
      if (score < 50) {
        this.grade = "F";
      }
    }
  },

  watch: {
    exam(old, newV) {
      this.listen();
    },

    incourse(old, newV) {
      this.listen();
    }
  }
};
</script>