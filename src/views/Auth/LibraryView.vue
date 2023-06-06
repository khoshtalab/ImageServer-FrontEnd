<template>
  <div class="home">
    <div class="page-body">
      <div class="container-fluid">
        <div class="page-title">
          <div class="row">
            <div class="col-12 col-sm-6">
              <h3>قایل های آپلود شده</h3>
            </div>
          </div>
        </div>
      </div>


      <div class="container-fluid">
        <div class="row" v-if="user_plan">
          <div class="col-xl-3 box-col-3 pe-0 xl-30">
            <div class="md-sidebar">

              <div class="md-sidebar-aside job-left-aside custom-scrollbar">
                <div class="file-sidebar">
                  <div class="card">
                    <div class="card-body">
                      <h2 class="mt-1">آپلود فایل</h2>
                      <br>
                      <input class="form-control" ref="fileupload" type="file" aria-label="file example" @change="onFileChange"/>
                      <br>
                      <button class="btn btn-primary" type="submit" @click="uploadFile()" :disabled='disable_button'>
                        آپلود
                      </button>
                      <hr>
                      <ul>
                        <li>
                          <div class="btn btn-outline-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" class="feather feather-database">
                              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                            </svg>
                            فضای ذخیره سازی
                          </div>
                          <div class="m-t-15">
                            <div class="progress sm-progress-bar mb-1">
                              <div class="progress-bar bg-primary" role="progressbar"
                                   :style="{ 'width': percent_stroage + '%' }"
                                   aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>
                              {{ user.Customer.storageUsed / 1024 / 1024 / 1024 / 1024 }}
                              GB از
                              {{ user_plan.SubscriptionPlan.storageLimit / 1024 / 1024 / 1024 }}
                              GB
                              استفاده شده است.
                            </h6>
                          </div>
                        </li>
                      </ul>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-md-12 box-col-9 xl-70">
            <div class="file-content">
              <div class="card">
                <div class="card-header">
                  <div class="media">
                    <form class="form-inline" action="#" method="get">
                      <div class="form-group d-flex mb-0"><i class="fa fa-search"></i>
                        <input class="form-control-plaintext" type="text" placeholder="جستجو ...">
                      </div>
                    </form>

                  </div>
                </div>
                <div class="card-body file-manager">
                  <h5 class="mt-1">فایل ها</h5>
                  <ul class="files">

                    <template v-for="(file,index) in files">

                      <li class="file-box" :key="index">
                        <div class="file-top"><img :src="getImgUrl(file.fileName)" width="100px" height="100px" alt=""
                                                   class="src"></div>
                        <div class="file-bottom">
                          <h5>{{ file.fileName }} </h5>
                          <p class="mb-1">آیدی:
                            {{ file.id }}
                          </p>
                          <p></p>
                        </div>
                      </li>

                    </template>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="" v-else>
          <div class="col-xl-12 col-md-12 dash-xl-10">
            <div class="card profile-greeting" style="height: auto">
              <div class="card-body">
                <div class="media">
                  <div class="media-body">
                    <div class="greeting-user">
                      <h1>سلام،
                        {{ user.fullName }}
                      </h1>
                      <h6>خوش آمدید، داشبورد شما آماده است!</h6>
                      <router-link to="plans" tag="a" class="btn btn-outline-white_color">
                        <i
                            class="icon-arrow-left"> </i>خرید اشتراک

                      </router-link>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import axios from "axios";
import store from "@/store";


export default {
  name: 'LibraryView',
  data() {
    return {
      loading: false,
      files: [],
      img64: null,
      disable_button: false,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      verified: 'auth/verified',
      user_plan: 'auth/user_plan'
    }),
    percent_traffic() {
      let vm = this
      return (vm.user_plan.SubscriptionPlan.bandwidthLimit / 100) * vm.user.Customer.trafficUsed
    }
  },
  methods: {
    getImgUrl(name) {
      return "http://localhost:4000/img/" + name
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },

    createImage(file) {
      let vm = this
      const reader = new FileReader()

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        vm.img64 = rawImg;
      }
      reader.readAsDataURL(file);

    },
    getFiles() {
      let vm = this
      vm.$toaster.warning("درحال دریافت اطلاعات")
      vm.loading = true
      axios.get('cp/library').then((response) => {
        if (!response.data.ok)
          vm.$toaster.warning(response.data.msg)
        else {
          vm.$toaster.success("اطلاعات با موفقیت بارگذاری شد")
          vm.files = response.data.files

        }
        vm.loading = false
      })

    },
    uploadFile() {
      let vm = this
      vm.$toaster.info("در حال آپلود عکس")
      vm.disable_button = true
      axios.post('cp/library/upload', {
        img: vm.img64
      }).then((response) => {
        if (!response.data.ok)
          vm.$toaster.warning(response.data.msg)
        else {
          vm.$toaster.success("عکس مورد نظر با موفقیت آپلود شد.")
          vm.getFiles()
          this.$refs.fileupload.value = null;
          store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {

          })
        }
        vm.disable_button = false
      }).catch(function (error) {

        vm.$toaster.error(error.response.data.msg)

        vm.disable_button = false

      })


    }
  },
  mounted() {
    let vm = this
    vm.getFiles()
  },
  components: {}
}
</script>

<style scoped>

</style>