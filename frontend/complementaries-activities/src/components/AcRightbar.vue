<template>
  <div id="ac-rightbar">
    <v-btn color="primary" flat class="new-group">novo grupo</v-btn>
    <ac-card-group class="card" v-for="group in groupList" :key="group.id" :group="group"></ac-card-group>
  </div>
</template>

<script>
import AcCardGroup from './AcCardGroup'
export default {
  name: 'AcRightbar',
  components: { AcCardGroup },
  data () {
    return {
      groupList: [
        {
          name: 'grupo 1',
          items: [
            {
              name: 'item 1',
              id: 0
            }
          ]
        },
        {
          name: 'grupo 2',
          items: [
            {
              name: 'item 2',
              id: 1
            }
          ]
        },
        {
          name: 'grupo 2',
          items: [
            {
              name: 'item 2',
              id: 1
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
#ac-rightbar {
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  max-height: 81vh;
  width: 40%;
  overflow-y: auto;
}
.new-group {
  width: 50%;
  align-self: center;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.5);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
