import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, AuthTokenDto, RegisterDto } from './dto';
import { TypeOrmClassSerializerInterceptor } from 'src/infra/serializers/typeorm.serializer';
import { User } from '../user/user.entity';
import { PasswordMatchValidationPipe } from './pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TypeOrmClassSerializerInterceptor(User)
  @Post('register')
  @UsePipes(new PasswordMatchValidationPipe())
  @ApiResponse({
    status: 201,
    type: User,
  })
  @ApiBody({
    description: 'Request to register admin account',
    type: RegisterDto,
  })
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    const { email, password } = registerDto;
    return this.authService.register(email, password);
  }

  @TypeOrmClassSerializerInterceptor(AuthTokenDto)
  @Post('login')
  @ApiResponse({
    status: 200,
    type: AuthTokenDto,
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        timestamp: '2022-05-11T08:36:24.542Z',
        path: '/api/auth/login',
      },
    },
  })
  @ApiBody({
    description: 'Login request',
    type: LoginDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthTokenDto> {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }
}
