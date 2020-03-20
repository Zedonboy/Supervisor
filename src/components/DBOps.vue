<template>
  <v-container>
    <v-row>
      <v-switch v-model="smsEnable" class="ma-2" label="Notify With Sms(Use this only during presentation)"></v-switch>
      <v-switch v-model="emailEnable" class="ma-2" label="Notify With Email"></v-switch>
    </v-row>
    <v-row class="d-flex flex-row justify-center">
      <v-col cols="12" sm="10">
        <v-alert v-show="error" type="danger">{{errorMssg}}</v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <v-data-table :headers="headers" :items="students">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Student Database</v-toolbar-title>

              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.surname" label="Surname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.othername" label="Othername"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.matric_no" label="Matric No"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.incourse" label="Incourse"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.exam" label="Exams"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.total" label="Total"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.grade" label="Grade"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            <v-icon small @click="recorrect(item)">mdi-reload</v-icon>
          </template>
          <template v-slot:item.grade="{ item }">
            <v-chip :color="getColor(item.grade)" dark>{{ item.grade }}</v-chip>
          </template>
          <template v-slot:item.valid="{ item }">
            <v-chip :color="getColorValid(item.valid)" v-text="validChecker(item.valid)" dark>{{ }}</v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import nodeMailer from "nodemailer";
import Calc from "./SignatureCalc";
import Sms from "../service/sms"
export default {
  mixins: [Calc],
  transporter: null,
  data() {
    return {
      smsEnable : false,
      emailEnable : true,
      errorMssg: "",
      students: [],
      dialog: false,
      editedItem: {},
      editedIndex: -1,
      defaultItem: {
        surname: "",
        incourse: 0,
        exam: 0,
        total: 0,
        matric_no: "",
        grade: ""
      },
      headers: [
        {
          text: "Surname",
          align: "start",
          sortable: false,
          value: "surname"
        },
        { text: "Other Name", value: "othername", sortable: false },
        { text: "Matric No", value: "matric_no", sortable: false },
        { text: "Incourse", value: "incourse" },
        { text: "Exam", value: "exam" },
        { text: "Total", value: "total" },
        { text: "Grade", value: "grade", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
        { text: "Valid", value: "valid", sortable: false }
      ]
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    recorrect(item) {
      let editedIndex = this.students.indexOf(item);
      let correctRow = this.$store.state.dataList[editedIndex].student;
      let newArr = [...this.students];
      newArr[editedIndex] = correctRow;
      this.students = newArr;
    },
    getColorValid(valid) {
      if (valid == undefined) return "green";
      if (valid) return "green";
      else return "red";
    },
    getColor(grade) {
      switch (grade) {
        case "A":
          return "green";
          break;
        case "B":
          return "pink";
          break;
        case "F":
          return "red";
          break;
        case "C":
          return "orange";
          break;
        case "D":
          return "yellow";
        default:
          break;
      }
    },
    validChecker(valid) {
      if (valid == undefined) return "Yes";
      if (valid) return "Yes";
      else return "No";
    },
    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {},
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        let originalStudent = this.$store.state.dataList[this.editedIndex];
        let originalSig = this.$store.state.dataList[this.editedIndex].sig;
        let newSig = "";
        for (const key in this.editedItem) {
          newSig += this.calculateSig(key.toString());
        }
        if (newSig != originalSig) {
          this.editedItem.valid = false;
          let newArr = [...this.students];
          newArr[this.editedIndex] = Object.assign({}, this.editedItem);
          this.students = newArr;
          this.editedItem = {};
          if(this.emailEnable){
            const mailOptions = {
            from: "supervisory555@gmail.com", // sender address
            to:
              "cc.okezie@unizik.edu.ng, drhcinyiama@gmail.com, ifeyinwaodimson@gmail.com", // list of receivers
            subject: "Alert a change in Student", // Subject line
            text: `${originalStudent.surname} is trying to change his/her record` // plain text body
          };
          this.$options.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              this.errorMssg = "Email Service currently have issues";
              setTimeout(() => {
                this.errorMssg = "";
              }, 1500);
            }
          });
          }
          
          if(this.smsEnable){
            let from = "SuperVisor System"
            let to = ["2348032266191", "2348032638315", "2348034701121"]
            let sender = Sms.createSmsFactory()
            for (const number of to) {
              sender(from, number, `${originalStudent.surname} is trying to change his/her record`)
            }  
          }
        }
      }
      this.close();
    }
  },

  computed: {
    error() {
      return this.errorMssg.length > 0 ? true : false;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  created() {
    this.students = this.$store.state.dataList.map(v => v.student);
    this.$options.transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "supervisory555@gmail.com",
        pass: "08038785983"
      }
    });
  }
};
</script>