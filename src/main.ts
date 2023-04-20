import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getRepository } from 'typeorm';
import { Session } from './utils/typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionRepository = getRepository(Session);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.set('trust proxy', 'loopback');
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'SESSION_ID',
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
