import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingUserIsAdmin1582684485883 implements MigrationInterface {
    name = 'AddingUserIsAdmin1582684485883'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "people" ADD "is_admin" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "is_admin"`, undefined);
    }

}
