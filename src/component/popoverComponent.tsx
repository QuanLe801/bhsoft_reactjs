import { DeleteOutlined } from '@ant-design/icons';
import { deleteOneCart } from 'actions/cartActions';
import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productsInterface } from 'types/ProductInterface';

export default function PopoverComponent({
  record,
}: {
  record: productsInterface;
}) {
  const dispatch = useDispatch();
  const [visibleRow, setVisibleRow] = useState(false);

  const handleDeleteItem = (product: productsInterface) => {
    setVisibleRow(false);
    dispatch<any>(deleteOneCart(product));
  };

  const confirmDelete = (product: productsInterface) => {
    return (
      <Button
        onClick={() => {
          setVisibleRow(true);
          handleDeleteItem(product);
        }}
      >
        Yes
      </Button>
    );
  };

  return (
    <Popover
      open={visibleRow}
      onOpenChange={() => setVisibleRow(!visibleRow)}
      content={() => confirmDelete(record)}
      title="Are you sure?"
      trigger="click"
    >
      <span style={{ cursor: 'pointer' }} onClick={() => setVisibleRow(true)}>
        <DeleteOutlined />
      </span>
    </Popover>
  );
}
