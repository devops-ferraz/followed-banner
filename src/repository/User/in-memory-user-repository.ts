import { User } from "../../models/user-model";
import { CreateUserData, UpdateUserData, UserRepository } from "./user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findUnique(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) ?? null;
  }

  async create(data: CreateUserData) {
    if (this.users.some(user => user.email === data.email)) {
      throw new Error("Email already registered in the database");
    }
    this.users.push(data);
    return data;
  }

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async delete(id: string): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    if (this.users.some(user => user.email === data.email && user.id !== id)) {
      throw new Error("Email already registered in the database");
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      name: data.name,
      email: data.email,
      password: data.password,
    };

    return this.users[userIndex];
  }
}
