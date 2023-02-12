import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserDetail1676189614362 implements MigrationInterface {
    name = 'updateUserDetail1676189614362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN " eventDetail" TO " event_detail"`);
        await queryRunner.query(`ALTER TABLE "user" ADD " email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " id_no" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " tel_no" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " tel_no"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " id_no"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " full_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " email"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN " event_detail" TO " eventDetail"`);
    }

}
