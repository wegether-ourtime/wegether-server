import { MigrationInterface, QueryRunner } from "typeorm";

export class additionEventDetail1676953009431 implements MigrationInterface {
    name = 'additionEventDetail1676953009431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "max_participant" integer NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "max_participant"`);
    }

}
