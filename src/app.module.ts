import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatsModule } from "./cats/cats.module";
import {
  METRICS_PLUGIN_KEY,
  PromModule,
  TRACING_PLUGIN_KEY,
} from "./metrics/prom.module";

@Module({
  imports: [
    PromModule,
    CatsModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [PromModule],
      useFactory: (
        tracingPlugin: ApolloServerPlugin,
        metricsPlugin: ApolloServerPlugin
      ) => ({
        debug: true,
        introspection: true,
        playground: true,
        plugins: [tracingPlugin, metricsPlugin],
        autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      }),
      inject: [TRACING_PLUGIN_KEY, METRICS_PLUGIN_KEY],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
