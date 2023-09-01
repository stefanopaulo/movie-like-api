import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post()
  async authenticate(@Body() body: { secretToken: string }) {
    const isValid = body.secretToken === '967CwTv2';

    if (!isValid) {
      return { message: 'Token inválido' };
    }

    const token = this.jwtService.sign({ sub: 'user' });

    return { token };
  }
}
