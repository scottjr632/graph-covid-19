import { MiddlewareFn } from 'type-graphql';

export const Logger: MiddlewareFn = async ({ info }, next) => {
  console.log(
    `Logging access: ${'Scott'} -> ${info.parentType.name}.${info.fieldName}`
  );
  return next();
};
