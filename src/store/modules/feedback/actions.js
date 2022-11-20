import axios from "../../../axios.js";

export default {
  async createFeedback(context, payload) {
    let url = "/feedback/create-feedback";
    await axios
      .post(url, payload)
      .then(function () {
        alert('Đã Đánh giá thành công');
      })
      .catch(error => console.log(error));
  },
  async getAllFeedback() {
    let url = "/feedback/get-all-feedback";
    await axios
      .get(url)
      .then(function (response) {
          return response.data
      })
      .catch(error => console.log(error));
  },
   async updateStatusFeedback(context, payload) {
    let url = "/feedback/update-display";
    await axios
      .put(url, payload)
      .then(function () {
        alert('Đã Đánh giá thành công');
      })
      .catch(error => console.log(error));
  },
   async getStatusFeedback(context) {
     let url = "/feedback/get-all-true?display=true";
    await axios
      .get(url)
      .then(function (response) {
        localStorage.setItem("NumberS", response.data.length);
        context.commit("setNumber", {
          NumberS: response.data.length
        })
      })
      .catch(error => console.log(error));
  },
};
