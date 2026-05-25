import { db } from "@/src/db";
import { SelectCategory } from "../types/meeti.types";
import { category } from "@/src/db/schema";
import { eq } from "drizzle-orm";


export interface ICategoryRepository {
    findAll(): Promise<SelectCategory[]>;
    findById(categoryId: string): Promise<SelectCategory>;
    findBySlug(slug: string): Promise<SelectCategory>;
}

class CategoryRepository implements ICategoryRepository {
    async findAll() {
        const result = await db
            .select()
            .from(category);
        return result;
    }

    async findById(categoryId: string) {
        const [result] = await db
            .select()
            .from(category)
            .where(
                eq(category.id, categoryId)
            );
        return result;
    }

    async findBySlug(slug: string) {
        const [result] = await db
            .select()
            .from(category)
            .where(
                eq(category.slug, slug)
            );
        return result;
    }
}

export const categoryRepository = new CategoryRepository();