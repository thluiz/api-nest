import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePeople1582637721606 implements MigrationInterface {
    name = 'CreatePeople1582637721606'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "personId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "people" ("id" SERIAL NOT NULL, "name" character varying(300) NOT NULL, "admission_date" TIMESTAMP, "kf_name" character varying(20), "kf_name_transcript" character varying(50), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ddd0d20e45dbd0d1536dc082039" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ddd0d20e45dbd0d1536dc082039"`, undefined);
        await queryRunner.query(`DROP TABLE "people"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
