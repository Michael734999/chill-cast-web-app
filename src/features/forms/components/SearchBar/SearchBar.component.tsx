import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { Search2Icon, SearchIcon, CloseIcon } from '@chakra-ui/icons';
import GeoIcon from '@assets/geo.svg?react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EmailFormFields, SearchBarProps } from '@features/forms/types';
import { WeatherSearchVariant } from '@features/weather/types';

export const SearchBar = ({
  placeholder,
  onSearch: handleSearch,
  loading,
}: SearchBarProps): JSX.Element => {
  const { handleSubmit, register, reset } = useForm<EmailFormFields>();

  const onSubmit: SubmitHandler<EmailFormFields> = (data) => {
    handleSearch(WeatherSearchVariant.CITY, data.search);
    reset();
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <HStack
        pt={4}
        pb={2}
        alignItems="center"
        width={'100%'}
        justifyContent="center"
        spacing={4}
        px={{ md: 6, sm: 2 }}
        margin="0 auto"
      >
        <InputGroup>
          <InputLeftElement
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            pointerEvents="none"
          >
            <Search2Icon color="foreground.light" />
          </InputLeftElement>
          <Input
            textColor="foreground.light"
            type="text"
            pointerEvents="stroke"
            backgroundColor="background.secondary"
            fontWeight="bold"
            rounded={24}
            opacity={0.8}
            _placeholder={{ color: 'inherit' }}
            placeholder={placeholder}
            {...register('search', { required: true, minLength: 3 })}
          />
          <InputRightElement
            display={'flex'}
            cursor={'pointer'}
            onClick={() => reset()}
            mr={1}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <CloseIcon boxSize={3} color="foreground.light" />
          </InputRightElement>
        </InputGroup>
        <IconButton
          colorScheme="blackAlpha"
          type="submit"
          icon={<SearchIcon />}
          backgroundColor="background.lightBlue"
          opacity={0.8}
          rounded="full"
          isLoading={loading}
          aria-label={'Search'}
        />
        <IconButton
          colorScheme="blackAlpha"
          icon={<GeoIcon width={20} height={20} fill="#e0e7e9" />}
          backgroundColor="background.lightBlue"
          opacity={0.8}
          rounded="full"
          aria-label={'Geolocation'}
          onClick={() => handleSearch(WeatherSearchVariant.GEO)}
        />
      </HStack>
    </form>
  );
};
