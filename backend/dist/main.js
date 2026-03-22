"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const excecao_http_filtro_1 = require("./nucleo/filtros/excecao-http.filtro");
async function inicializar() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new excecao_http_filtro_1.FiltroExcecaoHttp());
    const configuracaoSwagger = new swagger_1.DocumentBuilder()
        .setTitle('Sistema de Gestão de Pedidos')
        .setDescription('API REST para gerenciamento de pedidos com DDD e Arquitetura Hexagonal')
        .setVersion('1.0')
        .addTag('pedidos')
        .addTag('relatorios')
        .addTag('dashboard')
        .build();
    const documentoSwagger = swagger_1.SwaggerModule.createDocument(app, configuracaoSwagger);
    swagger_1.SwaggerModule.setup('api', app, documentoSwagger);
    const porta = process.env.PORT || 3001;
    await app.listen(porta);
    console.log(`🚀 Aplicação rodando em: http://localhost:${porta}`);
    console.log(`📚 Swagger disponível em: http://localhost:${porta}/api`);
}
inicializar();
//# sourceMappingURL=main.js.map