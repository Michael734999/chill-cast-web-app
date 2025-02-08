import { Link, Text } from '@chakra-ui/react';
import { NavLinkProps } from './NavLink.types';
import { NavLink } from 'react-router-dom';

export const NavigationLink = ({
  children,
  linkTo,
  ...rest
}: NavLinkProps): JSX.Element => {
  return (
    <Link
      as={NavLink}
      to={linkTo}
      rounded={9}
      p={4}
      _hover={{
        textDecoration: 'none',
        bg: 'background.accent',
      }}
      _activeLink={{
        textDecor: 'none',
        fontWeight: '900',
        color: 'background.lightBlue',
      }}
    >
      <Text
        display="block"
        _active={{
          color: 'green',
        }}
        {...rest}
      >
        {children}
      </Text>
    </Link>
  );
};
