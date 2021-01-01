import { DynamicModule, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({
  providers: [JwtService],
})
export class JwtModule {
  static forRoot(option?: Partial<{ global: boolean }>): DynamicModule {
    return {
      module: JwtModule,
      global: option?.global,
      exports: [JwtService],
      providers: [JwtService],
    };
  }
}
