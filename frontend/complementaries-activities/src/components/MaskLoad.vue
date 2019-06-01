<template>
  <div class="modal-mask">
    <v-progress-circular
      class="modal-container"
      :size="100"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1.0);
  display: table;
  transition: opacity .3s ease;
}
.modal-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 40vh auto;
  padding: 0;
  transition: all .3s ease;
}
</style>