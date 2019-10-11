<template>
    <div class="form">
        <form v-on:submit.prevent="saveNote">
        <div class="form-group">
        <label>Note Title</label>
        <input v-model="title" placeholder="Enter Title here" class="form-control"> 
        <!-- <p>{{ title }}</!--> 
        </div>

        <div class="form-group">
        <label>Note Body</label>
        <textarea v-model="body" placeholder="Enter Note body here" class="form-control" rows="5" cols="35"></textarea>
        <!-- <p>{{ body }}</!--> 
        </div>

        <div align="center">
            <input type="submit" value="Add Note" class="btn btn-secondary">
        </div>
         </form>
    </div>
</template>

<script>
/* eslint-disable */
import axios from "axios"
import router from "../router"
export default {
    name: "Note",
    data (){
        return{
            // note:{
                title:'',
                body:'',
            // }
        }
    },
    methods:{
        saveNote: function (){
            let data = {
                title: this.title,
                body: this.body
            }
            console.log(data)
            axios.post('http://localhost:8000/notes',data).then((response) => {
                console.log(response)
                router.push("/")
            })
            .catch((errors) => {
            console.log(errors)
            router.push("/")
            })
        }
    }
}
</script>

<style>

</style>