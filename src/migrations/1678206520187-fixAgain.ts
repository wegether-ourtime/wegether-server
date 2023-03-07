import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAgain1678206520187 implements MigrationInterface {
    name = 'fixAgain1678206520187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "event_id"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "event_id" uuid`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_12f46d4d5bb1197c4f31428dde0" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_12f46d4d5bb1197c4f31428dde0"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "event_id"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "event_id" character varying`);
    }

}
