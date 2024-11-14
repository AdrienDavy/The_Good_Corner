import { GraphQLResolveInfo } from "graphql";

export const optimizedRequest = (info: GraphQLResolveInfo, relationName: string): boolean => {
    const selectionSet = info.fieldNodes[0].selectionSet
    if (!selectionSet) {
        return false
    }
    const selections = selectionSet.selections
    for (const selection of selections) {
        if (selection.kind === "Field" && selection.name.value === relationName) {
            return true;
        }
    }
    return false
}