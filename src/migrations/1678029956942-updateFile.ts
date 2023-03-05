import { MigrationInterface, QueryRunner } from "typeorm";

export class updateFile1678029956942 implements MigrationInterface {
    name = 'updateFile1678029956942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "event_id" uuid`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_516f1cf15166fd07b732b4b6ab0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_854c20b0e84a20a9ce60828aae6" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_854c20b0e84a20a9ce60828aae6"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_516f1cf15166fd07b732b4b6ab0"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "user_id" character varying`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "event_id"`);
    }

}
