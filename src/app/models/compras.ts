import { FormGroup } from "@angular/forms";

export class Compras {
  id: number;
  dataCompra: string;
  comprador: string;
  email: string;
  celular: string;
  idSorteio: number;
  nomeSorteio: string;
  cotas: string;
  cotasCard: string[];
  quantidade: number;
  total: string;
  status: number;
  descricaoStatus: string;
  nomeBanco: string;
  rifinha: boolean;
}
