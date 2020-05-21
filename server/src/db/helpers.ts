import { buildPaginator } from "typeorm-cursor-pagination";
import {
  ObjectType,
  getConnection,
  DeepPartial,
  SelectQueryBuilder,
} from "typeorm";

import { PaginationInput } from "../graphql/types";
import { GraphqlContext } from "../graphql/context";
import { logger } from "../utils/logger";
import { AuthenticationError } from "apollo-server-express";

import { Todo } from "./entities/Todo";

type ApplicationEntity = Todo;

type ProtectedQuery<Entity extends ApplicationEntity> = (
  context: GraphqlContext
) => (qb: SelectQueryBuilder<Entity>) => SelectQueryBuilder<Entity>;

const getProtectedQuery = <Entity extends ApplicationEntity>(
  target: ObjectType<Entity>
) => {
  switch (target.name) {
    case Todo.name:
      return (Todo.protectedQuery as any) as ProtectedQuery<Entity>;
    default:
      throw new Error();
  }
};

const defaultQuery = <Entity>() => (qb: SelectQueryBuilder<Entity>) => qb;

interface FindManyArgs<Entity extends ApplicationEntity> {
  target: ObjectType<Entity>;
  input?: PaginationInput;
  context: GraphqlContext;
  query?: (qb: SelectQueryBuilder<Entity>) => SelectQueryBuilder<Entity>;
}

export const findMany = async <Entity extends ApplicationEntity>(
  args: FindManyArgs<Entity>
) => {
  const { input = {}, context, target, query = defaultQuery<Entity>() } = args;

  const protectedQuery = getProtectedQuery<Entity>(target)(context);

  const limit = input.limit || 25;
  const order = input.order || "ASC";
  const { cursor: cursorKey, type } = input.cursor || {};

  const queryBuilder = query(
    protectedQuery(
      getConnection().getRepository<Entity>(target).createQueryBuilder("ALIAS")
    )
  );

  const paginator = buildPaginator<Entity>({
    entity: target,
    query: {
      limit,
      order,
      afterCursor: type === "AFTER" ? cursorKey : undefined,
      beforeCursor: type === "BEFORE" ? cursorKey : undefined,
    },
    alias: "ALIAS",
  });

  const { data, cursor } = await paginator.paginate(queryBuilder);

  return {
    data,
    cursor: {
      afterCursor: cursor.afterCursor || undefined,
      beforeCursor: cursor.beforeCursor || undefined,
    },
  };
};

interface FindOneArgs<Entity extends ApplicationEntity> {
  target: ObjectType<Entity>;
  id?: string;
  context: GraphqlContext;
}

export const findOne = async <Entity extends ApplicationEntity>(
  input: FindOneArgs<Entity>
) => {
  const { target, id, context } = input;

  if (id === undefined) return undefined;
  const item = await getConnection().getRepository(target).findOne(id);
  if (!item || !item.canAccess(context)) return undefined;

  return item;
};

export const findOneOrFail = async <Entity extends ApplicationEntity>(
  input: FindOneArgs<Entity>
) => {
  const { target, id, context } = input;

  const record = await findOne({ target, id, context });
  if (record === undefined) throw new Error();
  return record;
};

interface DeleteOneArgs<Entity extends ApplicationEntity> {
  target: ObjectType<Entity>;
  id: string;
  context: GraphqlContext;
}

export const deleteOne = async <Entity extends ApplicationEntity>(
  input: DeleteOneArgs<Entity>
) => {
  const { target, id, context } = input;
  const item = await getConnection().getRepository(target).findOne(id);
  if (!item || !item.canDelete(context)) return false;

  try {
    await getConnection().getRepository(target).softDelete(id);
  } catch (e) {
    logger.error("Error deleting entity", { target, id, context });
    return false;
  }
  return true;
};

interface CreateOneArgs<Entity extends ApplicationEntity> {
  target: ObjectType<Entity>;
  item: DeepPartial<Entity>;
  context?: GraphqlContext;
}

export const createOne = async <Entity extends ApplicationEntity>(
  args: CreateOneArgs<Entity>
) => {
  const { item, target } = args;

  const createdItem = getConnection().getRepository(target).create(item);

  await createdItem.save();

  return createdItem;
};

interface UpdateOneArgs<Entity extends ApplicationEntity> {
  target: ObjectType<Entity>;
  id: string;
  updatedItem: DeepPartial<Entity>;
  context: GraphqlContext;
}

export const updateOne = async <Entity extends ApplicationEntity>(
  args: UpdateOneArgs<Entity>
) => {
  const { updatedItem, target, context, id } = args;

  const oldItem = await findOneOrFail({ target, context, id });

  if (!oldItem.canUpdate(context)) {
    logger.warn("User trying to update item they are not allowed to", {
      context,
      target,
      id,
      updatedItem,
      oldItem,
    });
    throw new AuthenticationError("Not authorized");
  }

  await getConnection().getRepository(target).update(id, updatedItem);
  return findOneOrFail({ target, id, context });
};
