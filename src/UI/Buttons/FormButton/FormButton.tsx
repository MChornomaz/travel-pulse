import React from 'react';
import styled, { css } from 'styled-components';
import { FormButtonProps } from '../../../types/types';

const Button = styled.button<FormButtonProps>`
    padding: 10px 30px;
    min-width: fit-content;
    height: 50px;
    background: #ffffff;
    border-radius: 40px;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.9rem;
    color: #000000;
    border: 1px solid #ffffff;
    outline: none;
    overflow: hidden;
    position: relative;
    z-index: 2;
    transition: all 0.2s;
    cursor: pointer;

    &::before {
        content: '';
        height: 100%;
        width: 0px;
        background-color: #4169e1;
        position: absolute;
        top: 0;
        left: 50%;
        z-index: -1;
        transition: all 0.4s;
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
        transform: scale(0.98);
    }

    ${(props) =>
        props.inverted &&
        css`
            background: #4169e1;
            color: #ffffff;
            border: 1px solid #4169e1;

            &::before {
                background-color: #ffffff;
            }

            @media (min-width: 1200px) {
                &:hover::before {
                    background-color: #4169e1;
                }
            }

            @media (min-width: 1200px) {
                &:hover {
                    color: #000000;
                }
            }
        `}

    ${(props) =>
        props.wide &&
        css`
            width: 100%;
        `}

    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        `}
`;

const FormButton: React.FC<FormButtonProps> = ({ children, type, onClick, testid, inverted, wide, disabled }) => {
    return (
        <Button type={type} onClick={onClick} data-testid={testid} inverted={inverted} wide={wide} disabled={disabled}>
            {children}
        </Button>
    );
};

export default FormButton;
