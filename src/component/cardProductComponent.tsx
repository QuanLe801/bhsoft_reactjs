import { addToCart, addToCartAsync } from 'actions/cartActions';
import { Card, Button, notification } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { productsInterface } from 'types/ProductInterface';
import Typography from 'typography/typography';

const StyledCardProducts = styled(Card)`
  img {
    transition: all 0.3s;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
  .ant-card-cover {
    overflow: hidden;
  }
`;

export default function CardProductComponent({
  product,
}: {
  product: productsInterface;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (product: productsInterface, quantity: number) => {
    setIsLoading(true);
    const payload: productsInterface = {
      title: product.title,
      price: product.price.toString(),
      brand: product.brand as string,
      thumbnail: product.thumbnail as string,
      id: product.id,
      quantity: 1,
    };
    await dispatch<any>(addToCartAsync({ ...payload }, quantity));
    notification.success({
      message: 'Add to cart sucessfully!',
    });
    setIsLoading(false);
  };

  return (
    <StyledCardProducts
      hoverable
      cover={
        <img alt="example" src={product.thumbnail} width={240} height={240} />
      }
    >
      <Meta title={product.title} description={product.brand} />
      <Typography variant="h5" className="mt-2">
        {product.price}$
      </Typography>
      <Button className="bg-primary" loading={isLoading} disabled={isLoading}>
        <Typography
          variant="h4"
          className="mb-0 text-white"
          onClick={() => addToCart(product, 1)}
        >
          Add to cart
        </Typography>
      </Button>
    </StyledCardProducts>
  );
}
