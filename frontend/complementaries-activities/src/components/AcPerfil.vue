<template>
  <v-layout row>
    <v-flex xs12 sm6 md12>
      <v-card>
        <v-card-title  primary-title>
          <div class="informations">
            <div class="headline">{{oneProfessor.name}}</div>
            <span class="grey--text">{{oneProfessor.email}}</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn color="info" small>Editar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'AcPerfil',
  props: ['oneProfessor'],
  data () {
    return {
      show: false
    }
  },

}
</script>

<style scoped>
.actions {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center
}
.title {
  margin-top: 10px;
}
.informations {
  display: flex;
  flex-direction: column;
}
.perfil {
  border: 1px solid;
  border-radius: 4px;
  height: 35vh;
  width: 100%;
}
</style>
