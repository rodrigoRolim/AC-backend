<template>
  <v-layout row>
    
      <v-card class="card">

        <v-card-title primary-title>
          <div>
            <div class="headline">Grupo 1</div>
            <span class="grey--text">atividades esportivas, artisticas, físicas</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="info">Editar</v-btn>
          <v-btn  flat color="error">Excluir</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            <ol>
              <li>item 1 ccccccccccccccccccccccccccccccccccccccccccc</li>
              <li>item 2</li>
              <li>item 3</li>
              <li>item 4</li>
              <li>item 5</li>
              <li>item 6</li>
              <li>item 7</li>
            </ol>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    
  </v-layout>
</template>
<script>
export default {
  name: 'AcCarfGroup',
  props: ['group'],
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  margin: 0;
}
ol {
  width: 100%;
  display: flex;
  flex-direction: column;
}
li {
  width: 100%;
  list-style-type: none;
  word-break: break-all;
  padding: 5px 0px;
}
</style>
