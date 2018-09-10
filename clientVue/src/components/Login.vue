<template>
<v-container>
  <h2>Login Form</h2>
  <v-card>
  <h3 v-if="error" class="danger-alert" v-html="error" />
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="E-mail"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      :rules="pwdRules"
      :counter="10"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      Login
    </v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </v-form>
  </v-card>
</v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data: () => ({
      valid: true,
      password: '',
      pwdRules: [
        (v) => !!v || 'Name is required',
        (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      error:null
    }),
    methods: {
      submit() {
        const that=this;
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('http://localhost:4000/login', {
            email: this.email,
            password:this.password
          }).then(function (response) {
              console.log(response);
              if(response.data.success){
                that.$store.dispatch('setToken', response.data.token)
                that.$store.dispatch('setUser', response.data.user)
                that.$router.push({name: 'Home'});
              }
              else if(!response.data.success){
                that.error=response.data.msg
              }
            }).catch(function (error) {
              console.log(error);
              });
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
