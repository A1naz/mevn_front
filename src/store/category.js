import { defineStore } from 'pinia'
import { getCategory, getCategories } from '@/services/category.service'
import { ref } from 'vue'


export const useCategoryStore = defineStore('CategoryStore', () => {
  const category = ref({})
  const categories = ref([])

  const fetchCategory = async (id) => {
    category.value = await getCategory(id).data
    return category.value
  }

  const fetchCategories = async () => {
    categories.value = (await getCategories()).data
    return categories.value
  }

  return {
    category,
    categories,
    fetchCategory,
    fetchCategories,
  }
})
