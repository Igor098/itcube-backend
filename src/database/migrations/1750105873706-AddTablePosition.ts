import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablePosition1750105873706 implements MigrationInterface {
    name = 'AddTablePosition1750105873706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "post" TO "position_id"`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_position_name" ON "positions" ("name") `);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "position_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "position_id" integer`);
        await queryRunner.query(`CREATE INDEX "idx_employee_position_id" ON "employees" ("position_id") `);
        await queryRunner.query(`CREATE INDEX "idx_employee_position" ON "employees" ("position_id") `);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b"`);
        await queryRunner.query(`DROP INDEX "public"."idx_employee_position"`);
        await queryRunner.query(`DROP INDEX "public"."idx_employee_position_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "position_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "position_id" character varying(50) NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."idx_position_name"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "position_id" TO "post"`);
    }

}
