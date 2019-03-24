<template>
  <div class="hello">
    <v-btn color="success">Success</v-btn>
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App !!!!!!!!!!!'
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
