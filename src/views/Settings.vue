<template>
    <div class="container">
        <div class="row">
            <main role="main" class="mainColumn">
                <div class="col-md-9">
                    <div class="tab-content">
                        <div class="tab-pane fade active show" id="account-general" >
                            <div class="card-body media align-items-center">
                                <img :src="previewImage" alt="profilepic" class="d-block ui-w-80">
                                <div class="media-body ml-4">
                                    <label class="btn btn-outline-primary">
                                        Upload new photo
                                        <input type="file" class="account-settings-fileinput" ref="fileInput"
                                            @input="pickFile">
                                    </label> &nbsp;
                                    <button type="button" class="btn btn-default md-btn-flat"
                                        @click="ResetButton">Reset</button>
                                    <div class="text-light small mt-1">Allowed JPG or PNG</div>
                                </div>
                            </div>
                            <hr class="border-light m-0">

                            <div class="card-body">
                                <div class="form-group">
                                    <label class="form-label">Admin Name</label>
                                    <input type="text" class="form-control mb-1" disabled v-model="username">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Address</label>
                                    <input type="text" class="form-control" v-model="address">
                                    <label class="form-label" style="font-size:12px;"># Street, City, Province,
                                        Postal</label>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="text" class="form-control mb-1" v-model="email">
                                    <div class="alert alert-warning mt-3">
                                        Your email is not confirmed. Please check your inbox.<br>
                                        <a href="javascript:void(0)" @click.prevent="sendVerification">Resend
                                            confirmation</a>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Contact number</label>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">+63</span>
                                    </div>
                                    <input type="text" class="form-control" v-model="number">
                                </div>
                            </div>

                            <div class="text-right mt-3">
                                <button type="button" class="btn btn-primary" @click.prevent="updateInfo">Save
                                    changes</button>&nbsp;
                                <button type="button" class="btn btn-default">Cancel</button>
                            </div>
                        </div> <!-- General Tab -->
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getDatabase, ref, get, child, update, onValue} from "firebase/database";

export default {
    name: 'settings-admin',
    data(){
        return{
                
        };
    },
    beforeCreate(){

    },
    mounted(){

    },
    methods : {

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
.mainColumn {
  width: 800px;
  margin-left: 20%;
  margin-top: 5%;
  color: black;
  margin-bottom: 5%;
}

.ui-w-80 {
  width: 150px !important;
  height: 150px;
  border-radius: 50%;
  background-color: #999;
}

.btn-default {
  border-color: rgba(24, 28, 33, 0.1);
  background: rgba(0, 0, 0, 0);
  color: #4E5155;
}

label.btn {
  margin-bottom: 0;
}

.btn-outline-primary {
  border-color: #26B4FF;
  background: transparent;
  color: #26B4FF;
}

.btn {
  cursor: pointer;
}

.text-light {
  color: #babbbc !important;
}

.btn-facebook {
  border-color: rgba(0, 0, 0, 0);
  background: #3B5998;
  color: #fff;
}

.btn-instagram {
  border-color: rgba(0, 0, 0, 0);
  background: #000;
  color: #fff;
}

.card {
  background-clip: padding-box;
  box-shadow: 0 1px 4px rgba(24, 28, 33, 0.012);
}

.row-bordered {
  overflow: hidden;
}

.account-settings-fileinput {
  position: absolute;
  visibility: hidden;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.account-settings-links .list-group-item.active {
  font-weight: bold !important;
}

html:not(.dark-style) .account-settings-links .list-group-item.active {
  background: transparent !important;
}

.light-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}

.light-style .account-settings-links .list-group-item.active {
  color: #4e5155 !important;
}

.material-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}

.material-style .account-settings-links .list-group-item.active {
  color: #4e5155 !important;
}

.dark-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(255, 255, 255, 0.03) !important;
}

.dark-style .account-settings-links .list-group-item.active {
  color: #fff !important;
}

.light-style .account-settings-links .list-group-item.active {
  color: #4E5155 !important;
}

.light-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}

.form-group {
  text-align: left;
  color: #4E5155;
}
</style>
