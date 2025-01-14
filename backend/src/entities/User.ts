import { IsEmail, Matches, MaxLength, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID!)
    id!: number;

    @Column({ unique: true })
    @IsEmail({}, { message: "Invalid email" })
    @Field()
    email!: string;


    @Column()
    // @Field()
    hashedPassword!: string;
}

@InputType()
export class UserCreateInput {
    @IsEmail({}, { message: "Invalid email" })
    @Field()
    email!: string;

    @Field()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @MaxLength(32, { message: "Password cannot exceed 32 characters" })
    @Matches(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    @Matches(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    @Matches(/\d/, { message: "Password must contain at least one number" })
    @Matches(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" })
    password!: string;
}

@InputType()
export class UserUpdateInput {
    @IsEmail({}, { message: "Invalid email" })
    @Field()
    email!: string;

    @Field()
    password!: string;
}