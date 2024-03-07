import { Product } from './product.entity';
import { ProductModel } from './product.model';

export class ProductService {
  async find(search?: string): Promise<Product[]> {
    const results = await ProductModel.find();
    
    return results;
    // let results = PRODUCTS;
  
    // if (search) {
    //   // logica per filtrare
    //   results = PRODUCTS.filter((item) => {
    //     return item.name.toLowerCase().includes(search.toLowerCase());
    //   });
    // }
    // return results;
  }

  async getById(id: string): Promise<Product | null> {
    return ProductModel.findById(id);
    // return PRODUCTS.find((item) => {
    //   return item.id === id;
    // });
  }
}

export default new ProductService();