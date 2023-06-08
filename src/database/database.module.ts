import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (
        databaseConfiguration: ConfigType<typeof databaseConfig>,
      ) => ({
        type: 'postgres',
        url: databaseConfiguration.url,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
