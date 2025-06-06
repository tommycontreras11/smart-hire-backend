import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepartmentRelationToPositionTypeTable1749219531987 implements MigrationInterface {
    name = 'AddDepartmentRelationToPositionTypeTable1749219531987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`position_types\` ADD \`department_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`position_types\` ADD CONSTRAINT \`FK_7c7b44f346dad4e3ac2a459da6f\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`position_types\` DROP FOREIGN KEY \`FK_7c7b44f346dad4e3ac2a459da6f\``);
        await queryRunner.query(`ALTER TABLE \`position_types\` DROP COLUMN \`department_id\``);
    }

}
