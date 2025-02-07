import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1739048475609 implements MigrationInterface {
  name = 'Initial1739048475609'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE SEQUENCE "tags_id_seq"
        `)
    await queryRunner.query(`
            CREATE TABLE "tags" (
                "id" INT DEFAULT nextval('"tags_id_seq"') NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE SEQUENCE "posts_id_seq"
        `)
    await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" INT DEFAULT nextval('"posts_id_seq"') NOT NULL,
                "title" varchar NOT NULL,
                "content" varchar NOT NULL,
                "user_id" int8,
                CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_c4f9a7bd77b489e711277ee598" ON "posts" ("user_id")
        `)
    await queryRunner.query(`
            CREATE SEQUENCE "profiles_id_seq"
        `)
    await queryRunner.query(`
            CREATE TABLE "profiles" (
                "id" INT DEFAULT nextval('"profiles_id_seq"') NOT NULL,
                "bio" varchar NOT NULL,
                "avatar" varchar NOT NULL,
                CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'editor', 'user')
        `)
    await queryRunner.query(`
            CREATE SEQUENCE "users_id_seq"
        `)
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" INT DEFAULT nextval('"users_id_seq"') NOT NULL,
                "username" varchar NOT NULL,
                "email" varchar NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
                "profile_id" int8,
                CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_23371445bd80cb3e413089551b" ON "users" ("profile_id")
        `)
    await queryRunner.query(`
            CREATE TABLE "posts_tags" (
                "post_id" int8 NOT NULL,
                "tag_id" int8 NOT NULL,
                CONSTRAINT "PK_ab48f2c0184cd3367465effc5d3" PRIMARY KEY ("post_id", "tag_id")
            )
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_a6b232c89aa1c442b7a6ef0211" ON "posts_tags" ("post_id")
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_0a4f5ee04a91077ddb93526a60" ON "posts_tags" ("tag_id")
        `)
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "posts_tags"
            ADD CONSTRAINT "FK_a6b232c89aa1c442b7a6ef02110" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
    await queryRunner.query(`
            ALTER TABLE "posts_tags"
            ADD CONSTRAINT "FK_0a4f5ee04a91077ddb93526a605" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_0a4f5ee04a91077ddb93526a605"
        `)
    await queryRunner.query(`
            ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_a6b232c89aa1c442b7a6ef02110"
        `)
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"
        `)
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"
        `)
    await queryRunner.query(`
            DROP INDEX "posts_tags" @"IDX_0a4f5ee04a91077ddb93526a60" CASCADE
        `)
    await queryRunner.query(`
            DROP INDEX "posts_tags" @"IDX_a6b232c89aa1c442b7a6ef0211" CASCADE
        `)
    await queryRunner.query(`
            DROP TABLE "posts_tags"
        `)
    await queryRunner.query(`
            DROP INDEX "users" @"IDX_23371445bd80cb3e413089551b" CASCADE
        `)
    await queryRunner.query(`
            DROP TABLE "users"
        `)
    await queryRunner.query(`
            DROP SEQUENCE "users_id_seq"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `)
    await queryRunner.query(`
            DROP TABLE "profiles"
        `)
    await queryRunner.query(`
            DROP SEQUENCE "profiles_id_seq"
        `)
    await queryRunner.query(`
            DROP INDEX "posts" @"IDX_c4f9a7bd77b489e711277ee598" CASCADE
        `)
    await queryRunner.query(`
            DROP TABLE "posts"
        `)
    await queryRunner.query(`
            DROP SEQUENCE "posts_id_seq"
        `)
    await queryRunner.query(`
            DROP TABLE "tags"
        `)
    await queryRunner.query(`
            DROP SEQUENCE "tags_id_seq"
        `)
  }
}
