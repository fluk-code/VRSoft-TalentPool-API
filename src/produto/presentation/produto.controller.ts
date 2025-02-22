import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { AddPrecoProdutoDTO } from '../application/dtos/add-preco.dto';
import { CreateProdutoDTO } from '../application/dtos/create-produto.dto';
import {
  SearchInputProdutoDTO,
  SearchProdutoOutputDTO,
} from '../application/dtos/search-produto.dto';
import { UpdateProdutoDTO } from '../application/dtos/update-produto.dto';
import {
  AddPrecoProdutoUseCase,
  InputProps as InputAddPrecoProduto,
} from '../application/use-cases/add-preco-produto.use-case';
import { CreateProdutoUseCase } from '../application/use-cases/create-produto.use-case';
import { DeleteProdutoUseCase } from '../application/use-cases/delete-produto.use-case';
import { FindProdutoByIdUseCase } from '../application/use-cases/find-produto-by-id.use-case';
import {
  InputProps as InputRemovePrecoProduto,
  RemovePrecoProdutoUseCase,
} from '../application/use-cases/remove-preco-produto.use-case';
import { SearchProdutoUseCase } from '../application/use-cases/search-produto.use-case';
import {
  InputProps as InputUpdateProduto,
  UpdateProdutoUseCase,
} from '../application/use-cases/update-produto.use-case';
import { Produto } from '../domain/entities/produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(
    @Inject(CreateProdutoUseCase)
    private readonly createUseCase: IUseCase<CreateProdutoDTO, Produto>,

    @Inject(FindProdutoByIdUseCase)
    private readonly fndByIDUseCase: IUseCase<number, Produto>,

    @Inject(UpdateProdutoUseCase)
    private readonly updateUseCase: IUseCase<InputUpdateProduto, Produto>,

    @Inject(DeleteProdutoUseCase)
    private readonly deleteUseCase: IUseCase<number, void>,

    @Inject(SearchProdutoUseCase)
    private readonly searchUseCase: IUseCase<SearchInputProdutoDTO, SearchProdutoOutputDTO>,

    @Inject(AddPrecoProdutoUseCase)
    private readonly addPrecoUseCase: IUseCase<InputAddPrecoProduto, Produto>,

    @Inject(RemovePrecoProdutoUseCase)
    private readonly removePrecoUseCase: IUseCase<InputRemovePrecoProduto, Produto>
  ) {}

  @Post('/')
  async create(@Body() body: CreateProdutoDTO): Promise<Produto> {
    return this.createUseCase.execute(body);
  }

  @Get('/:id')
  async findByID(@Param('id') id: number): Promise<Produto> {
    return this.fndByIDUseCase.execute(id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateProdutoDTO): Promise<Produto> {
    return this.updateUseCase.execute({
      id,
      ...body,
    });
  }

  @Patch('/:id/add-preco')
  async addPreco(@Param('id') id: number, @Body() body: AddPrecoProdutoDTO): Promise<Produto> {
    return this.addPrecoUseCase.execute({
      id,
      ...body,
    });
  }

  @Patch('/:id/remove-preco')
  async removePreco(@Param('id') id: number, @Body('idLoja') idLoja: number): Promise<Produto> {
    return this.removePrecoUseCase.execute({
      id,
      idLoja,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.deleteUseCase.execute(id);
  }

  @Get('/')
  async search(@Query() queryParams: SearchInputProdutoDTO): Promise<SearchProdutoOutputDTO> {
    return this.searchUseCase.execute(queryParams);
  }
}
