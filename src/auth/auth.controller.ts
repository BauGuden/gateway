import { Controller, Get, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { NATS_SERVICES } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { User } from 'src/decorators/user.decorator';


@Controller('auth')
export class AuthController {

  constructor(@Inject(NATS_SERVICES) private readonly client: ClientProxy) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register', registerUserDto).
      pipe(
        catchError(err => {
          throw new RpcException(err);
        })
      );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login', loginUserDto).
      pipe(
        catchError(err => {
          throw new RpcException(err);
        })
      );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifying(@User() user: { id: string, email: string, name: string }) {
    return { user };
  }
}
