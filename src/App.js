import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <SkeletonText />;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    setLatitude(latitude);
    setLongitude(longitude);
  });
  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      bgColor="blue.200"
      bgImage="https://images.unsplash.com/photo-1647117181799-0ac3e50a548a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      bgPos="bottom"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%"></Box>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        zoom={15}
        center={{ lat: latitude, lng: longitude }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>

      <Box
        p={4}
        borderRadius="lg"
        mt={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="modal"
      >
        <HStack spacing={4}>
          <Input type="text" placeholder="Origin" />
          <Input type="text" placeholder="Destination" />
          <ButtonGroup>
            <Button colorScheme="pink" type="submit">
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={() => alert(123)}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: </Text>
          <Text>Duration: </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo({ lat: latitude, lng: longitude })}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default App;
