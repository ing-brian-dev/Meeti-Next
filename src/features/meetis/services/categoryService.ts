import { notFound } from "next/navigation";
import { categoryRepository, ICategoryRepository } from "./categoryRepository";

class CategoryService {
    constructor(
        private categoryRepository: ICategoryRepository
    ) { }


    async getAllCategories() {
        return await this.categoryRepository.findAll();
    }

    async getCategoryById(categoryId: string) {
        const category = await this.categoryRepository.findById(categoryId);
        if (!category) notFound();
        
        return category;
    }
}

export const categoryService = new CategoryService(categoryRepository);