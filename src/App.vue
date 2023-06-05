<template>
    <div id="app">
        <transition name="slide" mode="out-in">
            <template v-if="!currentRouteName">
                <div class="page-wrapper compact-wrapper" id="pageWrapper">
                    <!-- Page Header Start-->
                    <app-header/>
                    <!-- Page Header Ends-->
                    <!-- Page Body Start-->
                    <div class="page-body-wrapper horizontal-menu starter-kit-fix">


                        <!-- Page Sidebar Start-->
                        <app-side/>
                        <!-- Page Sidebar Ends-->


                        <transition name="slide" mode="out-in">
                            <router-view class="rooter__main__class"/>
                        </transition>


                        <app-footer/>

                    </div>
                </div>

                <!-- tap on top starts-->
                <div class="tap-top"><i data-feather="chevrons-up"></i></div>
                <!-- tap on tap ends-->
            </template>
            <template v-else>
                <transition name="slide" mode="out-in">
                    <router-view class="rooter__main__class"/>
                </transition>

            </template>
        </transition>

    </div>
</template>

<style>
.slide-enter-active {
    animation: slide-in 200ms ease-in-out forwards;
}

.slide-leave-active {
    animation: slide-out 200ms ease-in-out forwards;
}

@keyframes slide-in {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-30px);
        opacity: 0;
    }
}

</style>
<script>
import Footer from "@/components/Template/FooterTemplate.vue";
import Header from "@/components/Template/HeaderTemplate.vue";
import Side from "@/components/Template/SideTemplate.vue";

export default {
    components: {
        AppFooter: Footer,
        AppHeader: Header,
        AppSide: Side,
    },
    computed: {
        currentRouteName() {
            if (this.$route.name === "Login" || this.$route.name === "Register")
                return true;
            else
                return false;

        }
    }

}
</script>