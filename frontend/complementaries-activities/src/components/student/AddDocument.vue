<template>
  <v-app>
    <mask-load v-if="showMask"></mask-load>
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
       <!--<v-progress-linear v-if="load" :indeterminate="load"></v-progress-linear>-->
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
              v-if="!this.$route.params.id"
              ref="score"
              v-model="docName"
              :rules="[() => !!docName || 'This field is required']"
              label="Selecione o documento*"
              prepend-icon="attach_file"
              @click="pickFile"
              required
            ></v-text-field>
            <input
              v-if="!this.$route.params.id"
              type="file"
              style="display: none"
              ref="doc"
              @change="onFilePicked"
            >        
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions class="justify-end">
            <v-btn color="success" :disabled="load" :loading="load" depressed to="/aluno/home">voltar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" :disabled="load" :loading="load" depressed @click="reset">Resetar</v-btn>
            <v-btn color="primary" depressed :disabled="load" :loading="load" type="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import DocumentService from '@/services/Document.js'
import GroupService from '@/services/Group'
export default {
  name: 'AddDocument',
  components: { AcNavbar, MaskLoad },
  data () {
    return {
      showMask: false,
      load: false,
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
    this.showMask = true
    GroupService.readAll()
      .then((res) => res.data)
      .then((groups) => {
        this.groups = groups
        return groups
      })
      .then((groups) => this.namesGroups(groups))
      .then(() => setTimeout(() => { this.showMask = false }, 1000))
      .then(() => {
        if (this.$route.params.id) {
          this.getDocument(this.$route.params.id)
        }
      })
  },
  methods: {
    getDocument (id) {
      DocumentService.getById(id)
        .then((res) => res.data[0])
        .then((document) => {
          this.document = document
          return document
        })
        .then((document) =>  this.getItemsWhenUpdate(document))
        .catch((err) => {

        })
    },
    getItemsWhenUpdate (document) {
      const group = this.groups.filter((group) => group.name === document.group)
      group[0].items.map((item) => {
        this.items.push(item.description)
      })
    },
    namesGroups (groups) {
      groups.map((group) => {
        this.groupsNames.push(group.name)
      })
    },
    changeItem () {
      this.items = []
      const groups = this.groups.filter((group) => this.document.group == group.name)
      groups[0].items.map((item) => {
        this.items.push(item.description)
      })
      
    },
    getIdGroupItem (nameGroup, nameItem) {
      const group = this.groups.filter((group) => group.name == nameGroup)[0]
      const item = this.getIdItem(group.items, nameItem)
      return [group._id, item._id]
    },
    getIdItem (items, nameItem) {
      const item = items.filter((item) => item.description == nameItem)[0]
      return item
    },
    save () {
      // ! impact 
      // 
      const ids = this.getIdGroupItem(this.document.group, this.document.item)
      this.document.group = ids[0]
      this.document.item = ids[1]

      const formData = new FormData()
      formData.append('document', JSON.stringify(this.document))
      //this.load = true
      if (typeof this.$route.params.id == 'undefined') {
        
        formData.append('file', this.docFile)
        DocumentService.save(formData)
          .then((res) => {
            //this.load = false
            this.getAlert('success', 'carregado com sucesso!')
          })
          .catch((err) => {
            this.getAlert('error', err.response.data.error)
          })
      } else {
        const idDoc = this.$route.params.id
        DocumentService.update(idDoc, JSON.parse(formData.get('document')))
          .then((res) => {
            this.getAlert('success', 'atualizado com sucesso!')
          })
      }
    },
    getAlert (type, message) {
      this.reset()
      this.alert = type
      this.messageAlert = message
      this.successUpload = true
      setTimeout(() => {
        this.successUpload = false
      }, 5000)
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