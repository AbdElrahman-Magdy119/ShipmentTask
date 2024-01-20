<template>
  <div class="main login q-mt-lg q-mb-md">
    <section class="sign-in">
      <div class="container">
        <div class="signin-content row">

          <div class="signin-image col-md-6 col-xs-12">
            <figure>
              <img src="../../../assets/images/signin-image.jpg" alt="sing up image" />
            </figure>
            <router-link to="/register" class="signup-image-link">Create an account</router-link>
          </div>

          <div class="signin-form col-md-6 col-xs-12">

            <h2 class="form-title">Sign up</h2>

            <q-form @submit.prevent="userLogin()"  v-model="form" class="register-form" id="login-form">


              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email material-icons-name"></i></label>
                <input @keyup="validateEmail"  @focusout="validateEmail"  v-model="form.email" type="text" name="email" id="email" placeholder="Your Email" />
              </div>
              <div class=" error " v-if="error[0]"> {{ error[0] }} </div>

              <div class="form-group">
                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                <input @keyup="validatePassword"  @focusout="validatePassword"  v-model="form.password" type="password"  name="your_pass"  id="your_pass"  placeholder="Password" />
              </div>
              <div class=" error " v-if="error[1]"> {{ error[1] }} </div>


              <div class="form-group form-button">
                <input :disabled="isFormValid"  type="submit"  name="signin"    id="signin"   class="form-submit"  value="Log in" />
              </div>

            </q-form>

            
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { ref , computed , onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import authServices from "../services/services";
import Cookies from 'js-cookie';
export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const form = ref({
      email: "",
      password: "",
    });


    const error = ref([]);
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(form.value.email === "")
          error.value[0] = "The Input field is required"
        else if(!emailRegex.test(form.value.email))
          error.value[0] = "Invalid email format"
        else
          error.value[0] = ""
   };

   const validatePassword = () => {
      if(form.value.password === "")
        error.value[1] = "The Input field is required";
      else
        error.value[1] = "";
   };

   const isFormValid = computed(() => {
      return Object.values(form.value).some(value => value === "") || error.value.some(errorMessage => errorMessage !== "");
    });

   


     const login = () => {
      $q.loading.show();
      authServices.logIn(form.value).then((res) => {
            localStorage.setItem('token', res.data.user.token);
            localStorage.setItem('first_name', res.data.user.first_name);
            localStorage.setItem('last_name', res.data.user.last_name);
            localStorage.setItem('_id', res.data.user._id);
            localStorage.setItem('email',res.data.user.email);
            localStorage.setItem('user_image',res.data.user.user_image);
            router.push({ name: "dashboard" });
            $q.loading.hide();
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Loged in Successfully",
            });
        })
        .catch((error) => {
          $q.loading.hide();
          $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Error",
            });
        });
     };

    const userLogin = () => {
      if (!isFormValid.value) {
        login();
      }
    }


    onMounted(() => {
      
      });
    
    return {
      validateEmail,
      validatePassword,
      form,
      userLogin,
      isFormValid,
      error,
    };
  },
};
</script>
