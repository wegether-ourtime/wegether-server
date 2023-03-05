import { MigrationInterface, QueryRunner } from "typeorm";

export class addIsHost1677921176630 implements MigrationInterface {
    name = 'addIsHost1677921176630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" ADD "is_host" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP COLUMN "is_host"`);
    }

}
