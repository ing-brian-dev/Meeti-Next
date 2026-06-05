import { category, meeti, meetiLocations } from "@/src/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { SelectCommunity } from "../../communities/types/community.types";
import { User } from "../../auth/types/auth.types";


export type SelectCategory = InferSelectModel<typeof category>;

export type InsertBasicMeeti = InferInsertModel<typeof meeti>;
export type InsertMeetiLocation = InferInsertModel<typeof meetiLocations>;

export type SelectBasicMeeti = InferSelectModel<typeof meeti>;
export type SelectMeetiLocation = InferSelectModel<typeof meetiLocations>;

export type InsertMeeti = InsertBasicMeeti & {
    location?: Omit<InsertMeetiLocation, 'meetiId' | 'id'>;
}

export type SelectMeeti = SelectBasicMeeti & {
    location?: SelectMeetiLocation | null;
}

export type FullMeeti = SelectBasicMeeti & {
    location?: SelectMeetiLocation | null;
    category: SelectCategory;
    community: SelectCommunity;
    admin: User
}

export type MeetiPermissions = {
    canConfirm: boolean;
    canCancel: boolean;
}