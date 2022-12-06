<template>
  <div class="header">
    <div class="top_header">
      <b-container>
        <b-row>
          <b-col md="12">
            <div class="select_main">
              <div class="sign">
                <div class="d-flex" v-if="!isAuthenticated">
                  <sign-in></sign-in>
                  <sign-up v-if="false"></sign-up>
                </div>
                <div v-else>
                  <b-avatar :src="path" size="3rem"></b-avatar>
                  <span class="text-name">{{ valueFullName }}</span>
                </div>
              </div>
              <ul class="top_infomation">
                <div v-if="!isAuthenticated">
                  <li>
                    <img src="../../images/ti_call.png" alt="#" />Call :
                    +1234567890
                  </li>
                  <li>
                    <img src="../../images/ti_mail.png" alt="#" />
                    <a>demo@gmail.com</a>
                  </li>
                </div>
                <div v-else>
                  <base-button class="me-1" @click="logout"
                    >Đăng xuất</base-button
                  >
                </div>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import SignIn from "../form/SignIn.vue";
import SignUp from "../form/SignUp.vue";
import BaseButton from "../ui/BaseButton.vue";

export default {
  components: {
    SignIn,
    SignUp,
    BaseButton,
  },
  data() {
    return {};
  },
  computed: {
    isAuthenticated() {
      this.$store.commit("account/getTokenExpiration");
      return this.$store.getters["account/isExpiration"];
    },
    valueFullName() {
      this.$store.dispatch("info/getInfo");
      return this.$store.getters["info/fullName"];
    },
    path() {
      return this.$store.getters["info/path"];
    },
  },
  methods: {
    logout() {
      this.$store.commit("info/resetInfo");
      this.$store.dispatch("account/logout");
      this.$store.commit("account/getTokenExpiration");
      this.$router.push('/home')
    },
    test() {
      this.$store.dispatch("info/getInfo");
    },
  },
};
</script>

<style scoped>
.read_more:hover {
  background: #fff;
  color: #73bd24;
}

.edit-button {
  border: var(--bs-btn-border-width) solid #fff;
  color: #fff;
}

.text-name {
  margin: 0px 28px;
  color: #fff;
  font-size: 17px;
  line-height: 25px;
  font-weight: 400;
  border-radius: 0px;
  /* text-transform: uppercase; */
}

</style>
