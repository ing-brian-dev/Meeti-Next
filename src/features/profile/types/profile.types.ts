import { User } from "../../auth/types/auth.types";
import { SelectCommunity } from "../../communities/types/community.types";
import { SelectMeeti } from "../../meetis/types/meeti.types";


export type FullProfile = User & {
    communities: SelectCommunity[];
    meetis: SelectMeeti[];
}