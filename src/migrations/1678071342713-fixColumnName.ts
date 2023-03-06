import { MigrationInterface, QueryRunner } from "typeorm";

export class fixColumnName1678071342713 implements MigrationInterface {
    name = 'fixColumnName1678071342713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "farmer_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "farmer_id" character varying`);
    }

}
