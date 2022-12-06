import axios from "../../../axios.js";

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    let url = "/account/register";
    let headers = { "Content-Type": "multipart/form-data" };
    await axios
      .post(url, payload, { headers })
      .then(function (response) {
        let responseData = response.data;
        console.log(responseData);

        // localStorage.setItem("AccessToken", responseData.AccessToken);
        // localStorage.setItem("tokenExpiration", responseData.Expire);
        // localStorage.setItem("gmail", responseData.gmail);

        // context.commit("setUser", {
        //   AccessToken: responseData.AccessToken,
        //   gmail: responseData.gmail,
        //   tokenExpiration: responseData.Expire,
        // });
      })
      .catch(function (response) {
        console.log(response.response);
      });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = "/account/login-not-form";
    let headers = { "Content-Type": "application/json" };
    if (mode === "signup") {
      url = "/account/register";
      headers = { "Content-Type": "multipart/form-data" };
    }
    await axios
      .post(url, payload, { headers })
      .then(function (response) {
        let responseData = response.data;

        localStorage.setItem("AccessToken", responseData.AccessToken);
        localStorage.setItem("tokenExpiration", responseData.Expire);
        localStorage.setItem("gmail", responseData.gmail);

        context.commit("setUser", {
          AccessToken: responseData.AccessToken,
          gmail: responseData.gmail,
          tokenExpiration: responseData.Expire,
        });
      })
      .catch(function (response) {
        alert('Đăng nhập thất bại')
        console.log(response.response);
        return;
      });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        tokenExpiration: null,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("gmail");
    localStorage.removeItem("tokenExpiration");

    context.commit("setUser", {
      AccessToken: null,
      gmail: null,
      tokenExpiration: null,
    });
  },
  timeToken(context) {
    const expi = localStorage.getItem("tokenExpiration");
    context.commit("timeToken", expi);
    return expi;
  },
  getToken() {
    const token = localStorage.getItem("tokenExpiration");
    if (token) {
      return true;
    }
    return false;
  },
  async loginAdmin(context, payload) {
    let url = "/account/login-admin-not-form";
    let headers = { "Content-Type": "application/json" };

    await axios
      .post(url, payload, { headers })
      .then(function (response) {
        let responseData = response.data;

        localStorage.setItem("AccessToken", responseData.AccessToken);
        localStorage.setItem("tokenExpiration", responseData.Expire);
        localStorage.setItem("gmail", responseData.gmail);

        context.commit("setUser", {
          AccessToken: responseData.AccessToken,
          gmail: responseData.gmail,
          tokenExpiration: responseData.Expire,
        });
      })
      .catch(function (response) {
        console.log(response.response);
      });
  },
  async getsAllPermission() {
    await axios
      .get("/permission/get-all-permission")
      .then(function (response) {
        let responseData = response.data;

        response = [];
        for (const data of responseData) {
          response.push(
            JSON.stringify({
              value: data.Permission.toString(),
              text: data.Permission.toString(),
            })
          );
        }
        console.log(response);
        return response;
      })
      .catch((error) => console.log(error));
  },
  async signupAdmin(context, payload) {
    let url = "/account/register-admin";
    // let headers = { "Content-Type": "multipart/form-data" };
    await axios
      .post(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        alert("Tạo tài Khoản Công");
      })
      .catch(function (response) {
        console.log(response.response);
      });
  },
};
