import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduct1686675825685 implements MigrationInterface {
  name = 'CreateProduct1686675825685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "price" numeric(6, 2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"),
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "product_to_category" (
                "productId" integer NOT NULL,
                "categoryId" integer NOT NULL,
                CONSTRAINT "PK_ead833542a5bf513c93bc12b016" PRIMARY KEY ("productId", "categoryId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_c4ec20a1cb494c9c3e34c8da10" ON "product_to_category" ("productId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_70eb26cea4105a27ce856dca20" ON "product_to_category" ("categoryId")
        `);
    await queryRunner.query(`
            ALTER TABLE "product_to_category"
            ADD CONSTRAINT "FK_c4ec20a1cb494c9c3e34c8da105" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "product_to_category"
            ADD CONSTRAINT "FK_70eb26cea4105a27ce856dca20d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product_to_category" DROP CONSTRAINT "FK_70eb26cea4105a27ce856dca20d"
        `);
    await queryRunner.query(`
            ALTER TABLE "product_to_category" DROP CONSTRAINT "FK_c4ec20a1cb494c9c3e34c8da105"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_70eb26cea4105a27ce856dca20"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_c4ec20a1cb494c9c3e34c8da10"
        `);
    await queryRunner.query(`
            DROP TABLE "product_to_category"
        `);
    await queryRunner.query(`
            DROP TABLE "product"
        `);
  }
}
