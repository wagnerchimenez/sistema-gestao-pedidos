import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import Redis from 'ioredis';

/**
 * Indicador de saúde do Redis.
 * Mantém uma única conexão persistente para evitar overhead de reconexão
 * a cada chamada do health check.
 */
@Injectable()
export class RedisIndicador
  extends HealthIndicator
  implements OnModuleInit, OnModuleDestroy
{
  private cliente: Redis;

  constructor(private readonly configServico: ConfigService) {
    super();
  }

  onModuleInit() {
    this.cliente = new Redis({
      host: this.configServico.get<string>('REDIS_HOST', 'localhost'),
      port: this.configServico.get<number>('REDIS_PORT', 6379),
      lazyConnect: false,
      // Não propaga erros de conexão como exceção não tratada
      enableOfflineQueue: false,
    });
  }

  async onModuleDestroy() {
    await this.cliente.quit().catch(() => {
      // ignora erros ao encerrar durante shutdown
    });
  }

  async verificar(chave: string): Promise<HealthIndicatorResult> {
    try {
      const resposta = await this.cliente.ping();
      const saudavel = resposta === 'PONG';

      const resultado = this.getStatus(chave, saudavel, {
        host: this.configServico.get('REDIS_HOST', 'localhost'),
        port: this.configServico.get('REDIS_PORT', 6379),
      });

      if (!saudavel) {
        throw new HealthCheckError(
          `Redis respondeu incorretamente: ${resposta}`,
          resultado,
        );
      }

      return resultado;
    } catch (erro) {
      if (erro instanceof HealthCheckError) throw erro;

      const resultado = this.getStatus(chave, false, {
        mensagem: (erro as Error).message,
      });
      throw new HealthCheckError('Redis indisponível', resultado);
    }
  }
}
