import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CatsService } from "./cats.service";
import { CatsArgs } from "./dto/cats.args";
import { NewCatInput } from "./dto/new-cat.input";
import { Cat } from "./models/cat.model";

@Resolver((of) => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query((returns) => Cat)
  async cat(@Args("id") id: string): Promise<Cat> {
    const cat = await this.catsService.findOneById(id);
    if (!cat) {
      throw new NotFoundException(id);
    }
    return cat;
  }

  @Query((returns) => [Cat])
  cats(@Args() catsArgs: CatsArgs): Promise<Cat[]> {
    return this.catsService.findAll(catsArgs);
  }

  @Mutation((returns) => Cat)
  async addCat(@Args("newCatData") newCatData: NewCatInput): Promise<Cat> {
    return this.catsService.create(newCatData);
  }

  @Mutation((returns) => Boolean)
  async removeCat(@Args("id") id: string) {
    return this.catsService.remove(id);
  }
}
