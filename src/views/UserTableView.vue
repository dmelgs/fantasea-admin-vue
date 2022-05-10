<template>
    <h2>Section title</h2>
    <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
                <th>#</th>
                <th>Username</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Address</th>
            </thead>
            <tbody>
                <tr v-for="user, index in usersList" :key="user.key">
                <td>{{index+1}}</td>
                <td>{{user.username}}</td>
                <td>{{user.userFullName}}</td>
                <td>{{user.contact}}</td>
                <td>{{user.email}}</td>
                <td>{{user.address}}</td>
                </tr>            
            </tbody>
          </table>
    </div>  
</template>

<script>
/* eslint-disable */ 
import { getDatabase, ref, get, child, update, onValue, remove} from "firebase/database";


export default {
    name: 'userTable',
    data(){
        return{
            usersList : [],
        };
    },
    mounted(){
        const db = getDatabase();

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
    },
    methods : {

    }
}
</script>

<style scoped>
.table{
    margin-left: 20%;
   
    width: auto;
}
</style>