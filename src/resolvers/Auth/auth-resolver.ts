import { Arg, Mutation, Resolver } from "type-graphql";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AuthInput } from "../../inputs/Auth/auth-input";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const context = {
  prisma,
};
const JWT_SECRET: any = process.env.JWT_PRIVATE_KEY;

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(@Arg("data") data: AuthInput) {
    const user = await context.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }
}
