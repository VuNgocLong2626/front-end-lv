<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Tài Khoản:"
        label-for="input-1"
        description="Là gmail cá nhân của bạn đã đăng ký"
      >
        <b-form-input
          id="input-1"
          v-model="form.email.value"
          type="email"
          placeholder="Nhập email"
          required
          :formatter="formatter"
          :state="isValidEmail"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Mật Khẩu:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password.value"
          placeholder="Nhập mật khẩu"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: {
            value: null,
            isValid: null
        },
        password: {
            value: "",
            isValid: true
        },
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
    //   alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email.value = "";
      this.form.password.value = "";
      this.form.email.isValid = null;
      this.form.password.isValid = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  computed: {
    isValidEmail() {
        if (!this.form.email.value) {
            return false;
        }
        return true;
    }
  }
};
</script>
