interface IProductCategory {
  categoryId: number;
  category: null | string;
}

export interface IMovie {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  productCategory: IProductCategory[];
  year: number;
}
