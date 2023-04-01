import { MigrationInterface, QueryRunner } from "typeorm";

export class addEventCode1680343749712 implements MigrationInterface {
    name = 'addEventCode1680343749712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "code" character varying NOT NULL DEFAULT 'RMSAP6'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "code"`);
    }

}
