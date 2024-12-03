import { Matches } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column()
    @Matches(/^[a-z]+$/, { message: "One word and lowercase letters only" })
    @Field()
    name!: string;

    @ManyToMany(() => Ad, ad => ad.tags)
    @Field(() => [Ad])
    ads!: Ad[];
}


@InputType()
export class TagCreateInput {
    @Matches(/^[a-z]+$/, { message: "One word and lowercase letters only" })
    @Field()
    name!: string;
}

@InputType()
export class TagUpdateInput {
    @Matches(/^[a-z]+$/, { message: "One word and lowercase letters only" })
    @Field({ nullable: true })
    name!: string;
}