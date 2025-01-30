import { Injectable, BadRequestException, HttpException, HttpStatus  } from "@nestjs/common";
import axios from "axios";
import * as qs from "qs";

@Injectable()
export class LoginService {
  async consultarLogin(username: string, password: string): Promise<any> {
    try{
        const url = 'https://siga.utem.cl/servicios/autenticacion/login/';

        const data = qs.stringify({
            username: username,
            password: password,
        });
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "siga.utem.cl",
            "Cookie": "SIGA=siga; Path=/",
            "User-Agent": "App/MiUTEM 3.0.0",
        };
        const response = await axios.post(url, data, {headers});

        const apiResponse = response.data;

        const userData = {
            status: apiResponse.status_code,
            token: apiResponse.response.token,
            rut: apiResponse.response.datos_persona.rut,
            nombre_completo: apiResponse.response.datos_persona.nombre_completo,
            correo_personal: apiResponse.response.datos_persona.correo_personal,
            correo_utem: apiResponse.response.datos_persona.correo_utem,
            foto: apiResponse.response.datos_persona.foto,
            perfiles: apiResponse.response.datos_persona.perfiles,
        };
        
        return userData;
    }catch(error) {
        if(error.response){
            throw new HttpException(
                {
                    status: error.response.status,
                    message: error.response.data.message || "Error en autenticación",
                },
                error.response.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        throw new BadRequestException("No se pudo conectar con la API externa");
    }
  }
}