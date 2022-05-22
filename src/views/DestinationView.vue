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

        <div class="row">
            <div class="table-responsive">
                <h3>Paid Destinations</h3>
                <table class="table table-striped table-sm">
                    <thead>
                        <th>#</th>
                        <th>Agency Name</th>
                        <th>Destination</th>
                        <th>Activities </th>
                        <th>Price</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-for="promo, index in promoList" :key="promo.key">
                            <td>{{ index + 1 }}</td>
                            <td>{{ promo.destination_name }}</td>
                            <td>{{ promo.date_purchased }}</td>
                            <td>{{ promo.time_purchased }}</td>
                            <td>{{ promo.amount }} $</td>

                            <td>
                                <button class="btn delete"
                                    @click.prevent="deletePromoted(promo.destination_name)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--row-->
        <div class="row">
            <h4 style="text-align:left">Bookings</h4>
            <table class="table">
                <thead>
                    <th>
                        #
                    </th>
                    <th>Destination Name </th>
                    <th>Destination Province</th>
                    <th> Scheduled Date </th>
                    <th> Date Booked </th>
                    <th>Boat Name</th>
                    <th> Boat Capacity </th>
                    <th>Activities</th>
                    <th> Username </th>
                    <th> Amount </th>
                    <th> Payment Reference</th>
                    <th>ticketStatus</th>
                </thead>
                <tbody>
                    <tr v-for="booking, index in bookingList" :key="booking.key">
                        <td>{{ index + 1 }}</td>
                        <td>{{ booking.destination_name }}</td>
                        <td>{{ booking.destination_province }}</td>
                        <td>{{ booking.scheduled_date }}</td>
                        <td>{{ booking.transaction_date }}</td>
                        <td>{{ booking.boat_name }}</td>
                        <td>{{ booking.boat_capacity }}</td>
                        <td>{{ booking.destination_activities }}</td>
                        <td>{{ booking.customer_name }}</td>
                        <td>{{ booking.price }}</td>
                        <td>{{ booking.payID }}</td>
                        <td>
                            <button v-if="booking.ticketStatus == 'Ongoing'"
                                :class="(booking.ticketStatus == 'Ongoing' ? 'ongoing_status' : 'complete_status')">{{
                                        booking.ticketStatus
                                }} </button>
                            <button v-else class="cancel_status">
                                {{
                                        booking.ticketStatus
                                }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Bookings Table -->
        </div>
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
            promoList: [],
            bookingList: [],
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

        //get all Promoted Destination
        let viewPromo = this;
        const promoRef = ref(db, '/promo/');
        onValue(promoRef, (snapshot) => {
            let data = snapshot.val();
            let promoList = [];
            Object.keys(data).forEach((key) => {
                promoList.push({
                    agency_name: data[key].agency_name,
                    amount: data[key].amount,
                    date_purchased: data[key].date_purchased,
                    days: data[key].days,
                    destination_name: data[key].destination_name,
                    time_purchased: data[key].time_purchased,
                })
            })
            viewPromo.promoList = promoList;
        })
        //get all bookings
        let viewBooking = this;
        const bookingRef = ref(db, '/booking/');
        onValue(bookingRef, (snapshot) => {
            let data = snapshot.val();
            Object.keys(data).forEach((key) => {
                console.log(key)
                const bookingRef2 = ref(db, '/booking/' + key);
                onValue(bookingRef2, (snapshot) => {
                    let data = snapshot.val();
                    let bookingList = [];
                    Object.keys(data).forEach((key) => {

                        bookingList.push({
                            customer_name: data[key].username,
                            boat_name: data[key].boat_name,
                            scheduled_date: data[key].date_sched,
                            transaction_date: data[key].date_sent,
                            price: data[key].base_price,
                            destination_name: data[key].destination_name,
                            destination_province: data[key].destination_province,
                            destination_activities: data[key].activities,
                            boat_capacity: data[key].capacity,
                            payID: data[key].payID,
                            ticketStatus: data[key].ticketStatus,
                        });

                    });
                    viewBooking.bookingList = bookingList;
                });
            })
        })
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
        },
        deletePromoted(id) {
            const db = getDatabase();
            if (window.confirm("Are you sure, you want to delete: " + id)) {
                remove(ref(db, '/promo/' + id), {
                })
                    .then(() => {
                        alert("Pomoted destination has been deleted");
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

.ongoing_status {
    background: rgb(50, 50, 233);
    color: white;
    border: #fff;
    border-radius: 10px;
}

.complete_status {
    background: green;
    color: white;
    border: #fff;
    border-radius: 10px;
}

.cancel_status {
    background: red;
    color: white;
    border: #fff;
    border-radius: 10px;
}
</style>