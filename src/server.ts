import "reflect-metadata";
import "dotenv/config";

import path from "node:path";

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PrismaClient } from "@prisma/client";
import { AuthResolver } from "./resolvers/Auth/auth-resolver";
import { UsersResolver } from "./resolvers/User/users-resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UsersResolver, AuthResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const prisma = new PrismaClient();
  const context = {
    prisma,
  };

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context,
  });

  const { url } = await server.listen();

  console.log(`⏳ HTTP server running on ${url}`);
}

bootstrap();
