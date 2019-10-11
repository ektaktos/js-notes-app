<template>
    <div class="notes">
        <div v-for="note in notes" v-bind:key="note._id">
            <router-link :to="{ name: 'note', params: {id : note._id}}">
            <div class="card">
                <div class="card-body">
                <li>Id: {{ note._id }} </li>
                <span v-if="note.title != null"><b>Title:</b> {{ note.title}}</span>
                <span v-else><b>Title: </b> <small>No Content available here</small></span>
                <br><span v-if="note.body != null"><b>Body:</b> {{ note.body }}</span>
                <span v-else><b>Body: </b> <small>No Content available here</small></span>
                </div>
            </div>
            </router-link> 
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
    name: "Notes",
    data(){
        return{
            notes: []
        }
    },
    methods: {
        getNotes: function(){
            let self = this
            axios.get("http://localhost:8000/allnotes").then((response) => {
                console.log(response)
                self.$set(this,'notes',response.data)
                })
                .catch((errors) => {
                    console.log(errors)
                })
        }
    },
    mounted() {
        this.getNotes()
    }
}
</script>
<style>
.notes{
    color:black;
}
</style>