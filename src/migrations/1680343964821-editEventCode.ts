import { MigrationInterface, QueryRunner } from "typeorm";

export class editEventCode1680343964821 implements MigrationInterface {
    name = 'editEventCode1680343964821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "code" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "code" SET DEFAULT 'RMSAP6'`);
    }

}
