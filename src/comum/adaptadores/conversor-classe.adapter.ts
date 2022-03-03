import { ClassConstructor, plainToClass } from 'class-transformer';

export function converterObjetoEmClasse<T>(
  classe: ClassConstructor<T>,
  objeto: unknown,
): T {
  return plainToClass(classe, objeto, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
  });
}
