import Heading from "@/src/shared/components/typography/Heading"
import { categoryService } from "../services/categoryService"
import CategoryCard from "./CategoryCard"

export default async function CategoryList() {

    const categories = await categoryService.getAllCategories()

  return (
    <section
        className="max-w-7xl mx-auto py-10 space-y-5 px-5 lg:px-0"
    >
        <Heading
            level={2}
            className="text-center"
        >
            Categorías
        </Heading>

        <ul
            role="list"
            className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 p-5 md:p-0 mt-10"
        >
            {categories.map(category => <CategoryCard key={category.id} category={category} />)}
        </ul>
    </section>
  )
}
