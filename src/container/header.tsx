/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from 'reducers/rootReducer';
import { useSelector } from 'react-redux';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typography from 'typography/typography';
import { userInterface } from 'types/LoginInterface';
import { productsInterface } from 'types/ProductInterface';

const StyledShoppingCartOutlined = styled(ShoppingCartOutlined)`
  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export default function Header({
  user,
  cartProducts,
}: {
  user: userInterface;
  cartProducts: productsInterface[];
}) {
  const navigate = useNavigate();

  return (
    <section className="d-flex container justify-content-between items-center align-items-center mb-4">
      <>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <HomeOutlined />
        </div>
        <section className="d-flex container justify-content-end items-center  align-items-center">
          <Badge
            count={cartProducts?.length}
            style={{
              width: '20px',
              height: '20px',
            }}
            className="me-4"
          >
            <StyledShoppingCartOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/cart')}
            />
          </Badge>

          <div className="p-2 d-flex items-center justify-content-center border rounded">
            <img src={user?.image} alt="avatar" width={24} height={24} />
            <Typography className="ms-2 mb-0">{user?.username}</Typography>
          </div>
        </section>
      </>
    </section>
  );
}
