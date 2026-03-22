import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class FiltroExcecaoHttp implements ExceptionFilter {
    private readonly logger;
    catch(excecao: unknown, host: ArgumentsHost): void;
}
