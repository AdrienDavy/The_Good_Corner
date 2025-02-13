import {
    IsEmail,
    IsNotEmpty,
    IsUrl,
    Length,
    Max,
    Min,
    IsArray,
    IsPositive,
    IsInt,
    ValidateNested,
} from "class-validator";
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { User, UserCreateInput, UserUpdateInput } from "./User";
import { AuthContextType, ContextType } from "../auth";
import { IdInput } from "./id";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID!)
    id!: number;

    @ManyToOne(() => Category, (category) => category.ads, { nullable: true })
    @Field(() => Category)
    category!: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads, { nullable: true })
    @JoinTable()
    @Field(() => [Tag])
    tags!: Tag[];

    @Column()
    @Field()
    title!: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    description!: string;

    @Column()
    @Field(() => Int)
    price!: number;

    @Column()
    @Field()
    picture!: string;

    @Column()
    @Field()
    location!: string;

    @CreateDateColumn()
    @Field()
    createdAt!: Date;

    @ManyToOne(() => User)
    @Field(() => User)
    createdBy!: User;

    @BeforeInsert()
    private setCreateAt() {
        this.createdAt = new Date();
    }
}

@InputType()
export class AdCreateInput {

    @IsNotEmpty({ message: "Category is required" })
    @Field(() => IdInput)
    category!: IdInput;

    @Field(() => [IdInput], { nullable: true })
    tags!: IdInput[];

    @IsNotEmpty({ message: "Title is required" })
    @Field()
    title!: string;

    @IsNotEmpty({ message: "Description is required" })
    @Field({ nullable: true })
    description!: string;

    @IsPositive({ message: "Price must be positive" })
    @Min(0, { message: "Price must be greater than or equal to 0" })
    @Max(1000000, { message: "Price must be lower than or equal to 1,000,000 cents" })
    @Field(() => Int)
    price!: number;

    @IsUrl({}, { message: "Picture must be a valid URL" })
    @IsNotEmpty({ message: "Picture URL is required" })
    @Field()
    picture!: string;

    @IsNotEmpty({ message: "Location is required" })
    @Field()
    location!: string;

}

@InputType()
export class AdUpdateInput {
    @IsNotEmpty({ message: "Category is required" })
    @Field(() => IdInput, { nullable: true })
    category!: IdInput;

    @Field(() => [IdInput], { nullable: true })
    tags!: IdInput[];

    @IsNotEmpty({ message: "Title is required" })
    @Field({ nullable: true })
    title!: string;

    @IsNotEmpty({ message: "Description is required" })
    @Field({ nullable: true })
    description!: string;

    @IsPositive({ message: "Price must be positive" })
    @Min(0, { message: "Price must be greater than or equal to 0" })
    @Max(1000000, { message: "Price must be lower than or equal to 1,000,000 cents" })
    @Field(() => Int, { nullable: true })
    price!: number;

    @IsUrl({}, { message: "Picture must be a valid URL" })
    @IsNotEmpty({ message: "Picture URL is required" })
    @Field({ nullable: true })
    picture!: string;

    @IsNotEmpty({ message: "Location is required" })
    @Field({ nullable: true })
    location!: string;

}
