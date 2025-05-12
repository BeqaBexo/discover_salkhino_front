export interface Maran {
  id?: number; // optional when creating
  grapeVariety: string;
  factoryName: string;
  phoneNumber: string;
  location: string;
  harvestYear: number;
  weightKg: number;
  pricePerKg: number;
  description?: string;
  filePath?: string; // optional default image
  createdAt?: Date;
}

export interface MaranDto {
  id: number;
  grapeVariety: string;
  factoryName: string;
  phoneNumber: string;
  location: string;
  harvestYear: number;
  weightKg: number;
  pricePerKg: number;
  description?: string;
  filePath?: string;
}
