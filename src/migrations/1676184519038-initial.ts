import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1676184519038 implements MigrationInterface {
    name = 'initial1676184519038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user_friend" ("user_friend_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "friend_id" uuid NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2b51deee6a5bd0834614d5eadf1" PRIMARY KEY ("user_friend_id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("chat_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sender_id" character varying NOT NULL, "receiver_id" character varying, "user_friend_id" character varying, "event_id" character varying, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_415c34dcb5ad6193a9ea9dab25e" PRIMARY KEY ("chat_id"))`);
        await queryRunner.query(`CREATE TABLE "event_category" ("event_category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), " event_id" character varying NOT NULL, " category_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "event_id" uuid, CONSTRAINT "PK_66fa12ebc86e57b478918f45804" PRIMARY KEY ("event_category_id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("event_id" uuid NOT NULL DEFAULT uuid_generate_v4(), " event_name" character varying NOT NULL, " eventDetail" character varying, "status" character varying NOT NULL DEFAULT '{"OPEN":"OPEN","FULLY":"FULLY","CANCLE":"CANCLE"}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fe0840e4557d98ed53b0ae51466" PRIMARY KEY ("event_id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "user_category" ("user_category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "category_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9b5a595e2f42758c132093639c5" PRIMARY KEY ("user_category_id"))`);
        await queryRunner.query(`CREATE TABLE "user_event" ("user_event_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "event_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_950a248d2e6d5091247367ef515" PRIMARY KEY ("user_event_id"))`);
        await queryRunner.query(`ALTER TABLE "user_friend" ADD CONSTRAINT "FK_0a27a6550173113ffb6dc7c0cc4" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friend" ADD CONSTRAINT "FK_4253fdc7548f5c643f667f6a528" FOREIGN KEY ("friend_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_category" ADD CONSTRAINT "FK_f81a9c9dcf8e57514363383fcad" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_category" ADD CONSTRAINT "FK_61d484ea6f910dc692440c74f9a" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_category" ADD CONSTRAINT "FK_b03aff6391f212c6ecddc6386a1" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_e39ffa0fac3ca53674b151e2591" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_dbb01827843862e452b97065d5c" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_dbb01827843862e452b97065d5c"`);
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_e39ffa0fac3ca53674b151e2591"`);
        await queryRunner.query(`ALTER TABLE "user_category" DROP CONSTRAINT "FK_b03aff6391f212c6ecddc6386a1"`);
        await queryRunner.query(`ALTER TABLE "user_category" DROP CONSTRAINT "FK_61d484ea6f910dc692440c74f9a"`);
        await queryRunner.query(`ALTER TABLE "event_category" DROP CONSTRAINT "FK_f81a9c9dcf8e57514363383fcad"`);
        await queryRunner.query(`ALTER TABLE "user_friend" DROP CONSTRAINT "FK_4253fdc7548f5c643f667f6a528"`);
        await queryRunner.query(`ALTER TABLE "user_friend" DROP CONSTRAINT "FK_0a27a6550173113ffb6dc7c0cc4"`);
        await queryRunner.query(`DROP TABLE "user_event"`);
        await queryRunner.query(`DROP TABLE "user_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "event_category"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "user_friend"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
