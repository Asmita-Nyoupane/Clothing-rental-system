import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 import { ChatState } from '../../context/ChatProvider';
import { Image, ListGroup } from 'react-bootstrap';

const UserListItem = ({ account, handleFunction }) => {
  // Assuming user is an object with properties name, pic, and email
  // const { account } = ChatState();

  return (
    <ListGroup.Item
      onClick={handleFunction}
      action
      style={{
        cursor: 'pointer',
        backgroundColor: '#E8E8E8',
        border: 'none',
        borderRadius: '8px',
        marginBottom: '10px',
      }}
      className="d-flex align-items-center text-black px-3 py-2"
    >
      <Image
        src={account.pic}
        alt={account.name}
        roundedCircle
        className="mr-2"
        style={{ cursor: 'pointer', width: '32px', height: '32px' }}
      />
      <div>
        <p>{account.name}</p>
        <p className="font-size-xs">
          <b>Email : </b>
          {account.email}
        </p>
      </div>
    </ListGroup.Item>
  );
};

export default UserListItem;
