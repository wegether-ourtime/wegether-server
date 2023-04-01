import { MigrationInterface, QueryRunner } from "typeorm";

export class fixEventStatus1680354636914 implements MigrationInterface {
    name = 'fixEventStatus1680354636914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" ADD "actually_join" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "status" SET DEFAULT 'OPEN'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "status" SET DEFAULT '{"OPEN":"OPEN","FULLY":"FULLY","CANCEL":"CANCEL"}'`);
        await queryRunner.query(`ALTER TABLE "user_event" DROP COLUMN "actually_join"`);
    }

}
