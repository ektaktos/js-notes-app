<template>
    <div class="notes">
            <!-- <div v-if="note = []">
            <div class="card">
                <div class="card-body" align="center">
                    <h5>No Content available yet</h5>
                    <p>Check your internet connection and try again.</p>
                </div>
            </div>
            </div> -->
            <div class="card">
                <div class="card-body row">
                    <div class="col-md-10">
                        <li>Id: {{ note._id }} </li>
                        <span v-if="note.title != null"><b>Title:</b> {{ note.title}}</span>
                        <span v-else><b>Title: </b> <small>No Content available here</small></span>
                        <br><span v-if="note.body != null"><b>Body:</b> {{ note.body }}</span>
                        <span v-else><b>Body: </b> <small>No Content available here</small></span>
                    </div>
                    <div class="col-md-1">
                        <button class="btn-delete" @click="deleteNote(note._id)">Delete</button>
                    </div>
                    <router-link :to="{ name: 'update', params: { sn : note._id}}">
                    <div class="col-md-1">
                        <button class="btn-edit">Edit</button>
                    </div>
                    </router-link>
                    
                </div>
            </div>
        <!-- </div> -->
    </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import router from '../router'
export default {
    name: "Note",
    props: {
        id : {}
    },
    data(){
        return{
            note: []
        }
    },
    methods: {
        getNote: function(){
            let id = this.id
            let self = this
            axios.get("http://localhost:8000/notes/"+id, {headers: {"Authorization":'Bearer '+ localStorage.getItem("token")}}).then((response) => {
                console.log(response)
                self.$set(this,'note',response.data)
                if (response.data == "") {
                    router.push('/')
                }
                })
                .catch((errors) => {
                    console.log(errors)
                })
        },
        deleteNote: function(id){
            console.log(id)
            let self = this
            axios.delete("http://localhost:8000/notes/"+id, {headers: {"Authorization":'Bearer '+ localStorage.getItem("token")}}).then((response) => {
                console.log(response)
                self.$set(this,'note',response.data)
                router.push('/')
                })
                .catch((errors) => {
                    console.log(errors)
                    router.push('/')
                })
        }
    },
    mounted() {
        this.getNote()
    }
}
</script>
<style>
.notes{
    color:black;
}
</style>