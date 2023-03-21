import { MigrationInterface, QueryRunner } from "typeorm";

export class addLivingPlace1679413561091 implements MigrationInterface {
    name = 'addLivingPlace1679413561091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "location" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "location"`);
    }

}
