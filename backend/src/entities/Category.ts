import { Matches } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Matches(/^[A-Z][a-z]+(?:\s[A-Z][a-z]+)*$/, { message: "Words must start in capital letter and must not contain digits" })
    name!: string;

    @OneToMany(() => Ad, ad => ad.category)
    ads!: Ad[];
}