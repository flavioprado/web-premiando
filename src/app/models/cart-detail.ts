import { ResumoCliente } from "./resumo-cliente";
import { ResumoCompra } from "./resumo-compra";
import { ResumoPagamento } from "./resumo-pagamento";

export class CartDetail {
    id: number;
    resumoCompra: ResumoCompra;
    resumoPagamento: ResumoPagamento;
}