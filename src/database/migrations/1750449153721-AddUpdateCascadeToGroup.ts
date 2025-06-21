import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUpdateCascadeToGroup1750449153721 implements MigrationInterface {
    name = 'AddUpdateCascadeToGroup1750449153721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d"`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d"`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_987149d2f3fd0b72140bd5c713d" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
