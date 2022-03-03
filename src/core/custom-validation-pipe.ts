import { HttpException, HttpStatus, UnprocessableEntityException, ValidationError, ValidationPipe } from "@nestjs/common";
import { flatMap } from 'lodash';

interface MensagemErroValidacao {
    mensagem: string;
    campo: string;
}

export function tratamentoErrosValidacao(errors: ValidationError[]): MensagemErroValidacao[] {
    const valoresTratadosAninhados = errors.map(erro => {
        const mensagens = Object.values(erro.constraints);
        return mensagens.map(mensagem => ({
            mensagem, campo: erro.property
        }));
    });

    return flatMap<MensagemErroValidacao>(valoresTratadosAninhados);
}

export class CustomValidationPipe extends ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            exceptionFactory: (errors) => {
                const errosTratados = tratamentoErrosValidacao(errors)
                throw new UnprocessableEntityException(errosTratados);
            }
        })
    }
}