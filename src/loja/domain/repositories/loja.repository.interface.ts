import { SearchInputLojaDTO } from '../../applications/dtos/search-loja.dto';
import { LojaDTO } from '../dtos/loja.dto';
import { Loja } from '../entities/loja.entity';

export interface ISavableLoja {
  save(descricao: Omit<LojaDTO, 'id'>): Promise<LojaDTO>;
}

export interface IFindableLojaById {
  findById(id: number): Promise<LojaDTO | null>;
}

export interface IFindableAll {
  findAll(): Promise<LojaDTO[]>;
}

export interface IUpdatableLoja {
  update(loja: Loja): Promise<void>;
}

export interface IDeletableLoja {
  delete(id: number): Promise<void>;
}

export interface ISearchableLoja {
  search(dot: SearchInputLojaDTO): Promise<{
    rows: LojaDTO[];
    total: number;
  }>;
}
