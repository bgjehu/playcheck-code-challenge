import { getModelForClass } from "@typegoose/typegoose";
import { Arg, ClassType, Query, Resolver } from "type-graphql";
import { DocumentNotFound } from "../../errors/DocumentNotFound";
import { ListOptionsInput } from "./types/ListOptionsInput";

export function createBaseResolver<T extends ClassType>(objectTypeClass: T) {

  const objectTypeName = objectTypeClass.name;
  const model = getModelForClass(objectTypeClass);;
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(type => objectTypeClass, { name: objectTypeName })
    async getById(@Arg("id") id: string): Promise<T> {
      const item = await model.findById(id).exec();
      if (item) {
        return item.toJSON();
      } else {
        throw new DocumentNotFound(model, id);
      }
    }

    @Query(type => [objectTypeClass], { name: `${objectTypeName}s` })
    async listAll(@Arg('listOptions', { nullable: true }) { limit, offset: skip }: ListOptionsInput = {}): Promise<T[]> {
      const documents = await model.find({}, {}, { limit, skip, sort: { createdAt: 1, _id: 1 } }).exec();
      return documents.map(document => document.toJSON());
    }
  }

  return BaseResolver;
}