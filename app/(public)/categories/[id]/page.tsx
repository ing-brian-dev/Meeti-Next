import CategoryMeetis from "@/src/features/meetis/components/CategoryMeetis";
import { categoryService } from "@/src/features/meetis/services/categoryService";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import { cache } from "react";

const getCategoryCached = cache(async (id: string) => {
  const category = await categoryService.getCategoryById(id);
  return category;
})

export async function generateMetadata({ params }: PageProps<'/categories/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryCached(id)
  return {
    title: generatePageTitle(`Categoria: ${category.name}`)
  }
}


export default async function CategorPage({ params }: PageProps<'/categories/[id]'>) {

  const { id } = await params;

  const category = await getCategoryCached(id)
  return (
    <main
      className="max-w-7xl mx-auto px-5 lg:px-0 py-10"
    >
      <Heading
        className="text-center"
      >
        Meetis en la Categoría: {category.name}
      </Heading>
      <CategoryMeetis categoryId={category.id} />

    </main>
  )
}
