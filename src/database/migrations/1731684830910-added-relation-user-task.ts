import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRelationUserTask1731684830910 implements MigrationInterface {
    name = 'AddedRelationUserTask1731684830910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_6ea2c1c13f01b7a383ebbeaebb0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_6ea2c1c13f01b7a383ebbeaebb0\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`user_id\``);
    }

}
