import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { User, UserCreateInput, UserUpdateInput } from "../entities/User";
import { validate } from "class-validator";
import argon2 from "argon2";

@Resolver()
export class UsersResolver {
    @Query(() => [User])
    async users(): Promise<User[] | null> {
        const users = await User.find()
        if (users !== null) {
            return users
        } else {
            return null;
        }
    }
    @Query(() => User)
    async user(@Arg("id", () => ID) id: number): Promise<User | null> {
        const user = await User.findOneBy({ id })
        if (user) {
            return user
        } else {
            return null;
        }
    }

    @Mutation(() => User, { nullable: true })
    async signin(
        @Arg("email") email: string,
        @Arg("password") password: string)
        : Promise<User> {
        try {
            const user = await User.findOneBy({ email });
            if (user) {
                if (await argon2.verify(user.hashedPassword, password)) {
                    return user;
                } else {
                    throw new Error("Invalid password");
                }
            } else {
                throw new Error("User not found");
            }

        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Unable to sign in");
        }
    }

    @Mutation(() => User)
    async createUser(@Arg("data", () => UserCreateInput) data: UserCreateInput): Promise<User> {
        const newUser = new User();
        try {
            const hashedPassword = await argon2.hash(data.password)
            Object.assign(newUser, data, { hashedPassword, password: undefined })
            const errors = await validate(newUser);
            if (errors.length > 0) {
                throw new Error(`Validation error: ${JSON.stringify(errors)}`);
            } else {
                await newUser.save()
                return newUser;
            }
        } catch (error) {
            console.error("Error creating user:", error);
            return newUser;
        }
    }

    // @Mutation(() => User, { nullable: true })
    // async updateUser(
    //     @Arg("id", () => ID) id: number,
    //     @Arg("data", () => UserUpdateInput) data: UserUpdateInput
    // ): Promise<User | null> {
    //     const user = await User.findOneBy({ id });
    //     if (user !== null) {

    //         await user.save();
    //         return user;
    //     } else {
    //         return null;
    //     }
    // }

    @Mutation(() => User, { nullable: true })
    async deleteUser(@Arg("id", () => ID) id: number): Promise<User | null> {
        const user = await User.findOneBy({ id })
        if (user !== null) {
            await user.remove()
            Object.assign(user, { id });
            return user;
        } else {
            return null;
        }
    }

}