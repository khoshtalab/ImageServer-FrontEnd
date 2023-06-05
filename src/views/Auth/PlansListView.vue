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
                            {{plan.storageLimit | currency}}
                             <span> فضای ذخیره سازی</span></h6>
                        </li> <li>
                          <h6>
                            {{plan.bandwidthLimit | currency}}
                             <span> پهنای باند</span></h6>
                        </li>

                      </ul>
                      <button @click="buyPLan(plan.id)" :disabled='disable_button' class="btn btn-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg"
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
      disable_button: true,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  },
  methods: {
    getPlans() {
      let vm = this
      vm.$toaster.warning("درحال دریافت اطلاعات")
      vm.disable_button = true
      axios.get('cp/subscription').then((response) => {
        if (!response.data.ok)
          vm.$toaster.warning(response.data.msg)
        else {
          vm.$toaster.success("اطلاعات با موفقیت دریافت شد")
          vm.plans = response.data.plans

        }
        vm.disable_button = false
      })

    },
    buyPLan(id) {
      let vm = this


      axios.post('cp/subscription/buy',{
        planID:id
      }).then((response) => {
        if (!response.data.ok)
          vm.$toaster.warning(response.data.msg)
        else {
          vm.$toaster.success("اطلاعات با موفقیت دریافت شد")
          vm.plans = response.data.plans

        }
        vm.loading = false
      })

    }
  },
  mounted() {
    this.getPlans()
  },
  components: {}
}
</script>

<style scoped>

</style>