<template>
  <div class="movies">
    <div>IoT에서 데이터 전송시간 측정을 통한 프로토콜 성능 비교</div>
    <v-btn class="red" @click="go()">Start</v-btn>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        movies: []
      }
    },
    methods:{
      go(){
        this.$router.push('/test');
      }
    }
  }
</script>

<style scoped>

</style>
