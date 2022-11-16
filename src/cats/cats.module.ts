import { Module } from "@nestjs/common";
import { CatsResolver } from "./cats.resolver";
import { CatsService } from "./cats.service";

@Module({
  providers: [CatsResolver, CatsService],
})
export class CatsModule {}
