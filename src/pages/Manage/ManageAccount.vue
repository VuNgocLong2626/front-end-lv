<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <b-form @submit="onSubmit" class="main_form">
          <div class="row">
            <div class="col-md-12">
              <input
                class="cont_in"
                type="type"
                name=" Name"
                :value="
                  showValue.FullName
                    ? 'Họ và tên : ' + showValue.FullName
                    : 'Họ và tên'
                "
                readonly
              />
            </div>
            <div class="col-md-12">
              <input
                class="cont_in"
                placeholder="Địa chỉ Email"
                type="type"
                name="Email"
                :value="
                  showValue.Gmail
                    ? 'Địa chỉ Email : ' + showValue.Gmail
                    : 'Địa chỉ Email'
                "
                readonly
              />
            </div>
            <div class="col-md-12">
              <input
                class="cont_in"
                placeholder="Số điện thoại"
                type="type"
                name="Phone Number"
                :value="
                  showValue.Number
                    ? 'Số điện thoại : ' + showValue.Number
                    : 'Số điện thoại'
                "
                readonly
              />
            </div>
            <div class="col-md-12">
              <input
                class="cont_in"
                placeholder="Số Chứng Minh Nhân Dân"
                type="type"
                name=" Date"
                :value="
                  showValue.CMND
                    ? 'Số Chứng Minh Nhân Dân: ' + showValue.CMND
                    : 'Số Chứng Minh Nhân Dân'
                "
                readonly
              />
            </div>
          </div>
        </b-form>
      </div>
    </div>
  </div>

  <div class="mg__25">
    <div class="grop_btn">
      <div>
        <b-button @click="getAllInfoAccount()">Tất cả Tài Khoản</b-button>
        <b-button @click="getInfoBussi()" variant="info" class="mg__left__25">Tài Khoản Hộ Kinh Doanh</b-button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Họ và tên</th>
          <th scope="col">Email</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listAccount" :key="item.Number">
          <th>{{ item.FullName }}</th>
          <td>{{ item.Gmail }}</td>
          <td>
            <b-button @click="showInfoFeedback(item)">Xem chi tiết</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../../axios.js";

export default {
  data() {
    return {
      listAccount: [],
      showValue: {},
      form: {
        fullName: null,
        email: null,
        number: null,
        message: null,
        status: null,
        dateFeeback: null,
      },
    };
  },
  methods: {
    async showInfoFeedback(info) {
      this.showValue = info;
    },
    onSubmit() {},
    reset() {
      this.showValue = {};
    },
    async getAllInfoAccount() {
      let url = "/account/get-all-info-account";
      const catFactsResponse = await axios
        .get(url)
        .then(function (response) {
          return response.data;
        })
        .catch((error) => console.log(error));
      this.listAccount = catFactsResponse;
    },
    async getInfoBussi() {
      let url = "/account/get-all-info-account?permisson=Businesses";
      const response = await axios
        .get(url)
        .then(function (response) {
          return response.data;
        })
        .catch((error) => console.log(error));
      this.listAccount = response;
    },
  },
  mounted() {
    axios
      .get("/account/get-all-info-account")
      .then((response) => (this.listAccount = response.data))
      .catch((error) => console.log(error));
  },
  computed: {},
};
</script>

<style scoped>
.mg__25 {
  margin-top: 50px;
}
.mg__left__25 {
  margin-left: 25px;
}
.grop_btn {
  display: flex;
  justify-content: space-between;
}
</style>