import {MigrationInterface, QueryRunner} from "typeorm";

export class AditionalPeopleColumns1582666376862 implements MigrationInterface {
    name = 'AditionalPeopleColumns1582666376862'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "people" ADD "google_photo" character varying(500)`, undefined);
        await queryRunner.query(`ALTER TABLE "people" ADD "is_operator" boolean NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "people" ADD "is_director" boolean NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "is_director"`, undefined);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "is_operator"`, undefined);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "google_photo"`, undefined);
    }

}
