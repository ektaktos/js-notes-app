<template>
    <div class="form">
        <form v-on:submit.prevent="updateNote">
        <div class="form-group">
        <label>Note Title</label>
        <input v-model="note.title" placeholder="Enter Title here" class="form-control"> 
        <!-- <p>{{ title }}</!--> 
        </div>

        <div class="form-group">
        <label>Note Body</label>
        <textarea v-model="note.body" placeholder="Enter Note body here" class="form-control" rows="5" cols="35"></textarea>
        <!-- <p>{{ body }}</!--> 
        </div>

        <div align="center">
            <input type="submit" value="Update Note" class="btn btn-secondary">
        </div>
         </form>
    </div>
</template>

<script>
/* eslint-disable */
import axios from "axios"
import router from "../router"
export default {
    name: "Update",
    props: {
        id : {}
    },
    data (){
        return{
            note:{
                title:'',
                body:'',
            },
        }
    },
    methods:{
        getNote: function(){
            let id = this.id
            console.log(this.id);
            let self = this
            axios.get("http://localhost:8000/notes/"+id, {headers: {"Authorization":'Bearer '+ localStorage.getItem("token")}}).then((response) => {
                console.log(response)
                self.$set(this,'note',response.data)
                })
                .catch((errors) => {
                    console.log(errors)
                })
        },
        updateNote: function (){
            let data = {
                title: this.note.title,
                body: this.note.body
            }
            let id = this.id
            console.log(data)
            console.log(id)
            axios.put('http://localhost:8000/notes/' + id,data, {headers: {"Authorization": 'Bearer '+localStorage.getItem("token")}}).then((response) => {
                console.log(response)
                router.push("/note/"+id)
            })
            .catch((errors) => {
            console.log(errors)
            router.push("/")
            })
        }
    },
    mounted(){
        this.getNote()
    }
}
</script>

<style>

</style>