<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue';
import StudentService from '@/services/StudentService';
import type { Student } from '@/types';
import { onMounted, ref } from 'vue';

const students = ref<Student[] | null>(null);

onMounted(() => {
  StudentService.getStudentInfo()
    .then(res => students.value = res.data)
    .catch(err => console.error('An error ocurred!', err))
})
</script>

<template>
  <div class="flex justify-center items-center flex-col">
    <h1>A site for events to better the world.</h1>
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>