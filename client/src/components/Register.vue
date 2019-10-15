<template>
<div>
    <h4 align="center">Register Form</h4>
    <form v-on:submit.prevent="register">
        <div class="form-group">
            <label>Fullname:</label>
            <input type="text" v-model="fullname" class="form-control" required>
        </div>
        <div class="form-group">
            <label>Email:</label>
            <input type="email" v-model="email" class="form-control" required>
        </div>
        <div class="form-group">
            <label>Phone:</label>
            <input type="tel" v-model="phone" class="form-control" required>
        </div>
        <div class="form-group">
             <label>Password:</label>
            <input type="password" v-model="password" class="form-control" required>
        </div>
        <input type="submit" value="Register">
    </form>
</div>
</template>

<script>
/* eslint-disable */
import router from '../router';
import axios from 'axios';

export default {
    name: "Register",
    data(){
        return{
            fullname: '',
            email: '',
            phone: '',
            password: ''
        }
    },
    methods:{
        register: function (){
            let data = {
                fullname: this.fullname,
                email: this.email,
                phone: this.phone,
                password: this.password
            }
            console.log(data)
            axios.post("http://localhost:8000/register",data).then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                router.push("/")
            })
            .catch((errors) => {
                console.log(errors)
            })
        }
    }
}
</script>

<style>

</style>