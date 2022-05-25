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
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.userFullName }}</td>
                            <td>{{ user.contact }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.address }}</td>
                            <td>
                                <button class="btn message" @click.prevent="messageUser(user.username)">Message</button>
                            </td>
                            <td>
                                <button class="btn message" @click.prevent="editCustomer(user.username)">Edit</button>
                            </td>
                            <td>
                                <button class="btn delete"
                                    @click.prevent="deleteCustomer(user.username)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--row-->

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
                            <td>{{ index + 1 }}</td>
                            <td>{{ agency.name }}</td>
                            <td>{{ agency.contact_number }}</td>
                            <td>{{ agency.email }}</td>
                            <td>{{ agency.address }}</td>
                            <td>
                                <button class="btn message" @click.prevent="messageUser(agency.name)">Message</button>
                            </td>
                            <td>
                                <button class="btn message" @click.prevent="editAgency(agency.name)">Edit</button>
                            </td>
                            <td>
                                <button class="btn delete" @click.prevent="deleteAgency(agency.name)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--row-->

        <div class="row">
            <div class="table-responsive">
                <h3>Pump Boat</h3>
                <table class="table table-striped table-sm">
                    <thead>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Seating Capacity</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-for="boatOwner in boatOwnerList" :key="boatOwner.key">
                            <td>{{ boatOwner.id }}</td>
                            <td>{{ boatOwner.username }}</td>
                            <td>{{ boatOwner.name }}</td>
                            <td>{{ boatOwner.seatingcapacity }}</td>
                            <td>{{ boatOwner.contact_number }}</td>
                            <td>{{ boatOwner.email }}</td>
                            <td>{{ boatOwner.address }}</td>
                            <td>
                                <button class="btn message"
                                    @click.prevent="messageUser(boatOwner.name)">Message</button>
                            </td>
                            <td><button class="btn message" @click.prevent="editBoat(boatOwner.username)">Edit</button>
                            </td>
                            <td>
                                <button class="btn delete"
                                    @click.prevent="deleteBoatOwner(boatOwner.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!--row-->
        <div class="row">
            <div class="table-responsive">
                <h3>Pending Pump Boat</h3>
                <table class="table table-striped table-sm">
                    <thead>
                        <th>#</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Agency name</th>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Seating Capacity</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-for="boatOwner in pendingBoatList" :key="boatOwner.key">
                            <td>{{ boatOwner.id }}</td>
                            <td>{{ boatOwner.lastname }}, {{ boatOwner.firstname }}</td>
                            <td>{{ boatOwner.contact_number }}</td>
                            <td>{{ boatOwner.email }}</td>
                            <td>{{ boatOwner.agency_name }}</td>
                            <td>{{ boatOwner.username }}</td>
                            <td>{{ boatOwner.address }}</td>
                            <td>{{ boatOwner.seatingcapacity }}</td>
                            <td>{{ boatOwner.password }}</td>
                            <td>
                                <button class="btn message" @click.prevent="approveBoat(boatOwner.id, boatOwner.lastname, boatOwner.firstname,
                                boatOwner.contact_number, boatOwner.agency_name, boatOwner.email, boatOwner.username,
                                boatOwner.address, boatOwner.seatingcapacity, boatOwner.password)">Approve</button>
                            </td>
                            <td>
                                <button class="btn delete" @click.prevent="rejectBoat(boatOwner.id)">Reject</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--row-->

        <div class="row">
            <div class="table-responsive">
                <h3>Admin</h3>
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
                            <td>{{ index + 1 }}</td>
                            <td>{{ admin.name }}</td>
                            <td>{{ admin.contact_number }}</td>
                            <td>{{ admin.email }}</td>
                            <td>{{ admin.address }}</td>
                            <td>{{ admin.status }}</td>
                            <td>
                                <button class="btn message" @click.prevent="messageUser(admin.name)">Message</button>
                            </td>
                            <td>
                                <button class="btn delete" @click.prevent="deleteBoatOwner(admin.name)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--row-->
    </div>

    <div>
        <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
            <button class="modal__close" @click="showModal = false">
                <mdi-close></mdi-close>
            </button>
            <span class="modal__title">Edit User</span>
            <div class="modal__content">
                <form>
                    <div class="form-group">
                        <h6 class="modal-h">ID</h6>
                        <input type="text" class="form-control" v-model="userID" disabled />
                    </div>
                    <div class="form-group">
                        <h6 class="modal-h">Email</h6>
                        <input type="text" class="form-control" v-model="email" disabled />
                    </div>
                    <div class="form-group">
                        <h6 class="modal-h">Username</h6>
                        <input type="text" class="form-control" v-model="username" disabled required />
                    </div>
                    <div class="form-group">
                        <h6 class="modal-h">First Name</h6>
                        <input type="text" class="form-control" v-model="firstname" required />
                    </div>
                    <div class="form-group">
                        <h6 class="modal-h">Last Name</h6>
                        <input type="text" class="form-control" v-model="lastname" required />
                    </div>
                    <div class="form-group">
                        <h6 class="modal-h">Phone Number</h6>
                        <input type="text" class="form-control" v-model="phonenumber" required />
                    </div>
                    <div class="form-group" v-show="isBoat">
                        <h6 class="modal-h">Seating Capacity</h6>
                        <input type="text" class="form-control" v-model="seatingcapacity" required />
                    </div>
                    <div class="form-group">
                        <h6 class="modal-h">Address</h6>
                        <input type="text" class="form-control" v-model="address" required />
                        <label class="address_label"># Street, City, Province, Zip</label>
                    </div>
                </form>
                <button class="btn btn-primary" @click="updateCustomer(userID)" v-show="isCustomer">Update User</button>
                <button class="btn btn-primary" @click="updateAgency(userID)" v-show="isAgency">Update Agency</button>
                <button class="btn btn-primary" @click="updateBoat(userID)" v-show="isBoat">Update Boat</button>
                <button class="btn btn-danger" @click="showModal = false">Cancel</button>
            </div>
        </vue-final-modal>
    </div>
    <!--modal-->
