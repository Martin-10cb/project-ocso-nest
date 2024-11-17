import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  Query,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiAuth } from "./decorators/api.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { Response } from "express";
import { TOKEN_NAME } from "./constants/jwt.constants";
import { Cookies } from "./decorators/cookies.decorator";

@ApiAuth()
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/:id")
  @ApiResponse({
    status: 201,
    example: {
      userEmail: "martin@gmail.com",
      userPassword: "71bsi1972",
    } as User,
  })
  registerManager(
    @Query("role") role: string,
    @Body() createUserDto: CreateUserDto,
    @Param("id") id: string
  ) {
    if (role === "manager") {
      return this.authService.registerManager(id, createUserDto);
    } else if (role === "employee") {
      return this.authService.registerEmployee(id, createUserDto);
    }
    throw new BadRequestException("Rol invalido");
  }
  @Post("login")
  @ApiResponse({
    status: 201,
    example: {
      userEmail: "martin@gmail.com",
      userPassword: "71bsi1972",
    } as User,
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @Cookies() cookies: any
  ) {
    const token = await this.authService.loginUser(loginUserDto);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      // expires: expireDate,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return;
  }

  @Patch("/:email")
  updateUser(
    @Param("email") userEmail: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
