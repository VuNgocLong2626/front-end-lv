<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <b-form @submit="onSubmit" class="main_form">
          <div class="row">
            <div class="col-md-12">
              <input
                class="cont_in"
                placeholder="Họ và tên"
                type="type"
                name=" Name"
                :value="
                  showValue.Fullname
                    ? 'Họ và tên : ' + showValue.Fullname
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
                  showValue.Gamil
                    ? 'Địa chỉ Email : ' + showValue.Gamil
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
                placeholder="Ngày đánh giá"
                type="type"
                name=" Date"
                :value="
                  showValue.DateFeedback
                    ? 'Ngày đánh giá : ' + showValue.DateFeedback
                    : 'Ngày đánh giá'
                "
                readonly
              />
            </div>
            <div class="col-md-12">
              <input
                class="cont_in"
                placeholder="Trạng thái"
                type="type"
                name=" status"
                :value="
                  showValue.Display
                    ? 'Trạng thái : Đã cho phép'
                    : 'Trạng thá : Chưa'
                "
                readonly
              />
            </div>
            <div class="col-md-12">
              <textarea
                class="textarea"
                style="color: #676767"
                placeholder="Nội dung phản hồi"
                type="type"
                name="Message"
                v-model="showValue.Message"
                readonly
              >
              </textarea>
            </div>
          </div>
        </b-form>
        <b-button @click="updateFeedback(true)" variant="success"
          >Cập nhật cho phép hiển thị</b-button
        >
        <b-button
          @click="updateFeedback(false)"
          variant="danger"
          class="mg__left__25"
          >Cập nhật không phép hiển thị</b-button
        >
      </div>
    </div>
  </div>

  <div class="mg__25">
    <div class="grop_btn">
      <div>
        <b-button @click="getAllStatusFeedback()">Tất cả</b-button>
        <b-button @click="getDaysFeedback()" variant="info" class="mg__left__25">7 ngày gần nhất</b-button>
      </div>
      <div>
        <b-button
          @click="getStatusFeedback(true)"
          variant="success"
          >Cho phép hiển thị</b-button
        >
        <b-button
          @click="getStatusFeedback(false)"
          variant="outline-primary"
          class="mg__left__25"
          >Không phép hiển thị</b-button
        >
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Họ và tên</th>
          <th scope="col">Email</th>
          <th scope="col">Ngày Đánh Giá</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listFeedBack" :key="item.Number">
          <th>{{ item.Fullname }}</th>
          <td>{{ item.Gamil }}</td>
          <td>{{ item.DateFeedback }}</td>
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
      listFeedBack: [],
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
    async updateFeedback(value) {
      this.$store.dispatch("feedback/updateStatusFeedback", {
        Display: value,
        Number: this.showValue.Number,
      });
      this.reset();
    },
    async getStatusFeedback(value) {
      let url = "/feedback/get-all-true?display=" + value;
      const response = await axios
        .get(url)
        .then(function (response) {
          return response.data;
        })
        .catch((error) => console.log(error));
      this.listFeedBack = response;
    },
    async getAllStatusFeedback() {
      let url = "/feedback/get-all-feedback";
      const catFactsResponse = await axios
        .get(url)
        .then(function (response) {
          return response.data;
        })
        .catch((error) => console.log(error));
      this.listFeedBack = catFactsResponse;
    },
    async getDaysFeedback() {
      let url = "/feedback/get-by_date?day=7";
      const response = await axios
        .get(url)
        .then(function (response) {
          return response.data;
        })
        .catch((error) => console.log(error));
      this.listFeedBack = response;
    },
  },
  mounted() {
    axios
      .get("/feedback/get-all-feedback")
      .then((response) => (this.listFeedBack = response.data))
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