import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
  constructor(private mensajesService: MensajesService) {}
  @Post()
  create(@Body() createMensajeDTO: CreateMensajeDto, @Res() response) {
    this.mensajesService
      .createMensaje(createMensajeDTO)
      .then((mensaje) => {
        response.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch((err) => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la creación del mensaje' });
      });
  }

  @Get()
  getAll(@Res() response) {
    return this.mensajesService
      .getAll()
      .then((mensajesList) => {
        response.status(HttpStatus.OK).json(mensajesList);
      })
      .catch((err) => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la obtención de los mensajes' });
      });
  }

  @Put(':id')
  update(
    @Body() updateMensajeDTO: CreateMensajeDto,
    @Res() response,
    @Param('id') idMensaje,
  ) {
    return this.mensajesService
      .updateMensaje(idMensaje, updateMensajeDTO)
      .then((mensaje) => {
        response.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch((err) => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la actualización del mensaje' });
      });
  }

  @Delete(':id')
  async delete(@Res() response, @Param('id') idMensaje) {
    return await this.mensajesService
      .deleteMensaje(idMensaje)
      .then((res) => {
        response.status(HttpStatus.OK).json(res);
      })
      .catch((err) => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la eliminación del mensaje' });
      });
  }
}
