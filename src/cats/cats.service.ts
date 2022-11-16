import { Injectable } from "@nestjs/common";
import { NewCatInput } from "./dto/new-cat.input";
import { CatsArgs } from "./dto/cats.args";
import { Cat } from "./models/cat.model";

@Injectable()
export class CatsService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewCatInput): Promise<Cat> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Cat> {
    return {} as any;
  }

  async findAll(catsArgs: CatsArgs): Promise<Cat[]> {
    return [] as Cat[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
