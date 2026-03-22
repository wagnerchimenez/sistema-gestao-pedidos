import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FiltroExcecaoHttp } from './nucleo/filtros/excecao-http.filtro';

async function inicializar() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new FiltroExcecaoHttp());

  const configuracaoSwagger = new DocumentBuilder()
    .setTitle('Sistema de Gestão de Pedidos')
    .setDescription('API REST para gerenciamento de pedidos com DDD e Arquitetura Hexagonal')
    .setVersion('1.0')
    .addTag('pedidos')
    .addTag('relatorios')
    .addTag('dashboard')
    .build();

  const documentoSwagger = SwaggerModule.createDocument(app, configuracaoSwagger);
  SwaggerModule.setup('api', app, documentoSwagger);

  const porta = process.env.PORT || 3001;
  await app.listen(porta);

  console.log(`🚀 Aplicação rodando em: http://localhost:${porta}`);
  console.log(`📚 Swagger disponível em: http://localhost:${porta}/api`);
}

inicializar();
