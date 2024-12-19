import { IsNotEmpty, Length, Matches } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column()
    @Length(3, 100, { message: "Title must be between 3 and 100 chars" })
    @Matches(/^[A-ZÀ-Ö][a-zà-ö]+(?:\s(?:[a-zà-ö]+|[A-ZÀ-Ö][a-zà-ö]+))*$/, { message: "Words must start in capital letter and must not contain digits" })
    @Field()
    name!: string;

    @OneToMany(() => Ad, ad => ad.category)
    @Field(() => [Ad])
    ads!: Ad[];
}

@InputType()
export class CategoryCreateInput {
    @IsNotEmpty({ message: "Category is required" })
    @Length(3, 100, { message: "Title must be between 3 and 100 chars" })
    @Matches(/^[A-ZÀ-Ö][a-zà-ö]+(?:\s(?:[a-zà-ö]+|[A-ZÀ-Ö][a-zà-ö]+))*$/, { message: "Words must start in capital letter and must not contain digits" })
    @Field()
    name!: string;
}

@InputType()
export class CategoryUpdateInput {
    @IsNotEmpty({ message: "Category is required" })
    @Length(3, 100, { message: "Title must be between 3 and 100 chars" })
    @Matches(/^[A-ZÀ-Ö][a-zà-ö]+(?:\s(?:[a-zà-ö]+|[A-ZÀ-Ö][a-zà-ö]+))*$/, { message: "Words must start in capital letter and must not contain digits" })
    @Field({ nullable: true })
    name!: string;
}