</template>

<script>
/* eslint-disable */
import { getDatabase, ref, get, child, update, onValue, remove, set } from "firebase/database";
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal';

export default {
    name: 'userTable',
    components: {
        VueFinalModal,
        ModalsContainer
    },
    data() {
        return {
            usersList: [],
            agencyList: [],
            boatOwnerList: [],
            adminList: [],
            isMessage: [],
            showModal: false,
            userID: '',
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            address: '',
            isAgency: false,
            isCustomer: false,
            isBoat: false,
            pendingBoatList: [],

        };
    },
    mounted() {

        const db = getDatabase();

        //get all customer
        let viewUsers = this;
        const adbRef = ref(db, '/appusers/ClientID');
        onValue(adbRef, (snapshot) => {
            let data = snapshot.val();
            let usersList = [];
            Object.keys(data).forEach((key) => {
                usersList.push({
                    id: key,
                    username: data[key].username,
                    userFullName: data[key].lastname + ', ' + data[key].firstname,
                    contact: data[key].phonenumber,
                    email: data[key].email,
                    address: data[key].address,
                });
            });
            viewUsers.usersList = usersList;
        });

        //get all travel agency 
        let viewAgency = this;
        const agencyRef = ref(db, '/users/travel_agency/');
        onValue(agencyRef, (snapshot) => {
            let data = snapshot.val();
            let agencyList = [];
            Object.keys(data).forEach((key) => {
                agencyList.push({
                    id: key,
                    name: data[key].name,
                    contact_number: data[key].contact_number,
                    email: data[key].email,
                    address: data[key].address,
                });
            });
            viewAgency.agencyList = agencyList;
        });

        //get all pump boat owner
        let viewPumpOwner = this;
        const boatOwnerRef = ref(db, '/appusers/BoatID/');
        onValue(boatOwnerRef, (snapshot) => {
            let data = snapshot.val();
            let boatOwnerList = [];
            Object.keys(data).forEach((key) => {
                boatOwnerList.push({
                    id: key,
                    username: data[key].username,
                    agency_name: data[key].agency_name,
                    name: data[key].firstname + data[key].lastname,
                    contact_number: data[key].phonenumber,
                    email: data[key].email,
                    address: data[key].address,
                    seatingcapacity: data[key].seatingcapacity
                });
            });
            viewPumpOwner.boatOwnerList = boatOwnerList;
        });

        //get all pending boat
        let viewPendingBoat = this;
        const pendingBoatREf = ref(db, '/Pending/BoatID/');
        onValue(pendingBoatREf, (snapshot) => {
            let data = snapshot.val();
            let pendingBoatList = [];
            Object.keys(data).forEach((key) => {
                pendingBoatList.push({
                    id: key,
                    username: data[key].username,
                    agency_name: data[key].agencyname,
                    firstname: data[key].firstname,
                    lastname: data[key].lastname,
                    contact_number: data[key].phonenumber,
                    password: data[key].password,
                    email: data[key].email,
                    address: data[key].address,
                    seatingcapacity: data[key].seatingcapacity
                });
            });
            viewPendingBoat.pendingBoatList = pendingBoatList;
        });

        // get all admin
        let viewAdmin = this;
        const adminRef = ref(db, '/users/admin/');
        onValue(adminRef, (snapshot) => {
            let data = snapshot.val();
            let adminList = [];
            Object.keys(data).forEach((key) => {
                adminList.push({
                    id: key,
                    name: data[key].last_name + ',' + data[key].first_name,
                    contact_number: data[key].contact_number,
                    email: data[key].email,
                    address: data[key].street + ', ' + data[key].city + ', ' + data[key].province + ', ' + data[key].zip,
                    status: data[key].status,
                });
            });
            viewAdmin.adminList = adminList;
        });
    },
    methods: {
        createBoatOwner() {

        },
        async messageUser(id) {
            this.isMessage = true
            this.$router.push({ name: 'chat-box', params: { id: id } })
        },
        deleteCustomer(id) {
            const db = getDatabase();
            if (window.confirm("Are you sure, you want to delete: " + id)) {
                remove(ref(db, '/appusers/ClientID' + id), {
                })
                    .then(() => {
                        alert("User has been deleted");
                    }).catch((error) => {
                        alert(error);
                    });
            }
        },
        deleteBoatOwner(id) {
            const db = getDatabase();
            if (window.confirm("Are you sure, you want to delete: " + id)) {
                remove(ref(db, '/appusers/BoatID/' + id), {
                })
                    .then(() => {
                        alert("User has been deleted");
                    }).catch((error) => {
                        alert(error);
                    });
            }
        },
        deleteAgency(id) {
            const db = getDatabase();
            if (window.confirm("Are you sure, you want to delete: " + id)) {
                const agencyRef = ref(db, '/users/travel_agency/');
                onValue(agencyRef, (snapshot) => {
                    let data = snapshot.val();
                    Object.keys(data).forEach((key) => {
                        if (data[key].name == id) {
                            remove(ref(db, '/users/travel_agency/' + key), {
                            })
                                .then(() => {
                                    alert("User has been deleted");
                                }).catch((error) => {
                                    alert(error);
                                });
                        }
                    });
                });
            }
        },
        approveBoat(id, lastname, firstname,
            contact_number, agency_name, email, username,
            address, seatingcapacity, password) {
            const db = getDatabase();
            if (window.confirm("Approve pump boat? " + username)) {
                set(ref(db, 'appusers/BoatID' + '/' + id), {
                    address: address,
                    agencyname: agency_name,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    phonenumber: contact_number,
                    seatingcapacity: seatingcapacity,
                    username: username
                });
                remove(ref(db, '/pending/BoatID/' + '/' + id), {
                }).then(() => {
                    alert("Pump boat succesfully approved");
                }).catch((error) => {
                    alert(error);
                });
            } 
        },
        rejectBoat(id) {
            const db = getDatabase();
            if (window.confirm("Reject pump boat? " + id)) {
                remove(ref(db, '/Pending/BoatID/' + '/' + id), {
                })
                    .then(() => {
                        alert("Pending pump boat has been removed");
                    }).catch((error) => {
                        alert(error);
                    });
            }
        },
        editCustomer(id) {
            this.isBoat = false;
            this.isCustomer = true;
            const db = getDatabase();
            this.showModal = true;
            const adbRef = ref(db, '/appusers/ClientID');
            onValue(adbRef, (snapshot) => {
                let data = snapshot.val();
                Object.keys(data).forEach((key) => {
                    if (data[key].username == id) {
                        this.userID = key
                        this.email = data[key].email
                        this.username = data[key].username
                        this.lastname = data[key].lastname
                        this.firstname = data[key].firstname
                        this.phonenumber = data[key].phonenumber
                        this.address = data[key].address
                    }
                })
            })

        },
        updateCustomer(id) {
            const db = getDatabase();
            if (this.username == "" || this.lastname == "" || this.firstname == "" || this.phonenumber == ""
                || this.address == "" || this.email == "" || this.username == "") {
                alert('Some fields are missing')
                return;
            }
            update(ref(db, '/appusers/ClientID' + '/' + id), {
                lastname: this.lastname,
                firstname: this.firstname,
                phonenumber: this.phonenumber,
                address: this.address,
            }).then(() => {
                alert("update success: " + id)
            })
                .catch((error) => {
                    alert("update failed: " + id)
                });
        },
        editAgency(id) {
            this.isBoat = false;
            this.isAgency = true;
            this.showModal = true;
            const db = getDatabase();
            const agencyRef = ref(db, '/users/travel_agency/');
            onValue(agencyRef, (snapshot) => {
                let data = snapshot.val();
                Object.keys(data).forEach((key) => {
                    if (data[key].name == id) {
                        this.userID = key
                        this.email = data[key].email
                        this.username = data[key].name
                        this.lastname = "N/A"
                        this.firstname = "N/A"
                        this.phonenumber = data[key].contact_number
                        this.address = data[key].address
                    }
                })
            })
        },
        updateAgency(id) {
            const db = getDatabase();
            if (this.username == "" || this.phonenumber == ""
                || this.address == "" || this.email == "" || this.username == "") {
                alert('Some fields are missing')
                return;
            }
            update(ref(db, '/users/travel_agency' + '/' + id), {
                contact_number: this.phonenumber,
                address: this.address,
            }).then(() => {
                alert("update success: " + id)
            }).catch((error) => {
                alert("update failed: " + id)
            });
        },
        editBoat(id) {
            const db = getDatabase();
            this.isBoat = true;
            this.isAgency = false;
            this.showModal = true;
            const boatOwnerRef = ref(db, '/appusers/BoatID/');
            onValue(boatOwnerRef, (snapshot) => {
                let data = snapshot.val();
                Object.keys(data).forEach((key) => {
                    if (data[key].username == id) {
                        this.userID = key
                        this.email = data[key].email
                        this.username = data[key].username
                        this.lastname = data[key].lastname
                        this.firstname = data[key].firstname
                        this.phonenumber = data[key].phonenumber
                        this.address = data[key].address
                        this.seatingcapacity = data[key].seatingcapacity
                    }
                })
            })
        },
        updateBoat(id) {
            const db = getDatabase();
            if (this.username == "" || this.phonenumber == "" || this.lastname == "" || this.firstname == ""
                || this.address == "" || this.email == "" || this.username == "") {
                alert('Some fields are missing')
                return;
            }
            update(ref(db, '/appusers/BoatID/' + '/' + id), {
                contact_number: this.phonenumber,
                address: this.address,
                seatingcapacity: this.seatingcapacity,
                firstname: this.firstname,
                lastname: this.lastname,
            }).then(() => {
                alert("update success: " + id)
            }).catch((error) => {
                alert("update failed: " + id)
            });
        }
    }
}
</script>

<style scoped>
.row {
    top: 0;
    bottom: 0;
    right: 0;
    margin-left: 15%;
    margin-right: 5%;
    margin-bottom: 5%;
}

h3 {
    text-align: left;
}

.table {
    width: 100%;
}

.btn {
    border-radius: 10%;
}

.btn:hover {
    background-color: rgb(130, 130, 128);
    color: white;
}

.chatbox {
    position: fixed;
    bottom: 0;
    left: 40%;
    top: 45%;

}

::v-deep .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

::v-deep .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    width: 500px;
    overflow: scroll;
    height: 500px;
}

.modal__title {
    margin: 0 2rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
}

.modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}

.form-group {
    margin-bottom: 3%;
    margin-top: 1%;
}

.modal-h {
    text-align: left;
}

.address_label {
    text-align: left;
    font-size: 10px;
}
</style>