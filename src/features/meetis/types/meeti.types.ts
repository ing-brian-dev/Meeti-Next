import { category, meeti, meetiLocations } from "@/src/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";


export type SelectCategory = InferSelectModel<typeof category>;

export type InsertBasicMeeti = InferInsertModel<typeof meeti>;
export type InsertMeetiLocation = InferInsertModel<typeof meetiLocations>;

export type SelectBasicMeeti = InferSelectModel<typeof meeti>;
export type SelectMeetiLocation = InferSelectModel<typeof meeti>;

export type InsertMeeti = InsertBasicMeeti & {
    location?: Omit<InsertMeetiLocation, 'meetiId' | 'id'>;
}

export type SelectMeeti = SelectBasicMeeti & {
    location?: SelectMeetiLocation;
}
