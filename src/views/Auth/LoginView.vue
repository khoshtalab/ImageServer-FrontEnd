<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12">
        <div class="login-card">
          <div class="theme-form login-form">
            <h4>ورود</h4>
            <h6>خوش آمدید! به حساب کاربری خود وارد شوید.</h6>
            <div class="form-group">
              <label>آدرس ایمیل</label>
              <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
                <input class="form-control" type="email" required="" v-model="form.email"
                       placeholder="Test@gmail.com">
              </div>
            </div>
            <div class="form-group">
              <label>رمز عبور</label>
              <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
                <input class="form-control" type="password" name="login[password]" required=""
                       v-model="form.password" placeholder="*********">
                <div class="show-hide"><span class="show"> </span></div>
              </div>
            </div>
            <div class="form-group">
              <div class="checkbox">
                <input id="checkbox1" type="checkbox" v-model="form.remember">
                <label for="checkbox1">مرا به خاطر بسپار</label>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled='loading' @click="submit_form()">وارد
                شوید
              </button>
            </div>

            <p>حساب کاربری ندارید؟
              <router-link class="ms-2" to="/register" tag="a"
                 exact data-bs-original-title="" title="">
                ایجاد حساب کاربری
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        email: 'mamad2@gmail.com',
        password: '12384756',
        remember: false
      },
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      login_action: 'auth/login'
    }),
    submit_form() {
      let vm = this;
      vm.loading = true;
      if (vm.form.email === '' || vm.form.password === null) {
        vm.$toaster.error("اطلاعات را کامل وارد کنید.")

        vm.loading = false
        return
      }

      vm.login_action(this.form).then((response) => {
        vm.loading = false
        if (response.data.ok) {
          vm.$toaster.success(response.data.msg)
          let delayInMilliseconds = 1000; //1 second

          setTimeout(function() {
            vm.$router.replace({
              path: '/'
            })
            //your code to be executed after 1 second
          }, delayInMilliseconds);


        } else
          vm.$toaster.warning(response.data.msg)


      }).catch(function (error) {

        vm.$toaster.error(error.response.data.msg)

        vm.loading = false

      })

    }
  },


}
</script>

<style scoped>

</style>