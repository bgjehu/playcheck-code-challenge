import { DocumentNotFound } from "./DocumentNotFound";
import { OperationForbidden } from "./OperationForbidden";

const ExternalErrors = [
  DocumentNotFound,
  OperationForbidden,
]

export function isExternalError(error: Error) {
  return ExternalErrors.reduce((res, errorClass) => {
    return res || error instanceof errorClass;
  }, false);
}

