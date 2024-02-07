# nostos

Fonts: ProFontWindows, Inconsolata
UI Libraries: Odyssey UI, a2k

Front End
Within Login/Register - Must use local ip address to connect to the server. Have stored this in a n ENV variable.
GeoLocation - configuration options within app.json file: locationWhenInUsePermission : "custom message"


GOOGLE API QUERY
// useEffect(() => {
  //   axios
  //     .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
  //       params: {
  //         location: `${lat},${lng}`,
  //         radius: 10000,
  //         type: "hindu_temple",
  //         key: GOOGLE_KEY,
  //       },
  //     })
  //     .then((response) => {
  //       const places: Place[] = response.data.results.map(
  //         (place: GooglePlaceResponse) => ({
  //           id: place.place_id,
  //           lat: place.geometry.location.lat,
  //           lng: place.geometry.location.lng,
  //           name: place.name,
  //           city: "London", // TODO receive actual city upon location at login (get from state)
  //         })
  //       );
  //       AddPlacesService(places);
  //       dispatch(setPlaces(places));
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  GOOGLE API PLACE TYPES
  amusement_park
  aquarium
  art_gallery
  bakery
  bar
  book_store
  museum
  cafe
  park
  church
  restaurant
  florist
  tourist_attraction
  zoo
  cemetery
  stadium
  subway_station
  shopping_mall
  university
  synagogue
  hindu_temple