import { community } from "@/src/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";


export type InsertCommunity = InferInsertModel<typeof community>;
export type SelectCommunity = InferSelectModel<typeof community>;

export type CommunityPermissions = {
    canEdit: boolean;
    canDelete: boolean;
    canJoin: boolean;
    canLeave: boolean;
    canViewMembers: boolean;
}

export type CommunityContext = {
    isAdmin : boolean;
    isMember : boolean;
}

export type CommunityWithPermissions = {
    data: SelectCommunity;
    context : CommunityContext;
    permissions: CommunityPermissions;
}