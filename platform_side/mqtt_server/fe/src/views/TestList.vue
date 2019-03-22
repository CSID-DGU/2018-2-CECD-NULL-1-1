<template>
  <v-container class="font-kor mx-0" fluid>
    <v-layout align-end justify-center column>
      <v-flex text-xs-right>
        <span class="font-kor">컴퓨터공학종합설계2 NULL팀</span>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row class="mt-2 pt-5">
      <v-flex>
        <v-expansion-panel dark class="black">
          <v-expansion-panel-content  
            v-for="testItem in testItems" :key="testItem.id">
            <template v-slot:header>
              <div class="white--text" style="font-size:30px">{{testItem.title}}</div>
            </template>
            <v-card>
              <!-- <v-container>
                <v-img :src="`${testItem.image}`"></v-img>
              </v-container> -->
              <v-card-title primary-title>
                <div>
                  <div class="grey--text" style="font-size:30px">{{testItem.detail}}</div>
                  <!-- <span class="grey--text" style="font-size:20px">{{testItem.detail}}</span> -->
                </div>
              </v-card-title>
              <v-card-actions class="ml-3 mb-3">
                <span class="mr-3">
                  <v-text-field
                    v-model="imageNumber"
                    label="이미지 개수"
                    required
                    style="font-size:25px"
                    v-if="testItem.id == 1"
                  ></v-text-field>
                  <v-text-field
                    v-model="imageNumber"
                    label="이미지 분할 개수"
                    required
                    style="font-size:25px"
                    v-if="testItem.id == 2"
                  ></v-text-field>
                </span>
                <v-btn large color="grey" @click="startTest" class="mx-4" v-if="testItem.id == 2">
                  <span style="font-size:20px">사진 불러오기</span>
                </v-btn>
                <v-btn large color="black" @click="startTest">
                  <span style="font-size:20px">테스트 시작</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    data (){
      return {
        imageNumber:  null,
        testItems: {
          test1: {
            id: 1,
            title:'여러 개의 이미지를 전송하는 경우',
            image:"https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
            detail:'HTTP/2와 MQTT 프로토콜을 사용하여 여러 개의 이미지를 전송하는 경우를 비교합니다.'
          },
          test2: {
            id: 2,
            title:'사용자지정 이미지 전송',
            image:"https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
            detail:'HTTP/2와 MQTT 프로토콜을 사용하여 원하는 이미지를 지정한 개수만큼 분할하여 전송하는 경우를 비교합니다.'
          },
        },
      }
    },
    methods: {
      startTest() { 
        this.$router.push({path: '/test'});
      }
    }
  }
</script>
