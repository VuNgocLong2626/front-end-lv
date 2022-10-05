<template>
  <div class="header">
    <div class="top_header">
      <b-container>
        <b-row>
          <b-col-md-12>
            <div class="select_main">
              <div class="sign">
                <base-button class="me-1" v-b-modal="'my-modal'">Đăng nhập</base-button>
                <base-button class="me-1" v-b-modal="'my-modal'">Đăng ký hộ kinh doanh</base-button>
                 <b-modal id="my-modal" size="lg" hide-backdrop content-class="shadow" title="BootstrapVue">
                  <sign-in></sign-in>
                  
                 </b-modal>
              </div>
              <ul class="top_infomation">
                <li>
                  <img src="../../images/ti_call.png" alt="#" />Call : +1234567890
                </li>
                <li>
                  <img src="../../images/ti_mail.png" alt="#" />
                  <a>demo@gmail.com</a>
                </li>
              </ul>
            </div>
          </b-col-md-12>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>

import SignIn from '../form/SignIn.vue'

export default {
  components: {
    SignIn
  }
}
</script>

<style scoped>
.read_more:hover {
    background: #fff;
    color: #73bd24;
}

.edit-button {
  border: var(--bs-btn-border-width) solid #fff;
  color: #fff
}
</style>
