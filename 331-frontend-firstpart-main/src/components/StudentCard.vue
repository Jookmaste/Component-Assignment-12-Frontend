<script setup lang="ts">
import type { Student } from '@/types';

defineProps<{
    student: Student
}>()

</script>

<template>
    <div class="p-[20px] w-[250px] cursor-pointer border border-[#39495c] mb-[18px] hover:shadow-sp hover:scale-101">
        <h1>{{ student.name }} {{ student.surname }}</h1>
        <h2>GPA: {{ student.gpa }}</h2>
    </div>
</template>