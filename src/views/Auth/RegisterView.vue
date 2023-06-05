<template>
    <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="col-12 p-0">
                <div class="login-card">
                    <div class="theme-form login-form">
                        <h4>ایجاد حساب کاربری</h4>
                        <h6>برای ایجاد حساب کاربری جزئیات شخصی خود را وارد کنید</h6>

                        <div class="form-group">
                            <label>آدرس ایمیل</label>
                            <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
                                <input class="form-control" type="email" dir="ltr"
                                       placeholder="Test@gmail.com" required v-model="form.email">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>رمز عبور</label>
                            <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
                                <input class="form-control" type="password" required dir="ltr" name="login[password]"
                                       v-model="form.password"
                                       placeholder="*********">

                            </div>
                        </div>
                        <div class="form-group">
                            <div class="checkbox">
                                <input id="checkbox1" type="checkbox" v-model="form.terms">
                                <label class="text-muted" for="checkbox1">با
                                    <span>قوانین و مقررات </span>موافقم.</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary btn-block" :disabled='loading' @click="submit_form()">ایجاد حساب کاربری</button>
                        </div>
                        <p>حساب کاربری دارید؟
                          <router-link class="ms-2" to="/login" tag="a"
                                       exact data-bs-original-title="" title="">
                           وارد شوید
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
    name: "RegisterView",
    data() {
        return {
            form: {
                email: '',
                password: null,
                terms: false
            },
            loading: false,
        }
    },
    methods: {
        ...mapActions({
            register_action: 'auth/register'
        }),
        submit_form() {
            let vm = this;
            vm.loading = true;
            if (vm.form.email === '' || vm.form.password === null) {
                vm.$toaster.error("اطلاعات را کامل وارد کنید.")

                vm.loading = false
                return
            }

            vm.register_action(this.form).then((response) => {
                vm.loading = false
                if (response.data.ok){
                    vm.$toaster.success(response.data.msg)
                    vm.$toaster.success("لطفا وارد حساب کاربری خود شوید.")
                    this.$router.replace({
                        name: 'Login'
                    })
                }

                else
                    vm.$toaster.warning(response.data.msg)


                // if (response.data.status === "ok") {
                //     vm.step = 2
                //     vm.$refs.recaptcha.reset();
                //     vm.loading = false
                //     vm.$toaster.success('پیامکی به شماره تلفن شما ارسال شد!')
                // } else {
                //     if (response.data.code === 6) {
                //
                //         vm.loading = false
                //         vm.$refs.recaptcha.reset();
                //         vm.$toaster.error('حساب کاربری شما به علت درخواست بیش از حد مسدود شده است ')
                //     }
                //
                // }

            }).catch(function (error) {

                vm.$toaster.error(error.response.data.msg)

                vm.loading = false

            })

        }
    }

}
</script>

<style scoped>

</style>