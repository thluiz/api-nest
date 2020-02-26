import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePeopleLocations1582683924436 implements MigrationInterface {
    name = 'CreatePeopleLocations1582683924436'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "people_locations" ("id" SERIAL NOT NULL, "is_operator" boolean NOT NULL DEFAULT false, "is_director" boolean NOT NULL DEFAULT false, "locationId" integer, "personId" integer, CONSTRAINT "PK_3931e08b93c515776a3809b1797" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying(300) NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "people_locations" ADD CONSTRAINT "FK_2287d0a90df22aa8a77e8078484" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "people_locations" ADD CONSTRAINT "FK_1fae2745fac4b896abf03884fce" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "people_locations" DROP CONSTRAINT "FK_1fae2745fac4b896abf03884fce"`, undefined);
        await queryRunner.query(`ALTER TABLE "people_locations" DROP CONSTRAINT "FK_2287d0a90df22aa8a77e8078484"`, undefined);
        await queryRunner.query(`DROP TABLE "locations"`, undefined);
        await queryRunner.query(`DROP TABLE "people_locations"`, undefined);
    }

}
