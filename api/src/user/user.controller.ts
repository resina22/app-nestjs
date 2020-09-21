import { Body, Controller, Get, HttpStatus, Post, Res, UsePipes } from '@nestjs/common'
import { Response } from 'express'

import { UserPipe } from './user.pipe'
import { User } from './user.interface'
import { UserService } from './user.service'
import { LogService } from '../log/log.service'
import { Log, LogType } from '../log/log.config'

import { JSONPlaceholderService } from '../jsonplaceholder/jsonplaceholder.service'

@Controller('usuario')
export class UserController {
  constructor(
    private log: LogService,
    private userService: UserService,
    private jsonPlaceholderService: JSONPlaceholderService,
  ) {}

  @Get()
  async listAll(
    @Res() res: Response,
  ) {
    this.userService.listAll().then(
      users => res.status(HttpStatus.OK).json(users)
    ).catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(false)
      this.log.register({
        level: LogType.ERROR, mensage: 'error function listall', payload: err
      } as Log)
    })
  }

  @UsePipes(new UserPipe())
  @Post()
  async createUser(
    @Body() body: User,
    @Res() res: Response,
  ) {
    await this.userService
      .create(body)
      .then(user => {
        res.status(HttpStatus.OK).json(user)
        this.log.register({
          level: LogType.SUCCESS, mensage: 'create user', payload: body
        } as Log)
      })
      .catch((err) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
        this.log.register({
          level: LogType.ERROR, mensage: 'create user', payload: body
        } as Log)
      })
  }

  @Get('baixar-dados')
  baixarDados(@Res() res: Response) {
    this.jsonPlaceholderService
      .baixarDados()
      .toPromise()
      .then((response) => {
        res.status(HttpStatus.OK).json(response.data || [])
        this.log.register({
          level: LogType.INFO, mensage: 'baixar dados', payload: response.data
        } as Log)
      })
      .catch((err) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
          "Erro ao buscar os dados"
        )
        this.log.register({
          level: LogType.ERROR, mensage: 'baixar dados', payload: err
        } as Log)
      })
  }

  @Post('salvar-dados')
  async salvarDados(@Res() res: Response) {
    await this.jsonPlaceholderService.salvarDados()
      .then((response) => {
        res.status(HttpStatus.CREATED).json(response)
        this.log.register({
          level: LogType.SUCCESS, mensage: 'salvar dados', payload: response
        } as Log)
      }).catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('erro ao salvar os dados')
        this.log.register({
          level: LogType.ERROR, mensage: 'salvar dados', payload: err
        } as Log)
      })
  }
}
