<template>

  <div class="main register q-mt-lg q-mb-md">
    <!-- Sign up form -->
    <section class="signup">
      <div class="container">

        <div class="signup-content row ">

          <div class="col-md-6 col-xs-12 signup-form">

            <h2 class="form-title">Sign up</h2>

             <q-form @submit.prevent="addUser()"  v-model="form"    class="register-form" id="register-form">

              <div class="form-group">
                <label for="First Name"><i class="zmdi zmdi-account material-icons-name"></i></label> 
                <input  @keyup="validatename"  @focusout="validatename"  v-model="form.first_name" type="text" name="First Name" id="First Name" placeholder="First Name" />
              </div>
              <div class=" error " v-if="error[0]"> {{ error[0] }} </div>
      

              <div class="form-group">
                <label for="Last Name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                <input @keyup="validateLastName"  @focusout="validateLastName"  v-model="form.last_name" type="text" name="Last Name" id="Last Name" placeholder="Last Name" />
              </div>
              <div class=" error " v-if="error[1]"> {{ error[1] }} </div>


              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input @keyup="validateEmail"  @focusout="validateEmail"  v-model="form.email" type="email" name="email" id="email" placeholder="Your Email" />
              </div>
              <div class=" error " v-if="error[2]"> {{ error[2] }} </div>


              <div class="form-group">
                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                <input @keyup="validatePassword"  @focusout="validatePassword"  v-model="form.password" type="password" name="pass" id="pass" placeholder="Password" />
              </div>
              <div class=" error " v-if="error[3]"> {{ error[3] }} </div>


              <div class="form-group">
                <label for="Address"><i class="zmdi  zmdi-pin material-icons-name"></i></label>
                <input @keyup="validateAddress"  @focusout="validateAddress"  v-model="form.address" type="text" name="Address" id="Address" placeholder="Address" />
              </div>
              <div class=" error " v-if="error[5]"> {{ error[5] }} </div>


              <div class="form-group">
                <label for="Photo"><i class="zmdi zmdi-photo-size-select-large material-icons-name"></i></label>
                <input  @change="handleImageSelect"  accept="image/*" :maxFileSize="1000000" type="file" name="Photo" id="Photo" placeholder="Photo" />
              </div>

              <div class="form-group form-button">

                <input :disabled="isFormValid"  type="submit" name="signup" id="signup" class="form-submit" value="Register" />

              </div>

            </q-form > 

          </div>

          <div class=" col-md-6 col-xs-12 signup-image q-mt-md">
             <figure>
              <img
                src="../../../assets/images/signup-image.jpg"
                alt="sing up image"
              />
            </figure> 
             <router-link   to="/login" class="signup-image-link" >I am already member</router-link> 
          </div>

        </div>
      </div>
    </section>

    
    
  </div>
</template>

<script>
import { ref, watch, onMounted , computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import rules from "src/config/rules";
import authServices from "../services/services";
export default {
  setup() {

    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const form = ref({
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      address:"",
    });

    // Input Validation
   const error = ref([]);
   const validatename = () => {
        if(form.value.first_name === "")
          error.value[0] = "The Input field is required"
        else
          error.value[0] = ""
   };

   const validateLastName = () => {
        if(form.value.last_name === "")
          error.value[1] = "The Input field is required"
        else
          error.value[1] = ""
   };
   
   const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(form.value.email === "")
          error.value[2] = "The Input field is required"
        else if(!emailRegex.test(form.value.email))
          error.value[2] = "Invalid email format"
        else
          error.value[2] = ""
   };
   
   const validatePassword = () => {
      if (form.value.password === "") {
        error.value[3] = "The Input field is required";
      } else {
        error.value[3] = "";
      }
   };


   const validateAddress = () => {
        if(form.value.address === "")
          error.value[5] = "The Input field is required"
        else
          error.value[5] = ""
   };

    
    const isFormValid = computed(() => {
      return Object.values(form.value).some(value => value === "") || error.value.some(errorMessage => errorMessage !== "");
    });

    const handleImageSelect = (event) => {
      if (event.target.files.length >= 0) {
        form.value.user_image = event.target.files[0];
      }
    }

    const register = () => {
      $q.loading.show();
      authServices.register(form.value).then((res) => {
            $q.loading.hide();
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Data has been registered Successfully",
            });
            router.push("/login");
        })
        .catch((error) => {
          console.log(error)
          $q.loading.hide();
          $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "error",
            });
        });
    }




    const addUser = () => {
      if (!isFormValid.value) {
         register();
      }
    }

   
  
    



    
  

    onMounted(() => {
        
    });

    return {
      form,
      addUser,
      handleImageSelect,
      rules,
      error,
      validatename,
      validateLastName,
      validateEmail,
      validatePassword,
      validateAddress,
      isFormValid,






    }
  }
};
</script>
