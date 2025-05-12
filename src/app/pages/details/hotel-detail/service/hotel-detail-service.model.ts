export class Hotel {
  id?: number;                     // optional for new entries
  title: string;
  descrip: string;
  price: number;
  insertDatetime?: Date;          // optional for creation, auto-handled on backend
  isActive?: boolean;             // optional if backend gives default
  weight?: number;                // optional or string if needed

  filePath?: string;              // main image path
  imagePaths?: string[];          // gallery image paths
}


export class TranslateHotel {
  TITLE: string;
  DESCRIP_PLACE: string;
}
