interface IMensagem {
  mensagem: string;
  codigo: string;
}

// Sucesso
export const MSGS001: IMensagem = {
  mensagem: 'Registro salvo com sucesso.',
  codigo: '001',
};

// Alerta
export const MSGA001: IMensagem = {
  mensagem: 'Registro alterado com sucesso.',
  codigo: '001',
};

// Erro
export const MSGE001: IMensagem = {
  mensagem: 'Erro ao salvar registro',
  codigo: '001',
};
