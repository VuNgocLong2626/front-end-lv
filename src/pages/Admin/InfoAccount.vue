<template>
  <div class="d-block mx-auto">
    <div class="d-flex flex-column avater-use">
      <b-avatar
        class="shadow-lg p-3 mb-5 bg-white rounded"
        :src="getAllInfo.path"
        size="14rem"
      ></b-avatar>
      <b-button @click="updateImage = false" variant="primary"
        >Thay đổi avatar</b-button
      >
    </div>
  </div>
  <div v-if="updateImage">
    <b-form @submit="onSubmitInfoUpdate" v-if="formInfo">
      <b-form-group id="info-group-1" label="Họ và tên" label-for="info-1">
        <b-form-input
          id="info-1"
          type="text"
          v-model="form.fullName"
          :placeholder="getAllInfo.fullName"
          :disabled="isChange"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="info-group-2"
        label="Số chứng minh nhân dân :"
        label-for="info-2"
      >
        <b-form-input
          id="info-2"
          type="number"
          v-model="form.cmnd"
          :placeholder="getAllInfo.cmnd.toString()"
          :disabled="isChange"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="info-group-3"
        label="Số điện thoại :"
        label-for="info-3"
      >
        <b-form-input
          id="info-3"
          type="text"
          v-model="form.number"
          :placeholder="getAllInfo.number"
          :disabled="isChange"
          required
        ></b-form-input>
      </b-form-group>

      <div v-if="isChange">
        <b-button @click="isChange = false" variant="primary"
          >Thay đổi thông tin</b-button
        >
        <b-button
          @click="formInfo = false"
          :style="{ 'margin-left': 50 + 'px' }"
          variant="info"
          >Thay đổi nật khẩu</b-button
        >
      </div>
      <div v-else>
        <b-button @click="onSubmitInfoUpdate" variant="success"
          >Cập nhật thông tin</b-button
        >
        <b-button
          :style="{ 'margin-left': 50 + 'px' }"
          @click="resetButton"
          variant="danger"
          >Hủy Bỏ</b-button
        >
      </div>
    </b-form>
    <b-form @submit="onSubmitUpdatePassword" v-else>
      <b-form-group id="mk1-group" label="Mật khẩu cũ" label-for="mk1">
        <b-form-input id="mk1" v-model="formPassword.PasswordOld" type="password" required></b-form-input>
      </b-form-group>
      <b-form-group id="mk2-group" label="Mật khẩu mới" label-for="mk2">
        <b-form-input id="mk2" v-model="formPassword.Password" type="password" required></b-form-input>
      </b-form-group>
      <b-form-group id="mk3-group" label="Xác nhận mât khẩu mới" label-for="mk3">
        <b-form-input id="mk3" v-model="formPassword.PasswordConfrom" type="password" required></b-form-input>
      </b-form-group>
      <b-button @click="onSubmitUpdatePassword" variant="success">Cập nhật mật khẩu</b-button>
      <b-button
        :style="{ 'margin-left': 50 + 'px' }"
        @click="resetButton"
        variant="danger"
        >Hủy Bỏ</b-button
      >
    </b-form>
  </div>
  <div v-else>
    <b-form @submit="onSubmitUpdateImage">
      <label>Hình ảnh cần upload:</label>
      <div class="input-group mb-3">
        <input
          ref="file"
          type="file"
          @change="uploadFile"
          class="form-control"
        />

        <b-button @click="onSubmitUpdateImage" variant="success">Cập nhật avatar</b-button>
        <b-button @click="resetButton" variant="danger">Hủy Bỏ</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fullName: null,
        cmnd: null,
        number: null,
      },
      file: null,
      isChange: true,
      formInfo: true,
      updateImage: true,
      formPassword: {
        PasswordOld: null,
        Password: null,
        PasswordConfrom: null
      }
    };
  },
  computed: {
    getAllInfo() {
      return this.$store.getters["info/getAll"];
    },
  },
  methods: {
    uploadFile() {
      this.file = this.$refs.file.files[0];
    },
    onSubmit() {
      console.log("ahihih");
    },
    onSubmitInfoUpdate() {
      const formData = new FormData();
      formData.append("Number", this.getAllInfo.number);
      formData.append("CMND", this.getAllInfo.cmnd);
      formData.append("FullName", this.getAllInfo.fullName);
      if (this.form.fullName) {
        formData.delete("FullName");
        formData.append("FullName", this.form.fullName);
      }
      if (this.form.cmnd) {
        formData.delete("CMND");
        formData.append("CMND", this.form.cmnd);
      }
      if (this.form.number) {
        formData.delete("Number");
        formData.append("Number", this.form.number);
      }
      this.resetButton();
    },
    onSubmitUpdatePassword () {
        if (!(this.formPassword.Password == this.formPassword.PasswordConfrom)) {
            alert("Mật khẩu chưa trùng khớp");
            return;
        }
        if (!this.formPassword.Password && !this.formPassword.PasswordOld) {
            alert("Chưa điền hết dữ liệu");
            return;
        }
        console.log(this.formPassword.Password == this.formPassword.PasswordConfrom)
    },
    onSubmitUpdateImage () {
        if (!this.file) {
            alert("Chưa có hình ảnh");
            return;
        }
        console.log(this.file)
    },
    resetButton() {
      this.isChange = true;
      this.formInfo = true;
      this.updateImage = true;
    },
  },
};
</script>


<style scoped>
.avater-use {
  margin: auto;
  width: 14%;
}
</style>