import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiAuth } from './decorators/api.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';


@ApiAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiResponse({
    status: 201,
    example: {
      userEmail: "martin@gmail.com",
      userPassword: "71bsi1972",
    } as User
  })
  signup(@Body() createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto)
  }

  @Post("login")
  @ApiResponse({
    status: 201,
    example: {
      userEmail: "martin@gmail.com",
      userPassword: "71bsi1972",
    } as User
  })
  login(@Body() loginUserDto :LoginUserDto){
    return this.authService.loginUser(loginUserDto)
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}
