import { Matches } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./User";

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

    @ManyToMany(() => Ad, ad => ad.tags, { nullable: true })
    @Field(() => [Ad])
    ads!: Ad[];

    @CreateDateColumn()
    @Field()
    createdAt!: Date;

    @ManyToOne(() => User)
    @Field(() => User)
    createdBy!: User;
}


@InputType()
export class TagCreateInput {
    @Matches(/^[a-z]+$/, { message: "One word and lowercase letters only" })
    @Field({ nullable: true })
    name!: string;
}

@InputType()
export class TagUpdateInput {
    @Matches(/^[a-z]+$/, { message: "One word and lowercase letters only" })
    @Field({ nullable: true })
    name!: string;
}