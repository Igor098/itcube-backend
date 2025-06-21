import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRolesToEnum1750459463019 implements MigrationInterface {
    name = 'UpdateRolesToEnum1750459463019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_role_name"`);
        await queryRunner.query(`ALTER TABLE "roles" RENAME COLUMN "name" TO "roleName"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "roleName"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_rolename_enum" AS ENUM('admin', 'teacher', 'student', 'parent', 'user')`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "roleName" "public"."roles_rolename_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_role_name" ON "roles" ("roleName") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_role_name"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "roleName"`);
        await queryRunner.query(`DROP TYPE "public"."roles_rolename_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "roleName" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" RENAME COLUMN "roleName" TO "name"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_role_name" ON "roles" ("name") `);
    }

}
