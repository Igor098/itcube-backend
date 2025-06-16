import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeOptions1750105070631 implements MigrationInterface {
    name = 'AddCascadeOptions1750105070631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_sessions" DROP CONSTRAINT "FK_53c3b7e8765dc51447ae946a864"`);
        await queryRunner.query(`ALTER TABLE "schedule_sessions" DROP CONSTRAINT "FK_915b6726634111c14c44f3f060d"`);
        await queryRunner.query(`ALTER TABLE "attendance_records" DROP CONSTRAINT "FK_dbace05c012526710663f8d8911"`);
        await queryRunner.query(`ALTER TABLE "attendance_records" DROP CONSTRAINT "FK_c51be2c1149e22de76b17626cb7"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_86ac11b05c01e9981dd4e4ba39e"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_feed652f0ab91317902b36ec601"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_e9703f1aa2b5ae1000816cf385d"`);
        await queryRunner.query(`ALTER TABLE "teacher_details" DROP CONSTRAINT "FK_1e8cedeecbd08bfebc5caf0de53"`);
        await queryRunner.query(`ALTER TABLE "schedule_sessions" ADD CONSTRAINT "FK_53c3b7e8765dc51447ae946a864" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_sessions" ADD CONSTRAINT "FK_915b6726634111c14c44f3f060d" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance_records" ADD CONSTRAINT "FK_dbace05c012526710663f8d8911" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance_records" ADD CONSTRAINT "FK_c51be2c1149e22de76b17626cb7" FOREIGN KEY ("session_id") REFERENCES "schedule_sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_86ac11b05c01e9981dd4e4ba39e" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_feed652f0ab91317902b36ec601" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_e9703f1aa2b5ae1000816cf385d" FOREIGN KEY ("teacher_id") REFERENCES "teacher_details"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_details" ADD CONSTRAINT "FK_1e8cedeecbd08bfebc5caf0de53" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_details" DROP CONSTRAINT "FK_1e8cedeecbd08bfebc5caf0de53"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_e9703f1aa2b5ae1000816cf385d"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_feed652f0ab91317902b36ec601"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_86ac11b05c01e9981dd4e4ba39e"`);
        await queryRunner.query(`ALTER TABLE "attendance_records" DROP CONSTRAINT "FK_c51be2c1149e22de76b17626cb7"`);
        await queryRunner.query(`ALTER TABLE "attendance_records" DROP CONSTRAINT "FK_dbace05c012526710663f8d8911"`);
        await queryRunner.query(`ALTER TABLE "schedule_sessions" DROP CONSTRAINT "FK_915b6726634111c14c44f3f060d"`);
        await queryRunner.query(`ALTER TABLE "schedule_sessions" DROP CONSTRAINT "FK_53c3b7e8765dc51447ae946a864"`);
        await queryRunner.query(`ALTER TABLE "teacher_details" ADD CONSTRAINT "FK_1e8cedeecbd08bfebc5caf0de53" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_e9703f1aa2b5ae1000816cf385d" FOREIGN KEY ("teacher_id") REFERENCES "teacher_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_feed652f0ab91317902b36ec601" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_86ac11b05c01e9981dd4e4ba39e" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance_records" ADD CONSTRAINT "FK_c51be2c1149e22de76b17626cb7" FOREIGN KEY ("session_id") REFERENCES "schedule_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance_records" ADD CONSTRAINT "FK_dbace05c012526710663f8d8911" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_sessions" ADD CONSTRAINT "FK_915b6726634111c14c44f3f060d" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_sessions" ADD CONSTRAINT "FK_53c3b7e8765dc51447ae946a864" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
