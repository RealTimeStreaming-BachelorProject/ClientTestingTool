export interface Package {
  expectedDelivery: string;
  receiverAddress: string;
  receiverName: string;
  receiverEmail: string;
  senderAddress: string;
  senderName: string;
  weightKg: number;
  history: HistoryEvent[]
}
