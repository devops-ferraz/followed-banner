import { UpdateUserInput } from "../../inputs/User/update-user-input";
import { User } from "../../models/User/user-model";
import { prisma } from "../../prisma";
import { CreateUserData, UserRepository } from "./user-repository";

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserData) {
    return prisma.user.create({
      data,
    });
  }
  async update(id: string, data: UpdateUserInput): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }
  async findUnique(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findMany(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async delete(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return prisma.user.delete({ where: { id } });
  }
}
