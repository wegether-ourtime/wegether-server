import { MigrationInterface, QueryRunner } from "typeorm";

export class updateEventCategory1676192291133 implements MigrationInterface {
    name = 'updateEventCategory1676192291133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_category" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "event_category" ADD CONSTRAINT "FK_398cd1b29fa675d0ed4d73944d4" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_category" DROP CONSTRAINT "FK_398cd1b29fa675d0ed4d73944d4"`);
        await queryRunner.query(`ALTER TABLE "event_category" DROP COLUMN "category_id"`);
    }

}
