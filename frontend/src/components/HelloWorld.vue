<template>
  <div class="hello">

    <!--<v-btn color="blue" v-on:click="greet">Start</v-btn>-->
    <!--<v-img-->
    <!--:src='getImgUrl()'-->
    <!--aspect-ratio="1"-->
    <!--class="grey lighten-2"-->
    <!--&gt;</v-img>-->
    <!-- <template v-if="toggle"> -->


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
                  v-for="n in 900"
                  :key="n"
                  xs2
                  d-flex
                  class="lg5-custom"
                >
                  <v-card flat tile class="d-flex">
                    <div :id="`httpSpace${n}`">
                      <v-img
                        :src="getHttpUrl(n)"
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
                  v-for="n in 900"
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
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
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
        mqttFinal: 0
        
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
      testA() {
        for (let i = 0; i < 100; i++) {
          console.log("A")
        }
      },
      testB() {
        for (let i = 0; i < 100; i++) {
          console.log("B")
        }
      },
      testC() {
        for (let i = 0; i < 100; i++) {
          console.log("C")
        }
      },
      async testAsync() {
        await Promise.all([this.testA(), this.testB(), this.testC()])
      },
      async startConnect() {

        // await Promise.all([this.openWebSocket(7700), this.greet()]);
        // await Promise.all([this.greet(), this.openWebSocket(7700)]);
        this.openWebSocket(7700);
      },
      changeImage(spaceID, imageBase64) {
        var container = window.document.getElementById(spaceID).firstChild.firstChild.nextSibling;

        // var imageBase64 = "data:image/jpeg;base64,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"
        container.style.backgroundImage = "url('" + imageBase64 + "')"

        console.log(container.style.backgroundImage)
      },
      openWebSocket(webSocketPort) {
        startTimeMQTT = new Date();

        var ws = new WebSocket("ws://localhost:" + webSocketPort);
        console.log(window.WebSocket)

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
            // console.log(objData)

            this.imageBytes = 'data:image/jpeg;base64,' + objData.image
            var imageID = "mqttSpace" + objData.number

            var container = window.document.getElementById(imageID).firstChild.firstChild.nextSibling;

            container.style.backgroundImage = "url('" + this.imageBytes + "')"

            if (receivedNum == 900) {
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
      greet: function (event) {
        // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
        // window.location.reload(true)

        console.log('greet');
        this.http2Count = 0;
        // this.startTime(this.startTimeHTTP2);
        startTimeHTTP2 = new Date();
        // startTimerHTTP2()
        console.log(startTimeHTTP2 + "입니다.");

        var http2UrlArr = new Array(901);
        // var http2Url = "https://localhost:8089/images/http2_900/image_part_"; //10.90.2.102
        var http2Url = "https://10.90.2.102:8089/images/http2_900/image_part_"; //10.90.2.102

        for (let i = 1; i <= 900; i++) {
          var tempHttp2Url = http2Url;
          if (i < 10)
            tempHttp2Url += "00";
          else if (i < 100)
            tempHttp2Url += "0";

          http2UrlArr[i] = tempHttp2Url + i + ".jpg";
          var imageID = "httpSpace" + i;

          var container = window.document.getElementById(imageID).firstChild.firstChild.nextSibling;
          container.style.backgroundImage = "url('" + http2UrlArr[i] + "')"
        }
        // clearInterval(timerIDHTTP2);
        // endTime(startTimeHTTP2, endTimeHTTP2, 'HTTP2');

        endTimeHTTP2 = new Date();
        var seconds = Math.round(endTimeHTTP2 - startTimeHTTP2);
        console.log(msToTime(seconds));


        // const h1Target = 'http://www.example.com/';
        // const h2Target = 'https://www.example.com/';
        // module.get(h1Target, (res)=>{
        //   console.log(`
        //     Url : ${h1Target}
        //     Status : ${res.statusCode}
        //     HttpVersion : ${res.httpVersion}
        //   `);
        // });

        // `event` 는 네이티브 DOM 이벤트입니다
        if (event) {
          // alert(event.target.tagName)
        }


      },
      getImgUrl: function () {
        return this.url
      },
      getHttpUrl: function (i) {
        var http2Url = "https://10.90.2.102:8089/images/http2_900/image_part_"; //10.90.2.102

        var tempHttp2Url = http2Url;
        if (i < 10)
          tempHttp2Url += "00";
        else if (i < 100)
          tempHttp2Url += "0";

        return tempHttp2Url + i + ".jpg";
      }
    },
    watch: {
      http2Count: function (data) {
        console.log(data);
        if (data === 900) {
          console.log("loading finish");
          this.endTimeHTTP2 = new Date();
        }
      },
      endTimeHTTP2: function (data) {
        this.http2Final = msToTime(data - this.startTimeHTTP2);
      }

    }
  }

  // MQTT
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .imageRatio {
    width: 100%;
    padding-bottom: 75%;
    background: gold; /** <-- For the demo **/
  }

  @media (min-width: 1264px) and (max-width: 1903px) {
    .flex.lg5-custom {
      width: 3.33%;
      max-width: 3.33%;
      flex-basis: 3.33%;
    }
  }

  .hello {
    max-height: 780px;
  }

</style>

