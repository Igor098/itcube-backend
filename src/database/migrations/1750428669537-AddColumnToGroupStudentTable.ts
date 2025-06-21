import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToGroupStudentTable1750428669537 implements MigrationInterface {
    name = 'AddColumnToGroupStudentTable1750428669537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."group_students_status_enum" AS ENUM('обучается', 'закончил обучение', 'отчислен')`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD "status" "public"."group_students_status_enum" NOT NULL DEFAULT 'обучается'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_students" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."group_students_status_enum"`);
    }

}
