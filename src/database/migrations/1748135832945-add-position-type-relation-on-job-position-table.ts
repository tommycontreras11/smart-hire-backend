import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPositionTypeRelationOnJobPositionTable1748135832945 implements MigrationInterface {
    name = 'AddPositionTypeRelationOnJobPositionTable1748135832945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`position_type_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_40bdb25bf3b339bcb0790b74ade\` FOREIGN KEY (\`position_type_id\`) REFERENCES \`position_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_40bdb25bf3b339bcb0790b74ade\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`position_type_id\``);
    }

}
