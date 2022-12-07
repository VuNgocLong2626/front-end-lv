<template>
    <footer>
         <div class="footer">
            <div class="container">
               <div class="row">
                  <div class="col-md-12 ">
                     <div class="letter text_align_left">
                        <h2>Liên hệ với chúng tôi</h2>
                     </div>
                  </div>
                  <div class="col-md-5">
                     <form id="request" class="main_form">
                        <div class="row">
                           <div class="col-md-12 ">
                              <input class="cont_in" placeholder="Họ và tên" type="type" name=" Name" v-model="form.fullname"> 
                           </div>
                           <div class="col-md-12">
                              <input class="cont_in" placeholder="Địa chỉ email liên hệ" type="type" name="Email" v-model="form.email"> 
                           </div>
                           <div class="col-md-12">
                              <input class="cont_in" placeholder="Số điện thoại liên hệ" type="type" name="Phone Number"  v-model="form.number">                          
                           </div>
                           <div class="col-md-12">
                              <input class="cont_in" placeholder="Nội dung" type="type" name="Words"  v-model="form.content"> 
                           </div>
                           <div class="col-md-12">
                              <button @click="onSubmit" class="send_btnt">Gửi</button>
                           </div>
                        </div>
                     </form>
                  </div>
                  <div class="col-md-4 ">
                     <ul class="conta">
                        <li><i class="fa fa-map-marker" aria-hidden="true"></i>Locations 
                        </li>
                        <li><i class="fa fa-phone" aria-hidden="true"></i>+01 1234567890</li>
                        <li> <i class="fa fa-envelope" aria-hidden="true"></i><a href="Javascript:void(0)"> demo@gmail.com</a></li>
                     </ul>
                  </div>
                  <div class="col-md-3">
                     <div class="follow text_align_left">
                        <h3>Follow Us</h3>
                        <ul class="social_icon ">
                           <li><a href="Javascript:void(0)"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                           <li><a href="Javascript:void(0)"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                           <li><a href="Javascript:void(0)"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                           <li><a href="Javascript:void(0)"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                        </ul>
                     </div>
                  </div>
                  
               </div>
            </div>
            <div class="copyright">
               <div class="container">
                  <div class="row">
                     <div class="col-md-12">
                        <p>© 2022 Vũ Ngọc Long <a href="https://github.com/VuNgocLong2626?tab=repositories">-- Mã Nguồn --</a></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
</template>

<script>
import axios from '../../axios'

export default {
   data() {
      return {
         form: {
            fullname: "",
            email: "",
            number: "",
            content: ""
         }
      }
   },
   methods: {
      async onSubmit(event){
         event.preventDefault();
         if(!this.form.fullname) {
            alert('Họ và tên chưa điền')
            return;
         }
         if(!this.form.email) {
            alert('Email chưa điền')
            return;
         }
         if(!this.form.number) {
            alert('Số điện thoại chưa điền')
            return;
         }
         if(!this.form.content) {
            alert('nội dung chưa điền')
            return;
         }
         await axios.post('/contact/create-contact',{
            Content: this.form.content,
            Number: this.form.number,
            Gmail: this.form.email,
            FullName: this.form.fullname
         })
         .then(() => (alert('Liên hệ thành công')))
         .catch((error) => console.log(error))
      }
   },
}
</script>