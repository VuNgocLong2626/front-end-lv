<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <b-form @submit="onSubmit">
            <div
              class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"
            >
              <p class="lead fw-normal mb-0 me-3">Đăng Nhập với Quyền Admin</p>
            </div>

            <div class="divider d-flex align-items-center my-4"></div>

            <!-- Email input -->
            <div class="form-outline mb-4">
              <input
                type="email"
                id="form3Example3"
                class="form-control form-control-lg"
                placeholder="Nhập Email"
                v-model="form.Gmail"
              />
              <label class="form-label" for="form3Example3"
                >Địa chỉ Email</label
              >
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                class="form-control form-control-lg"
                placeholder="Nhập mật khẩu"
                v-model="form.Password"
              />
              <label class="form-label" for="form3Example4">Mật khẩu</label>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                type="button"
                class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
                @click="onSubmit"
              >
                Đăng nhập
              </button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Password: null,
        Gmail: null,
      },
    };
  },
  methods: {
    onSubmit() {
        if(!this.form.Password) {
            alert('Chưa điền Mật khẩu');
            return;
        }
        if(!this.form.Gmail){
            alert('Chưa điền Email');
            return;
        }
        this.$store.dispatch('account/loginAdmin', {
        Password: this.form.Password,
        Gmail: this.form.Gmail
      });
      this.$router.push('/admin/home');
    }
  }
};
</script>

<style scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
