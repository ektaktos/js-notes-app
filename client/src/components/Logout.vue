<template>
    <p>Hello</p>
</template>

<script>
import router from '../router';
export default {
    name: "Logout",
    methods:{
        logout: function(){
            localStorage.removeItem('token');
            console.log('Hello')
            router.push('/login');
        }
    },
    mounted(){
        this.logout()
    }
}
</script>