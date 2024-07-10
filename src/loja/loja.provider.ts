/* eslint-disable @typescript-eslint/no-namespace */

import { CreateLojaUseCase } from './applications/use-cases/create-loja.use-case';
import { DeleteLojaUseCase } from './applications/use-cases/delete-loja.use-case';
import { FindLojaByIdUseCase } from './applications/use-cases/find-loja-by-id.use-case';
import { UpdateLojaUseCase } from './applications/use-cases/update-loja.use-case';
import {
  IDeletableLoja,
  IFindableLojaById,
  ISavableLoja,
  IUpdatableLoja,
} from './domain/repositories/loja.repository.interface';
import { LojaTypeOrmRepository } from './infra/data/typeorm/repositories/loja-typeorm.repository';

export namespace LOJA {
  export namespace APPLICATIONS {
    export const CRATE_LOJA_USE_CASE = {
      provide: CreateLojaUseCase,
      useFactory: (repository: ISavableLoja) => new CreateLojaUseCase(repository),
      inject: [LojaTypeOrmRepository],
    };

    export const UPDATE_LOJA_USE_CASE = {
      provide: UpdateLojaUseCase,
      useFactory: (repository: IFindableLojaById & IUpdatableLoja) =>
        new UpdateLojaUseCase(repository),
      inject: [LojaTypeOrmRepository],
    };

    export const FIND_LOJA_BY_ID_USE_CASE = {
      provide: FindLojaByIdUseCase,
      useFactory: (repository: IFindableLojaById) => new FindLojaByIdUseCase(repository),
      inject: [LojaTypeOrmRepository],
    };

    export const DELETE_LOJA_USE_CASE = {
      provide: DeleteLojaUseCase,
      useFactory: (repository: IFindableLojaById & IDeletableLoja) =>
        new DeleteLojaUseCase(repository),
      inject: [LojaTypeOrmRepository],
    };
  }
}
