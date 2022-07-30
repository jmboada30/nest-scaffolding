import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfig } from './configurations/env-config';
import { enviroments } from './configurations/enviroments';
import { JoiValidationSchema } from './configurations/joi-validation';

import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [EnvConfig],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),

    ConfigModule.forRoot(),

    DatabaseModule,

    AuthModule,
  ],
})
export class AppModule {}
