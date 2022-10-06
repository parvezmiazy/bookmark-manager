export interface Bookmark {
  id?: number;
  title?: string;
  categoryName?: string;
  url?: string;
  category?: Category[];
  
 
}

interface Category{

name?: string;
}
