<template>
<v-container>
  <h2>Create Panel</h2>
  <v-card>
  <h3 v-if="error" class="danger-alert" v-html="error" />
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="url"
      v-model="url"
      :rules="urlRules"
      required
    ></v-text-field>
    <v-text-field
      label="description"
      v-model="description"
      :rules="pwdRules"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      Create
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
      description: '',
      pwdRules: [
        (v) => !!v || 'Description is required',
      ],
      url: '',
      urlRules: [
        (v) => !!v || 'Image url is required',
        (v) => /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~‌​+#-]*[\w@?^=%&amp;\/‌​~+#-])?/.test(v) || 'Image url must be valid'
      ],
      error:null
    }),
    methods: {
      submit() {
        const that=this;
        console.log(this.$store.state.token);
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('http://localhost:4000/newpanel', {
            author:that.$store.state.user.email,
            url: that.url,
            description:that.description
          }, {headers:{'Authorization': that.$store.state.token}}).then(function (response) {
              console.log(response);
              if(response.data.success){
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
