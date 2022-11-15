<template>
  <base-button @click="modalShow = !modalShow" class="me-1"
    >Đăng ký</base-button
  >

  <div>
    <b-modal
      v-model="modalShow"
      hide-footer
      size="lg"
      title="Đăng ký vào Quyền Hộ Kinh Doanh"
    >
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Tài Khoản:"
          label-for="input-1"
          description="Là gmail cá nhân của bạn đã đăng ký"
        >
          <b-form-input
            v-model="form.email"
            type="text"
            placeholder="Nhập email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Mật Khẩu:" label-for="input-2">
          <b-form-input
            type="password"
            v-model="form.password"
            placeholder="Nhập mật khẩu"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Xác nhận mật khẩu"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            type="password"
            v-model="form.confirmPassword"
            placeholder="Nhập lại mật khẩu"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Họ và tên" label-for="input-4">
          <b-form-input
            type="text"
            v-model="form.fullName"
            placeholder="Nhập họ và tên"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Chứng minh nhân dân"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            type="text"
            v-model="form.cmnd"
            placeholder="Nhập số chứng minh nhân dân"
            required
          ></b-form-input>
        </b-form-group>

        <div class="input-group mb-3">
          <input ref="file" type="file" @change="uploadFile" class="form-control" id="inputGroupFile02" />
          <label class="input-group-text" for="inputGroupFile02">Upload</label>
        </div>

        <b-form-group
          id="input-group-5"
          label="Số điện thoại"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            type="text"
            v-model="form.number"
            placeholder="Nhập số điện thoại"
            required
          ></b-form-input>
        </b-form-group>

        <b-button
          class="mt-3"
          variant="outline-success"
          data-dismiss="modal"
          block
          @click="onSubmit"
          >Đăng ký</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<script>
// import { ref } from 'vue';

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: "",
        cmnd: null,
        file: null,
        number: "",
        fullName: "",
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
      const formData = new FormData();
      formData.append('Path', this.form.file);
      formData.append('Number', this.form.number);
      formData.append('CMND', this.form.cmnd);
      formData.append('FullName', this.form.fullName);
      formData.append('Password', this.form.password);
      formData.append('Gmail', this.form.email);
      this.$store.dispatch('account/signup', formData);
      this.modalShow = false;
    },
    uploadFile() {
        this.form.file = this.$refs.file.files[0];
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
