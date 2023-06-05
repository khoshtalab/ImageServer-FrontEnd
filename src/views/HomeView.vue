<template>
  <div class="home">
    <div class="page-body">
      <div class="container-fluid">
        <div class="page-title">
          <div class="row">
            <div class="col-12 col-sm-6">
              <h3>داشبورد</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="row starter-main">
          <div class="col-12" v-if="!verified">
            <div class="alert alert-danger inverse alert-dismissible fade show" role="alert"><i
                class="icon-thumb-down"></i>
              <p><b> ایمیل </b> شما تایید نشده است، برای استفاده از برنامه باید اییمیل خود را تایید کنید.
                <b @click="request_verify()">تایید ایمیل</b>
              </p>

            </div>
          </div>


          <template v-if="!user_plan">
            <div class="col-xl-4 col-md-6 dash-xl-10">
              <div class="card profile-greeting" style="height: auto">
                <div class="card-body">
                  <div class="media">
                    <div class="media-body">
                      <div class="greeting-user">
                        <h1>سلام،
                          {{ user.fullName }}
                        </h1>
                        <h6>خوش آمدید، داشبورد شما آماده است!</h6>
                        <a class="btn btn-outline-white_color" href="blog-single.html"><i
                            class="icon-arrow-left"> </i>خرید اشتراک</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="col-xl-4 col-md-6 dash-xl-10">
              <div class="card profile-greeting" style="height: auto">
                <div class="card-body">
                  <div class="media">
                    <div class="media-body">
                      <div class="greeting-user">
                        <h1>سلام،
                          {{ user.fullName }}
                        </h1>
                        <h6>خوش آمدید، داشبورد شما آماده است!</h6>
                        <h6>پلن فعلی شما: {{ user_plan.SubscriptionPlan.title }}</h6>
                        <h6>ترافیک پلن:   Mb {{ user_plan.SubscriptionPlan.bandwidthLimit / 1024 | currency }}</h6>
                        <h6>فضای پلن: Mb {{ user_plan.SubscriptionPlan.storageLimit / 1024 | currency }}</h6>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="col-xl-8 col-md-6 dash-xl-10">
              <div class="card total-transactions">


                <div class="card-header card-no-border">
                  <div class="header-top">
                    <h5 class="m-0">گزارش</h5>


                  </div>
                </div>

                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-6 report-main">
                      <div class="report-content text-center">
                        <p class="font-theme-light">فضای مصرفی</p>
                        <h5>{{ user.Customer.storageUsed }}</h5>
                        <div class="progress progress-round-primary">
                          <div class="progress-bar" role="progressbar" :style="{ 'width': percent_stroage + '%' }" aria-valuenow="45"
                               aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="report-content text-center">
                        <p class="font-theme-light">ترافیک مصرفی</p>
                        <h5>{{ user.Customer.trafficUsed }}</h5>
                        <div class="progress progress-round-secondary">
                          <div class="progress-bar" role="progressbar" :style="{ 'width': percent_traffic + '%' }" style="width: 65%" aria-valuenow="65"
                               aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>



          </template>

          <div class="col-sm-12">
            <div class="card">
              <div class="card-header pb-0">
                <h5>مشخصات کاربری</h5>
              </div>
              <div class="card-body">
                <p>{{ user }}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Container-fluid Ends-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import {mapGetters} from 'vuex'
import axios from "axios";
import store from "@/store";

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      verified: 'auth/verified',
      user_plan: 'auth/user_plan'
    }),
    percent_stroage() {
      let vm = this
      return (vm.user_plan.SubscriptionPlan.storageLimit / 100) * vm.user.Customer.storageUsed
    },
    percent_traffic() {
      let vm = this
      return (vm.user_plan.SubscriptionPlan.bandwidthLimit / 100) * vm.user.Customer.trafficUsed
    }
  },
  methods: {
    request_verify() {
      let vm = this
      axios.post('auth/email-req').then((response) => {
        if (!response.data.ok)
          vm.$toaster.warning(response.data.msg)
        else {
          this.$swal({
            title: 'ایمیل با موفقیت ارسال شد.',
            text: response.data.msg,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#80c1ff',
            cancelButtonColor: '#ffdada',
            confirmButtonText: 'تایید ایمیل',
            cancelButtonText: 'بستن'
          }).then((result) => {
            if (result.isConfirmed) {
              axios.get(response.data.url).then((response2) => {
                if (!response2.data.ok)
                  vm.$toaster.warning(response2.data.msg)
                else {
                  vm.$toaster.success(response2.data.msg)
                  store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {

                  })
                }
              })
            }
          })
        }

      })
    }
  },
  components: {
    //HelloWorld
  }
}
</script>
