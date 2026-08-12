import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

// Wraps ioredis so the rest of the app never touches connection details.
// Used for: OTP codes (short TTL), refresh-token allow-list, and as the
// storage backend for rate limiting.
@Injectable()
export class RedisService implements OnModuleDestroy {
  public readonly client: Redis;

  constructor(private readonly config: ConfigService) {
    this.client = new Redis(this.config.get<string>('redis.url')!);
  }

  async setWithTtl(key: string, value: string, ttlSeconds: number): Promise<void> {
    await this.client.set(key, value, 'EX', ttlSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async incr(key: string, ttlSeconds?: number): Promise<number> {
    const count = await this.client.incr(key);
    if (count === 1 && ttlSeconds) {
      await this.client.expire(key, ttlSeconds);
    }
    return count;
  }

  onModuleDestroy() {
    this.client.disconnect();
  }
}
