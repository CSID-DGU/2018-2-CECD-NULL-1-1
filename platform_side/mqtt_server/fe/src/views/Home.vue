<template>
  <v-container class="font-kor mx-0" fluid>
    <v-layout align-end justify-center column>
      <v-flex text-xs-right>
        <span class="font-kor">컴퓨터공학종합설계2 NULL팀</span>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center column class="mt-4 pt-5">
      <v-flex text-xs-center>
        <div class="font-kor mb-4" style="font-size:120px">HTTP/2 vs MQTT</div>
        <span class="font-kor" style="font-size:30px">프로토콜 테스트 플랫폼을 통한 모바일 iot 환경에서 HTTP/2와 MQTT 프로토콜 성능 비교분석</span>
      </v-flex>
      <v-flex>
        <div class="text-xs-center mt-5">
          <v-btn @click="goToTestList" outline large depressed round color="white" class="font-weight-black" style="border-width:4px" dark>
            <i class="material-icons">keyboard_arrow_right</i>시작하기
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    methods: {
      goToTestList() { 
        this.$router.push({path: '/testList'});
      }
    }
  }
</script>
