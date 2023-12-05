import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAdmin1701741286309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "user"
                ("name", "email", "phone", "password", "role")
            VALUES
                ('admin', 'admin@mail.com', '955555555', '$2a$10$wD8NCyhfdIWhVY4BAL9pTOH/HIuEvb8Rv6ZcgdY3LH9P.rtu2LE3i', 'ADMIN')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "user"
            WHERE "email" = 'admin@mail.com'
        `);
  }
}
