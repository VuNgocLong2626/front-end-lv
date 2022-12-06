<template>
  Trang bình luôn
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Họ và tên</th>
        <th scope="col">Số sao</th>
        <th>đáng giá</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in visibleCompanies" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item.FullName }}</td>
        <td>
          <vue3-star-ratings
            style="margin: 0px; padding: 0px"
            :starSize="12"
            :showControl="false"
            v-model="item.Star"
            :disableClick="true"
          />
        </td>
        <td style="width: 60%">{{ item.Comment }}</td>
        <td><b-button @click="deleteComment(item.IdComment)">Xóa Bình luận</b-button></td>
      </tr>
    </tbody>
  </table>
  <div class="select_main">
    <b-button @click="packItem">Lùi</b-button>
    <b-button v-if="!isShowNext" @click="nextItem">Tiến</b-button>
  </div>
</template>


<script>
import axios from "../../axios";

export default {
  data() {
    return {
      items: [],
      star: 0,
      end: 3,
      step: 3,
    };
  },
  mounted() {
    axios
      .post("/location/get-all-comment-by-id", {
        GmailBussiness: localStorage.getItem("gmail"),
      })
      .then((response) => (this.items = response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    visibleCompanies() {
      return this.items.slice(
        this.star,
        this.items.length > 3 ? this.end : this.items.length
      );
    },
    isShowNext(){
        return this.star + 3 > this.items.length
    },
    isShowPack(){
        return this.star -3 < 0
    }
  },
  methods: {
    nextItem() {
      this.star = 3;
      this.end =
        this.end + 3 > this.items.length ? this.items.length : this.end + 3;
    },
    packItem() {
      this.star = this.star - 3;
      this.end = this.end - 3 < 3    ? 3 : this.end - 3;
    },
    async deleteComment(value) {
        this.items = this.items.filter((element) => (element.IdComment != value))
        axios.post('/comment/delete-comment', {
            IdComment: value
        })
        .then(() => (alert('Đã xóa thành công')))
        .catch((error) => console.log(error));
    }
  },
};
</script>