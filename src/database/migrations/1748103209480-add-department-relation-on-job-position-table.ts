import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepartmentRelationOnJobPositionTable1748103209480 implements MigrationInterface {
    name = 'AddDepartmentRelationOnJobPositionTable1748103209480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_77e41638b0ac31cafab778c0a1c\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_77e41638b0ac31cafab778c0a1c\``);
    }

}
