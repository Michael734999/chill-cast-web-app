import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  Image,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavigationLink } from '@components/NavLink';
import { useAppContext } from '@providers/AppProvider';
import { WeatherUnits } from '@features/weather/types';

const Links = [
  { href: '/', title: 'Home' },
  { href: '/contact', title: 'Contact' },
];

export const NavBar = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { weatherUnit, setWeatherUnit } = useAppContext();

  const setWeatherUnitData = (value: WeatherUnits) => {
    localStorage.setItem('weatherUnit', value);
    setWeatherUnit(value);
  };

  return (
    <Box
      bg={'background.secondary'}
      fontWeight={'bold'}
      as="header"
      color={'foreground.light'}
      px={6}
      py={2}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={10} alignItems={'center'}>
          <Box>
            <Image
              src="/weather-logo.png"
              boxSize="40px"
              borderRadius="full"
              fit="cover"
              alt="Weather Logo"
            />
          </Box>
          <HStack as={'nav'} spacing={8} display={{ base: 'none', md: 'flex' }}>
            {Links.map((item, key) => (
              <NavigationLink key={key} linkTo={item.href}>
                {item.title}
              </NavigationLink>
            ))}
          </HStack>
        </HStack>
        <Flex pr={6} alignItems={'center'}>
          <Button
            bg={
              weatherUnit === WeatherUnits.CELCIUS
                ? 'background.light'
                : 'rgba(178, 178, 178, 0.74)'
            }
            _hover={{
              bg:
                weatherUnit === WeatherUnits.CELCIUS
                  ? 'background.light'
                  : 'rgba(203, 215, 240, 0.30)',
            }}
            size={'xs'}
            onClick={() => setWeatherUnitData(WeatherUnits.CELCIUS)}
            rounded={0}
            roundedStart={'full'}
          >
            &deg;C
          </Button>
          <Button
            bg={
              weatherUnit === WeatherUnits.FERINHEIGHT
                ? 'background.light'
                : 'rgba(178, 178, 178, 0.74)'
            }
            _hover={{
              bg:
                weatherUnit === WeatherUnits.CELCIUS
                  ? 'rgba(203, 215, 240, 0.30)'
                  : 'background.light',
            }}
            size={'xs'}
            onClick={() => setWeatherUnitData(WeatherUnits.FERINHEIGHT)}
            rounded={0}
            roundedEnd={'full'}
          >
            &deg;F
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((item) => (
              <NavigationLink
                onClick={() => onClose()}
                key={item.title}
                linkTo={item.href}
              >
                {item.title}
              </NavigationLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
