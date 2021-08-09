import Pagination from '../components/Pagination';
import Products from '../components/Products';

/* eslint-disable react/display-name */
export default function OrderPage() {
  return (
    <div>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
}
