import { MigrationInterface, QueryRunner } from "typeorm";

export class addEventLocation1678107869316 implements MigrationInterface {
    name = 'addEventLocation1678107869316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "location" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "location"`);
    }

}
