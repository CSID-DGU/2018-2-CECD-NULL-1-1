<template>
  <v-container>
    <v-layout align-end justify-center column class="">
      <v-flex text-xs-right>
        <span class="font-kor">컴퓨터공학종합설계2 NULL팀</span>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row class="pt-3">
      <v-flex text-xs-center xs5>
        <span class="font-kor" style="font-size:80px">HTTP/2</span>
      </v-flex>
      <v-flex text-xs-center xs2>
        <span class="font-kor" style="font-size:50px">vs</span>
      </v-flex>
      <v-flex text-xs-center xs5>
        <span class="font-kor" style="font-size:80px">MQTT</span>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row class="pb-5">
      <v-flex text-xs-center xs5>
        <v-layout row wrap v-for="n in 10">
          <v-img aspect-ratio="1" v-for="n in 10" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"></v-img>
        </v-layout>
      </v-flex>
      <v-flex xs2></v-flex>
      <v-flex text-xs-center xs5>
        <v-layout row wrap v-for="n in 10">
          <v-img aspect-ratio="1" v-for="n in 10" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"></v-img>
        </v-layout>
      </v-flex>
    </v-layout>
    <div class="text-xs-center mb-5">
      <v-btn outline large depressed round color="white" class="font-weight-black" style="border-width:4px" dark @click="fillData()">
        결과보기
      </v-btn>
      <v-btn outline large depressed round color="white" class="font-weight-black" style="border-width:4px" dark @click="goToTestList">
        다른 테스트
      </v-btn>
    </div>
    <v-layout align-center justify-center row class="white pa-5 ma-5">
      <v-flex>
        <reactive :chart-data="datacollection"></reactive>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Reactive from '@/components/Reactive'

  export default {
    components: {
      Reactive
    },
    data() {
      return {
        respondTimeHTTP: 10,
        respondTimeMQTT: 20,
        memoryUsageHTTP: 30,
        memoryUsageMQTT: 40,
        datacollection: null // instantiating datacollection with null
      }
    },
    created() {
      
    },
    methods: {
      goToTestList() { 
        this.$router.push({path: '/testList'});
      },
      fillData() {
        this.datacollection = {
          // Data for the y-axis of the chart
          labels: ['평균 응답시간', '평균 메모리사용량'],
          datasets: [
            {
              label: 'HTTP/2',
              backgroundColor: '#FF5E00',
              // Data for the x-axis of the chart
              data: [this.respondTimeHTTP, this.memoryUsageHTTP]
            },
            {
              label: 'MQTT',
              backgroundColor: '#0054FF',
              data: [this.respondTimeMQTT, this.memoryUsageMQTT]
            }
          ]
        }
      },
    }
  }
</script>
