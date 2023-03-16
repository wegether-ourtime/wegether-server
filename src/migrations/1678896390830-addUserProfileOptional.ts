import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserProfileOptional1678896390830 implements MigrationInterface {
    name = 'addUserProfileOptional1678896390830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "bio" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
    }

}
