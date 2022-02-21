export interface IRepositoryCriar<TDados, TModelDocumento> {
  criar(dados: TDados): Promise<TModelDocumento>;
}

export interface IRepositoryEditar<T> {
  editar(id: string, dados: Partial<T>): Promise<void>;
}

export interface IRepositoryDetalhar<T> {
  detalhar(id: string): Promise<T>;
}

export interface IRepositoryExcluir {
  excluir(id: string): Promise<void>;
}

export interface IRepositoryListar<TFiltros, TModel> {
  listar(filtros?: TFiltros): Promise<TModel[]>;
}

export interface IRepositoryContar<T> {
  contarPorFiltros(filtros: T): Promise<number>;
}
