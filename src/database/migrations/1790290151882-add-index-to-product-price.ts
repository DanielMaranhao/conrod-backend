import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexToProductPrice1790290151882 implements MigrationInterface {
    name = 'AddIndexToProductPrice1790290151882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_b3234b06e4d16f52b384dfa4dd" ON "product" ("price")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b3234b06e4d16f52b384dfa4dd"
        `);
    }

}
