export interface Depoimento {
  id: string;
  nomeAluno: string;
  texto: string;
  resultado?: string;  // ex: "Perdeu 12kg em 3 meses"
  avatarUrl?: string;  // Foto do aluno (opcional)
  tempoComoAluno?: string; // ex: "aluno ha 4 meses"
}

export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  renovavel: boolean;
  acompanhamento: boolean;
  preco: string;
  cta: string;
  destaque?: boolean;
  beneficios: string[];
}

export type VarianteBotao = 'primary' | 'secondary' | 'ghost';
export type TamanhoBotao = 'sm' | 'md' | 'lg';
