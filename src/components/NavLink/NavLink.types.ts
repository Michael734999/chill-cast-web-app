import { TextProps } from '@chakra-ui/react';
import React from 'react';

export interface NavLinkProps extends TextProps {
  children: React.ReactNode;
  linkTo: string;
}
