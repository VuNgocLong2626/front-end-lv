<template>
  <base-button @click="modalShow = !modalShow" class="me-1">Đăng nhập</base-button>

  <div>
    <b-modal
      v-model="modalShow"
      hide-footer
      size="lg"
      title="Đăng nhập vào Quyền Hộ Kinh Doanh"
    >
      <b-form @submit="onSubmit" >
        <b-form-group
          id="input-group-1"
          label="Tài Khoản:"
          label-for="input-1"
          description="Là gmail cá nhân của bạn đã đăng ký"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="text"
            placeholder="Nhập email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Mật Khẩu:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            placeholder="Nhập mật khẩu"
            required
          ></b-form-input>
        </b-form-group>

        <b-button class="mt-3" variant="outline-success" data-dismiss="modal" block @click="onSubmit">Đăng nhập</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      modalShow: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (!this.form.email) {
        alert("Chưa có email");
        return;
      }
      if (!this.form.password) {
        alert("Chưa có Password");
        return;
      }
      this.$store.dispatch('account/login', {
        Password: this.form.password,
        Gmail: this.form.email
      });
      this.modalShow = false;
      this.$router.push('/home')
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
