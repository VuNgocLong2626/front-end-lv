<template>
  <div class="header_midil">
    <b-container>
      <b-row class="d_flex">
        <div class="col-md-2 col-sm-3 logo_section">
          <div class="full">
            <div class="center-desk">
              <div class="logo">
                <a href="index.html"
                  ><img src="../../images/logo.png" alt="#"
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-9 col-md-7">
          <nav class="navigation navbar navbar-expand-md navbar-dark">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample04"
              aria-controls="navbarsExample04"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarsExample04">
              <ul class="navbar-nav mr-auto">
                <!-- <b-button-group> -->
                <li class="nav-item">
                  <base-button class="nav-link" link to="/home"
                    >Home</base-button
                  >
                </li>
                <li class="nav-item">
                  <base-button class="nav-link" link to="/about"
                    >About</base-button
                  >
                </li>
                <li class="nav-item">
                  <base-button class="nav-link" link to="/Pakages"
                    >Pakages</base-button
                  >
                </li>
                <li class="nav-item">
                  <base-button class="nav-link" link to="/client"
                    >client</base-button
                  >
                </li>
                <!-- <li class="nav-item">
                    <base-button class="nav-link" link to="/about">About</base-button>
                </li> -->
                <li class="nav-item">
                  <base-button class="nav-link" link to="/contact"
                    >Contact Us</base-button
                  >
                </li>
                <!-- </b-button-group> -->
              </ul>
            </div>
          </nav>
        </div>
        <div class="col-md-3 d_none">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2 "
              placeholder="Nhập Địa điểm "
            ></b-form-input>
            <base-button  size="sm" class="my-2 my-sm-0 btn-width-105 " type="submit"
              >Tìm Kiếm</base-button 
            >
          </b-nav-form>
        </div>
      </b-row>
    </b-container>
  </div>
</template>


<style scoped>
.btn-width-105{
    width: 105px;
}
</style>


<script>
import BaseButton from "../ui/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      active: false,
    };
  },
};
</script>
