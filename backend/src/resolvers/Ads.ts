import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { number } from "joi";
import { merge } from "../utils/merge";
import { validate } from "class-validator";

@Resolver()
export class AdsResolver {
    @Query(() => [Ad])
    async ads(): Promise<Ad[]> {
        const ads = await Ad.find({
            relations:
            {
                category: true,
                tags: true
            }
        })
        return ads;
    }

    @Query(() => Ad, { nullable: true })
    async ad(@Arg("id", () => ID) id: number): Promise<Ad | null> {
        const ad = await Ad.findOne({
            where: { id }, relations: {
                category: true,
                tags: true
            }
        })
        if (ad) {
            return ad
        } else {
            return null;
        }
    }

    @Mutation(() => Ad)
    async createAd(@Arg("data", () => AdCreateInput) data: AdCreateInput): Promise<Ad> {
        const newAd = new Ad();
        Object.assign(newAd, data)
        await newAd.save()
        return newAd;
    }

    @Mutation(() => Ad, { nullable: true })
    async updateAd(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => AdUpdateInput) data: AdUpdateInput
    ): Promise<Ad | null> {
        const ad = await Ad.findOne({ where: { id }, relations: { tags: true } });
        if (ad !== null) {


            merge(ad, data);

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


    @Mutation(() => Ad, { nullable: true })
    async deleteAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
        const ad = await Ad.findOneBy({ id })
        if (ad !== null) {
            await ad.remove()
            Object.assign(ad, { id });
            return ad;
        } else {
            return null;
        }
    }

}