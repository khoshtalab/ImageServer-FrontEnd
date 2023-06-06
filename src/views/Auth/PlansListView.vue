<template>
  <div class="home">
    <div class="page-body">
      <div class="container-fluid">
        <div class="page-title">
          <div class="row">
            <div class="col-12 col-sm-6">
              <h3>لیست پلن ها</h3>
            </div>
          </div>
        </div>
      </div>
      <template v-if="user_plan">
        <div class="row starter-main">
          <div class="col-xl-4 col-md-6 dash-xl-10">
            <div class="card profile-greeting" style="height: auto">
              <div class="card-body">
                <div class="media">
                  <div class="media-body">
                    <div class="greeting-user">
                      <h6>پلن فعلی شما: {{ user_plan.SubscriptionPlan.title }}</h6>
                      <h6>ترافیک پلن: Mb {{ user_plan.SubscriptionPlan.bandwidthLimit / 1024 | currency }}</h6>
                      <h6>فضای پلن: Mb {{ user_plan.SubscriptionPlan.storageLimit / 1024 | currency }}</h6>
                      <h6>تاریخ خرید: {{ user_plan.startedAt }}</h6>
                      <h6>تاریخ انقضاء: {{ user_plan.exipresAt }}</h6>


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
                        <div class="progress-bar" role="progressbar" :style="{ 'width': percent_stroage + '%' }"
                             aria-valuenow="45"
                             aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="report-content text-center">
                      <p class="font-theme-light">ترافیک مصرفی</p>
                      <h5>{{ user.Customer.trafficUsed }}</h5>
                      <div class="progress progress-round-secondary">
                        <div class="progress-bar" role="progressbar" :style="{ 'width': percent_traffic + '%' }"
                             style="width: 65%" aria-valuenow="65"
                             aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>

        </div>

      </template>

      <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="row">
          <template v-if="!loading">


            <template v-for="(plan,index) in plans">
              <transition name="slide" :key="index">
                <div class="col-xl-4 col-sm-4 box-col-4">
                  <div class="pricing-block card text-center">
                    <div class="pricing-header">
                      <h2>{{ plan.title }}</h2>
                      <div class="price-box">
                        <div>
                          <h3>{{ plan.basePrice | currency }}
                            تومان</h3>
                          <p>/ ماهانه</p>
                        </div>
                      </div>
                    </div>
                    <div class="pricing-list">
                      <ul class="pricing-inner">
                        <li>
                          <h6>
                            {{ plan.storageLimit | currency }}
                            <span> فضای ذخیره سازی</span></h6>
                        </li>
                        <li>
                          <h6>
                            {{ plan.bandwidthLimit | currency }}
                            <span> پهنای باند</span></h6>
                        </li>

                      </ul>
                      <button @click="buyPLan(plan.id)" :disabled='disable_button' class="btn btn-primary btn-lg"
                              type="button" data-original-title="btn btn-primary btn-lg"
                              title="">خرید پلن
                      </button>
                    </div>
                  </div>
                </div>


              </transition>
            </template>


          </template>
          <template v-for="index in 3" v-else>
            <div class="col-xl-4 col-sm-4 box-col-4" :key="index">
              <vue-skeleton-loader
                  type="rect"
                  :width="350"
                  :height="400"
                  animation="wave"
                  :rounded=true
                  :radius="15"
              />
            </div>
          </template>


        </div>
      </div>
      <!-- Container-fluid Ends-->
    </div>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import axios from "axios";


export default {
  name: 'PlansListView',
  data() {
    return {
      loading: false,
      plans: [],
      disable_button: false,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      verified: 'auth/verified',
      user_plan: 'auth/user_plan'
    }), percent_stroage() {
      let vm = this
      return ((vm.user_plan.SubscriptionPlan.storageLimit / 1024 / 1024 / 1024 / 100) * vm.user.Customer.storageUsed) / 10000000
    },
    percent_traffic() {
      let vm = this
      return ((vm.user_plan.SubscriptionPlan.bandwidthLimit / 1024 / 1024 / 1024 / 100) * vm.user.Customer.trafficUsed) / 10000000
    }
  },
  methods: {
    getPlans() {
      let vm = this
      vm.$toaster.warning("درحال دریافت اطلاعات")
      vm.loading = true
      axios.get('cp/subscription').then((response) => {
        if (!response.data.ok)
          vm.$toaster.warning(response.data.msg)
        else {
          vm.$toaster.success("اطلاعات با موفقیت دریافت شد")
          vm.plans = response.data.plans

        }
        vm.loading = false
      })

    },
    buyPLan(id) {
      let vm = this

      vm.disable_button = true
      axios.post('cp/subscription/buy', {
        planID: id
      }).then((response) => {
        if (!response.data.ok)
          vm.$toaster.warning(response.data.msg)
        else {
          vm.$toaster.success("اطلاعات با موفقیت دریافت شد در حال انتقال به درگاه بانکی هستید.")

          let delayInMilliseconds = 1000; //1 second

          setTimeout(function () {
            window.location.href = response.data.redirect

            //your code to be executed after 1 second
          }, delayInMilliseconds);


        }
        vm.disable_button = false
      }).catch(function (error) {

        vm.$toaster.error(error.response.data.msg)

        vm.disable_button = false

      })


    }
  },
  mounted() {
    this.getPlans()
    let vm = this

    if (this.$route.query.pp === '1') {
      console.log(vm.$route.query)

      let ok = vm.$route.query.pok
      let msg = vm.$route.query.pmsg

      if (ok === "true") {
        vm.$swal({
          title: 'موفق بود',
          text: msg,
          icon: 'success',
          confirmButtonColor: '#80c1ff',
          cancelButtonColor: '#ffdada',
          confirmButtonText: 'بستن',
        })

      } else {
        console.log(vm.$route.query)
        vm.$swal({
          title: 'موفق نبود!',
          text: msg,
          icon: 'warning',

          confirmButtonColor: '#80c1ff',
          cancelButtonColor: '#ffdada',
          confirmButtonText: 'بستن'
        })
      }

    }

  },
  components: {}
}
</script>

<style scoped>

</style>