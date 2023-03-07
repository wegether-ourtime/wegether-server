import { MigrationInterface, QueryRunner } from "typeorm";

export class fix1678205888240 implements MigrationInterface {
    name = 'fix1678205888240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "user_friend_id"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "user_friend_id" uuid`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_a12adc00ac5a26d39f938f7ffc9" FOREIGN KEY ("user_friend_id") REFERENCES "user_friend"("user_friend_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_a12adc00ac5a26d39f938f7ffc9"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "user_friend_id"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "user_friend_id" character varying`);
    }

}
