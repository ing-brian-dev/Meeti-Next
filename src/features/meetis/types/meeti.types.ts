import { category } from "@/src/db/schema";
import { InferSelectModel } from "drizzle-orm";


export type SelectCategory = InferSelectModel<typeof category>;
