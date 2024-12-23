/* eslint-disable jsx-a11y/img-redundant-alt */
import { deleteOneCart, getCartAsync, updateCart } from 'actions/cartActions';
import { RootState } from 'reducers/rootReducer';
import { productsInterface } from 'types/ProductInterface';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopoverComponent from 'component/popoverComponent';

export default function Cart() {
  const dispatch = useDispatch();
  const { cartProducts, loading } = useSelector(
    (state: RootState) => state.cart,
  );

  const handleDecrement = (product: productsInterface) => {
    if (product.quantity <= 1) return;
    const incrementQuantity = { ...product, quantity: product.quantity - 1 };
    dispatch<any>(updateCart(incrementQuantity));
  };

  const handleIncrement = (product: productsInterface) => {
    const incrementQuantity = { ...product, quantity: product.quantity + 1 };
    dispatch<any>(updateCart(incrementQuantity));
  };

  const columns = [
    {
      title: '',
      key: 'deleteItem',
      render: (text: string, record: productsInterface) => (
        <PopoverComponent record={record} />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => (
        <img src={thumbnail} width={140} height={140} alt="image" />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => <span>{text}$</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: number, record: productsInterface) => (
        <>
          <span
            className="me-4"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDecrement(record)}
          >
            <MinusOutlined disabled={record.quantity <= 1} />
          </span>
          <span className="me-4">{text | 0}</span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleIncrement(record)}
          >
            <PlusOutlined />
          </span>
        </>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (
        text: string,
        { quantity, price }: { quantity: number; price: string },
      ) => (
        <span className="text-bold">
          {(quantity * Number(price)).toFixed(2)}$
        </span>
      ),
    },
  ];

  const totalPrice = useMemo(() => {
    let total = 0;
    cartProducts?.map((item: productsInterface) => {
      total += Number(item?.price) * (Number(item?.quantity) || 0);
    });
    return total.toFixed(2);
  }, [cartProducts]);

  const tableFooter = () => {
    return (
      <div className="d-flex align-items-center">
        <div className="pe-5 text-end w-100 d-block">
          Total: <span className="text-bold">{totalPrice} $</span>
        </div>
        <Button type="primary" loading={loading} disabled={loading}>
          Pay now
        </Button>
      </div>
    );
  };

  useEffect(() => {
    dispatch<any>(getCartAsync());
  }, []);

  return (
    <Table
      scroll={{ x: 'max-content' }}
      dataSource={cartProducts}
      columns={columns}
      footer={tableFooter}
    />
  );
}
