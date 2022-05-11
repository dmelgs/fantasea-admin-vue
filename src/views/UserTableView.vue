<template>
<div class="container">
    <div class="row">
        <div class="table-responsive">
        <h3>Customer</h3>
          <table class="table table-striped table-sm">
            <thead>
                <th>#</th>
                <th>Username</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr v-for="user, index in usersList" :key="user.key">
                <td>{{index+1}}</td>
                <td>{{user.username}}</td>
                <td>{{user.userFullName}}</td>
                <td>{{user.contact}}</td>
                <td>{{user.email}}</td>
                <td>{{user.address}}</td>
                <td>
                    <button class="btn message" @click.prevent="messageUser(user.username)">Message</button>                 
                </td>
                <td>
                     <button class="btn delete"  @click.prevent="deleteCustomer(user.username)">Delete</button>
                </td>
                </tr>            
            </tbody>
          </table>
        </div>        
    </div> <!--row-->
    
      <div class="row">
        <div class="table-responsive">
        <h3>Travel Agency</h3>
          <table class="table table-striped table-sm">
            <thead>
                <th>#</th>         
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr v-for="agency, index in agencyList" :key="agency.key">
                <td>{{index+1}}</td>
                <td>{{agency.name}}</td>
                <td>{{agency.contact_number}}</td>         
                <td>{{agency.email}}</td>
                <td>{{agency.address}}</td>
                <td>
                    <button class="btn message" @click.prevent="messageUser(agency.name)">Message</button>                 
                </td>
                <td>
                     <button class="btn delete" @click.prevent="deleteAgency(agency.name)">Delete</button>
                </td>
                </tr>            
            </tbody>
          </table>
        </div>  
    </div> <!--row-->

      <div class="row">
        <div class="table-responsive">
        <h3>Pump Boat Owner</h3>
          <table class="table table-striped table-sm">
            <thead>
                <th>#</th>         
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr v-for="boatOwner, index in boatOwnerList" :key="boatOwner.key">
                <td>{{index+1}}</td>
                <td>{{boatOwner.name}}</td>
                <td>{{boatOwner.contact_number}}</td>         
                <td>{{boatOwner.email}}</td>
                <td>{{boatOwner.address}}</td>
                <td>
                    <button class="btn message" @click.prevent="messageUser(boatOwner.name)">Message</button>                 
                </td>
                <td>
                     <button class="btn delete" @click.prevent="deleteBoatOwner(boatOwner.name)">Delete</button>
                </td>
                </tr>            
            </tbody>
          </table>
        </div>  
    </div> <!--row-->

      <div class="row">
        <div class="table-responsive">
        <h3>Pump Boat Owner</h3>
          <table class="table table-striped table-sm">
            <thead>
                <th>#</th>         
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr v-for="admin, index in adminList" :key="admin.key">
                <td>{{index+1}}</td>
                <td>{{admin.name}}</td>
                <td>{{admin.contact_number}}</td>         
                <td>{{admin.email}}</td>
                <td>{{admin.address}}</td>
                <td>{{admin.status}}</td>
                <td>
                    <button class="btn message" @click.prevent="messageUser(boatOwner.name)">Message</button>                 
                </td>
                <td>
                     <button class="btn delete" @click.prevent="deleteBoatOwner(boatOwner.name)">Delete</button>
                </td>
                </tr>            
            </tbody>
          </table>
        </div>  
    </div> <!--row-->
   
</div>
    
</template>

<script>
/* eslint-disable */ 
import { getDatabase, ref, get, child, update, onValue, remove} from "firebase/database";


export default {
    name: 'userTable',
    components:{
    
    },
    data(){
        return{
            usersList : [],
            agencyList : [],
            boatOwnerList : [],
            adminList : [],
            isMessage: [],
        };
    },
    mounted(){

        const db = getDatabase();

        //get all customer
        let viewUsers = this;
        const adbRef = ref(db, '/appusers/');        
        onValue(adbRef, (snapshot) => {                         
            let data = snapshot.val();
            let usersList  = [];
                Object.keys(data).forEach((key) => {                        
                usersList.push({
                    id : key,
                    username: data[key].username,
                    userFullName : data[key].lastname + ', ' + data[key].firstname,
                    contact : data[key].phonenumber,
                    email : data[key].email,
                    address : data[key].address,
               });             
            });
        viewUsers.usersList = usersList;
        });

        //get all travel agency 
        let viewAgency = this;
        const agencyRef = ref(db, '/users/travel_agency/');  
         onValue(agencyRef, (snapshot) => {                         
            let data = snapshot.val();
            let agencyList  = [];
                Object.keys(data).forEach((key) => {                        
                agencyList.push({
                    id : key,
                    name: data[key].name,               
                    contact_number : data[key].contact_number,
                    email : data[key].email,
                    address : data[key].address,
               });             
            });
        viewAgency.agencyList = agencyList;
        });

        //get all pump boat owner
        let viewPumpOwner = this;
        const boatOwnerRef = ref(db, '/users/pump_boat_owner/');  
         onValue(boatOwnerRef, (snapshot) => {                         
            let data = snapshot.val();
            let boatOwnerList  = [];
                Object.keys(data).forEach((key) => {                        
                boatOwnerList.push({
                    id : key,
                    name: data[key].name ,               
                    contact_number : data[key].contact_number,
                    email : data[key].email,                             
               });             
            });
        viewPumpOwner.boatOwnerList = boatOwnerList;
        });
        // get all admin
         let viewAdmin = this;
        const adminRef = ref(db, '/users/admin/');  
         onValue(adminRef, (snapshot) => {                         
            let data = snapshot.val();
            let adminList  = [];
                Object.keys(data).forEach((key) => {                        
                adminList.push({
                    id : key,
                    name: data[key].last_name + ',' +data[key].first_name ,               
                    contact_number : data[key].contact_number,
                    email : data[key].email,
                    address : data[key].street + ', ' +data[key].city + ', ' +data[key].province + ', ' +data[key].zip,
                    status: data[key].status,
               });             
            });
        viewAdmin.adminList = adminList;
        });
    },
    methods : {
        createBoatOwner(){
          
        },
        async messageUser(id){
            this.isMessage = true
            this.$router.push({ name: 'chat-box', params: { id: id } })
        }
    }
}
</script>

<style scoped>

.row{
    top: 0;
    bottom: 0;
    right: 0;
    margin-left: 15%;
    margin-right: 5%;
    margin-bottom: 5%;
}
h3{
    text-align: left;
}
.table{ 
    width: 100%;
}

.btn{
    border-radius: 10%;  
}
.btn:hover{
    background-color: rgb(130, 130, 128);
    color:white;
}
.chatbox{
    position: fixed;
    bottom: 0;
    left: 40%;
    top: 45%;

}
</style>