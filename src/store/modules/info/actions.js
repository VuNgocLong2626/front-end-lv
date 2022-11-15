import axios from "../../../axios.js";

export default {
  async getInfo(context) {
    let url = "/account/get-info";
    const token = localStorage.getItem("AccessToken");
    await axios
      .get(url, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(function (response) {
        let responseData = response.data;
        context.commit("setInfo", {
            cmnd: responseData.CMND,
            fullName: responseData.FullName,
            gamil: responseData.Gamil,
            number: responseData.Number,
            path: responseData.Path,
            permission: responseData.Permission
        })
      })
      .catch(error => console.log(error));
  },
};
