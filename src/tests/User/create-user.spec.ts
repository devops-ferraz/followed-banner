import { expect, it } from "vitest";
import { CreateUserInput } from "../../inputs/User/create-user-input";
import { UserService } from "../../services/User/user-services";
import { InMemoryUserRepository } from "../../repository/User/in-memory-user-repository";

it("Should create a new user and hash the password", async () => {
  const userService = new UserService(new InMemoryUserRepository());

  const userData: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
    password: "securePassword",
  };

  const newUser = await userService.create(userData);

  expect(newUser).toBeDefined();
  expect(newUser.id).toBeDefined();
  expect(newUser.password).toBeDefined();
  expect(newUser.name).toBe(userData.name);
  expect(newUser.email).toBe(userData.email);
  expect(newUser.password).not.toBe(userData.password);
});

it("It should throw an error indicating that the email has already been registered", async () => {
  const userService = new UserService(new InMemoryUserRepository());

  const john: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
    password: "potato123",
  };
  await userService.create(john);

  const john2: CreateUserInput = {
    name: "John Doe 2",
    email: "john@example.com",
    password: "xpto1904",
  };

  const createUserFunction = async () => {
    return await userService.create(john2);
  };

  expect(createUserFunction).rejects.toThrowError(Error("Email already registered in the database"));
});

it("Should be return null", async () => {
  const userService = new UserService(new InMemoryUserRepository());
  const userData: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
    password: "securePassword",
  };
  await userService.create(userData);
  const user = await userService.findUnique("invalid-xpto-id");
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
