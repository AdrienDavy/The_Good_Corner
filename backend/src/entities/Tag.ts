import { Matches } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Matches(/^[a-z]+$/, { message: "One word and lowercase letters only" })
    name!: string;

    @ManyToMany(() => Ad, ad => ad.tags)
    ads!: Ad[];
}