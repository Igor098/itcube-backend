import { MigrationInterface, QueryRunner } from "typeorm";

export class EditGroupStudentTable1750427067306 implements MigrationInterface {
    name = 'EditGroupStudentTable1750427067306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_students" ADD "is_cerificate_issued" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD "certificate_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_students" DROP COLUMN "certificate_number"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP COLUMN "is_cerificate_issued"`);
    }

}
