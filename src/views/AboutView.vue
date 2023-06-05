<template>
  <div class="home">
    <div class="page-body">
      <div class="container-fluid">
        <div class="page-title">
          <div class="row">
            <div class="col-12 col-sm-6">
              <h3>صفحه درباره</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="row starter-main">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header pb-0">
                <h5>صفحه درباره</h5>
              </div>
              <div class="card-body">
                <p>سلام برادر</p>

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

export default {
  name: 'AboutView',
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  },
  components: {
    //HelloWorld
  }
}
</script>
