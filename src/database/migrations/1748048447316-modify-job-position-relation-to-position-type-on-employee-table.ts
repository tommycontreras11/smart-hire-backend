import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyJobPositionRelationToPositionTypeOnEmployeeTable1748048447316 implements MigrationInterface {
    name = 'ModifyJobPositionRelationToPositionTypeOnEmployeeTable1748048447316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_caf14aed7ed1a41280f9e903a10\``);
        await queryRunner.query(`ALTER TABLE \`employees\` CHANGE \`job_position_id\` \`position_type_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_415754b79d20342a847cbbcebda\` FOREIGN KEY (\`position_type_id\`) REFERENCES \`position_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_415754b79d20342a847cbbcebda\``);
        await queryRunner.query(`ALTER TABLE \`employees\` CHANGE \`position_type_id\` \`job_position_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_caf14aed7ed1a41280f9e903a10\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
