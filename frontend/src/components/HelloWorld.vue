<template>
  <div class="hello">
    <div id="testAd"></div>

    <v-container fluid ma-0 pa-0 fill-height>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs6 sm6 md6 lg6 xl6 ma-0>
          <div class="display-4">HTTP</div>
          <!--<h1>{{ http2Count }}</h1>-->
          <h1>{{ http2Final }}</h1>
          <v-btn class="blue">End</v-btn>
          <v-card>
            <v-container grid-list-sm fluid>
              <v-layout row wrap>
                <v-flex
                  v-for="n in testCaseNum"
                  :key="n"
                  xs2
                  d-flex
                  class="lg5-custom"
                >
                  <v-card flat tile class="d-flex">
                    <div :id="`httpSpace${n}`">
                      <v-img
                        aspect-ratio="1"
                        class="grey lighten-2"
                        @load="http2Count++"
                      >
                      </v-img>
                    </div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs6 sm6 md6 lg6 xl6 offset-sm3 ma-0>
          <div class="display-4">MQTT</div>
          <h1 id="timeMQTT">0</h1>
          <v-btn class="red" @click="startConnect()">Start</v-btn>
          <v-card>
            <v-container grid-list-sm fluid>
              <v-layout row wrap>
                <v-flex
                  v-for="n in testCaseNum"
                  :key="n"
                  xs2
                  d-flex
                  class="lg5-custom"
                >
                  <v-card flat tile class="d-flex">
                    <div :id="`mqttSpace${n}`">
                      <v-img
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                      </v-img>
                    </div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  var receivedNum = 0;
  var startTimeHTTP2 = 0, endTimeHTTP2 = 0;
  var startTimeMQTT = 0, endTimeMQTT = 0;

  function startTime(startTime) {
    startTime = new Date();
  }

  function endTime(startTime, endTime, type) {
    if (type == "MQTT") {
      mqttDone = true;
      // clearInterval(timerIDMQTT);
    } else {
      // http2Done = true;
      setInterval(function () {
        http2Done = true;
      }, 2000);
      // console.log("HTTP/2 END", timerIDHTTP2);
      // clearInterval(timerIDHTTP2);
    }

    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    // timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff);
    // console.log(seconds + " seconds : " + type);
    console.log(timeDiff + " ms : " + type);
    // console.log(endTime + " " + startTime);
    // console.log(endTime === startTime);
    console.log(msToTime(seconds));

    return msToTime(seconds);
  }

  function msToTime(duration) {
    var milliseconds = duration % 1000,
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    // seconds = (seconds < 10) ? "0" + seconds : seconds;

    seconds += minutes * 60;
    return seconds + "." + milliseconds + " s";
  }

  var timerIDMQTT; // 타이머를 핸들링하기 위한 전역 변수
  var timerIDHTTP2; // 타이머를 핸들링하기 위한 전역 변수
  var mqttDone = false;
  var http2Done = false;

  /* 타이머를 시작하는 함수 */
  function startTimerHTTP2() {
    timerIDHTTP2 = setInterval(checkTimeHTTP2, 1);
  }

  /* 타이머를 시작하는 함수 */
  function startTimerMQTT() {
    // timerIDMQTT = setInterval(checkTimeMQTT, 1);
    timerIDHTTP2 = setInterval(checkTimeHTTP2, 1);
  }

  function checkTimeHTTP2() {
    // console.log(http2Done + " : " + mqttDone);
    if (!http2Done) {
      var nowTime = new Date();

      var x1 = document.getElementById("timeHTTP2");
      console.log("HTTP2 timer");
      x1.innerHTML = (nowTime - startTimeHTTP2) / 1000;
    }

    if (!mqttDone) {
      var nowTime = new Date();

      var x2 = document.getElementById("timeMQTT");
      console.log("MQTT timer");
      x2.innerHTML = (nowTime - startTimeHTTP2) / 1000;
    }

  }

  function checkTimeMQTT() {
    if (!mqttDone) {
      var nowTime = new Date();

      var x2 = document.getElementById("timeMQTT");
      // console.log("MQTT timer");
      x2.innerHTML = (nowTime - startTimeHTTP2) / 1000;
    }

  }

  export default {
    name: 'HelloWorld',
    data() {
      return {
        control: 0,
        toggle: true,
        inho: 'HTTP/2 VS MQTT ',
        url: 'data:image/jpeg;base64,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',
        imageBytes: '',
        wsk: null,
        startTimeHTTP2: new Date(),
        endTimeHTTP2: 0,
        startTimeMQTT: 0,
        endTimeMQTT: 0,
        http2Count: 0,
        http2Final: 0,
        mqttCount: 0,
        mqttFinal: 0,
        timerIDHTTP2: null,
        http2Done: false,
        stopwatchHttp2: null,
        testCaseNum: 500
      }
    },
    mounted() {
    },
    beforeDestroy() {
      console.warn('beforeDestroy', Date.now())
    },
    destroyed() {
      console.warn('destroyed', Date.now())
    },
    methods: {
      async startConnect() {

        this.openWebSocket(7700);
      },
      // 웹소켓 생성하고 서버로부터 데이터 받아오는 함수
      openWebSocket(webSocketPort) {
        // 테스트 시작시간
        startTimeMQTT = new Date();

        // 웹소켓 생성
        var ws = new WebSocket("ws://localhost:" + webSocketPort);

        // 연결이 수립되면 서버에 메시지를 전송한다
        ws.onopen = function (event) {
          console.log("connected")
          ws.send("mqttStart");
        }

        // 서버로 부터 메시지를 수신한다
        // 전송받은 이미지를 출력하도록해줌
        var i = 0;
        ws.onmessage = function (event) {
          if (event.data != "give") {
            receivedNum += 1
            var objData = JSON.parse(event.data)
            console.log(objData)

            this.imageBytes = 'data:image/jpeg;base64,' + objData.image
            var imageID = "mqttSpace" + objData.number

            var container = window.document.getElementById(imageID).firstChild.firstChild.nextSibling;

            container.style.backgroundImage = "url('" + this.imageBytes + "')"

            if (receivedNum === 100) {
              endTimeMQTT = new Date();

              window.document.getElementById('timeMQTT').innerHTML = msToTime(endTimeMQTT - startTimeMQTT)

              console.log('end')
              ws.send("testEnd")
            }
          }
        }

        // error event handler
        ws.onerror = function (event) {
          console.log("Server error message: ", event.data);
        }

        // close event handler
        ws.onclose = function (event) {
          console.log("Server close message: ", event);
        }
      },
      getHttpUrl: function (i) {
        var size = 200;
        var http2Url = "https://10.90.3.147:8089/images/sample/" + size + "/blue";
        // var http2Url = "https://10.90.3.147:8089/images/http2_900/image_part_"; //10.90.2.102
        // var http2Url = "https://10.90.3.147:8089/images/http2/"; //10.90.2.102

        // var tempHttp2Url = http2Url;
        // if (i < 10)
        //   tempHttp2Url += "00";
        // else if (i < 100)
        //   tempHttp2Url += "0";

        // https://10.90.3.147:8089/images/tiger100x100/image_27.15_16.jpeg

        // let width = 50;

        // http2Url += (parseInt((i + 49)/ width)) + "_";
        // http2Url += (i % width + 1) + ".jpeg";

        return http2Url + i + ".jpg";
      },
      checkTimeHTTP2: function () {
        if (!this.http2Done) {
          this.endTimeHTTP2 = new Date();
        }
      }
    },
    watch: {
      http2Count: function (data) {
        console.log(data);
        if (data === 1)
          this.timerIDHTTP2 = setInterval(this.checkTimeHTTP2, 1);

        if (data === this.testCaseNum) {
          console.log("loading finish");
          this.http2Done = true;
          clearInterval(this.timerIDHTTP2);
          this.endTimeHTTP2 = new Date();
        }
      },
      endTimeHTTP2: function (data) {
        this.http2Final = msToTime(data - this.startTimeHTTP2);
      }

    }
  }

</script>

<style scoped>
  .imageRatio {
    width: 100%;
    padding-bottom: 75%;
    background: gold; /** <-- For the demo **/
  }

  @media (min-width: 1264px) and (max-width: 1903px) {
    .flex.lg5-custom {
      width: 5%;
      max-width: 5%;
      flex-basis: 5%;
    }
  }

  .hello {
    max-height: 780px;
  }

  .stopwatch {
    font-size: 2vw;
    height: 100%;
    line-height: 10vh;
    text-align: center;
  }
</style>

