import { Payer } from "./payer";

export class PixPaymentResponse {
    id: string;
    status: string;
    detail: string;
    qrCodeBase64: string;
    qrCode: string;
}