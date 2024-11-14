import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryCreateInput, CategoryUpdateInput } from "../entities/Category";
import { GraphQLResolveInfo } from "graphql";
import { optimizedRequest } from "../utils/optimizedRequest";


@Resolver()
export class CategoriesResolver {
    @Query(() => [Category])
    async categories(@Info() info: GraphQLResolveInfo): Promise<Category[]> {
        const categories = await Category.find({
            relations: {
                ads: optimizedRequest(info, "ads"),
            },
        });
        return categories;
    }

    @Query(() => Category, { nullable: true })
    async category(@Arg('id', () => ID) id: number): Promise<Category | null> {
        const category = await Category.findOne({
            where: { id }, relations: {
                ads: true,
            }
        });
        if (category) {
            return category;
        } else {
            return null;
        }
    }

    @Mutation(() => Category)
    async createCategory(@Arg("data", () => CategoryCreateInput) data: CategoryCreateInput): Promise<Category> {
        const newCategory = new Category();
        Object.assign(newCategory, data);
        await newCategory.save();
        return newCategory;

    }

    @Mutation(() => Category, { nullable: true })
    async updateCategory(
        @Arg('id', () => ID) id: number,
        @Arg("data", () => CategoryUpdateInput) data: CategoryUpdateInput): Promise<Category | null> {
        const category = await Category.findOneBy({ id });
        if (category !== null) {
            Object.assign(category, data);
            await category.save();
            return category;
        } else {
            return null;
        }
    }


    @Mutation(() => Category, { nullable: true })
    async deleteCategory(@Arg("id", () => ID) id: number): Promise<Category | null> {
        const category = await Category.findOneBy({ id });
        if (category !== null) {
            await category.remove();
            return category;
        } else {
            return null;
        }
    }
}