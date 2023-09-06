import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { User } from "../../models/user-model";
import { CreateUserInput } from "../../inputs/User/create-user-input";
import { PrismaUserRepository } from "../../repository/User/prisma-user-repository";
import { UserService } from "../../services/User/user-services";
import { UpdateUserInput } from "../../inputs/User/update-user-input";

const prisma = new PrismaClient();
const context = { prisma };

@Resolver(() => User)
export class UsersResolver {
  userService: UserService;
  constructor() {
    this.userService = new UserService(new PrismaUserRepository());
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: string) {
    return this.userService.findUnique(id);
  }

  @Query(() => [User])
  async users() {
    return this.userService.findMany();
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: string) {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data", () => UpdateUserInput) data: Partial<User>) {
    return this.userService.update(id, data);
  }
}
