import { ModelType } from "@typegoose/typegoose/lib/types";
import { Base } from "../models/Base";
export class DocumentNotFound extends Error {
  constructor(documentClass: ModelType<Base>, id: string) {
    const message = `${documentClass.modelName}(${id}) not found.`;
    super(message);
  }
}