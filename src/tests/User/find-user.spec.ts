import { expect, it } from "vitest";
import { CreateUserInput } from "../../inputs/User/create-user-input";
import { UserService } from "../../services/User/user-services";
import { InMemoryUserRepository } from "../../repository/User/in-memory-user-repository";

it("Should be return null", async () => {
  const userService = new UserService(new InMemoryUserRepository());
  const userData: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
    password: "securePassword",
  };
  await userService.create(userData);
  const user = await userService.findUnique("unregistered-use-id");
  expect(user).toBeNull();
});

it("Should be returned a single user", async () => {
  const userService = new UserService(new InMemoryUserRepository());

  const userData: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
    password: "securePassword",
  };

  const newUser = await userService.create(userData);
  const user = await userService.findUnique(newUser.id);

  expect(user).toBeDefined();
  expect(user?.id).toBeDefined();
  expect(user?.password).toBeDefined();
  expect(user?.name).toBe(userData.name);
  expect(user?.email).toBe(userData.email);
});

it("Should be returned a many users", async () => {
  const userService = new UserService(new InMemoryUserRepository());

  const userJohn: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
    password: "securePassword",
  };

  const userMary: CreateUserInput = {
    name: "Mary Zoe",
    email: "mary@example.com",
    password: "securePassword",
  };

  await userService.create(userJohn);
  await userService.create(userMary);
  const users = await userService.findMany();

  expect(users).toBeDefined();
  expect(users[1].name).toBe("Mary Zoe");
  expect(users[1].email).toBe("mary@example.com");
  expect(users[1].password).toBeDefined();
  expect(users[1].createdAt).toBeInstanceOf(Date);
  expect(users).not.toHaveLength(0);
  expect(users).toHaveLength(2);
});
