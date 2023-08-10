<template>
    <div>
        <BackAppBar />
        <div class="pa-5">
            <h1>Profile</h1>
            <div>
                <div>User Name: {{ userStore.user?.userName }}</div>
                <div>User Email: {{ userStore.user?.userEmail }}</div>
                <div>Level: {{ userStore.user?.type }}</div>
                <div class="pt-5">
                    <v-btn color="primary" class="mr-5" @click="GeneratePin()">Generate Pin</v-btn>
                    <v-btn color="primary" @click="ResetPin()">Reset Pin Lock</v-btn>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import BackAppBar from '@/components/BackAppBar.vue';
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore();

function ResetPin(){
    userStore.ResetPin()
}
</script>