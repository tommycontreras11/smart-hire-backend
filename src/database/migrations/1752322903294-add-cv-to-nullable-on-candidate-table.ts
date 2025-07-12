import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCvToNullableOnCandidateTable1752322903294 implements MigrationInterface {
    name = 'AddCvToNullableOnCandidateTable1752322903294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidates\` CHANGE \`curriculum\` \`curriculum\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidates\` CHANGE \`curriculum\` \`curriculum\` varchar(255) NOT NULL`);
    }

}
