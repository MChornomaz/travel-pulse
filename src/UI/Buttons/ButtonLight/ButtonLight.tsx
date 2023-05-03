import React from 'react';
import styled from 'styled-components';
import { ButtonLightProps } from '../../../types/types';

const StyledButtonLight = styled.button`
    background-color: #ffffff;
    border: 1px solid #4169e1;
    padding: 15px 25px;
    font-family: inherit;
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.5rem;
    color: #4169e1;
    border-radius: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    z-index: 2;
    overflow: hidden;
    transition: all 0.4s;

    &::before {
        content: '';
        height: 100%;
        width: 0px;
        background-color: #4169e1;
        position: absolute;
        top: 0;
        left: 50%;
        z-index: -1;
        transition: all 0.3s;
    }

    @media (min-width: 1200px) {
        &:hover::before {
            width: 100%;
            left: 0;
        }
    }

    @media (min-width: 1200px) {
        &:hover {
            color: #ffffff;
        }
    }

    &:active {
        transform: scale(0.96);
    }

    &__icon {
        height: 2rem;
        margin-right: 2rem;
    }
`;

const ButtonLight: React.FC<ButtonLightProps> = ({ children, type, onClick, testid, icon }) => {
    return (
        <StyledButtonLight type={type} onClick={onClick} data-testid={testid}>
            {icon && <img className="button__icon" src={icon} alt="button icon" />}
            {children}
        </StyledButtonLight>
    );
};

export default ButtonLight;
