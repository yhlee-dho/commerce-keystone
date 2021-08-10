import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

/* eslint-disable react/display-name */
export default function OrderPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  // console.log(typeof page);

  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
