<template>
<div>
    <h4 align="center">Login Form</h4>
    <form v-on:submit="login">
        <div class="form-group">
            <label>Email:</label>
            <input v-model="email" type="email" class="form-control" required>
        </div>
        <div class="form-group">
            <label>Password:</label>
            <input v-model="password" type="password" class="form-control" required>
        </div>
        <input type="submit" value="Login">
    </form>
</div>
</template>

<script>
/* eslint-disable */
import router from '../router';
import axios from 'axios';

export default {
    name: "Login",
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        login: function (e){
            e.preventDefault()
            let data = {
                email: this.email,
                password: this.password
            }
            axios.post("http://localhost:8000/login",data).then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                console.log(localStorage.getItem("token"))
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