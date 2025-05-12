// transport-service.model.ts

export interface Transport {
  id: number;
  manufacturer?: string;
  model?: string;
  category?: string;
  price: number;
  year: number;
  fuel?: string;
  location?: string;
  rentalType?: string;
  boxType?: string;
  isActive?: boolean;
  weight?: string;
  dateTime?: string | Date; // ✅ შეცვლა აქ
  transportDetails?: TransportDetail[];
}


export interface TransportDetail {
  id: number;
  transportId: number;
  note?: string;
  mobile?: string;
  raiting: number;
  priority: number;
}

export interface Image {
  id: number;
  productTypeId: number;
  isDelete: boolean;
  filePath: string;
  uploadedAt: string;
  url: string;
  objectKey: number;
  productType?: ProductType;
}

export interface ProductType {
  id: number;
  name: string;
}

export interface TranslateTransp {
  [key: string]: string;
}
