<template>
  <div class="center">
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-create-1"
        label="Tài Khoản:"
        label-for="input-1"
        description="Là gmail sẽ được đăng nhập"
      >
        <b-form-input
          v-model="form.email"
          type="text"
          placeholder="Nhập email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-create-2" label="Mật Khẩu:" label-for="input-2">
        <b-form-input
          type="password"
          v-model="form.password"
          placeholder="Nhập mật khẩu"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Xác nhận mật khẩu">
        <b-form-input
          type="password"
          v-model="form.confirmPassword"
          placeholder="Nhập lại mật khẩu"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-create-4" label="Họ và tên" label-for="input-4">
        <b-form-input
          type="text"
          v-model="form.fullName"
          placeholder="Nhập họ và tên"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Chứng minh nhân dân">
        <b-form-input
          type="text"
          v-model="form.cmnd"
          placeholder="Nhập số chứng minh nhân dân"
          required
        ></b-form-input>
      </b-form-group>

      <div class="input-create mb-3">
        <label>Avatar</label>
        <input
          ref="file"
          type="file"
          @change="uploadFile"
          class="form-control"
        />
      </div>

      <b-form-group label="Số điện thoại">
        <b-form-input
          type="text"
          v-model="form.number"
          placeholder="Nhập số điện thoại"
          required
        ></b-form-input>
      </b-form-group>

      <div>
        <b-form-select
          v-model="form.permission"
          :options="options"
        ></b-form-select>
        <div class="mt-3">
          Selected: <strong>{{ form.permission }}</strong>
        </div>
      </div>
<!-- 
      <b-form-group label="Quyền tài khoản">
        <b-form-input
          type="text"
          v-model="form.permission"
          placeholder="Nhập Quyền Admin Hoặc Businesses"
          required
        ></b-form-input>
      </b-form-group> -->


      <b-button
        class="mt-3"
        variant="outline-success"
        data-dismiss="modal"
        block
        @click="onSubmit"
        >Đăng ký</b-button
      >
    </b-form>
  </div>
</template>


<script>
// import { ref } from 'vue';
import axios from "../../axios.js";

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
        permission: null,
      },
      selected: null,
      options: [],
      PermissionAcount: 'Businesses'
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if(this.form.permission === "Admin") {
        this.PermissionAcount = "Admin";
      }
      if (!this.form.email) {
        alert("Chưa có email");
        return;
      }
      if (!this.form.password) {
        alert("Chưa có Password");
        return;
      }
      if(!(this.form.password === this.form.confirmPassword)) {
        alert("Mật khẩu chưa giống");
        return;
      }
      const formData = new FormData();
      formData.append("Path", this.form.file);
      formData.append("Number", this.form.number);
      formData.append("CMND", this.form.cmnd);
      formData.append("FullName", this.form.fullName);
      formData.append("Password", this.form.password);
      formData.append("Gmail", this.form.email);
      formData.append("Permission", this.form.permission);
      this.$store.dispatch("account/signupAdmin", formData);
      this.form = {
        email: "",
        password: "",
        confirmPassword: "",
        cmnd: null,
        file: null,
        number: "",
        fullName: "",
        permission: null,
      }
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
  mounted() {
    console.log("ádasd");
    axios
      .get("/permission/get-all-permission")
      .then((response) => (this.options = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.center {
  width: 50%;
  margin: auto;
}
</style>