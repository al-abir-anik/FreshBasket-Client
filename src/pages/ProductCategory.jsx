import { categories } from "../assets/assets";

const ProductCategory = () => {
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = AllProducts.filter(
    (p) => p.category.toLowerCase() === category
  );

  return <div>
    
  </div>;
};

export default ProductCategory;
