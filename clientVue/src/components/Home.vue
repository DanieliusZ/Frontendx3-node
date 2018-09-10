<template>
  <div class="hello">
    <h1>Panels</h1>
    <v-container>
      <v-layout>
        <v-flex>
          <div class="card" v-for="item in panels" :key="item._id">
            <div class="card-body rounded border border-info">
                <img class="card-img-top" :src="item.url" :alt="item.description">
                <h6 class="card-subtitle mb-2 text-muted">Author: {{item.author}}</h6>
                <p class="card-text">{{item.description}}</p>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      panels:null
    }
  },
  mounted(){
    let headers=new Headers();
    const that=this;
    headers.append('Content-Type', 'application/json');
    axios.get('http://localhost:4000/home', {headers:headers}).then(function (response) {
    console.log(response);
    that.panels=response.data;
  })
  .catch(function (error) {
    console.log(error);
  })
  }
}
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
.card-subtitle{
    margin-top:0;
}

.card{
    width:20em;
    float:left;
}
</style>
