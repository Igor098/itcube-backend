import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsToGroups1750447473933 implements MigrationInterface {
    name = 'AddColumnsToGroups1750447473933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d"`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "program_id" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "idx_group_program_id" ON "groups" ("program_id") `);
        await queryRunner.query(`CREATE INDEX "idx_group_school_year_id" ON "groups" ("school_year_id") `);
        await queryRunner.query(`CREATE INDEX "idx_group_program" ON "groups" ("program_id") `);
        await queryRunner.query(`CREATE INDEX "idx_group_school_year" ON "groups" ("school_year_id") `);
        await queryRunner.query(`CREATE INDEX "idx_group_teacher" ON "groups" ("teacher_id") `);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d"`);
        await queryRunner.query(`DROP INDEX "public"."idx_group_teacher"`);
        await queryRunner.query(`DROP INDEX "public"."idx_group_school_year"`);
        await queryRunner.query(`DROP INDEX "public"."idx_group_program"`);
        await queryRunner.query(`DROP INDEX "public"."idx_group_school_year_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_group_program_id"`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "program_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
