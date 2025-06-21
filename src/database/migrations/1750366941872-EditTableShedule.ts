import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTableShedule1750366941872 implements MigrationInterface {
    name = 'EditTableShedule1750366941872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."schedule_sessions_status_enum" AS ENUM('запланировано', 'проведено', 'отменено')`);
        await queryRunner.query(`ALTER TABLE "schedule_sessions" ADD "status" "public"."schedule_sessions_status_enum" NOT NULL DEFAULT 'запланировано'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_sessions" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."schedule_sessions_status_enum"`);
    }

}
