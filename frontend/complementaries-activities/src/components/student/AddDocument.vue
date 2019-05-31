<template>
  <v-app>
     <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/aluno/home">Home</v-btn>
        <v-btn flat color="blue-grey" to="/aluno/documento/add">
        documento <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <v-btn color="error" @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <v-layout justify-center class="container">
    
      <v-flex xs12 sm10 md9 lg9>
        <transition>
          <v-alert
          :value="successUpload"
          :type="alert"
          >
            {{ messageAlert }}
         </v-alert>
        </transition>
        <v-form 
          enctype="multipart/form-data"
          @submit.prevent="save"
          ref="form"
        >
          <v-card>
          <v-card-text>
            <v-text-field
              ref="name"
              v-model="document.name"
              :rules="[() => !!document.name || 'This field is required']"
              label="Nome do documento"
              placeholder="Qualquer nome que você quise"
              required
            ></v-text-field>
            <v-autocomplete
              ref="group"
              v-model="document.group"
              @change="changeItem"
              :rules="[() => !!document.group || 'This field is required']"
              :items="groupsNames"
              label="Grupo"
              placeholder="Select..."
              required
            ></v-autocomplete>
            <v-autocomplete
              ref="item"
              v-model="document.item"
              :rules="[() => !!document.item || 'This field is required']"
              :items="items"
              label="Item"
              placeholder="Select..."
              required
            ></v-autocomplete>
            <v-text-field
              type="number"
              ref="score"
              v-model="document.score"
              :rules="[() => !!document.score || 'This field is required']"            
              label="Pontos (o que você acha)*"
              placeholder="10"
              required
            ></v-text-field>
           
            <v-text-field
              ref="score"
              v-model="docName"
              :rules="[() => !!docName || 'This field is required']"
              label="Selecione o documento*"
              prepend-icon="attach_file"
              @click="pickFile"
              required
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="doc"
              @change="onFilePicked"
            >        
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions class="justify-end">
            <v-btn color="success" dark depressed to="/aluno/home">voltar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" dark depressed @click="reset">Resetar</v-btn>
            <v-btn color="primary" dark depressed type="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import pdf from 'pdfvuer'
import DocumentService from '@/services/Document.js'
import GroupService from '@/services/Group'
export default {
  name: 'AddDocument',
  components: { AcNavbar, pdf },
  data () {
    return {
      successUpload: false,
      messageAlert: '',
      alert: 'success',
      document: {
        name: null,
        score: null,
        path: null,
        group: null,
        item: null,
        student: JSON.parse(localStorage.getItem('user'))._id
      },
      rules: {
        required: value => !!value || 'Required'
      },
      items: [],
      groups: [],
      groupsNames: [],
      docName: '',
      docUrl: '',
      docFile: ''
    }
  },
  created () {
    GroupService.readAll()
      .then((groups) => {
        this.groups = groups.data
        this.namesGroups(groups.data)
      })
  },
  methods: {
    namesGroups (groups) {
      groups.map((group) => {
        console.log(group)
        this.groupsNames.push(group.name)
      })
    },
    changeItem () {
      this.items = []
      const groups = this.groups.filter((group) => this.document.group == group.name) // group.seq
      groups[0].items.map((item) => {
        console.log(item)
        this.items.push(item.description)
      })
      
    },
    save () {
      // const group = this.groups.filter(group => this.document.group == group.name)
          // this.document.group = group[0].seq
        //}
      //})
      const formData = new FormData()
      formData.append('document', JSON.stringify(this.document))
      formData.append('file', this.docFile)

      DocumentService.save(formData)
        .then((res) => {
          this.reset()
          this.alert = 'success'
          this.messageAlert = 'carregado com sucesso!'
          this.successUpload = true
          setTimeout(() => {
            this.successUpload = false
          }, 5000)

        })
        .catch((err) => {
          this.alert = 'error'
          this.messageAlert = err.response.data.error
          this.successUpload = true
            setTimeout(() => {
            this.successUpload = false
          }, 5000)
        })
    },
    reset () {
      this.$refs.form.reset()
    },
    pickFile () {
     
      this.successUpload = false
      this.$refs.doc.click()
      
    },
    onFilePicked (e) {
      const files = e.target.files
      if (typeof files[0] !== undefined) {
        
        this.docName = files[0].name

        if (this.docName.lastIndexOf('.') <= 0) {
          return 
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          
          this.docUrl = fr.result
          this.docFile = files[0] //that can be sent to server

        })
      } else {
        this.docName = ''
        this.docUrl = ''
        this.docFile = ''
      }
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/aluno')
    },
  }
}
</script>

<style scoped>
.container {
  margin-top: 30px;
}
</style>