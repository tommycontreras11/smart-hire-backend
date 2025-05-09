import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveEvaluationMethodIdPropertyOnCompetencyTable1746828950232 implements MigrationInterface {
    name = 'RemoveEvaluationMethodIdPropertyOnCompetencyTable1746828950232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`competencies\` DROP COLUMN \`evaluation_method_id\``);
        await queryRunner.query(`ALTER TABLE \`training\` CHANGE \`level\` \`level\` enum ('BACHELOR''S DEGREE', 'POSTGRADUATE', 'MASTER’S DEGREE', 'DOCTORATE', 'TECHNICAL', 'MANAGEMENT') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`training\` CHANGE \`level\` \`level\` enum ('BACHELOR''''S DEGREE', 'POSTGRADUATE', 'MASTER’S DEGREE', 'DOCTORATE', 'TECHNICAL', 'MANAGEMENT') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`competencies\` ADD \`evaluation_method_id\` int NOT NULL`);
    }

}
