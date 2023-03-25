import { MigrationInterface, QueryRunner } from "typeorm";

export class addHostId1679578807355 implements MigrationInterface {
    name = 'addHostId1679578807355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "host_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "host_id"`);
    }

}
