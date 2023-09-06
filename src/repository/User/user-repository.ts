import { UpdateUserInput } from "../../inputs/User/update-user-input";
import { User } from "../../models/user-model";

export interface CreateUserData {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserData {
  name: string;
  email: string;
  password: string;
  updatedAt: Date;
}

export interface UserRepository {
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  findUnique(id: string): Promise<User | null>;
  findMany(): Promise<User[]>;
  delete(id: string): Promise<User>;
}
