import { ValidationError } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Classe } from '../index';

export function converterObjetoEmClasse<T>(
  classe: ClassConstructor<T>,
  objeto: unknown,
): T {
  return plainToClass(classe, objeto, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
  });
}

function prepararObjetoValidacao<T>(
  classe: Classe<T>,
  objetoEntradaSimples: unknown,
): T {
  const objeto = new classe();
  Object.assign(objeto, objetoEntradaSimples);

  return objeto;
}

export async function validarObjeto<T extends object>(
  classe: Classe<T>,
  objetoEntradaSimples,
): Promise<ValidationError[]> {
  const objeto = prepararObjetoValidacao(classe, objetoEntradaSimples);

  return validate(objeto, {
    whitelist: true,
  });
}

export async function sanitizarObjeto<T extends object>(
  classe: Classe<T>,
  objetoEntradaSimples,
): Promise<T> {
  const objeto = prepararObjetoValidacao(classe, objetoEntradaSimples);

  await validate(objeto, {
    whitelist: true,
  });

  return objeto;
}
