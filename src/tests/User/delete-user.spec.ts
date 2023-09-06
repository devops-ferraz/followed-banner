import { expect, it } from "vitest";
import { CreateUserInput } from "../../inputs/User/create-user-input";
import { UserService } from "../../services/User/user-services";
import { InMemoryUserRepository } from "../../repository/User/in-memory-user-repository";

it("Should be returned a deleted user", async () => {
  const userService = new UserService(new InMemoryUserRepository());

  const userData: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
    password: "securePassword",
  };

  const newUser = await userService.create(userData);
  const deletedUser = await userService.delete(newUser.id);

  expect(deletedUser).toBeDefined();
  expect(deletedUser?.id).toBe(newUser.id);
  expect(deletedUser?.name).toBe(userData.name);
  expect(deletedUser?.email).toBe(userData.email);

  const foundUser = await userService.findUnique(newUser.id);
  expect(foundUser).toBeNull();
});
