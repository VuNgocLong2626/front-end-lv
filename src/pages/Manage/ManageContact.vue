<template>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Họ và tên</th>
      <th scope="col">Số điện thoại</th>
      <th scope="col">Email</th>
      <th scope="col">Nội dung</th>
      <th scope="col">Xử lý</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <th scope="row">{{index + 1}}</th>
      <td>{{item.FullName}}</td>
      <td>{{item.Number}}</td>
            <td>{{item.Gmail}}</td>
      <td>{{item.Content}}</td>
        <td><b-button @click="deleteItem(item.Number)" variant="danger">Xóa</b-button></td>
    </tr>
  </tbody>
</table>
</template>


<script>
import axios from '../../axios'

export default {
    data() {
        return {
            items: []
        }
    },
    mounted() {
        axios.get('/contact/get-all-contact')
        .then((response) => (this.items = response.data))
        .catch((error) => console.log(error))
    },
    methods: {
        async deleteItem(value){
            this.items = this.items.filter((element) => (element.Number != value))
            await axios.delete(`/contact/delete-contact?number=${value}`)
            .then(() => (alert('Xóa thành công')))
            .catch((error) => console.log(error))
        }
    }
}
</script>