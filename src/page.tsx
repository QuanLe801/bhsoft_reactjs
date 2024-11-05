/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { getProductAsync } from 'actions/productsActions';
import { productsInterface } from 'types/ProductInterface';
import CardProductComponent from 'component/cardProductComponent';

const StyledContainerWrapper = styled.div`
  .infinite-scroll-component {
    overflow: unset !important;
  }
`;

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);

  const [page, setPage] = useState(1);
  const limit = 10;

  const getProducts = async () => {
    dispatch<any>(getProductAsync({ limit: limit, page: page }));
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <section className="container">
      <StyledContainerWrapper>
        <InfiniteScroll
          dataLength={products?.length || 0}
          next={fetchMoreData}
          hasMore={products?.length < 194}
          loader={<Spin size="large" className="mt-3 w-100 mx-auto" />}
        >
          <Row gutter={[24, 24]}>
            {products?.map((item: productsInterface, key: number) => {
              return (
                <Col lg={6} md={8} key={key}>
                  <CardProductComponent product={item} />
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      </StyledContainerWrapper>
    </section>
  );
}
