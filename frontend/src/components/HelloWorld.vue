<template>
  <div class="hello">
    <v-btn color="success" @click="openWebSocket(7700)">Sucs</v-btn>
    <v-btn color="success" @click="printImage">Success</v-btn>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-container grid-list-sm fluid>
            <v-layout row wrap>
              <v-flex
                v-for="n in 100"
                :key="n"
                xs2
                d-flex
                class="lg5-custom"
              >
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="`https://localhost:8082/images/article${n % 5 + 1}.jpg`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex
              v-for="n in 100"
              :key="n"
              xs2
              d-flex
              class="lg5-custom"
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`https://localhost:8082/images/article${n % 5 + 1}.jpg`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    </v-layout>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import VueWebsocket from "vue-websocket";

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App !!!!!!!!!!!',
      imageBytes: '',
      sibal:''
    }
  },
  mounted(){
    // this.openWebSocket(7700)
  },
  updated(){
    console.log('updated1')
    this.$nextTick(function () {
      console.log('updated')
    })
  },
  socket: {
      // Prefix for event names
      // prefix: "/counter/",

      // If you set `namespace`, it will create a new socket connection to the namespace instead of `/`
      // namespace: "/counter",

      events: {

          // Similar as this.$socket.on("changed", (msg) => { ... });
          // If you set `prefix` to `/counter/`, the event name will be `/counter/changed`
          //
          changed(msg) {
              console.log("Something changed: " + msg);
          }

          /* common socket.io events
          connect() {
              console.log("Websocket connected to " + this.$socket.nsp);
          },

          disconnect() {
              console.log("Websocket disconnected from " + this.$socket.nsp);
          },

          error(err) {
              console.error("Websocket error!", err);
          }
          */

      }
  },
  methods: {
    printImage(){
      console.log(this.imageBytes)
      console.log('sibal : '+this.sibal)
      // this.openWebSocket(7700)
    },
    openWebSocket (webSocketPort) {
      this.$Vue.use(VueWebsocket, "ws://localhost:"+webSocketPort);

      var ws = new WebSocket("ws://localhost:"+webSocketPort);

      // 연결이 수립되면 서버에 메시지를 전송한다
      ws.onopen = function(event) {
        console.log("connected")
        ws.send("mqttStart");
      }

      // 서버로 부터 메시지를 수신한다
      // 전송받은 이미지를 출력하도록해줌
      ws.onmessage = function(event) {
        this.imageBytes = 'data:image/jpeg;base64,' + event.data
        console.log("Server message: ", this.imageBytes);
        this.printImage()
        this.changeData(this.imageBytes)
      }

      // error event handler
      ws.onerror = function(event) {
        console.log("Server error message: ", event.data);
      }
    },
    changeData (data){
      this.sibal = data
    },
  }
}

// MQTT
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

@media (min-width: 1264px) and (max-width: 1903px) {
  .flex.lg5-custom {
    width: 10%;
    max-width: 10%;
    flex-basis: 10%;
  }
}

</style>

