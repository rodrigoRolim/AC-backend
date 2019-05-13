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
          <v-btn color="info" small>Editar</v-btn>
          <v-btn color="error" small>Excluir</v-btn>
          <v-btn color="success" small :disabled="!show">+ Item</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
    <v-layout row>
    <v-flex xs12 sm12>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
              avatar
              ripple
              @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
               
                <v-icon
                  color="#00BFFF"
                >
                  delete
                </v-icon>

                <v-icon
                  color="yellow darken-2"
                >
                  edit
                </v-icon>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>

    </v-flex>
  </v-layout>
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
      show: false,
      selected: [2],
      items: [
          {
            action: '15 min',
            headline: 'Brunch this weekend?',
            title: 'Ali Connors',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          {
            action: '2 hr',
            headline: 'Summer BBQ',
            title: 'me, Scrott, Jennifer',
            subtitle: "Wish I could come, but I'm out of town this weekend."
          },
          {
            action: '6 hr',
            headline: 'Oui oui',
            title: 'Sandra Adams',
            subtitle: 'Do you have Paris recommendations? Have you ever been?'
          },
          {
            action: '12 hr',
            headline: 'Birthday gift',
            title: 'Trevor Hansen',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?'
          },
          {
            action: '18hr',
            headline: 'Recipe to try',
            title: 'Britta Holt',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
          }
        ]
    }
  },

    methods: {
      toggle (index) {
        const i = this.selected.indexOf(index)

        if (i > -1) {
          this.selected.splice(i, 1)
        } else {
          this.selected.push(index)
        }
      }
    }
}
</script>

<style scoped>
.card {
  width: 100%;
  margin: 0;
  border: 1px solid rgba(0,0,0,0.01);
}
</style>
