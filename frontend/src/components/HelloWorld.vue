<template>
  <div class="hello">
    <h1>{{ inho }}</h1>
    <v-btn color="blue" v-on:click="greet">Start</v-btn>
    <!--<v-img-->
      <!--:src='getImgUrl()'-->
      <!--aspect-ratio="1"-->
      <!--class="grey lighten-2"-->
    <!--&gt;</v-img>-->
    <template v-if="toggle">
    <v-layout :key="control">
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
                    :src="`https://localhost:8080/images/article${n % 5 + 1}.jpg`"
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
    </template>

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
                  :src="`https://localhost:8080/images/article${n % 5 + 1}.jpg`"
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      control: 0,
      toggle: true,
      msg: 'Welcome to Your Vue.js App !!!!!!!!!!!',
      inho: 'he is handsome',
      url: 'data:image/jpeg;base64,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'
    }
  },
  methods: {
    greet: function (event) {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
      // window.location.reload(true)

      const baseURI = 'https://localhost:8080/images/article1.jpg';
      this.$http.get(`${baseURI}`, {	headers: {'Content-Type': 'multipart/form-data', 'Cache-Control' : 'no-cache' } })
        .then((result) => {
          console.log(result)
          // this.posts = result.data
        })

      this.control++
      this.inho = this.msg
      this.url = ''
      // this.url = 'data:image/jpeg;base64,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';
      // alert('Hello ' + this.inho + '!')
      // `event` 는 네이티브 DOM 이벤트입니다
      if (event) {
        // alert(event.target.tagName)
      }


    },
    getImgUrl: function() {
      return this.url
    }
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
