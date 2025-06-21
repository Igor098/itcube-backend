import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteTableRoles1750460373077 implements MigrationInterface {
    name = 'DeleteTableRoles1750460373077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
        await queryRunner.query(`ALTER TABLE "user_roles" RENAME COLUMN "role_id" TO "role"`);
        await queryRunner.query(`ALTER TABLE "user_roles" RENAME CONSTRAINT "PK_23ed6f04fe43066df08379fd034" TO "PK_09d115a69b6014d324d592f9c42"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_09d115a69b6014d324d592f9c42"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_87b8888186ca9769c960e926870" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."user_roles_role_enum" AS ENUM('admin', 'teacher', 'student', 'parent', 'user')`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "role" "public"."user_roles_role_enum" NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "role" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_09d115a69b6014d324d592f9c42" PRIMARY KEY ("user_id", "role")`);
        await queryRunner.query(`ALTER TABLE "user_roles" RENAME CONSTRAINT "PK_09d115a69b6014d324d592f9c42" TO "PK_23ed6f04fe43066df08379fd034"`);
        await queryRunner.query(`ALTER TABLE "user_roles" RENAME COLUMN "role" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
