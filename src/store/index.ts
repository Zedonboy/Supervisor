//@ts-nocheck
import Vue from 'vue'
import Vuex from 'vuex'
import fs from "fs"
Vue.use(Vuex)
const dir = __dirname+"/db/db.json"
export default new Vuex.Store({
  state: {
    dataList : [],
    characterTable : ["W","U","V","T","S","R","Q","P","O","N","M","L","K","J","I","H","G","F","E","D","C","B","A"]
  },
  mutations: {
    addObject (state, paylod : any){
      //@ts-ignore
      state.dataList.push(paylod)
    }
  },
  actions: {
    loadData (cntx) {
      fs.exists(dir, exists => {
        if(exists) {
          fs.readFile(dir, (err, buf) => {
            if(err){ 
              console.log(err)
              return
             } 
            let content = buf.toString("utf8")
            let obj = JSON.parse(content)
            if(obj) cntx.commit("addObject", obj)
          })
        }
      })
    },

    saveData (cntx) {
      let jsonString = JSON.stringify(cntx.state.dataList)
      fs.writeFile(dir, jsonString, {
        flag : "w+"
      } , (err) => {
        if(err)console.log(err)
      })
    }
  },
  modules: {
  }
})
