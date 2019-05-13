<template>
  <v-layout row>
    <v-flex xs12 sm6 md12 >
      <v-card class="card">
        
        <v-list two-line>
          <template v-for="(item, index) in listProfessor">
            <v-list-tile
              :key="item.title"
              ripple
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.email }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn
                  color="info"
                  small
                  @click="goEdit(item._id)"
                >
                  editar
                </v-btn>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index + 1 < listProfessor.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'AcPerfil',
  props: ['listProfessor'],
  data () {
    return {

    }
  },
  methods: {
    goEdit (id) {
      this.$router.replace(`/admin/professor/${id}`)
    }
  },
}
</script>

<style scoped>
.card {
  width: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(0,0,0,0.01);
}
</style>
