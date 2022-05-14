<template>
    <div class="container">
        <div class="row">
            <div class="table-responsive">
                <h3>Destinations</h3>
                <table class="table table-striped table-sm">
                    <thead>
                        <th>#</th>
                        <th>Agency Name</th>
                        <th>Destination</th>
                        <th>Activities </th>
                        <th>Price</th>
                        <th>Province</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-for="destination, index in destinationList" :key="destination.key">
                            <td>{{ index + 1 }}</td>
                            <td>{{ destination.username }}</td>
                            <td>{{ destination.destination_name }}</td>
                            <td>{{ destination.activities }}</td>
                            <td>{{ destination.price }}</td>
                            <td>{{ destination.destination_province }}</td>
                            <td>
                                <button class="btn delete"
                                    @click.prevent="deleteDestination(destination.destination_name)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--row-->


    </div>

</template>

<script>
/* eslint-disable */
import { getDatabase, ref, get, child, update, onValue, remove } from "firebase/database";


export default {
    name: 'userTable',
    data() {
        return {
            destinationList: [],
        };
    },
    mounted() {

        const db = getDatabase();
        //get all destinations
        let viewDestinations = this;
        const adbRef = ref(db, '/destinations/');
        onValue(adbRef, (snapshot) => {
            let data = snapshot.val();
            let destinationList = [];
            Object.keys(data).forEach((key) => {
                destinationList.push({
                    id: key,
                    username: data[key].agency_name,
                    activities: data[key].activities,
                    price: data[key].base_price,
                    destination_name: data[key].destination_name,
                    destination_province: data[key].destination_province,
                });
            });
            viewDestinations.destinationList = destinationList;
        });


    },
    methods: {
        deleteDestination(id) {
            const db = getDatabase();
            if (window.confirm("Are you sure, you want to delete: " + id)) {
                remove(ref(db, '/destinations/' + id), {
                })
                    .then(() => {
                        alert("Destination has been deleted");
                    }).catch((error) => {
                        alert(error);
                    });
            }
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
</style>