import { Arg, Authorized, Ctx, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Tag, TagCreateInput, TagUpdateInput } from "../entities/Tag";
import { GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";
import { AuthContextType, ContextType } from "../auth";

@Resolver()
export class TagsResolver {
    @Query(() => [Tag], { nullable: true })
    async tags(@Info() info: GraphQLResolveInfo): Promise<Tag[]> {
        const tags = await Tag.find({ relations: makeRelations(info, Tag) });
        return tags;
    }

    @Query(() => Tag, { nullable: true })
    async tag(@Arg('id', () => ID) id: number, @Info() info: GraphQLResolveInfo): Promise<Tag | null> {
        const tag = await Tag.findOne({
            where: { id }, relations: makeRelations(info, Tag)
        });
        if (tag) {
            return tag;
        } else {
            return null;
        }
    }

    @Authorized("admin")
    @Mutation(() => Tag)
    async createTag(
        @Arg("data", () => TagCreateInput) data: TagCreateInput,
        @Ctx() context: ContextType
    ): Promise<Tag> {
        const newTag = new Tag();
        Object.assign(newTag, data, { createdBy: context.user });
        await newTag.save();
        return newTag;
    }

    @Authorized("admin")
    @Mutation(() => Tag, { nullable: true })
    async updateTag(
        @Arg('id', () => ID) id: number,
        @Arg("data", () => TagUpdateInput) data: TagUpdateInput,
        @Ctx() context: ContextType
    ): Promise<Tag | null> {
        const tag = await Tag.findOneBy({ id, createdBy: { id: context.user?.id } });
        if (tag !== null) {
            Object.assign(tag, data);
            await tag.save();
            return tag;
        } else {
            return null;
        }
    }


    @Authorized("admin")
    @Mutation(() => Tag, { nullable: true })
    async deleteTag(
        @Arg("id", () => ID) id: number,
        @Ctx() context: AuthContextType
    ): Promise<Tag | null> {
        const tag = await Tag.findOneBy({ id, createdBy: { id: context.user.id } });
        if (tag !== null) {
            await tag.remove();
            return tag;
        } else {
            return null;
        }
    }
}