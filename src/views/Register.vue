<template>
    <div class="container login-container">
            <div class="row">
                <div class="col-md-6 login-form-1">
                    <h3>Create your account</h3>
                    <hr>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Email *" v-model="email" required/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Your Password *" v-model="password" required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Last name *" v-model="last_name" required/>
                        </div>         
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="First name *" v-model="first_name" required/>
                        </div>              
                         <div class="form-group">
                            <input type="text" class="form-control" placeholder="Number *" v-model="contact" required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Street *" v-model="street" required/>
                        </div>
                         <div class="form-group">
                            <input type="text" class="form-control" placeholder="City *" v-model="city" required/>
                        </div>                        
                         <div class="form-group">
                            <input type="text" class="form-control" placeholder="Province *" v-model="province" required/>
                        </div>                     
                         <div class="form-group">
                            <input type="text" class="form-control" placeholder="Postal Code *" v-model="postal" required/>
                        </div>
                        <div class="form-group">
                            <input @click="registerAdmin" class="btnSubmit" value="Register" />
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Forget Password?</a>
                        </div>
                        <div class="form-group">
                            <p>Already have an account? <a href="#" @click="goToLogin" class="ForgetPwd"> Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
   </div>
</template>
<script>
/* eslint-disable */ 
import {getAuth, onAuthStateChanged, sendEmailVerification, createUserWithEmailAndPassword} from 'firebase/auth';
import { getDatabase, ref,set} from "firebase/database";


    
export default {
    name: 'loginAdmin',

    data(){
        return{
            username: '',
            email: '',
            password: '',
            contact : '',
            province : '',
            postal : '',
            street : '',
        };
    },

    beforeCreate(){  
        
        onAuthStateChanged( getAuth(), (user) => {
        if (user) {    
            this.$router.push('/');
        }else{
            this.$router.push('/register-admin');
        }
        });
    },

    methods: {
        goToLogin(){
             this.$router.push('/login');
        },
        async registerAdmin(){
                const db = getDatabase();
                const dbRef = ref(db);
                
            if(this.email == "" || this.password == "" || this.last_name == "" || this.first_name == ""
            || this.contact == "" || this.street == "" || this.city == "" || this.province == "" || this.zip == ""
            ){
                alert('Some Fields Are Missing')
                return;
            }   
                     
            createUserWithEmailAndPassword(getAuth(), this.email, this.password)
                    .then(( ) => {  
                        this.userId = getAuth().currentUser.uid;                
                        set(ref(db, '/users/admin/' + this.userId), {
                            email : this.email,
                            last_name : this.last_name,
                            first_name : this.first_name,
                            contact_number : this.contact,
                            street: this.street,
                            city : this.city,
                            province: this.province,
                            zip: this.postal,                          
                            user_type: 'admin',       
                        })
                        .then(( ) => { 
                            alert("Succesfully Registered");   
                            sendEmailVerification(getAuth().currentUser)
                            .then(() => {
                               console.log('Email Verification Sent');
                            }); 
                        }) 
                    .catch((error) => {
                        alert("error" + error.message)
                    });                    
                })
            .catch((error) => {
                switch (error.code){
                   case 'auth/email-already-in-use':
                        alert("Email already in use")
                        break
                    case 'auth/invalid-email':
                        alert("Invalid email")
                        break
                    case 'auth/operation-not-allowed':
                        alert("Operation not allowed")
                        break
                    case 'auth/weak-password':
                        alert("Password should be 6 characters up")
                        break
                    default:
                        alert("Something went wrong" + error.message)
                }
            });
        },
    }
}
</script>

<style scoped>
 .login-container{
    width:auto;
    margin-top: 2%;
    margin-bottom: 2%;

}
.login-form-1{
    margin: auto;
    padding: 2%;
    width:auto;
}
.login-form-1 h3{
    text-align: center;
    color: #333;
}
.login-container form{
    padding: 10px;
    margin:auto;
    width: auto;
    
}
.btnSubmit
{
    width: 100%;
    border-radius: 5px;
    padding: 1.5%;
    border: none;
    cursor: pointer;
    text-align: center;
    margin-top: 2%;
}
.login-form-1 .btnSubmit{
    font-weight: 600;
    color: #fff;
    background-color: #0062cc;
}
.login-form-1 .ForgetPwd{
    color: #0062cc;
    font-weight: 600;
    text-decoration: none;
}
.login-form-1 .form-group{
    padding: 5px;

}
</style>