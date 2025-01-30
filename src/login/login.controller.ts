import { Post, Controller, Body, BadRequestException } from "@nestjs/common";
import { LoginService } from "./login.service";


@Controller('login')
export class LoginController{
    constructor(
        private readonly LoginService: LoginService,
    ){}


@Post('consulta')
async getConsultaLogin(
    @Body() body: {username: string; password: string}
): Promise<any> {
    if(!body.username || !body.password){
        throw new BadRequestException('Username y password son obligatorios')
    }
    const response = await this.LoginService.consultarLogin(body.username, body.password);
    return {
        response,
    }
}
}