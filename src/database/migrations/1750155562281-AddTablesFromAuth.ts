import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablesFromAuth1750155562281 implements MigrationInterface {
    name = 'AddTablesFromAuth1750155562281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_user_phone"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "auth_type" character varying(20) NOT NULL, "auth_provider" character varying(20) NOT NULL, "access_token" text, "refresh_token" text, "user_id" integer, "expires_at" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_account_user_id" ON "accounts" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "idx_account_user" ON "accounts" ("user_id") `);
        await queryRunner.query(`CREATE TYPE "public"."tokens_type_enum" AS ENUM('verification', 'two_factor', 'password_reset')`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "token" text NOT NULL, "type" "public"."tokens_type_enum" NOT NULL, "expires_in" TIMESTAMP NOT NULL, CONSTRAINT "UQ_6a8ca5961656d13c16c04079dd3" UNIQUE ("token"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`CREATE TYPE "public"."users_method_enum" AS ENUM('credentials', 'google', 'yandex')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "method" "public"."users_method_enum" NOT NULL DEFAULT 'credentials'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "picture" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_two_factor_enabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3000dad1da61b29953f07476324" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3000dad1da61b29953f07476324"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_two_factor_enabled"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_verified"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "method"`);
        await queryRunner.query(`DROP TYPE "public"."users_method_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(15) NOT NULL`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TYPE "public"."tokens_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_account_user"`);
        await queryRunner.query(`DROP INDEX "public"."idx_account_user_id"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_user_phone" ON "users" ("phone") `);
    }

}
