import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToPrograms1750492177814 implements MigrationInterface {
    name = 'AddAgeToPrograms1750492177814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" ADD "min_age" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "max_age" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "max_age"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "min_age"`);
    }

}
