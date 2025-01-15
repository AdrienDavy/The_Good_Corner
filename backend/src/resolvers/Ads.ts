import { Arg, Authorized, Ctx, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { merge } from "../utils/merge";
import { GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";
import { validate } from "class-validator";
import { ContextType } from "../auth";

@Resolver()
export class AdsResolver {
    @Query(() => [Ad])
    async ads(
        @Info() info: GraphQLResolveInfo

    ): Promise<Ad[]> {
        const ads = await Ad.find({
            relations:
                makeRelations(info, Ad)
        })
        return ads;
    }

    @Query(() => Ad, { nullable: true })
    async ad(@Arg("id", () => ID) id: number, @Info() info: GraphQLResolveInfo): Promise<Ad | null> {
        const ad = await Ad.findOne({
            where: { id }, relations: makeRelations(info, Ad)
        })
        if (ad) {
            return ad
        } else {
            return null;
        }
    }

    @Authorized()
    @Mutation(() => Ad)
    async createAd(
        @Arg("data", () => AdCreateInput) data: AdCreateInput,
        @Ctx() context: ContextType
    ): Promise<Ad> {
        const newAd = new Ad();
        const user = context.user;
        Object.assign(newAd, data, { createdBy: user });
        await newAd.save()
        return newAd;
    }

    @Authorized()
    @Mutation(() => Ad, { nullable: true })
    async updateAd(
        @Arg("id", () => ID) id: number,
        @Info() info: GraphQLResolveInfo,
        @Arg("data", () => AdUpdateInput) data: AdUpdateInput,
        @Ctx() context: ContextType
    ): Promise<Ad | null> {
        const ad = await Ad.findOne({ where: { id, createdBy: { id: context.user?.id } }, relations: makeRelations(info, Ad) });
        if (ad !== null) {


            makeRelations(info, Ad);

            const errors = await validate(ad);

            if (errors.length > 0) {
                throw new Error(`Validation error: ${JSON.stringify(errors)}`);
            } else {
                await ad.save();
                return ad;
            }
        } else {
            return null;
        }
    }

    @Authorized()
    @Mutation(() => Ad, { nullable: true })
    async deleteAd(
        @Arg("id", () => ID) id: number,
        @Ctx() context: ContextType
    ): Promise<Ad | null> {
        const ad = await Ad.findOneBy({ id, createdBy: { id: context.user?.id } });
        if (ad !== null) {
            await ad.remove()
            Object.assign(ad, { id, createdBy: { id: context.user?.id } });
            return ad;
        } else {
            return null;
        }
    }

}