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
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Category, (category) => category.ads)

    @ValidateNested()  // Validation de l'objet Category
    @IsNotEmpty({ message: "Category is required" })
    category!: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
    @JoinTable()
    @IsArray({ message: "Tags must be an array" }) // Validation pour le tableau de tags
    tags!: Tag[];

    @Column()
    @IsNotEmpty({ message: "Title is required" })
    @Length(3, 100, { message: "Title must be between 10 and 100 characters" })
    title!: string;

    @Column()
    @IsNotEmpty({ message: "Description is required" })
    @Length(20, 1000, { message: "Description must be between 20 and 1000 characters" })
    description!: string;

    @Column()
    @IsEmail({}, { message: "Owner must be a valid email" })
    @IsNotEmpty({ message: "Owner is required" })
    owner!: string;

    @Column()
    @IsPositive({ message: "Price must be positive" })
    @Min(0, { message: "Price must be greater than or equal to 0" })
    @Max(1000000, { message: "Price must be lower than or equal to 1,000,000 cents" })
    price!: number;

    @Column()
    @IsUrl({}, { message: "Picture must be a valid URL" })
    @IsNotEmpty({ message: "Picture URL is required" })
    picture!: string;

    @Column()
    @IsNotEmpty({ message: "Location is required" })
    location!: string;

    @Column()
    createdAt!: Date;

    @BeforeInsert()
    private setCreateAt() {
        this.createdAt = new Date();
    }
}
