import { VIRTUAL_COLUMN_KEY } from './common/decorators/virtual-column.decorator';
import { OptimisticLockCanNotBeUsedError, SelectQueryBuilder } from 'typeorm';

const fillVirtualColumn = (entity: any, raw: any) => {
  if (!entity) return entity;
  const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};
  for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
    entity[propertyKey] = raw[name];
  }
  return entity;
};
declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    getMany(this: SelectQueryBuilder<Entity>): Promise<Entity[] | undefined>;
    getOne(this: SelectQueryBuilder<Entity>): Promise<Entity | undefined>;
    getManyAndCount(
      this: SelectQueryBuilder<Entity>,
    ): Promise<[Entity[], number]>;
  }
}

SelectQueryBuilder.prototype.getManyAndCount = async function () {
  if (this.expressionMap.lockMode === 'optimistic')
    throw new OptimisticLockCanNotBeUsedError();

  const queryRunner = this.obtainQueryRunner();
  let transactionStartedByUs: boolean = false;
  try {
    // start transaction if it was enabled
    if (
      this.expressionMap.useTransaction === true &&
      queryRunner.isTransactionActive === false
    ) {
      await queryRunner.startTransaction();
      transactionStartedByUs = true;
    }

    this.expressionMap.queryEntity = true;
    const { entities, raw } = await this.executeEntitiesAndRawResults(
      queryRunner,
    );
    let index = 0;
    const items = entities.map((entity) => {
      while (entity?.id != raw[index]?.[Object.getOwnPropertyNames(raw[0])[0]]) {
        index++;
      }
      return fillVirtualColumn(entity, raw[index]);
    });
    this.expressionMap.queryEntity = false;
    const count = await this.executeCountQuery(queryRunner);
    const results: [any[], number] = [items, count];

    // close transaction if we started it
    if (transactionStartedByUs) {
      await queryRunner.commitTransaction();
    }

    return results;
  } catch (error) {
    // rollback transaction if we started it
    if (transactionStartedByUs) {
      try {
        await queryRunner.rollbackTransaction();
      } catch (rollbackError) {}
    }
    throw error;
  } finally {
    if (queryRunner !== this.queryRunner)
      // means we created our own query runner
      await queryRunner.release();
  }
};

SelectQueryBuilder.prototype.getMany = async function () {
  const { entities, raw } = await this.getRawAndEntities();
  let index = 0;
  const items = entities.map((entity) => {
    while (entity?.id != raw[index]?.[Object.getOwnPropertyNames(raw[0])[0]]) {
      index++;
    }
    return fillVirtualColumn(entity, raw[index]);
  });

  return [...items];
};

SelectQueryBuilder.prototype.getOne = async function () {
  const { entities, raw } = await this.getRawAndEntities();
  return fillVirtualColumn(entities[0], raw[0]);
};
