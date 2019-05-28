<template>
  <v-card class="text-xs-center progress">
   <v-toolbar-title class="grey--text text--darken-2">Progresso</v-toolbar-title>
    <v-progress-circular
      :rotate="360"
      :size="120"
      :width="15"
      :value="value"
      color="teal"
    >
      {{ value }}% <strong>Grupo 1</strong>
    </v-progress-circular>
   
    <v-progress-circular
      :rotate="-90"
      :size="120"
      :width="15"
      :value="value"
      color="primary"
    >
      {{ value }}% <strong>Grupo 2</strong>
    </v-progress-circular>

    <v-progress-circular
      :rotate="90"
      :size="120"
      :width="15"
      :value="value"
      color="red"
    >
      {{ value }}% <strong>Grupo 3</strong>
    </v-progress-circular>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      interval: {},
      value: 0
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  }
}
</script>

<style scoped>
.v-progress-circular {
    margin: 1rem
}
.progress {
  margin: 5px auto;
  width: 90%;
}
strong {
  font-size: 1.15rem
}
</style>