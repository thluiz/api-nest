import {MigrationInterface, QueryRunner} from "typeorm";

export class Adding1582671816608 implements MigrationInterface {
    name = 'Adding1582671816608'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`, undefined);
        await queryRunner.query(`ALTER TABLE "people" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "uuid"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "uuid"`, undefined);
    }

}
