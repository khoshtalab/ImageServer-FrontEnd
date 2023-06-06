<template>
  <div class="sidebar-wrapper">
    <div>
      <div class="logo-wrapper"><a href="#" data-bs-original-title="" title=""><img
          class="img-fluid for-light" src="#" alt=""><img
          class="img-fluid for-dark" src="#" alt=""></a>
        <div class="back-btn"><i class="fa fa-angle-right"></i></div>
      </div>
      <div class="logo-icon-wrapper"><a href="#" data-bs-original-title="" title=""><img
          class="img-fluid" src="#" alt=""></a></div>
      <nav class="sidebar-main">
        <div class="left-arrow" id="left-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-arrow-left">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </div>
        <div id="sidebar-menu">
          <ul class="sidebar-links" id="simple-bar" data-simplebar="init" style="display: block;">
            <div class="simplebar-wrapper" style="margin: 0px;">
              <div class="simplebar-height-auto-observer-wrapper">
                <div class="simplebar-height-auto-observer"></div>
              </div>
              <div class="simplebar-mask">
                <div class="simplebar-offset" style="left: 0px; bottom: 0px;">
                  <div class="simplebar-content-wrapper" style="height: 100%; overflow: hidden;">
                    <div class="simplebar-content" style="padding: 0px;">
                      <li class="back-btn"><a href="#" data-bs-original-title=""
                                              title=""><img class="img-fluid"
                                                            src="#"
                                                            alt=""></a>
                        <div class="mobile-back text-end"><span>بازگشت</span><i
                            class="fa fa-angle-left ps-2" aria-hidden="true"></i></div>
                      </li>
                      <li class="sidebar-list">

                        <router-link to='/' class="sidebar-link sidebar-title" tag="a"
                                     exact data-bs-original-title="" title="">

                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               class="feather feather-home">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>داشبورد </span>
                          <div class="according-menu"><i class="fa fa-angle-left"></i></div>

                        </router-link>
                      </li>
                      <li class="sidebar-list">

                        <router-link to='/about' class="sidebar-link sidebar-title" tag="a"
                                     exact data-bs-original-title="" title="">

                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               class="feather feather-home">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>صفحه درباره ما </span>
                          <div class="according-menu"><i class="fa fa-angle-left"></i></div>

                        </router-link>
                      </li>


                      <li class="sidebar-list">
                        <router-link to='/login' class="sidebar-link sidebar-title" tag="a"
                                     exact data-bs-original-title="" title="">

                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               class="feather feather-home">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>صفحه ورود </span>
                          <div class="according-menu"><i class="fa fa-angle-left"></i></div>
                        </router-link>

                      </li>
                      <li class="sidebar-list">
                        <router-link to='/register' class="sidebar-link sidebar-title" tag="a"
                                     exact data-bs-original-title="" title="">

                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               class="feather feather-home">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>صفحه ثبت نام </span>
                          <div class="according-menu"><i class="fa fa-angle-left"></i></div>
                        </router-link>

                      </li>
                      <li class="sidebar-list">
                        <router-link to='/plans' class="sidebar-link sidebar-title" tag="a"
                                     exact data-bs-original-title="" title="">

                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               class="feather feather-home">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>خرید پلن </span>
                          <div class="according-menu"><i class="fa fa-angle-left"></i></div>
                        </router-link>

                      </li>
                      <li class="sidebar-list">
                        <router-link to='/library' class="sidebar-link sidebar-title" tag="a"
                                     exact data-bs-original-title="" title="">

                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               class="feather feather-home">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>فایل ها / آپلود </span>
                          <div class="according-menu"><i class="fa fa-angle-left"></i></div>
                        </router-link>

                      </li>
                      <li class="sidebar-list">
                        <a @click="logout()" class="sidebar-link sidebar-title" tag="a"
                           exact data-bs-original-title="" title="">

                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               class="feather feather-home">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>خروج</span>
                          <div class="according-menu"><i class="fa fa-angle-left"></i></div>
                        </a>

                      </li>


                    </div>
                  </div>
                </div>
              </div>
              <div class="simplebar-placeholder" style="width: auto; height: 310px;"></div>
            </div>
            <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
              <div class="simplebar-scrollbar simplebar-visible" style="width: 0px; display: none;"></div>
            </div>
            <div class="simplebar-track simplebar-vertical" style="visibility: hidden;">
              <div class="simplebar-scrollbar simplebar-visible"
                   style="height: 0px; display: none;"></div>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SideTemplate",
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  },
  methods: {
    ...mapActions({
      logout_action: 'auth/logout'
    }),
    logout() {
      let vm = this
      vm.logout_action()
      vm.$toaster.warning("با موفقیت از حساب کاربری خود خارج شدید.")
      this.$router.replace({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped>

</style>