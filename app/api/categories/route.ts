import { categoryService } from "@/src/features/meetis/services/categoryService";

export async function GET() {
    const categories = await categoryService.getAllCategories();
    return new Response(JSON.stringify(categories), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}