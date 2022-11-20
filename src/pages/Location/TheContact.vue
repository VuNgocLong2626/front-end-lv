<template>
  <div class="contact">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="titlepage text_align_center">
            <h2>Đánh giá</h2>
          </div>
        </div>
        <div class="col-md-8 offset-md-2">
          <b-form @submit="onSubmit" class="main_form">
            <div class="row">
              <div class="col-md-12">
                <input
                  class="cont_in"
                  placeholder="Họ và tên"
                  type="type"
                  name=" Name"
                  v-model="form.fullName"
                />
              </div>
              <div class="col-md-12">
                <input
                  class="cont_in"
                  placeholder="Địa chỉ Email"
                  type="type"
                  name="Email"
                  v-model="form.email"
                />
              </div>
              <div class="col-md-12">
                <input
                  class="cont_in"
                  placeholder="Số điện thoại"
                  type="type"
                  name="Phone Number"
                  v-model="form.number"
                />
              </div>
              <div class="col-md-12">
                <textarea
                  class="textarea"
                  style="color: #676767"
                  placeholder="Nội dung phản hồi"
                  type="type"
                  name="Message"
                  v-model="form.message"
                >
                </textarea>
              </div>
              <div class="col-md-12">
                <button @click="onSubmit" class="send_btnt">Send</button>
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fullName: null,
        email: null,
        number: null,
        message: null,
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (!this.form.fullName) {
        alert("Chưa nhập Tên");
        return;
      }
      if (!this.form.email) {
        alert("Chưa nhập Email");
        return;
      }
      if (!this.form.number) {
        alert("Chưa nhập Số điện thoại");
        return;
      }
      if (!this.form.message) {
        alert("Chưa nhập Bình luận");
        return;
      }
      this.$store.dispatch("feedback/createFeedback", {
        Message: this.form.message,
        Gamil: this.form.email,
        Fullname: this.form.fullName,
        Number: this.form.number,
      });
      console.log(this.form);
    },
  },
};
</script>