import axios from 'axios';
import { useState } from 'react';
import Login from '@/components/Log In/LogIn';
import { MainContainer, CircleDiv1 } from '@/components/Log In/LoginStyles';

const index = () => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <MainContainer>
      <Login handleSubmit={handleSubmit} />
    </MainContainer>
  );
};

export default index;
/*
console.log(event.target.username.value);
    console.log(event.target.password.value);
*/
