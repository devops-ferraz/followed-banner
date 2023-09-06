import * as bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

import { UserRepository } from "../../repository/User/user-repository";
import { User } from "../../models/User/user-model";
import { CreateUserInput } from "../../inputs/User/create-user-input";
import { UpdateUserInput } from "../../inputs/User/update-user-input";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword,
    });
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    if (data.password !== undefined && data.password !== null) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    return this.userRepository.update(id, data);
  }

  async findUnique(id: string): Promise<User | null> {
    return this.userRepository.findUnique(id);
  }

  async findMany(): Promise<User[]> {
    return this.userRepository.findMany();
  }

  async delete(id: string): Promise<User> {
    return this.userRepository.delete(id);
  }
}
