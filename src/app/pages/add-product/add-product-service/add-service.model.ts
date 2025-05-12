export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    productTypeId: number; 
    productType: ProductType; 
    productFields: ProductField[] = []; 
    createUser: string;
    createDate: Date = new Date(); 
  }


  export class ProductField {
    id: number;
    productTypeId: number; 
    label: string;
    controlName: string;
    type: string; 
    validators: string; 
  }


  export class Forum {
    id: number = 0;
    title: string = '';
    region: string = '';
    summary: string = '';
    likes: number = 0;
    isExpanded: boolean = false;
    showComments: boolean = false;
    comments?: ForumComment[] = [];
  }
  
  export class ForumComment {
    forumId: number = 0;
    user: string = '';
    text: string = '';
    isDeleted: boolean = false;
  }


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
    TransportDetails?: TransportDetail[];
  }

  
  export class TransportDetail {
    Id: number = 0;
    TransportId: number = 0; 
    Transport?: Transport; 
    Note?: string;
    Mobile?: string;
    Rating: number = 0; 
    Priority: number = 0;
  }

  
  export class Image {
    id: number = 0;
    objectKey: number = 0;
    productTypeId: number = 0; 
    productType?: ProductType; 
  
    url?: string; // URL for the image
    isDelete: boolean = false; // Logical delete flag
    filePath?: string; // File path for the image
    uploadedAt: Date = new Date(); // Defaults to the current date and time
  }
  
  export class ProductType {
    Id: number = 0;
    NameGeo?: string;
    Name?: string;
    Label?: string;
  }
  


  export class TranslateTransp {
    FUEL: string
    CHOOSE_TYPE: string
    GASOLINE: string
    DIESEL: string
    ELECTRIC: string
    RENTAL_TYPE: string;
    WITH_DRIVER: string;
    WITHOUT_DRIVER: string;
    PRIORITY_TYPE: string;
    CHOOSE_PRIORITY: string;
    VIP: string;
    VIPPLUS: string;
    STANDART: string
    TRANSPORT_CATEGORY: string;
    CHOOSE_CATEGORY: string;
    SEDAN: string;
    JEEP: string;
    COUPE: string;
    REGION: string;
    CHOOSE_REGION: string;
    MARTVILI: string;
    SALKHINO: string;
  };
  

  export class Hotel {
  id: number = 0;
  title: string = '';
  descrip: string = '';
  price: number = 0;
  isActive: boolean = true;
  weight: string = '';
  dateTime?: Date;
  imageUrl?: string;
  imagePaths?: string[];
}

export class TranslateHotel {
  TITLE: string;
  DESCRIP_PLACE: string;
  PRICE: string;
  ISACTIVE: string;
  WEIGHT: string;
  CHOOSE_PRIORITY: string;
  VIP: string;
  VIPPLUS: string;
  STANDART: string;
}
