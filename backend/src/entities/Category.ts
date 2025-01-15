import { IsNotEmpty, Length, Matches } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
class CategoryLike {
    @Field()
    createdAt!: Date;

    @Field()
    user!: string;
}

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


    @Field(() => [CategoryLike])
    likes() {
        console.log("Computed");
        return [
            {
                createdAt: new Date(),
                user: "Aurélien",
            },
        ];
    }

    @CreateDateColumn()
    @Field()
    createdAt!: Date;

    @ManyToOne(() => User)
    @Field(() => User)
    createdBy!: User;
}

@InputType()
export class CategoryCreateInput {
    @IsNotEmpty({ message: "Category is required" })
    @Length(3, 100, { message: "Title must be between 3 and 100 chars" })
    @Matches(/^[A-ZÀ-Ö][a-zà-ö]+(?:\s(?:[a-zà-ö]+|[A-ZÀ-Ö][a-zà-ö]+))*$/, { message: "Words must start in capital letter and must not contain digits" })
    @Field({ nullable: true })
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