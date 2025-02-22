/* eslint-disable sonarjs/no-duplicate-string */
import request from 'supertest';
import { DataSource } from 'typeorm';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import LojaTypeOrm from '../../src/loja/infra/data/typeorm/entities/loja-typeorm.entity';
import { LojaTypeOrmRepository } from '../../src/loja/infra/data/typeorm/repositories/loja-typeorm.repository';
import appSetup from '../utils/app-setup';

let id: number;

describe('[GET] /api/v1/lojas/:id', () => {
  let app: INestApplication;
  let module: TestingModule;
  let dataSource: DataSource;

  beforeAll(async () => {
    const { moduleFixture, nestApplication } = await appSetup();
    app = nestApplication;
    module = moduleFixture;
    dataSource = moduleFixture.get<DataSource>(DataSource);

    const output = await dataSource
      .createQueryBuilder()
      .insert()
      .into(LojaTypeOrm)
      .values({
        descricao: 'Some description',
      })
      .execute();

    id = output.raw[0].id;
  });

  afterEach(async () => {
    await dataSource.createQueryBuilder().delete().from(LojaTypeOrm).execute();
  });

  it('deve retornar 200 quando a chamada for bem sucedida', async () => {
    const response = await request(app.getHttpServer())
      .get(`/lojas/${id}`)
      .set('Content-Type', 'application/json')
      .send();

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toStrictEqual({
      id,
      descricao: 'Some description',
    });
  });

  it('deve retornar 404 quando o id nao for encontrado', async () => {
    const response = await request(app.getHttpServer())
      .get(`/lojas/0`)
      .set('Content-Type', 'application/json')
      .send({
        descricao: 'New description',
      });

    expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
  });

  it('deve retornar 422 quando o id nao for encontrado', async () => {
    const repository = module.get<LojaTypeOrmRepository>(LojaTypeOrmRepository);
    jest.spyOn(repository, 'findById').mockResolvedValueOnce({
      id: 0,
      descricao: 'Some description',
    });

    const response = await request(app.getHttpServer())
      .get(`/lojas/${id}`)
      .set('Content-Type', 'application/json')
      .send();

    expect(response.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  it('deve retornar 500 quando ocorrer um erro inesperado na busca do recurso', async () => {
    const repository = module.get<LojaTypeOrmRepository>(LojaTypeOrmRepository);
    jest.spyOn(repository, 'findById').mockRejectedValueOnce(new Error('Some message'));

    const response = await request(app.getHttpServer())
      .get(`/lojas/${id}`)
      .set('Content-Type', 'application/json')
      .send({
        descricao: 'New description',
      });

    expect(response.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
