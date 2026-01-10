import { Suspense } from 'react';
import ProductPage from '../pages/ProductPage';
import Loading from '../components/Loading';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductPage />
    </Suspense>
  );
}