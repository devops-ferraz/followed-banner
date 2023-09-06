import { expect, it } from "vitest";
import { CreateUserInput } from "../../inputs/User/create-user-input";
import { UserService } from "../../services/User/user-services";
import { InMemoryUserRepository } from "../../repository/User/in-memory-user-repository";
import { UpdateUserInput } from "../../inputs/User/update-user-input";

it("Should updatede a user and hash the password", async () => {
  const userService = new UserService(new InMemoryUserRepository());

  const userData: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
    password: "securePassword",
  };
  const john = await userService.create(userData);

  const updateData: UpdateUserInput = {
    name: "Doe John",
    email: "john@john.com",
    password: "securePassword!02",
  };

  const updatedeUser = await userService.update(john.id, updateData);

  expect(updatedeUser).toBeDefined();
  expect(updatedeUser.id).toBeDefined();
  expect(updatedeUser.password).toBeDefined();
  expect(updatedeUser.name).toBe("Doe John");
  expect(updatedeUser.email).toBe("john@john.com");
  expect(updatedeUser.password).not.toBe("securePassword!02");
});
