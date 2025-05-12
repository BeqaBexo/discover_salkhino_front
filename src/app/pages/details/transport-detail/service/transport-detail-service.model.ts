export class Transport {
  id: number = 0;
  manufacturer?: string;
  model?: string;
  category?: string;
  price: number = 0;
  year: number = 0;
  fuel?: string;
  location?: string;
  rentalType?: string;
  boxType?: string;
  isActive?: boolean;
  weight: string;
  dateTime?: Date;

  filePath?: string;
  imageUrl?: string;
  imagePaths?: string;
  
}
