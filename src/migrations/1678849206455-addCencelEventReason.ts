import { MigrationInterface, QueryRunner } from "typeorm";

export class addCencelEventReason1678849206455 implements MigrationInterface {
    name = 'addCencelEventReason1678849206455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "cancel_event_reason" character varying`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "status" SET DEFAULT '{"OPEN":"OPEN","FULLY":"FULLY","CANCEL":"CANCEL"}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "status" SET DEFAULT '{"OPEN":"OPEN","FULLY":"FULLY","CANCLE":"CANCLE"}'`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "cancel_event_reason"`);
    }

}
