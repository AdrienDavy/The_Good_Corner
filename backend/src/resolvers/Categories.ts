import { Arg, Authorized, Ctx, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryCreateInput, CategoryUpdateInput } from "../entities/Category";
import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";
import { validate } from "class-validator";
import { AuthContextType, ContextType } from "../auth";
import { In } from "typeorm";


@Resolver()
export class CategoriesResolver {
    @Query(() => [Category])
    async categories(@Info() info: GraphQLResolveInfo): Promise<Category[]> {

        const categories = await Category.find({
            relations:
                makeRelations(info, Category),
        });

        return categories;
    }

    @Query(() => Category, { nullable: true })
    async category(@Arg('id', () => ID) id: number, @Info() info: GraphQLResolveInfo): Promise<Category | null> {
        const category = await Category.findOne({
            where: { id }, relations: makeRelations(info, Category),
        });
        if (category) {
            return category;
        } else {
            return null;
        }
    }

    @Authorized("admin")
    @Mutation(() => Category)
    async createCategory(
        @Arg("data", () => CategoryCreateInput,
            { validate: true }) data: CategoryCreateInput,
        @Ctx() context: ContextType
    ): Promise<Category> {
        const newCategory = new Category();
        const user = context.user;
        Object.assign(newCategory, data, { createdBy: user });


        await newCategory.save();
        return newCategory;
    }

    @Authorized("admin")
    @Mutation(() => Category, { nullable: true })
    async updateCategory(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => CategoryUpdateInput) data: CategoryUpdateInput,
        @Ctx() context: AuthContextType
    ): Promise<Category | null> {
        const category = await Category.findOneBy({
            id,
            createdBy: { id: context.user.id },
        });
        if (category !== null) {
            Object.assign(category, data);

            const errors = await validate(category);
            if (errors.length > 0) {
                throw new Error(`Validation error: ${JSON.stringify(errors)}`);
            } else {
                await category.save();
                return category;
            }
        } else {
            return null;
        }
    }

    @Authorized("admin")
    @Mutation(() => Category, { nullable: true })
    async deleteCategory(
        @Arg("id", () => ID) id: number,
        @Ctx() context: AuthContextType
    ): Promise<Category | null> {
        const category = await Category.findOneBy({ id, createdBy: { id: context.user.id } });
        if (category !== null) {
            await category.remove();
            Object.assign(category, { id });
            return category;
        } else {
            return null;
        }
    }

    @Authorized("admin")
    @Mutation(() => [Category])
    async deleteCategories(
        @Arg("ids", () => [ID]) ids: number[],
        @Ctx() context: AuthContextType
    ): Promise<Category[]> {
        const categories = await Category.findBy({
            id: In(ids),
            createdBy: { id: context.user.id },
        });
        await Category.delete({
            id: In(ids),
        });
        return categories;
    }
}