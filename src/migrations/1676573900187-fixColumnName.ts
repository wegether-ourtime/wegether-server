import { MigrationInterface, QueryRunner } from "typeorm";

export class fixColumnName1676573900187 implements MigrationInterface {
    name = 'fixColumnName1676573900187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " full_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " id_no"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN " tel_no"`);
        await queryRunner.query(`ALTER TABLE "event_category" DROP COLUMN " event_id"`);
        await queryRunner.query(`ALTER TABLE "event_category" DROP COLUMN " category_id"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN " event_name"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN " event_detail"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id_no" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tel_no" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD "event_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD "event_detail" character varying`);
        await queryRunner.query(`ALTER TABLE "event_category" DROP CONSTRAINT "FK_f81a9c9dcf8e57514363383fcad"`);
        await queryRunner.query(`ALTER TABLE "event_category" DROP CONSTRAINT "FK_398cd1b29fa675d0ed4d73944d4"`);
        await queryRunner.query(`ALTER TABLE "event_category" ALTER COLUMN "event_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_category" ALTER COLUMN "category_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_category" ADD CONSTRAINT "FK_f81a9c9dcf8e57514363383fcad" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_category" ADD CONSTRAINT "FK_398cd1b29fa675d0ed4d73944d4" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_category" DROP CONSTRAINT "FK_398cd1b29fa675d0ed4d73944d4"`);
        await queryRunner.query(`ALTER TABLE "event_category" DROP CONSTRAINT "FK_f81a9c9dcf8e57514363383fcad"`);
        await queryRunner.query(`ALTER TABLE "event_category" ALTER COLUMN "category_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_category" ALTER COLUMN "event_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_category" ADD CONSTRAINT "FK_398cd1b29fa675d0ed4d73944d4" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_category" ADD CONSTRAINT "FK_f81a9c9dcf8e57514363383fcad" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "event_detail"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "event_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tel_no"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id_no"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "event" ADD " event_detail" character varying`);
        await queryRunner.query(`ALTER TABLE "event" ADD " event_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_category" ADD " category_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_category" ADD " event_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " tel_no" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " id_no" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD " email" character varying NOT NULL`);
    }

}
