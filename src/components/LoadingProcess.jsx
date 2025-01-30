import React from 'react';
import styled from 'styled-components';

const LoaderProcess = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 35px;
    height: 35px;
    background: linear-gradient(#0000 calc(1*100%/6),#fff 0 calc(3*100%/6),#0000 0),
              linear-gradient(#0000 calc(2*100%/6),#fff 0 calc(4*100%/6),#0000 0),
              linear-gradient(#0000 calc(3*100%/6),#fff 0 calc(5*100%/6),#0000 0);
    background-size: 10px 400%;
    background-repeat: no-repeat;
    animation: matrix 1s infinite linear;
  }

  @keyframes matrix {
    0% {
      background-position: 0% 100%, 50% 100%, 100% 100%
    }

    100% {
      background-position: 0% 0%, 50% 0%, 100% 0%
    }
  }`;

export default LoaderProcess;
