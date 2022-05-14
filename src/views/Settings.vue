<template>
  <div class="container">
    <div class="row">
      <main role="main" class="mainColumn">
        <div class="col-md-9">
          <div class="tab-content">
            <div class="tab-pane fade active show" id="account-general">
              <div class="card-body media align-items-center">
                <img :src="previewImage" alt="profilepic" class="d-block ui-w-80">
                <div class="media-body ml-4">
                  <label class="btn btn-outline-primary">
                    Upload new photo
                    <input type="file" class="account-settings-fileinput" ref="fileInput" @input="pickFile">
                  </label> &nbsp;
                  <button type="button" class="btn btn-default md-btn-flat" @click="ResetButton">Reset</button>
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
                  <div class="alert alert-warning mt-3" v-if="!isVerified">
                    Your email is not confirmed. Please check your inbox.<br>
                    <a href="javascript:void(0)" @click.prevent="sendVerification">Resend
                      confirmation</a>
                  </div>
                  <div class="alert alert-warning mt-3" style="background-color:lightgreen" v-else>
                      <p style="color:green">Email is Verified</p>
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
import { getAuth, onAuthStateChanged, sendEmailVerification  } from 'firebase/auth'
import { getDatabase, ref, get, child, update, onValue } from "firebase/database";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
  name: 'settings-admin',
  data() {
    return {
      username: '',
      previewImage: '',
      address: '',
      email: '',
      number: '',
      isVerified : false,
    };
  },
  beforeCreate() {

  },
  mounted() {
    const db = getDatabase();
    const dbRef = ref(db);
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.userId = user.uid;
        get(child(dbRef, '/users/admin/' + this.userId)).then((snapshot) => {
          if (snapshot.exists()) {
            this.username = snapshot.val().last_name + ', ' + snapshot.val().first_name;
            this.previewImage = snapshot.val().profile_pic;
            this.address = snapshot.val().street + ', ' + snapshot.val().city + ', ' + snapshot.val().province + ', ' + snapshot.val().zip;
            this.email = snapshot.val().email;
            this.number = snapshot.val().contact_number;
          }
        }); // end Get Child

        if(user.emailVerified == true){
            this.isVerified = true;
        }else{
             this.isVerified = false;
        }

      }
    })
  },
  methods: {
    pickFile() {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
        console.log("file name: " + file[0].name)
        this.imageName = file[0].name;
        this.imageData = file[0];
      }
    },
    async ResetButton() {
      this.previewImage = "";
    },
    async updateInfo() {

      const db = getDatabase();
      const storage = getStorage();

      if (this.username == "" || this.address == "" || this.number == ""
        || this.previewImage == "" || this.previewImage == null ||
        this.address == null || this.number == null) {
        alert("Some Fields Are Empty");
        return;
      }
      if (this.number < 12) {
        alert("Invalid number");
        return;
      } // end Validator

      onAuthStateChanged(getAuth(), (user) => {
        this.userId = user.uid
      }); // end authState  
      const storageRef = sRef(storage, '/admin/' + this.username + '/profile/' + this.imageName);
      const uploadTask = uploadBytesResumable(storageRef, this.imageData);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.previewImage = downloadURL;
            update(ref(db, '/users/admin/' + this.userId), {
              address: this.address,
              contact_number: this.number,
              pic_name: this.imageName,
              profile_pic: this.previewImage,
            }).then(() => {
              console.log("update success: ")
              alert('Updated')
            })
              .catch((error) => {
                console.log("update failed: " + error)
              }); //end Update                   
          });
        }
      );
    },//end updateMethod
     sendVerification() {
      const auth = getAuth();
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('verification sent!')
        });
    },
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
