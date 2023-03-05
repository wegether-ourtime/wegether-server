import { MigrationInterface, QueryRunner } from "typeorm";

export class addFileImage1678029316645 implements MigrationInterface {
    name = 'addFileImage1678029316645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."file_resource_enum" AS ENUM('USER_PROFILE', 'USER_COVER', 'EVENT')`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying NOT NULL, "file_type" character varying NOT NULL, "path" character varying NOT NULL, "resource" "public"."file_resource_enum" NOT NULL, "user_id" character varying, "farmer_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "img_profile_url" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "img_cover_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "img_cover_url"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "img_profile_url"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TYPE "public"."file_resource_enum"`);
    }

}
