import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductField, Product, ProductType, Forum, ForumComment, Transport, TransportDetail, Image } from './add-service.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddService {
  constructor(private myhttp: HttpClient) {}

  // API URLs
  productTypeUrl: string = 'https://localhost:7237/api/ProductType';
  productFieldUrl: string = 'https://localhost:7237/api/ProductField';
  productUrl: string = 'https://localhost:7237/api/Product/products';

  forumCommentUrl:string='https://localhost:7237/api/ForumComment';
  forumUrl:string='https://localhost:7237/api/Forum';
   
   

  // Lists for storing fetched data
  listproductType: ProductType[] = [];
  listproductField: ProductField[] = [];
  listProduct: Product[] = [];
  listForumComment: ForumComment[] = [];
  listForum: Forum[] = [];


  // Single objects for posting data
  productTypeData: ProductType = new ProductType();
  productFieldData: ProductField = new ProductField();
  productData: Product = new Product();
  forumCommentData: ForumComment = new ForumComment()
  forumData: Forum = new Forum()


  // Get all Product Types
  getProductTypes(): Observable<ProductType[]> {
    return this.myhttp.get<ProductType[]>(this.productTypeUrl);
  }

  // Get a single Product by ID
  getProductTypeById(id: number): Observable<ProductType> {
    const url = `${this.productTypeUrl}/${id}`;
    return this.myhttp.get<ProductType>(url);
  }

  // Create a new Product Type
  createProductType(productType: ProductType): Observable<ProductType> {
    return this.myhttp.post<ProductType>(this.productTypeUrl, productType);
  }

  // Get all Products
  getProducts(): Observable<Product[]> {
    return this.myhttp.get<Product[]>(this.productUrl);
  }

  // Get a single Product by ID
  getProductById(productId: number): Observable<Product> {
    const url = `${this.productUrl}/${productId}`;
    return this.myhttp.get<Product>(url);
  }


  // Create a new Product
  createProduct(product: Product): Observable<Product> {
    return this.myhttp.post<Product>(this.productUrl, product);
  }

  // Update a Product
  updateProduct(productId: number, product: Product): Observable<Product> {
    const url = `${this.productUrl}/${productId}`;
    return this.myhttp.put<Product>(url, product);
  }

  // Delete a Product
  deleteProduct(productId: number): Observable<void> {
    const url = `${this.productUrl}/${productId}`;
    return this.myhttp.delete<void>(url);
  }


// Fetch all forums
    getAllForums(): Observable<Forum[]> {
      return this.myhttp.get<Forum[]>(this.forumUrl);
    }

  
    // Fetch all comments for a specific forum
    getForumComments(forumId: number): Observable<ForumComment[]> {
      return this.myhttp.get<ForumComment[]>(`${this.forumCommentUrl}?forumId=${forumId}`);
    }
  
    // Add a new forum
    addForum(forum: Forum): Observable<Forum> {
      return this.myhttp.post<Forum>(this.forumUrl, forum);
    }
  
    // Add a new comment
    addForumComment(comment: ForumComment): Observable<ForumComment> {
      return this.myhttp.post<ForumComment>(this.forumCommentUrl, comment);
    }
  
    // Delete a forum
    deleteForum(id: number): Observable<void> {
      return this.myhttp.delete<void>(`${this.forumUrl}/${id}`);
    }
  
    // Delete a comment
    deleteForumComment(id: number): Observable<void> {
      return this.myhttp.delete<void>(`${this.forumCommentUrl}/${id}`);
    }

    
}
