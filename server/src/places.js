const mockPlaces = [
  {
    "id": "ChIJB9OTMDIbdkgRp0JWbQGZsS8",
    "lat": 51.5194133,
    "lng": -0.1269566,
    "name": "The British Museum",
    "city": "London"
  },
  {
    "id": "ChIJPy8Y5kIFdkgRxGSXw4Xjt3s",
    "lat": 51.49671499999999,
    "lng": -0.1763672,
    "name": "Natural History Museum",
    "city": "London"
  },
  {
    "id": "ChIJq4lX1doEdkgR5JXPstgQjc0",
    "lat": 51.5021585,
    "lng": -0.1293572,
    "name": "Churchill War Rooms",
    "city": "London"
  },
  {
    "id": "ChIJkeddM88adkgR80g3pdkn0vw",
    "lat": 51.523767,
    "lng": -0.1585557,
    "name": "The Sherlock Holmes Museum",
    "city": "London"
  },
  {
    "id": "ChIJP9oAE0MFdkgR3iKGFKZO1SE",
    "lat": 51.4972216,
    "lng": -0.1767283,
    "name": "Science Museum",
    "city": "London"
  },
  {
    "id": "ChIJgZ24Us4adkgRpDNAwNPO_SY",
    "lat": 51.52301740000001,
    "lng": -0.1543613,
    "name": "Madame Tussauds London",
    "city": "London"
  },
  {
    "id": "ChIJ68vBCFUbdkgR5CUqlcHifUA",
    "lat": 51.5176183,
    "lng": -0.09677819999999998,
    "name": "Museum of London",
    "city": "London"
  },
  {
    "id": "ChIJeclqF84EdkgRtKAjTmWFr0I",
    "lat": 51.508929,
    "lng": -0.128299,
    "name": "The National Gallery",
    "city": "London"
  },
  {
    "id": "ChIJw1d-sUMFdkgRH2XN_U0Jt54",
    "lat": 51.4966392,
    "lng": -0.17218,
    "name": "Victoria and Albert Museum",
    "city": "London"
  },
  {
    "id": "ChIJ0-48HywBdkgRh7MH0Igd1f4",
    "lat": 51.4958366,
    "lng": -0.1086584,
    "name": "Imperial War Museum",
    "city": "London"
  },
  {
    "id": "ChIJcWfE87UEdkgRoYClOMTsOQQ",
    "lat": 51.511059,
    "lng": -0.1171479999999999,
    "name": "Somerset House",
    "city": "London"
  },
  {
    "id": "ChIJ8e-IMtUEdkgRWaAuJKup2GQ",
    "lat": 51.51492709999999,
    "lng": -0.1390605,
    "name": "The Photographers' Gallery",
    "city": "London"
  },
  {
    "id": "ChIJvWjCxekEdkgRoCgQVJHZH_U",
    "lat": 51.49106210000001,
    "lng": -0.1277886,
    "name": "Tate Britain",
    "city": "London"
  },
  {
    "id": "ChIJeclqF84EdkgRYkL4mtJ7rLM",
    "lat": 51.5094236,
    "lng": -0.1281216,
    "name": "National Portrait Gallery",
    "city": "London"
  },
  {
    "id": "ChIJ66NuMS8bdkgRb0YHGckT794",
    "lat": 51.5237545,
    "lng": -0.1344056,
    "name": "Grant Museum of Zoology",
    "city": "London"
  },
  {
    "id": "ChIJXRDdrFADdkgRT_s4Gh7ORxg",
    "lat": 51.5050283,
    "lng": -0.0885991,
    "name": "The Old Operating Theatre Museum and Herb Garret",
    "city": "London"
  },
  {
    "id": "ChIJs0HnpkcDdkgRJjUYVf4jca4",
    "lat": 51.4998973,
    "lng": -0.2002439999999999,
    "name": "the Design Museum",
    "city": "London"
  },
  {
    "id": "ChIJaQQ3lEobdkgRmauadcnji9s",
    "lat": 51.51703819999999,
    "lng": -0.1174699,
    "name": "Sir John Soane's Museum",
    "city": "London"
  },
  {
    "id": "ChIJ7xIq4dkadkgRzlX3Emg8F-I",
    "lat": 51.5257424,
    "lng": -0.145168,
    "name": "Royal College of Physicians",
    "city": "London"
  },
  {
    "id": "ChIJVTZUsMcCdkgRMc_-OpJq9v8",
    "lat": 51.5075598,
    "lng": -0.0238525,
    "name": "Museum of London Docklands",
    "city": "London"
  },
  {
    "id": "ChIJLVbbrYMFdkgRiBe_PoBho_s",
    "lat": 51.46957039999999,
    "lng": -0.1791253,
    "name": "London Heliport",
    "city": "London"
  },
  {
    "id": "ChIJfcoXuWEcdkgR0RCjqgitflo",
    "lat": 51.5586105,
    "lng": -0.07455300000000001,
    "name": "Sam’s Cars Limited",
    "city": "London"
  },
  {
    "id": "ChIJVVD-LS0bdkgRe60pWycS_xo",
    "lat": 51.5152054,
    "lng": -0.14966,
    "name": "Esken",
    "city": "London"
  },
  {
    "id": "ChIJm1q92CsFdkgR-g9Z5n8v77E",
    "lat": 51.5098717,
    "lng": -0.1447921,
    "name": "Grosvenor Executive Chauffeurs",
    "city": "London"
  },
  {
    "id": "ChIJkWtaMbYcdkgRrZVtDgGdWnk",
    "lat": 51.5221737,
    "lng": -0.0715886,
    "name": "Urban Street Art Tours London",
    "city": "London"
  },
  {
    "id": "ChIJFb_-Q1IDdkgRp8FEct4Dmjc",
    "lat": 51.5179985,
    "lng": -0.0583347,
    "name": "London’s Air Ambulance Helipad",
    "city": "London"
  },
  {
    "id": "ChIJO3m_7tQCdkgRPOr0ClOuGIo",
    "lat": 51.51329200000001,
    "lng": -0.0430805,
    "name": "Airports Carriage",
    "city": "London"
  },
  {
    "id": "ChIJoYrtvqoCdkgRs5xfKnVMp8Q",
    "lat": 51.5140634,
    "lng": -0.0011764,
    "name": "Docklands Express London",
    "city": "London"
  },
  {
    "id": "ChIJ6fq4JNsEdkgRzR0xj7hso_M",
    "lat": 51.4958779,
    "lng": -0.1261675,
    "name": "Airport Operators Association",
    "city": "London"
  },
  {
    "id": "ChIJeZUKxbcFdkgRZBFipdPv9P0",
    "lat": 51.51426679999999,
    "lng": -0.111757,
    "name": "Global Elite Limited",
    "city": "London"
  },
  {
    "id": "ChIJi4CTzDgFdkgRfvH9nuXTNbU",
    "lat": 51.4992309,
    "lng": -0.1624909,
    "name": "Heliport",
    "city": "London"
  },
  {
    "id": "ChIJW1-ZcjUbdkgRhTty2WaDs8E",
    "lat": 51.517305,
    "lng": -0.1190613,
    "name": "Ground Operations Software System",
    "city": "London"
  },
  {
    "id": "ChIJd9NtXTIbdkgRTdp2f-7kjMU",
    "lat": 51.5181102,
    "lng": -0.1276773,
    "name": "Prime Coach Hire",
    "city": "London"
  },
  {
    "id": "ChIJoSrLsFMDdkgR1D33VNxvqkM",
    "lat": 51.511397,
    "lng": -0.085848,
    "name": "RC Perret",
    "city": "London"
  },
  {
    "id": "ChIJL0rK2JIDdkgR06Tnz7mF-Lk",
    "lat": 51.4679474,
    "lng": -0.0919401,
    "name": "Kings College Hospital Heliport",
    "city": "London"
  },
  {
    "id": "ChIJG4FGskwDdkgRd_mCPX-LuMs",
    "lat": 51.51475569999999,
    "lng": -0.07716479999999999,
    "name": "Hayward Aviation Limited",
    "city": "London"
  },
  {
    "id": "ChIJOVrFrYMFdkgRa6-0brJedvs",
    "lat": 51.4699374,
    "lng": -0.1795229,
    "name": "Helipad",
    "city": "London"
  },
  {
    "id": "ChIJG40y1m0ddkgRa9IkrQjUMfY",
    "lat": 51.5260542,
    "lng": -0.07829119999999998,
    "name": "PAN INC",
    "city": "London"
  },
  {
    "id": "ChIJDzGPE58ddkgRltZksCo5P_0",
    "lat": 51.51890119999999,
    "lng": -0.0618549,
    "name": "Link2airports",
    "city": "London"
  },
  {
    "id": "ChIJxxL7EOsCdkgR6g0tRUcky3A",
    "lat": 51.490617,
    "lng": -0.0253821,
    "name": "Skyports London Heliport",
    "city": "London"
  },
  {
    "id": "ChIJDfKh-GkbdkgRqs2ecF8SYIE",
    "lat": 51.5365252,
    "lng": -0.1117935,
    "name": "Barnard Adventure Playground",
    "city": "London"
  },
  {
    "id": "ChIJXY27TcsEdkgR5EA4Lt4YKqg",
    "lat": 51.5147235,
    "lng": -0.1224696,
    "name": "Lightwater Valley Attractions Limited",
    "city": "London"
  },
  {
    "id": "ChIJ6wZ3wVADdkgRhTVp3CETgBM",
    "lat": 51.50644860000001,
    "lng": -0.08845860000000001,
    "name": "The London Bridge Experience & London Tombs",
    "city": "London"
  },
  {
    "id": "ChIJbxsBvGEDdkgRfwm7_JS5oJ4",
    "lat": 51.4838077,
    "lng": -0.0841123,
    "name": "Burgess Park Children's Splash Park for Summer",
    "city": "London"
  },
  {
    "id": "ChIJ8xkGIskddkgRTw6e4tGkjEo",
    "lat": 51.5275764,
    "lng": -0.0770853,
    "name": "Game center Persian",
    "city": "London"
  },
  {
    "id": "ChIJ7_PV980bdkgROekbwOVWVfo",
    "lat": 51.5420737,
    "lng": -0.1451404,
    "name": "Babylon Park London",
    "city": "London"
  },
  {
    "id": "ChIJ6xjFBX4bdkgRx9Nt2mRNP4g",
    "lat": 51.5424465,
    "lng": -0.1466834,
    "name": "WeJam - The Immersive Rockstar Experience",
    "city": "London"
  },
  {
    "id": "ChIJUc5LXq4DdkgRVG5p889oUfU",
    "lat": 51.50584809999999,
    "lng": -0.0169355,
    "name": "Fisherman's Walk",
    "city": "London"
  },
  {
    "id": "ChIJzXJ-r9IddkgRU-IxQIiCfzQ",
    "lat": 51.56057310000001,
    "lng": -0.08911740000000001,
    "name": "Splash Pad Clissold Park",
    "city": "London"
  },
  {
    "id": "ChIJT4NeZgkddkgRRc-hvO5Xw0o",
    "lat": 51.5616965,
    "lng": -0.0882314,
    "name": "London Funfairs",
    "city": "London"
  },
  {
    "id": "ChIJqyV_TgAddkgRvqi8LTGUI_w",
    "lat": 51.5643581,
    "lng": -0.0772895,
    "name": "Water tap",
    "city": "London"
  },
  {
    "id": "ChIJc2nSALkEdkgRviluWxwFsxA",
    "lat": 51.501558,
    "lng": -0.119506,
    "name": "SEA LIFE London Aquarium",
    "city": "London"
  },
  {
    "id": "ChIJSzwgydoDdkgRndnXVYQGXBI",
    "lat": 51.4410762,
    "lng": -0.06129250000000001,
    "name": "Horniman Museum and Gardens",
    "city": "London"
  },
  {
    "id": "ChIJSSucrc8adkgRMdTO1g6eaFI",
    "lat": 51.50196330000001,
    "lng": -0.1188522,
    "name": "Merlin Venues",
    "city": "London"
  },
  {
    "id": "ChIJF7vT1WAbdkgRvWm4UA0KI-A",
    "lat": 51.5385998,
    "lng": -0.0993336,
    "name": "Angel Aquarium",
    "city": "London"
  },
  {
    "id": "ChIJDTCExMgFdkgRVE7UhmBTkxI",
    "lat": 51.4629463,
    "lng": -0.1342906,
    "name": "SA Aquatic",
    "city": "London"
  },
  {
    "id": "ChIJ4WwGBHUFdkgRFbFB_FuCzYg",
    "lat": 51.5017782,
    "lng": -0.1195354,
    "name": "SEA LIFE London Aquarium Entrance",
    "city": "London"
  },
  {
    "id": "ChIJC4f4b9oFdkgR411k93YqU-U",
    "lat": 51.5148777,
    "lng": -0.122977,
    "name": "Bespoke Aquatics",
    "city": "London"
  },
  {
    "id": "ChIJK19uaeADdkgRtbiPXMaPOvw",
    "lat": 51.5022994,
    "lng": -0.0851423,
    "name": "Liquid Habitat",
    "city": "London"
  },
  {
    "id": "ChIJ_4hkA7IDdkgR37-X8FrlSNc",
    "lat": 51.4409868,
    "lng": -0.06103330000000001,
    "name": "Horniman Aquarium",
    "city": "London"
  },
  {
    "id": "ChIJdd4hrwug2EcRmSrV3Vo6llI",
    "lat": 51.5072178,
    "lng": -0.1275862,
    "name": "London",
    "city": "London"
  },
  {
    "id": "ChIJAax3EcAEdkgR0m_aZjCm_94",
    "lat": 51.4946539,
    "lng": -0.1186786,
    "name": "Novotel London Waterloo",
    "city": "London"
  },
  {
    "id": "ChIJ_RmXqN4EdkgRzKAQ29aPpfo",
    "lat": 51.4991371,
    "lng": -0.1344175,
    "name": "St. Ermin's Hotel, Autograph Collection",
    "city": "London"
  },
  {
    "id": "ChIJLTMzFXqv2EcRVvwDkIeNh6k",
    "lat": 51.5010534,
    "lng": -0.119174,
    "name": "London Marriott Hotel County Hall",
    "city": "London"
  },
  {
    "id": "ChIJLTMzFXqv2EcRJVvr2rP600M",
    "lat": 51.50249969999999,
    "lng": -0.1180709,
    "name": "Premier Inn London County Hall hotel",
    "city": "London"
  },
  {
    "id": "ChIJJ2erNeoEdkgRV0SGIUovDiU",
    "lat": 51.49147799999999,
    "lng": -0.122177,
    "name": "Park Plaza London Riverbank",
    "city": "London"
  },
  {
    "id": "ChIJj7HgCyAFdkgRVkYmHfzRTS0",
    "lat": 51.4949866,
    "lng": -0.1412787,
    "name": "Victoria Station Hotel",
    "city": "London"
  },
  {
    "id": "ChIJG-orDOEEdkgRkseU3eZSq6E",
    "lat": 51.49039639999999,
    "lng": -0.1377961,
    "name": "Victoria Inn",
    "city": "London"
  },
  {
    "id": "ChIJqWtO078EdkgR4G8yaiJILhA",
    "lat": 51.4943222,
    "lng": -0.1144259,
    "name": "London Waterloo Hostel",
    "city": "London"
  },
  {
    "id": "ChIJW-zrseEEdkgRlEFG2yb-wtc",
    "lat": 51.49065979999999,
    "lng": -0.1383784,
    "name": "Huttons Hotel",
    "city": "London"
  },
  {
    "id": "ChIJuWuyFOEEdkgR9UQjXb9u2aU",
    "lat": 51.4900306,
    "lng": -0.136987,
    "name": "Best Western Corona Hotel",
    "city": "London"
  },
  {
    "id": "ChIJ_75-fbgEdkgRp4ql6Rq76ao",
    "lat": 51.5018864,
    "lng": -0.1165677,
    "name": "Premier Inn London Waterloo (Westminster Bridge) hotel",
    "city": "London"
  },
  {
    "id": "ChIJc3mpbeEEdkgRDHvM7nQpHwk",
    "lat": 51.4897076,
    "lng": -0.1372359,
    "name": "Holiday Inn Express London - Victoria, an IHG Hotel",
    "city": "London"
  },
  {
    "id": "ChIJD_A-z94EdkgR0PpVUgkpeFo",
    "lat": 51.4986246,
    "lng": -0.1377587,
    "name": "Taj 51 Buckingham Gate Suites and Residences",
    "city": "London"
  },
  {
    "id": "ChIJjdNpjbgEdkgRtc5OFFlr-Xo",
    "lat": 51.50139999999999,
    "lng": -0.1163,
    "name": "Park Plaza County Hall London",
    "city": "London"
  },
  {
    "id": "ChIJrUfuueEEdkgR6joeORsbYVw",
    "lat": 51.490334,
    "lng": -0.138614,
    "name": "Sidney Hotel London Victoria",
    "city": "London"
  },
  {
    "id": "ChIJL1Z7h74EdkgRx7bQfEr434Q",
    "lat": 51.49683210000001,
    "lng": -0.1119883,
    "name": "Waterloo Hub Hotel & Suites",
    "city": "London"
  },
  {
    "id": "ChIJC7v6vOEEdkgRMzUB4sDDpCI",
    "lat": 51.4901947,
    "lng": -0.1387737000000001,
    "name": "The Melita, London",
    "city": "London"
  },
  {
    "id": "ChIJ2Ud8wx8FdkgRP_IztPFMwpA",
    "lat": 51.4922207,
    "lng": -0.14155,
    "name": "Stanley House Hotel",
    "city": "London"
  },
  {
    "id": "ChIJHSzWIr8EdkgRcmFNv46Ix90",
    "lat": 51.4935082,
    "lng": -0.1178424,
    "name": "Lambeth",
    "city": "London"
  },
  {
    "id": "ChIJT1ILM0YDdkgRw6emjIQI8Yo",
    "lat": 51.50365310000001,
    "lng": -0.07365070000000001,
    "name": "Le Pont de la Tour",
    "city": "London"
  },
  {
    "id": "ChIJ3SvPjykFdkgRolBDGp3vbEM",
    "lat": 51.50905100000001,
    "lng": -0.143098,
    "name": "Aubaine Mayfair",
    "city": "London"
  },
  {
    "id": "ChIJxXlegcsEdkgRPe5kZP1pyF4",
    "lat": 51.51197089999999,
    "lng": -0.123427,
    "name": "Ladurée",
    "city": "London"
  },
  {
    "id": "ChIJLY7X4EEFdkgRfTw56SPbBds",
    "lat": 51.4941824,
    "lng": -0.169108,
    "name": "Aubaine",
    "city": "London"
  },
  {
    "id": "ChIJxYfXiV8FdkgRBpYr6sKIgXM",
    "lat": 51.49548329999999,
    "lng": -0.1882105,
    "name": "Sainsbury's",
    "city": "London"
  },
  {
    "id": "ChIJ3UWX7x8FdkgRBhC4nV7BSqo",
    "lat": 51.49290800000001,
    "lng": -0.1410125,
    "name": "Sainsbury's",
    "city": "London"
  },
  {
    "id": "ChIJ87v_k9IEdkgR2vAfuejGjpA",
    "lat": 51.51334480000001,
    "lng": -0.13021,
    "name": "Maison Bertaux",
    "city": "London"
  },
  {
    "id": "ChIJQ9d0pzMbdkgRpuwMK5CEKgA",
    "lat": 51.5176643,
    "lng": -0.1253524,
    "name": "Camera Museum",
    "city": "London"
  },
  {
    "id": "ChIJZZmpzywFdkgRsruH5uUpmS8",
    "lat": 51.51512690000001,
    "lng": -0.1522826,
    "name": "Aubaine Selfridges",
    "city": "London"
  },
  {
    "id": "ChIJI7h_SjcbdkgRfEULSbBs0iY",
    "lat": 51.5174679,
    "lng": -0.1186429,
    "name": "Little Waitrose & Partners",
    "city": "London"
  },
  {
    "id": "ChIJlUoaYFAbdkgRrMdBFjNmcGg",
    "lat": 51.52417140000001,
    "lng": -0.1028132,
    "name": "Little Waitrose & Partners",
    "city": "London"
  },
  {
    "id": "ChIJzUEcVv0PdkgRnjCbG6MhVxc",
    "lat": 51.51486119999999,
    "lng": -0.1994666,
    "name": "Ottolenghi Notting Hill",
    "city": "London"
  },
  {
    "id": "ChIJHeUXBWgFdkgR3eOA_V-hKEs",
    "lat": 51.4933004,
    "lng": -0.1754869,
    "name": "The Hummingbird Bakery - South Kensington",
    "city": "London"
  },
  {
    "id": "ChIJa5wedTwFdkgRWhKOkEWR1os",
    "lat": 51.4989916,
    "lng": -0.1567289,
    "name": "Little Waitrose & Partners",
    "city": "London"
  },
  {
    "id": "ChIJg-N64-0PdkgRT1mKgT3DLs0",
    "lat": 51.4986294,
    "lng": -0.2008059,
    "name": "La Piccola Deli Pasticceria",
    "city": "London"
  },
  {
    "id": "ChIJFaENbuIPdkgRpLxw62U-cws",
    "lat": 51.5140807,
    "lng": -0.2038636,
    "name": "The Hummingbird Bakery",
    "city": "London"
  },
  {
    "id": "ChIJHaVdDdUEdkgRRDlV-jZ6Q1U",
    "lat": 51.5129268,
    "lng": -0.1393433,
    "name": "MotherMash",
    "city": "London"
  },
  {
    "id": "ChIJ7bOFjEIFdkgRwCbRqdYFfEY",
    "lat": 51.4950084,
    "lng": -0.1736302,
    "name": "Le Pain Quotidien",
    "city": "London"
  },
  {
    "id": "ChIJ8VNPp7AEdkgRlrFppK5imNI",
    "lat": 51.5042438,
    "lng": -0.1103157,
    "name": "Konditor",
    "city": "London"
  },
  {
    "id": "ChIJjSbr3UIbdkgR-bObvGWGxHQ",
    "lat": 51.5338932,
    "lng": -0.1072545,
    "name": "Little Waitrose & Partners",
    "city": "London"
  },
  {
    "id": "ChIJc9zIO88EdkgRtiF_0UhDLZk",
    "lat": 51.5060478,
    "lng": -0.1241368,
    "name": "The Royal Horseguards Hotel & One Whitehall Place, London",
    "city": "London"
  },
  {
    "id": "ChIJ4_SIlCEFdkgRb8KIploTI3s",
    "lat": 51.495691,
    "lng": -0.1453499,
    "name": "The Clermont London, Victoria",
    "city": "London"
  },
  {
    "id": "ChIJZf2Jlc4EdkgRklHks51KYBo",
    "lat": 51.5084092,
    "lng": -0.124743,
    "name": "The Clermont London, Charing Cross",
    "city": "London"
  },
  {
    "id": "ChIJr_4cVy8FdkgRXpqn7k7UTeY",
    "lat": 51.50470439999999,
    "lng": -0.1475848,
    "name": "The Athenaeum Hotel & Residences",
    "city": "London"
  },
  {
    "id": "ChIJq5XIW8oEdkgRqmg5RAC_ih8",
    "lat": 51.5117908,
    "lng": -0.11934,
    "name": "One Aldwych",
    "city": "London"
  },
  {
    "id": "ChIJcacvSNUEdkgRgpsgS9Y4yL4",
    "lat": 51.5143826,
    "lng": -0.1394573,
    "name": "Courthouse Hotel",
    "city": "London"
  },
  {
    "id": "ChIJZWQtdiwbdkgRDtcPz5yALlU",
    "lat": 51.5184005,
    "lng": -0.1348734,
    "name": "Charlotte Street Hotel",
    "city": "London"
  },
  {
    "id": "ChIJu6GgulADdkgRisE18ox2rdU",
    "lat": 51.5051976,
    "lng": -0.0881208,
    "name": "London Bridge Hotel",
    "city": "London"
  },
  {
    "id": "ChIJkUNmiEEFdkgRP2VcGWbshrM",
    "lat": 51.4960608,
    "lng": -0.1704114,
    "name": "The Rembrandt Hotel",
    "city": "London"
  },
  {
    "id": "ChIJM8MIQNYadkgRNC7hcekjix0",
    "lat": 51.52175659999999,
    "lng": -0.1425275,
    "name": "Gem Fitzrovia Hotel",
    "city": "London"
  },
  {
    "id": "ChIJMQg0izAbdkgR0eTfnuGboGA",
    "lat": 51.52397149999999,
    "lng": -0.1250204,
    "name": "Holiday Inn London - Bloomsbury, an IHG Hotel",
    "city": "London"
  },
  {
    "id": "ChIJmaVHONYadkgRenRoEUraCx8",
    "lat": 51.52251219999999,
    "lng": -0.1428166,
    "name": "Holiday Inn London - Regent's Park, an IHG Hotel",
    "city": "London"
  },
  {
    "id": "ChIJM4cpDTobdkgRx8LDQJ76Yu8",
    "lat": 51.52620449999999,
    "lng": -0.124825,
    "name": "Generator London",
    "city": "London"
  },
  {
    "id": "ChIJN8TLJEgDdkgRLEFtFv_mVcs",
    "lat": 51.506786,
    "lng": -0.07396490000000001,
    "name": "The Tower Hotel",
    "city": "London"
  },
  {
    "id": "ChIJbzZAgksDdkgRVNB_KxLPlos",
    "lat": 51.51222969999999,
    "lng": -0.07567569999999998,
    "name": "The Chamberlain Hotel, Tower Bridge",
    "city": "London"
  },
  {
    "id": "ChIJz1y33_cPdkgRP3ghYOpJYoI",
    "lat": 51.5026936,
    "lng": -0.1883821,
    "name": "Royal Garden Hotel",
    "city": "London"
  },
  {
    "id": "ChIJyZap4LsCdkgR15bK4_L6-m0",
    "lat": 51.50194219999999,
    "lng": -0.0233396,
    "name": "Britannia International Hotel",
    "city": "London"
  },
  {
    "id": "ChIJBd6VAwANdkgRlJtug_-B-qg",
    "lat": 51.51647850000001,
    "lng": -0.1509183,
    "name": "The Mandeville Hotel",
    "city": "London"
  },
  {
    "id": "ChIJH-Bm3socdkgRc4N1ad2l5QU",
    "lat": 51.51619420000001,
    "lng": -0.0676868,
    "name": "The Corner | London City",
    "city": "London"
  },
  {
    "id": "ChIJY2v2lmYFdkgR1Amg7ZuXL10",
    "lat": 51.4892704,
    "lng": -0.1802466,
    "name": "Blakes Hotel London",
    "city": "London"
  },
  {
    "id": "ChIJs3AXzDIbdkgRWE0xp5kzxDg",
    "lat": 51.5151226,
    "lng": -0.127327,
    "name": "Forbidden Planet London Megastore",
    "city": "London"
  },
  {
    "id": "ChIJpwrHSNAEdkgR1YO1RjflYXw",
    "lat": 51.5062078,
    "lng": -0.1308167,
    "name": "Institute of Contemporary Arts",
    "city": "London"
  },
  {
    "id": "ChIJ5574rdIEdkgRA9294QpXDhw",
    "lat": 51.51430149999999,
    "lng": -0.1299049,
    "name": "Foyles",
    "city": "London"
  },
  {
    "id": "ChIJFYZBICsbdkgRe463WppyLmw",
    "lat": 51.514308,
    "lng": -0.1485906,
    "name": "hmv",
    "city": "London"
  },
  {
    "id": "ChIJWfz4VMwEdkgR7bjsNM2G8Zc",
    "lat": 51.5130721,
    "lng": -0.1254118,
    "name": "Stanfords",
    "city": "London"
  },
  {
    "id": "ChIJ7ZH9WTIbdkgRaqoULPHECbs",
    "lat": 51.5128992,
    "lng": -0.1341537,
    "name": "Gosh! Comics",
    "city": "London"
  },
  {
    "id": "ChIJMdQLx1ADdkgRX2ejcEJ3itE",
    "lat": 51.517514,
    "lng": -0.08106939999999999,
    "name": "WHSmith",
    "city": "London"
  },
  {
    "id": "ChIJMY3kda0adkgR8iWhElbhuNo",
    "lat": 51.51636430000001,
    "lng": -0.1760732,
    "name": "WHSmith",
    "city": "London"
  },
  {
    "id": "ChIJmb5LTyQbdkgR61KXIDUh3Kg",
    "lat": 51.5280991,
    "lng": -0.1332084,
    "name": "WHSmith",
    "city": "London"
  },
  {
    "id": "ChIJ9xRLVi4bdkgRqwdAA5ENLms",
    "lat": 51.522448,
    "lng": -0.132181,
    "name": "Waterstones",
    "city": "London"
  },
  {
    "id": "ChIJVUn058AEdkgRt8wUGDUkYKs",
    "lat": 51.4995945,
    "lng": -0.1192481,
    "name": "WHSmith",
    "city": "London"
  },
  {
    "id": "ChIJ7Y2qk9YadkgRR-6tnaQQS3U",
    "lat": 51.52118109999999,
    "lng": -0.1451121,
    "name": "Royal Institute of British Architects",
    "city": "London"
  },
  {
    "id": "ChIJLzHPqzQbdkgRjkG_F2CreN4",
    "lat": 51.515159,
    "lng": -0.123135,
    "name": "Oxfam Covent Garden",
    "city": "London"
  },
  {
    "id": "ChIJ9U2ITV8EdkgRwxOzR_xut3k",
    "lat": 51.47223839999999,
    "lng": -0.1228525,
    "name": "Station News",
    "city": "London"
  },
  {
    "id": "ChIJ8bsd_s4adkgRHxTPKUcImjI",
    "lat": 51.5226212,
    "lng": -0.1631543,
    "name": "WHSmith",
    "city": "London"
  },
  {
    "id": "ChIJuatQQM0EdkgR7k3Pvf0yl2Q",
    "lat": 51.5136333,
    "lng": -0.1283518,
    "name": "FOPP",
    "city": "London"
  },
  {
    "id": "ChIJcdIlkZAbdkgR5o7BubA8QVg",
    "lat": 51.56809879999999,
    "lng": -0.109556,
    "name": "New Beacon Books",
    "city": "London"
  },
  {
    "id": "ChIJXbedg3MQdkgRchG3O5v6SHw",
    "lat": 51.5387192,
    "lng": -0.1948116,
    "name": "WHSmith",
    "city": "London"
  },
  {
    "id": "ChIJt1436h0QdkgRi0cMrFtVG74",
    "lat": 51.516101,
    "lng": -0.2045212,
    "name": "Rough Trade West",
    "city": "London"
  },
  {
    "id": "ChIJWSfjkYwcdkgRCQ_GDADfPrM",
    "lat": 51.568289,
    "lng": -0.143021,
    "name": "LUX",
    "city": "London"
  },
  {
    "id": "ChIJbxA5VFAbdkgROOWlBpCGTbo",
    "lat": 51.5231933,
    "lng": -0.1038242,
    "name": "Church of Saint John",
    "city": "London"
  },
  {
    "id": "ChIJLbx4p0oDdkgRnkfgPJ5GrzQ",
    "lat": 51.5141456,
    "lng": -0.0704572,
    "name": "St. George's German Lutheran Church",
    "city": "London"
  },
  {
    "id": "ChIJwRDauFUDdkgRsDqykkv9GA4",
    "lat": 51.51118719999999,
    "lng": -0.09223680000000001,
    "name": "St Michael's Church : Paternoster Royal",
    "city": "London"
  },
  {
    "id": "ChIJEWo1Ea0cdkgRvYmGaUyTrk0",
    "lat": 51.51662820000001,
    "lng": -0.08439959999999999,
    "name": "All Hallows-On-The Wall",
    "city": "London"
  },
  {
    "id": "ChIJA_Hzo74EdkgRGC383vbqDuw",
    "lat": 51.4983138,
    "lng": -0.1116668,
    "name": "Christ Church & Upton Chapel",
    "city": "London"
  },
  {
    "id": "ChIJLzVDusQEdkgRelObBaL_jto",
    "lat": 51.49936950000001,
    "lng": -0.1272993,
    "name": "Westminster Abbey",
    "city": "London"
  },
  {
    "id": "ChIJh7wHoqwEdkgR3l-vqQE1HTo",
    "lat": 51.51384530000001,
    "lng": -0.0983506,
    "name": "St. Paul's Cathedral",
    "city": "London"
  },
  {
    "id": "ChIJQc8Gx98EdkgR5QHuYQVkxwI",
    "lat": 51.49580899999999,
    "lng": -0.13944,
    "name": "Westminster Cathedral",
    "city": "London"
  },
  {
    "id": "ChIJRfyrbbMEdkgR79OO2x9D8is",
    "lat": 51.5132637,
    "lng": -0.1102647,
    "name": "Temple Church",
    "city": "London"
  },
  {
    "id": "ChIJqdKJYEEFdkgRPQ4l8JtVt5E",
    "lat": 51.4978016,
    "lng": -0.169831,
    "name": "Holy Trinity Brompton",
    "city": "London"
  },
  {
    "id": "ChIJP5Sa4mQbdkgRap5dw8Uncf0",
    "lat": 51.5447911,
    "lng": -0.1025174,
    "name": "Union Chapel",
    "city": "London"
  },
  {
    "id": "ChIJtyCyl9YEdkgRmLDsf1NLqk8",
    "lat": 51.5088097,
    "lng": -0.1368045,
    "name": "St James's Piccadilly",
    "city": "London"
  },
  {
    "id": "ChIJ10QUYVUDdkgReZz-4I-p1i0",
    "lat": 51.513743,
    "lng": -0.0936438,
    "name": "St Mary-le-Bow Church",
    "city": "London"
  },
  {
    "id": "ChIJ1aSDEVcDdkgRcnd_8l9Qbh4",
    "lat": 51.5061009,
    "lng": -0.08959579999999999,
    "name": "Southwark Cathedral",
    "city": "London"
  },
  {
    "id": "ChIJH-tBOc4EdkgRIsJgzUZIjXU",
    "lat": 51.50879080000001,
    "lng": -0.1267527,
    "name": "St Martin-in-the-Fields",
    "city": "London"
  },
  {
    "id": "ChIJK74OQv8PdkgRQfZEmvIuLbs",
    "lat": 51.51072929999999,
    "lng": -0.1889842,
    "name": "Opus Dei Information Office",
    "city": "London"
  },
  {
    "id": "ChIJ_YMVEcwEdkgR-C3SheywDBM",
    "lat": 51.511557,
    "lng": -0.1236935,
    "name": "St Paul’s Church Covent Garden",
    "city": "London"
  },
  {
    "id": "ChIJs7PCd9IadkgRnYSBfN33VYc",
    "lat": 51.5181906,
    "lng": -0.1525259,
    "name": "St James' Roman Catholic Church",
    "city": "London"
  },
  {
    "id": "ChIJtxsqpbgEdkgRFRRIc9yj-xE",
    "lat": 51.4970748,
    "lng": -0.1695205,
    "name": "London Oratory",
    "city": "London"
  },
  {
    "id": "ChIJO-5OyDYbdkgRVs96NiyQ5hI",
    "lat": 51.5209846,
    "lng": -0.1224565,
    "name": "St George the Martyr Church",
    "city": "London"
  },
  {
    "id": "ChIJUe_EX7McdkgRUyuFGZPputs",
    "lat": 51.52913400000001,
    "lng": -0.06982570000000002,
    "name": "Columbia Road Flower Market",
    "city": "London"
  },
  {
    "id": "ChIJbWxQQNUEdkgRhGi4wW58jm0",
    "lat": 51.51380529999999,
    "lng": -0.1401185,
    "name": "Wild At Heart at Liberty",
    "city": "London"
  },
  {
    "id": "ChIJH6xa3j4bdkgR6mn8QIV3qec",
    "lat": 51.5319149,
    "lng": -0.1204837,
    "name": "Aflorum - Florist",
    "city": "London"
  },
  {
    "id": "ChIJ-9gvK18FdkgRRg2q-JSPHWE",
    "lat": 51.4993565,
    "lng": -0.185426,
    "name": "Kensington Flowers",
    "city": "London"
  },
  {
    "id": "ChIJpQ8BG2gFdkgRZEst_TTSZH0",
    "lat": 51.49408200000001,
    "lng": -0.1758866,
    "name": "South Kensington Farmers' Market",
    "city": "London"
  },
  {
    "id": "ChIJwbvREGwFdkgR2gvQqpZ3to4",
    "lat": 51.4876767,
    "lng": -0.1690865,
    "name": "The Flower Yard",
    "city": "London"
  },
  {
    "id": "ChIJOxmeAWIbdkgR5NdbeisG_EA",
    "lat": 51.53340909999999,
    "lng": -0.1102482,
    "name": "Islington Farmers' Market",
    "city": "London"
  },
  {
    "id": "ChIJqXaf5OcQdkgRuNhkLcXAVGc",
    "lat": 51.5564973,
    "lng": -0.1773761,
    "name": "Sayeh and Galton Flowers",
    "city": "London"
  },
  {
    "id": "ChIJheoFwOAPdkgR9p66TiEOrl8",
    "lat": 51.51062160000001,
    "lng": -0.209858,
    "name": "Harper & Tom's Flowers",
    "city": "London"
  },
  {
    "id": "ChIJ-Z8KimcbdkgRgPdotRXeWTA",
    "lat": 51.535725,
    "lng": -0.104275,
    "name": "Angel Flowers",
    "city": "London"
  },
  {
    "id": "ChIJhdyHQD0QdkgRPIKoBbi_2oU",
    "lat": 51.4945139,
    "lng": -0.06242200000000001,
    "name": "Floral Symphonies by Nichlas Vilsmark",
    "city": "London"
  },
  {
    "id": "ChIJfQSVtukFdkgRM9HZJM2bkQg",
    "lat": 51.4447498,
    "lng": -0.1665954,
    "name": "London Funeral Flowers",
    "city": "London"
  },
  {
    "id": "ChIJ0Yx0xz4DdkgRZ90cD1WbZ6A",
    "lat": 51.4983873,
    "lng": -0.0655545,
    "name": "Greens Florist",
    "city": "London"
  },
  {
    "id": "ChIJJVh2VPoEdkgRzJ4b467XuXw",
    "lat": 51.4801414,
    "lng": -0.1389138,
    "name": "NB Flowers",
    "city": "London"
  },
  {
    "id": "ChIJ38V1ZvsPdkgRuc8v2lnNWQw",
    "lat": 51.5092344,
    "lng": -0.1946003,
    "name": "Flowers on the Hill Tylers",
    "city": "London"
  },
  {
    "id": "ChIJJVh2VPoEdkgRbyvzCsJGe0o",
    "lat": 51.4808064,
    "lng": -0.1308615,
    "name": "Sophie Hanna Flowers Ltd",
    "city": "London"
  },
  {
    "id": "ChIJCUhDuKcFdkgRas84mqEQJ-8",
    "lat": 51.47101929999999,
    "lng": -0.1540701,
    "name": "Woodbrown Ltd",
    "city": "London"
  },
  {
    "id": "ChIJ_cxGO0QPdkgRRmyIbpX8krc",
    "lat": 51.4448217,
    "lng": -0.2042968,
    "name": "SW Blooms Florist",
    "city": "London"
  },
  {
    "id": "ChIJbWdh74EEdkgRzfHi4vB-p6g",
    "lat": 51.4772372,
    "lng": -0.0945396,
    "name": "Laura Kuy",
    "city": "London"
  },
  {
    "id": "ChIJvxJpQhcDdkgR2ehc_KbfswY",
    "lat": 51.490903,
    "lng": -0.0587169,
    "name": "Veevers Carter | Floral Design & Event Styling",
    "city": "London"
  },
  {
    "id": "ChIJNyXO_0kddkgRE_bmUIVAcwc",
    "lat": 51.5231445,
    "lng": -0.0272155,
    "name": "Tower Hamlets Cemetery Park",
    "city": "London"
  },
  {
    "id": "ChIJcVGPC04adkgRz3sYF-jM_pk",
    "lat": 51.5669188,
    "lng": -0.1467755,
    "name": "Highgate Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJpdP1RX0FdkgRP0tgjUliNco",
    "lat": 51.4840418,
    "lng": -0.1898014,
    "name": "Brompton Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJjXUrMakcdkgR3HUnTMZ8jrA",
    "lat": 51.523686,
    "lng": -0.08873400000000001,
    "name": "Bunhill Fields Burial Ground",
    "city": "London"
  },
  {
    "id": "ChIJ1URFFKwDdkgRXzYNQkWcmnM",
    "lat": 51.4624771,
    "lng": -0.0500312,
    "name": "Nunhead Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJX5ZsHGEcdkgR0ECJJ1Ud9Eg",
    "lat": 51.5641778,
    "lng": -0.0776722,
    "name": "Abney Park Cemetery Trust",
    "city": "London"
  },
  {
    "id": "ChIJrX6A2QYGdkgRfeTq56iwYFI",
    "lat": 51.428036,
    "lng": -0.180223,
    "name": "Lambeth Cemetery and Crematorium",
    "city": "London"
  },
  {
    "id": "ChIJJepfEwMEdkgRXtxULg7ufmI",
    "lat": 51.4328499,
    "lng": -0.09894420000000001,
    "name": "West Norwood Cemetery and Crematorium",
    "city": "London"
  },
  {
    "id": "ChIJq_2X-o4PdkgRozWn5B4GdHA",
    "lat": 51.45817019999999,
    "lng": -0.2062753,
    "name": "Mary Treacy Designs",
    "city": "London"
  },
  {
    "id": "ChIJI7ucDZwDdkgRpRESVkVV7Ro",
    "lat": 51.4684092,
    "lng": -0.0772786,
    "name": "Iyouface Limited",
    "city": "London"
  },
  {
    "id": "ChIJuytgnEYCdkgRPGraaLHPCR0",
    "lat": 51.4565514,
    "lng": -0.03146890000000001,
    "name": "Brockley & Ladywell Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJw7JVn74PdkgR-T2G03D0CkU",
    "lat": 51.4888004,
    "lng": -0.2154066000000001,
    "name": "Margravine Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJaz7zymIQdkgR6bPbk8m3Bgw",
    "lat": 51.55638130000001,
    "lng": -0.1965639,
    "name": "Hampstead Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJF-vrqTMQdkgRK4qxEFLvXg4",
    "lat": 51.5287341,
    "lng": -0.2325029,
    "name": "St Mary's Catholic Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJbck90EoCdkgRQDcjjFEgdY0",
    "lat": 51.4534907,
    "lng": -0.0465752,
    "name": "Camberwell New Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJdy462G0QdkgRyY3sljD8WLU",
    "lat": 51.53902249999999,
    "lng": -0.2051642,
    "name": "Paddington Old Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJMaoP9rgDdkgR_AZeE-XrPFg",
    "lat": 51.44997550000001,
    "lng": -0.06074649999999999,
    "name": "Camberwell Old Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJ9S5h2eIFdkgRq9sXzjBEHgA",
    "lat": 51.4324299,
    "lng": -0.1764777,
    "name": "Streatham Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJFUIzm6MPdkgRW-F4yQXyFM4",
    "lat": 51.4803886,
    "lng": -0.216478,
    "name": "Fulham Cemetery",
    "city": "London"
  },
  {
    "id": "ChIJZ8n2ypYFdkgRJBk6_Bu3jjQ",
    "lat": 51.458505,
    "lng": -0.169836,
    "name": "St. Mary's Cemetery - Wandsworth",
    "city": "London"
  },
  {
    "id": "ChIJURfsgdMPdkgRU5iB2JSVX78",
    "lat": 51.50927810000001,
    "lng": -0.2321093,
    "name": "MATRADE Loftus Road Stadium",
    "city": "London"
  },
  {
    "id": "ChIJO14pRXYbdkgRkM-CgzxxADY",
    "lat": 51.5550821,
    "lng": -0.1083998,
    "name": "Emirates Stadium",
    "city": "London"
  },
  {
    "id": "ChIJsTWPS4YPdkgRHtLvawx5Ed4",
    "lat": 51.4815637,
    "lng": -0.1909267,
    "name": "Chelsea Football Club",
    "city": "London"
  },
  {
    "id": "ChIJV4FIpKcPdkgRBS2UjWR_N6A",
    "lat": 51.4749003,
    "lng": -0.2216078,
    "name": "Craven Cottage",
    "city": "London"
  },
  {
    "id": "ChIJV5-mhJIEdkgRmHI3O4IrEdU",
    "lat": 51.4837565,
    "lng": -0.1149737,
    "name": "The Oval",
    "city": "London"
  },
  {
    "id": "ChIJxyoatjIddkgRLUmDKQOwhlg",
    "lat": 51.5192054,
    "lng": -0.0321641,
    "name": "Mile End Park Leisure Centre and Stadium",
    "city": "London"
  },
  {
    "id": "ChIJe9Xg-NIadkgRcZEW28YZ_kU",
    "lat": 51.5173829,
    "lng": -0.1503182,
    "name": "International Stadia Group",
    "city": "London"
  },
  {
    "id": "ChIJAc9gzegDdkgR5WbXIpREnuE",
    "lat": 51.4429099,
    "lng": -0.07300250000000001,
    "name": "Southwark Sports Ground",
    "city": "London"
  },
  {
    "id": "ChIJPW-XS4YPdkgR-GWlHng4qkg",
    "lat": 51.481663,
    "lng": -0.1909565,
    "name": "Stamford Bridge",
    "city": "London"
  },
  {
    "id": "ChIJ4WPCXBwDdkgRR_j5SNhnVjU",
    "lat": 51.4866716,
    "lng": -0.05102669999999999,
    "name": "The Den",
    "city": "London"
  },
  {
    "id": "ChIJYRGCL7oDdkgRmhOb7z1ZRgs",
    "lat": 51.4577298,
    "lng": -0.0608091,
    "name": "Bowling Green",
    "city": "London"
  },
  {
    "id": "ChIJWbXodWkddkgRlM62BUak_Oc",
    "lat": 51.5386761,
    "lng": -0.0172211,
    "name": "London Stadium",
    "city": "London"
  },
  {
    "id": "ChIJd5VyXWgBdkgR0UQArsPDtgo",
    "lat": 51.4210847,
    "lng": -0.0674402,
    "name": "Crystal Palace National Sports Centre",
    "city": "London"
  },
  {
    "id": "ChIJryT5stQRdkgRQ08zJH46uAg",
    "lat": 51.5192317,
    "lng": -0.2353799,
    "name": "Linford Christie Stadium",
    "city": "London"
  },
  {
    "id": "ChIJofZ4CyMOdkgR0izlf7lUH58",
    "lat": 51.5092761,
    "lng": -0.2321091,
    "name": "Five Star Nails",
    "city": "London"
  },
  {
    "id": "ChIJjc7pOjQPdkgRtoQUw7LnHsY",
    "lat": 51.43532190000001,
    "lng": -0.2147903,
    "name": "No.1 Court | Wimbledon",
    "city": "London"
  },
  {
    "id": "ChIJY50nF2T2W48R1VCxttrW928",
    "lat": 51.50951329999999,
    "lng": -0.1303329,
    "name": "Orange Walk People's Stadium",
    "city": "London"
  },
  {
    "id": "ChIJr71f1KcbdkgRK0vnHoChjuM",
    "lat": 51.5193035,
    "lng": -0.1331542,
    "name": "Laptop Shopping Centre",
    "city": "London"
  },
  {
    "id": "ChIJYXkpTvBx30cR_363qYhZQT4",
    "lat": 51.52081,
    "lng": -0.1080696,
    "name": "Top Football Trials UK",
    "city": "London"
  },
  {
    "id": "ChIJR_jJKwAbdkgR7V9wd-SsLmE",
    "lat": 51.52600479999999,
    "lng": -0.0962888,
    "name": "The Tesco End",
    "city": "London"
  },
  {
    "id": "ChIJ_09VT1QDdkgRyPwk2CL0uSU",
    "lat": 51.5110809,
    "lng": -0.09035030000000001,
    "name": "Cannon Street",
    "city": "London"
  },
  {
    "id": "ChIJ85vnMskEdkgRizGhXNN3k6o",
    "lat": 51.5072554,
    "lng": -0.1221937,
    "name": "Embankment",
    "city": "London"
  },
  {
    "id": "ChIJjb5P89sEdkgR6gnY-YukPug",
    "lat": 51.499479,
    "lng": -0.1337107,
    "name": "St. James' Park",
    "city": "London"
  },
  {
    "id": "ChIJ0160ScQEdkgR3zgV673t8yU",
    "lat": 51.50134299999999,
    "lng": -0.1248413,
    "name": "Westminster",
    "city": "London"
  },
  {
    "id": "ChIJuWi7o-YEdkgRuUKA7QR2BYU",
    "lat": 51.4892548,
    "lng": -0.133332,
    "name": "Pimlico",
    "city": "London"
  },
  {
    "id": "ChIJ8YCOY-4EdkgR1BkL52PYoQg",
    "lat": 51.4862901,
    "lng": -0.1235781,
    "name": "Vauxhall",
    "city": "London"
  },
  {
    "id": "ChIJvwo7q74EdkgRezYeI2NSMCs",
    "lat": 51.4989177,
    "lng": -0.1121086,
    "name": "Lambeth North",
    "city": "London"
  },
  {
    "id": "ChIJF4o0NLgEdkgRjBPR6vZ4dsg",
    "lat": 51.5030796,
    "lng": -0.1151239,
    "name": "Waterloo",
    "city": "London"
  },
  {
    "id": "ChIJra2jTs4EdkgRshPsDJz8OM0",
    "lat": 51.5084994,
    "lng": -0.1258604,
    "name": "Charing Cross",
    "city": "London"
  },
  {
    "id": "ChIJl55TqZAEdkgRCqQtpLZu6r0",
    "lat": 51.48827370000001,
    "lng": -0.105614,
    "name": "Kennington",
    "city": "London"
  },
  {
    "id": "ChIJQRZgSygFdkgRrZelNQQCpf8",
    "lat": 51.5069327,
    "lng": -0.1428838,
    "name": "Green Park",
    "city": "London"
  },
  {
    "id": "ChIJ9e-Ww40EdkgRJ2VJq1BlX-s",
    "lat": 51.48202719999999,
    "lng": -0.1127875,
    "name": "Oval",
    "city": "London"
  },
  {
    "id": "ChIJvVRe4NMEdkgRw3WgQO_J9KM",
    "lat": 51.510121,
    "lng": -0.1341683,
    "name": "Piccadilly Circus",
    "city": "London"
  },
  {
    "id": "ChIJGfGBUKUEdkgRSTEeQf5Ux-U",
    "lat": 51.50392600000001,
    "lng": -0.1049685,
    "name": "Southwark",
    "city": "London"
  },
  {
    "id": "ChIJ98Dokc0EdkgRy3-ajwvdD94",
    "lat": 51.511451,
    "lng": -0.128144,
    "name": "Leicester Square",
    "city": "London"
  },
  {
    "id": "ChIJI9JoOqIEdkgRm1W33pepbrs",
    "lat": 51.4946011,
    "lng": -0.100329,
    "name": "Elephant & Castle",
    "city": "London"
  },
  {
    "id": "ChIJP3ORNSUFdkgRH5WN6MNz4a8",
    "lat": 51.50302629999999,
    "lng": -0.1523499,
    "name": "Hyde Park Corner",
    "city": "London"
  },
  {
    "id": "ChIJgwqKNbQEdkgRCSsg7ZTLjzM",
    "lat": 51.51099980000001,
    "lng": -0.1142932,
    "name": "Temple",
    "city": "London"
  },
  {
    "id": "ChIJT2mIkcwEdkgRYspzsBq1iAM",
    "lat": 51.51300070000001,
    "lng": -0.1241621,
    "name": "Covent Garden",
    "city": "London"
  },
  {
    "id": "ChIJX4cORhYFdkgRdaAZPP16Y8w",
    "lat": 51.4923519,
    "lng": -0.1564328,
    "name": "Sloane Square",
    "city": "London"
  },
  {
    "id": "ChIJ4c-TnrQcdkgR9sYTpHBhsvE",
    "lat": 51.51651219999999,
    "lng": -0.076038,
    "name": "Watson & Sons",
    "city": "London"
  },
  {
    "id": "ChIJ28VF94UCdkgRarSkmJosBIg",
    "lat": 51.47895279999999,
    "lng": -0.0112261,
    "name": "Soma Dry Cleaners",
    "city": "London"
  },
  {
    "id": "ChIJve49WfEEdkgRcAMtZCNl3_M",
    "lat": 51.4790345,
    "lng": -0.1233897,
    "name": "Trend Dry Cleaners",
    "city": "London"
  },
  {
    "id": "ChIJf5jbxwAFdkgRkO6Ajl5ZlDM",
    "lat": 51.4746355,
    "lng": -0.1454931,
    "name": "Julius Rutherfoord & Co Ltd",
    "city": "London"
  },
  {
    "id": "ChIJJ9s2Vl0CdkgRBrd3OqgL3aA",
    "lat": 51.46292949999999,
    "lng": -0.0235006,
    "name": "Brookbank Dry Cleaners",
    "city": "London"
  },
  {
    "id": "ChIJS1AMDQIQdkgR1mYGlnSPvKs",
    "lat": 51.5154103,
    "lng": -0.195318,
    "name": "Infusion Haberdashery & Party Shop",
    "city": "London"
  },
  {
    "id": "ChIJ41iuU0IbdkgRF3zMoMv8Tjs",
    "lat": 51.5336,
    "lng": -0.109216,
    "name": "Gaps Dry Cleaners",
    "city": "London"
  },
  {
    "id": "ChIJG8Q4dSsFdkgROBaAzvmtTDI",
    "lat": 51.512247,
    "lng": -0.145425,
    "name": "City Centre Dry Cleaners",
    "city": "London"
  },
  {
    "id": "ChIJEeDL634bdkgRPpA9_0ZIsbs",
    "lat": 51.553366,
    "lng": -0.09823609999999999,
    "name": "Andrews Dry Cleaners",
    "city": "London"
  },
  {
    "id": "ChIJ3Vp7rB4FdkgRIRe2l99NYUY",
    "lat": 51.48890069999999,
    "lng": -0.1466525,
    "name": "Pimlico Launderette and Dry cleaner.",
    "city": "London"
  },
  {
    "id": "ChIJo20LhTYbdkgR-x4Wy6jHHFg",
    "lat": 51.5208478,
    "lng": -0.1210976,
    "name": "Boswell Laundry",
    "city": "London"
  },
  {
    "id": "ChIJc0F9S1MFdkgRohCiAHCMh7U",
    "lat": 51.5148447,
    "lng": -0.1810357,
    "name": "Chilworths Launderette",
    "city": "London"
  },
  {
    "id": "ChIJ4TryR0gDdkgRssqCVeJhTnY",
    "lat": 51.5068109,
    "lng": -0.072625,
    "name": "Lagoon Dry Cleaners",
    "city": "London"
  },
  {
    "id": "ChIJqdx5tPgFdkgR_6EPPUgBJP8",
    "lat": 51.4357754,
    "lng": -0.1861869,
    "name": "Earlsfield Laundry and Dry Cleaning",
    "city": "London"
  },
  {
    "id": "ChIJu0pWo2obdkgRaGv1s1ZhK_g",
    "lat": 51.5366477,
    "lng": -0.1163803,
    "name": "2Busy2Clean",
    "city": "London"
  },
  {
    "id": "ChIJAQBFC2EbdkgRTJ1zsJeW6Jc",
    "lat": 51.539934,
    "lng": -0.097263,
    "name": "Exclusive Drycleaning & Tailoring",
    "city": "London"
  },
  {
    "id": "ChIJ47yhuYwadkgRCgpysTsWFEY",
    "lat": 51.550512,
    "lng": -0.1652918,
    "name": "The Master Cleaners London",
    "city": "London"
  },
  {
    "id": "ChIJTcjdjVoQdkgRuP7EoyBFdUk",
    "lat": 51.5483305,
    "lng": -0.2227855,
    "name": "Shannel",
    "city": "London"
  },
  {
    "id": "ChIJaZynQTwFdkgRV-I_YktgDhg",
    "lat": 51.4975843,
    "lng": -0.1568743,
    "name": "Jeeves of Belgravia",
    "city": "London"
  },
  {
    "id": "ChIJhXVybVUadkgRtt1Cc03irMQ",
    "lat": 51.5581606,
    "lng": -0.1432974,
    "name": "The Choice",
    "city": "London"
  },
  {
    "id": "ChIJTZ98odkPdkgRDGbnRTSQUuI",
    "lat": 51.50757249999999,
    "lng": -0.2212054,
    "name": "Westfield London",
    "city": "London"
  },
  {
    "id": "ChIJYyCDk6oEdkgR9Ni5bq_oClo",
    "lat": 51.513924,
    "lng": -0.0954749,
    "name": "One New Change",
    "city": "London"
  },
  {
    "id": "ChIJr5Trb98EdkgR726OHLFbM_U",
    "lat": 51.49710020000001,
    "lng": -0.141117,
    "name": "Cardinal Place",
    "city": "London"
  },
  {
    "id": "ChIJI7h_SjcbdkgRJcCnnXzZM2Q",
    "lat": 51.5247596,
    "lng": -0.1240282,
    "name": "The Brunswick Centre",
    "city": "London"
  },
  {
    "id": "ChIJh7MHVRyo2EcR39q58wztHZg",
    "lat": 51.503038,
    "lng": 0.0031543,
    "name": "The O2",
    "city": "London"
  },
  {
    "id": "ChIJjyvv_9UEdkgRUrbU725BBf4",
    "lat": 51.5083408,
    "lng": -0.1395758,
    "name": "Burlington Arcade",
    "city": "London"
  },
  {
    "id": "ChIJ4Z9Tf_0EdkgRXVFCTtu_oJY",
    "lat": 51.48202029999999,
    "lng": -0.1444907,
    "name": "Battersea Power Station",
    "city": "London"
  },
  {
    "id": "ChIJPV8LDLQcdkgRIpMgY4PtZFk",
    "lat": 51.5193763,
    "lng": -0.07612880000000001,
    "name": "Spitalfields Arts Market",
    "city": "London"
  },
  {
    "id": "ChIJo8nAalUEdkgRbnZFZL_0dTk",
    "lat": 51.47209019999999,
    "lng": -0.1384345,
    "name": "C I C",
    "city": "London"
  },
  {
    "id": "ChIJuXbHt8QPdkgRvYiaN4tKDYo",
    "lat": 51.50349670000001,
    "lng": -0.2191805,
    "name": "W12 Shopping",
    "city": "London"
  },
  {
    "id": "ChIJ-_qszRUFdkgRg1yMDxTSBy8",
    "lat": 51.4914045,
    "lng": -0.1597764,
    "name": "Duke of York Square",
    "city": "London"
  },
  {
    "id": "ChIJafUJFSsbdkgRCvkaQ7H6pdY",
    "lat": 51.5163747,
    "lng": -0.1366532,
    "name": "The Plaza",
    "city": "London"
  },
  {
    "id": "ChIJ2f1qf7oCdkgR6OYmvqAharw",
    "lat": 51.5045554,
    "lng": -0.0148963,
    "name": "Churchill Place Shopping Mall",
    "city": "London"
  },
  {
    "id": "ChIJkeqi4m8CdkgRMxS8gTn4R4I",
    "lat": 51.46175909999999,
    "lng": -0.0119106,
    "name": "Lewisham Shopping Centre",
    "city": "London"
  },
  {
    "id": "ChIJARwD3ywFdkgRohfrHMp-WgM",
    "lat": 51.5139278,
    "lng": -0.1492707,
    "name": "West One",
    "city": "London"
  },
  {
    "id": "ChIJM59YZYMadkgRQDsgsm1TKKA",
    "lat": 51.5478286,
    "lng": -0.1814281,
    "name": "O2 Centre",
    "city": "London"
  },
  {
    "id": "ChIJ6SYytc0FdkgRUivhNc0VtjU",
    "lat": 51.4437285,
    "lng": -0.1443892,
    "name": "The Wooden Floor Specialists Limited",
    "city": "London"
  },
  {
    "id": "ChIJy8ITMKADdkgROmCfI4UHrUE",
    "lat": 51.47120450000001,
    "lng": -0.06997790000000001,
    "name": "Rye Lane Market",
    "city": "London"
  },
  {
    "id": "ChIJWdQWzCwFdkgRHZyy9GqfjsI",
    "lat": 51.5147899,
    "lng": -0.146912,
    "name": "Sunglass Hut",
    "city": "London"
  },
  {
    "id": "ChIJnScV6xkGdkgR7oCzfMm3BzQ",
    "lat": 51.4138525,
    "lng": -0.1777389,
    "name": "Tandem Centre",
    "city": "London"
  },
  {
    "id": "ChIJR9JoZxMFdkgRZUvU7VaQTQE",
    "lat": 51.4881459,
    "lng": -0.1628046,
    "name": "Chelsea Affiliated Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJf67u2coadkgRFaOvG9A-cKc",
    "lat": 51.51545100000001,
    "lng": -0.1616306,
    "name": "West London Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJR3L110wDdkgRJm7y8n-aKgg",
    "lat": 51.514581,
    "lng": -0.0790702,
    "name": "Bevis Marks Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJqem1GP8PdkgR4uTPgXzr4qg",
    "lat": 51.51111,
    "lng": -0.1902035000000001,
    "name": "New West End Synagogue - St.Petersburgh Place",
    "city": "London"
  },
  {
    "id": "ChIJT3IWunscdkgRnYckmhUfp2o",
    "lat": 51.56419,
    "lng": -0.0863885,
    "name": "Adath Yisroel Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJy9Z8FKIadkgRPDFAeE4_d9g",
    "lat": 51.5347439,
    "lng": -0.18068,
    "name": "New London Synagogue - Masorti",
    "city": "London"
  },
  {
    "id": "ChIJ_VlnedYadkgR6NoM7NQXIro",
    "lat": 51.520567,
    "lng": -0.1434541,
    "name": "Central Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJlz6rtLsadkgR3Ip1kQKapqM",
    "lat": 51.52814650000001,
    "lng": -0.1725932,
    "name": "Liberal Jewish Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJ4RWjD-4adkgR27-YAGEHMrM",
    "lat": 51.5453678,
    "lng": -0.1583277,
    "name": "South Hampstead United Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJwcTxsN0PdkgRZzgcJyRTdOc",
    "lat": 51.5076378,
    "lng": -0.2144496,
    "name": "Holland Park Sephardi Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJBW4gnWkcdkgRo9_CizyaUw0",
    "lat": 51.5721644,
    "lng": -0.0732298,
    "name": "Lubavitch House",
    "city": "London"
  },
  {
    "id": "ChIJKfeOUssadkgR7CLiDlyvwdY",
    "lat": 51.51508820000001,
    "lng": -0.159146,
    "name": "Western Marble Arch Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJ20y8pacadkgRKSSA1mpyyDg",
    "lat": 51.5277179,
    "lng": -0.1844978,
    "name": "Lauderdale Road Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJ2bc-VYUadkgRI8XTkpO_tvY",
    "lat": 51.5464852,
    "lng": -0.176582,
    "name": "The De Laszlo Hall",
    "city": "London"
  },
  {
    "id": "ChIJoblyyYkcdkgR3kVqVd4zBD8",
    "lat": 51.5559538,
    "lng": -0.07892450000000001,
    "name": "Walford Road Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJOYzu3G8cdkgRijyyP2ImOY8",
    "lat": 51.56910009999999,
    "lng": -0.0813803,
    "name": "Pinters Shul",
    "city": "London"
  },
  {
    "id": "ChIJWe1UK70adkgRnBlXOurA1vg",
    "lat": 51.5336037,
    "lng": -0.1761995,
    "name": "St Johns Wood United Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJfdGLe0IcdkgRxCCq5Oq07gs",
    "lat": 51.57041859999999,
    "lng": -0.06978440000000001,
    "name": "Tchabe Kollel Ltd",
    "city": "London"
  },
  {
    "id": "ChIJcVTb440adkgRrTwt1L0C_DA",
    "lat": 51.54735599999999,
    "lng": -0.1705148,
    "name": "Belsize Square Synagogue",
    "city": "London"
  },
  {
    "id": "ChIJ_fxTvbMcdkgR2Wt4_HEPIHo",
    "lat": 51.5182941,
    "lng": -0.0779444,
    "name": "Sandy's Row synagogue",
    "city": "London"
  },
  {
    "id": "ChIJNSlpLEMQdkgRAsGzax6lbCI",
    "lat": 51.5461186,
    "lng": -0.215125,
    "name": "Shree Swaminarayan Hindu Mandir",
    "city": "London"
  },
  {
    "id": "ChIJuyKBsbQbdkgR8QSdA6oF1A8",
    "lat": 51.5734319,
    "lng": -0.1405911,
    "name": "Highgate Hill Murugan Temple",
    "city": "London"
  },
  {
    "id": "ChIJGVmcRpIGdkgRglLwdosWBf8",
    "lat": 51.4134677,
    "lng": -0.1268523,
    "name": "Shree Swaminarayan Temple, Streatham",
    "city": "London"
  },
  {
    "id": "ChIJyw0mb1sFdkgRxuGSLIeQLms",
    "lat": 51.5003922,
    "lng": -0.1781911,
    "name": "Imperial Cinema",
    "city": "London"
  },
  {
    "id": "ChIJgUf0Tz4EdkgRoTI_Jk8GKqo",
    "lat": 51.4486159,
    "lng": -0.1192796,
    "name": "Caribbean Hindu Cultural Society - CHCS",
    "city": "London"
  },
  {
    "id": "ChIJB2xu0soDdkgRglCrz-GyrFg",
    "lat": 51.4495726,
    "lng": -0.0520743,
    "name": "Maha Lakshmi Vidya Bhavan",
    "city": "London"
  },
  {
    "id": "ChIJF4WbnDoddkgR0GPVYSO2XoM",
    "lat": 51.5259223,
    "lng": -0.0331555,
    "name": "Hindu Pragati Sangha",
    "city": "London"
  },
  {
    "id": "ChIJ_XmIeQcGdkgRKK6q8qVfbYs",
    "lat": 51.4302949,
    "lng": -0.1790209,
    "name": "Smallwood Stores",
    "city": "London"
  },
  {
    "id": "ChIJV-qKKxQCdkgRBxKcIMW5aX8",
    "lat": 51.44702969999999,
    "lng": -0.0202138,
    "name": "Sri Vel Muruhan Aalayam",
    "city": "London"
  },
  {
    "id": "ChIJLe2g2ywbdkgRDrTKK52JRWA",
    "lat": 51.5158861,
    "lng": -0.1327409,
    "name": "ISKCON London Radha-Krishna Temple",
    "city": "London"
  },
  {
    "id": "ChIJLWHltqkIdkgRj2ujvWCtYpM",
    "lat": 51.4233627,
    "lng": -0.1892624,
    "name": "Shree Ghanapathy Temple, Wimbledon",
    "city": "London"
  },
  {
    "id": "ChIJIWxw0iMFdkgRtUMVr-zPqxU",
    "lat": 51.4747504,
    "lng": -0.1402354,
    "name": "8 Seldon house",
    "city": "London"
  },
  {
    "id": "ChIJ9_e5338FdkgRCA_BQedpc48",
    "lat": 51.5144695,
    "lng": -0.1606122,
    "name": "The Cake Factory",
    "city": "London"
  },
  {
    "id": "ChIJqSTbefgFdkgR7LPspukVOSU",
    "lat": 51.46398610000001,
    "lng": -0.1147378,
    "name": "Astrologer Surya(Astrologer in london,Uk| Love problem specialist in London)",
    "city": "London"
  },
  {
    "id": "ChIJw2iD_vIFdkgRvOe8msAfGJ4",
    "lat": 51.44697570000001,
    "lng": -0.1285543,
    "name": "Dev apartment (purna)",
    "city": "London"
  },
  {
    "id": "ChIJ2yvEKHwFdkgR8Px0cxITwFg",
    "lat": 51.4464263,
    "lng": -0.1332086,
    "name": "Gungan Gamers",
    "city": "London"
  },
  {
    "id": "ChIJRchspo0FdkgR3xzKSIbcIJ4",
    "lat": 51.4471311,
    "lng": -0.1489221,
    "name": "Balham Mandir",
    "city": "London"
  },
  {
    "id": "ChIJr5cvB5QDdkgRLJkr6ZqKD-s",
    "lat": 51.45810470000001,
    "lng": -0.0691779,
    "name": "R3 Incorporated",
    "city": "London"
  },
  {
    "id": "ChIJ3SuURbQddkgRKou4vqH_yeU",
    "lat": 51.53898280000001,
    "lng": -0.0820222,
    "name": "Hindu temple London. The Only Granite Shirdi Sai Baba in Europe",
    "city": "London"
  },
  {
    "id": "ChIJE8QR-_AadkgRGoUUChYRkxM",
    "lat": 51.5496104,
    "lng": -0.1553529,
    "name": "The Hindu Centre",
    "city": "London"
  },
  {
    "id": "codeworks",
    "lat": 51.49533329691091,
    "lng": -0.1274751585067976,
    "name": "Codeworks",
    "city": "London"
  },
  {
    "id": "ChIJAVkDPzdOqEcRcDteW0YgIQQ",
    "lat": 52.52000659999999,
    "lng": 13.404954,
    "name": "Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJLTX2ud9RqEcRtiblhC9s3Rg",
    "lat": 52.5195799,
    "lng": 13.4027302,
    "name": "Radisson Collection Hotel, Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJg_Fz1B9OqEcRksIuXzrG3jg",
    "lat": 52.5232492,
    "lng": 13.4085933,
    "name": "Hotel Motel One Berlin-Hackescher Markt",
    "city": "Berlin"
  },
  {
    "id": "ChIJ4Q7iHh9OqEcRoYdM_f1daq0",
    "lat": 52.523125,
    "lng": 13.4127656,
    "name": "Park Inn by Radisson Berlin Alexanderplatz",
    "city": "Berlin"
  },
  {
    "id": "ChIJR5kGoSdOqEcRCiB4N4CC5rw",
    "lat": 52.5130453,
    "lng": 13.4051333,
    "name": "Novotel Berlin Mitte",
    "city": "Berlin"
  },
  {
    "id": "ChIJsQ4OlttRqEcR3QNihxP152w",
    "lat": 52.5157859,
    "lng": 13.3940599,
    "name": "Hotel de Rome, a Rocco Forte Hotel",
    "city": "Berlin"
  },
  {
    "id": "ChIJDxXSfyZOqEcRoyCJSyGWw2Y",
    "lat": 52.5124114,
    "lng": 13.4098762,
    "name": "art'otel Berlin Mitte",
    "city": "Berlin"
  },
  {
    "id": "ChIJ4ydW9ONRqEcRL_JZWGWGVzg",
    "lat": 52.5282753,
    "lng": 13.4028751,
    "name": "Hotel AMANO",
    "city": "Berlin"
  },
  {
    "id": "ChIJG6Jmd-BRqEcRoQljfhnH0K0",
    "lat": 52.5216333,
    "lng": 13.4042973,
    "name": "Classik Hotel Alexander Plaza, Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJNTJq9OBRqEcR3jx__4NZNuk",
    "lat": 52.5221864,
    "lng": 13.4041063,
    "name": "Adina Apartment Hotel Berlin Hackescher Markt",
    "city": "Berlin"
  },
  {
    "id": "ChIJf3vcx-BRqEcR2ipAIkznhos",
    "lat": 52.5232105,
    "lng": 13.4011667,
    "name": "Hotel Hackescher Markt",
    "city": "Berlin"
  },
  {
    "id": "ChIJj4R6a9lRqEcRXSgNFx13z3I",
    "lat": 52.5152083,
    "lng": 13.3977136,
    "name": "ARCOTEL John F Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJ46JWS-dRqEcRKCCiaJdvQ3M",
    "lat": 52.52299619999999,
    "lng": 13.3999946,
    "name": "Monbijou Hotel",
    "city": "Berlin"
  },
  {
    "id": "ChIJGWPMkR5OqEcRl4KJ1LQHHRM",
    "lat": 52.52531,
    "lng": 13.4142537,
    "name": "H2 Hotel Berlin-Alexanderplatz",
    "city": "Berlin"
  },
  {
    "id": "ChIJwUq6mx5OqEcREPAUaRdFmT4",
    "lat": 52.52544349999999,
    "lng": 13.4144888,
    "name": "H4 Hotel Berlin Alexanderplatz",
    "city": "Berlin"
  },
  {
    "id": "ChIJX2J0HtJRqEcRjZEO2tcquEU",
    "lat": 52.5229441,
    "lng": 13.4100023,
    "name": "Alexanderplatz Apartments",
    "city": "Berlin"
  },
  {
    "id": "ChIJRZmsbuFRqEcReF1ChYn1nMY",
    "lat": 52.5257485,
    "lng": 13.4040458,
    "name": "Casa Camper Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJZU4Sc-FRqEcRh3zI2VMsPR8",
    "lat": 52.5255709,
    "lng": 13.4045288,
    "name": "The Weinmeister Berlin-Mitte",
    "city": "Berlin"
  },
  {
    "id": "ChIJSdgfZiZOqEcRprUhl_atQJs",
    "lat": 52.51227189999999,
    "lng": 13.4088534,
    "name": "Living Hotel Großer Kurfürst",
    "city": "Berlin"
  },
  {
    "id": "ChIJ9RNPtDJQqEcRcGsFkvAGLKI",
    "lat": 52.5183876,
    "lng": 13.407194,
    "name": "Berliner Innenstadt",
    "city": "Berlin"
  },
  {
    "id": "ChIJ1XUUfDtRqEcRGQUpULuzqG8",
    "lat": 52.5244495,
    "lng": 13.307049,
    "name": "Lasergame Berlin GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJjc74IU1OqEcR9uDoOKSh3bI",
    "lat": 52.4983833,
    "lng": 13.4336923,
    "name": "Black Light Mini Golf Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJcTam3ZlRqEcR68Oox2o8BpA",
    "lat": 52.5209655,
    "lng": 13.3887939,
    "name": "EXIT - Live Escape Game",
    "city": "Berlin"
  },
  {
    "id": "ChIJnZLggCdMqEcRwM73SVDMXGg",
    "lat": 52.5330026,
    "lng": 13.4938938,
    "name": "WINDOBONA Indoor Skydiving Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJFe8Q4QVQqEcRlBlfOrYyUxU",
    "lat": 52.4669474,
    "lng": 13.36592,
    "name": "Malzfabrik",
    "city": "Berlin"
  },
  {
    "id": "ChIJrzNtR3ZUqEcRWruq7_LErDo",
    "lat": 52.58272950000001,
    "lng": 13.3117665,
    "name": "JUMP House Reinickendorf",
    "city": "Berlin"
  },
  {
    "id": "ChIJqVA--c1RqEcRVjqaC9Cdgss",
    "lat": 52.533024,
    "lng": 13.3849723,
    "name": "MYJUMP BERLIN MITTE – TRAMPOLINPARK & TRAMPOLINHALLE Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJ6VySx7pPqEcRf6J8NEKgilU",
    "lat": 52.5314699,
    "lng": 13.4413634,
    "name": "Jurassic Freizeit Park",
    "city": "Berlin"
  },
  {
    "id": "ChIJCfN1NPxRqEcRX1FHa4AIU3I",
    "lat": 52.5060818,
    "lng": 13.4465683,
    "name": "TIMETRAVEL.BERLIN",
    "city": "Berlin"
  },
  {
    "id": "ChIJX2t6nJFPqEcR5lIl36rVfJc",
    "lat": 52.4788889,
    "lng": 13.45068,
    "name": "Berlin Shuffleboard Club",
    "city": "Berlin"
  },
  {
    "id": "ChIJ-eyOpKtOqEcRm5QaCrLrgDI",
    "lat": 52.5250081,
    "lng": 13.5280099,
    "name": "MYJUMP BERLIN OST – TRAMPOLINPARK & TRAMPOLINHALLE Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJaW_IvapRqEcR_gdex2YGEm8",
    "lat": 52.50601729999999,
    "lng": 13.3410226,
    "name": "Aquarium Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJ17Ac0s9PqEcRdHz3rczvC2o",
    "lat": 52.4853704,
    "lng": 13.4245529,
    "name": "Lillian Hernandez",
    "city": "Berlin"
  },
  {
    "id": "ChIJnZQr_0RPqEcRyL64ZWbGcTk",
    "lat": 52.47958329999999,
    "lng": 13.4223484,
    "name": "Berthold Seliger - Büro für Musik, Texte & Strategien",
    "city": "Berlin"
  },
  {
    "id": "ChIJyWQ6LhRTqEcRLgu0P15uZhE",
    "lat": 52.57451,
    "lng": 13.33105,
    "name": "Buce4me",
    "city": "Berlin"
  },
  {
    "id": "ChIJU1kvwIRaqEcRDORkriUVAG4",
    "lat": 52.45815229999999,
    "lng": 13.3276209,
    "name": "Reef",
    "city": "Berlin"
  },
  {
    "id": "ChIJkZ3vkQNPqEcR27bEW1JKHVA",
    "lat": 52.4533238,
    "lng": 13.4717964,
    "name": "CW Schweißbedarf GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJWc-WQpJaqEcR6yDQqA790I0",
    "lat": 52.4470275,
    "lng": 13.3261719,
    "name": "Garnelen-Guemmer",
    "city": "Berlin"
  },
  {
    "id": "ChIJbeeBVsBRqEcRfLjH_Wjj9g0",
    "lat": 52.52172659999999,
    "lng": 13.3796396,
    "name": "Arte Luise Arthotel",
    "city": "Berlin"
  },
  {
    "id": "ChIJNRqweCpOqEcR9Wab9cvf6lc",
    "lat": 52.5039563,
    "lng": 13.3981579,
    "name": "Berlinische Galerie",
    "city": "Berlin"
  },
  {
    "id": "ChIJb3ygbQ1PqEcRQ-vbOHZvx-k",
    "lat": 52.4734211,
    "lng": 13.4589572,
    "name": "Estrel Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJS6_t9aZHqEcRGCiRSnvpm94",
    "lat": 52.50502239999999,
    "lng": 13.4396953,
    "name": "East Side Gallery",
    "city": "Berlin"
  },
  {
    "id": "ChIJlbANTVpOqEcRmYuZzOrj6M8",
    "lat": 52.507828,
    "lng": 13.4516096,
    "name": "Urban Spree",
    "city": "Berlin"
  },
  {
    "id": "ChIJN1JvvbNQqEcR1hBVym_OFW4",
    "lat": 52.4863347,
    "lng": 13.2714962,
    "name": "Löwenpalais",
    "city": "Berlin"
  },
  {
    "id": "ChIJc3DkFbRRqEcRrUuZhztJVVg",
    "lat": 52.5090131,
    "lng": 13.3660136,
    "name": "Gemäldegalerie",
    "city": "Berlin"
  },
  {
    "id": "ChIJzdgmXNFRqEcRJjZReHg98L4",
    "lat": 52.5073923,
    "lng": 13.3906261,
    "name": "Wall Museum - Checkpoint Charlie",
    "city": "Berlin"
  },
  {
    "id": "ChIJVZcMW8tPqEcRU5yWU2r65ew",
    "lat": 52.4972258,
    "lng": 13.4189602,
    "name": "Künstlerhaus Bethanien",
    "city": "Berlin"
  },
  {
    "id": "ChIJ15A55fxQqEcRg48rj61ZW_Q",
    "lat": 52.5055223,
    "lng": 13.3245701,
    "name": "CAMERA WORK Photogallery",
    "city": "Berlin"
  },
  {
    "id": "ChIJjxlyGeZRqEcRJMlJ2yFsPVA",
    "lat": 52.5267846,
    "lng": 13.3949752,
    "name": "KW Institute for Contemporary Art",
    "city": "Berlin"
  },
  {
    "id": "ChIJRyQVKOFRqEcRcJ2zTT4qVT4",
    "lat": 52.5245516,
    "lng": 13.4018686,
    "name": "Monsterkabinett",
    "city": "Berlin"
  },
  {
    "id": "ChIJHUwhbrZPqEcRd2H1ORY3wNE",
    "lat": 52.49120049999999,
    "lng": 13.4255113,
    "name": "AKA",
    "city": "Berlin"
  },
  {
    "id": "ChIJSWHvFLVRqEcR070b55iigGo",
    "lat": 52.50566,
    "lng": 13.36629,
    "name": "Verein Berliner Künstler",
    "city": "Berlin"
  },
  {
    "id": "ChIJs8-2M9xRqEcRU06ZH5xz0hE",
    "lat": 52.5037612,
    "lng": 13.3236565,
    "name": "Contemporary Fine Arts",
    "city": "Berlin"
  },
  {
    "id": "ChIJLUjTkNpRqEcRJzTwa9fOeUQ",
    "lat": 52.5073129,
    "lng": 13.2849544,
    "name": "art4berlin GALERIE",
    "city": "Berlin"
  },
  {
    "id": "ChIJX0V6uehNqEcRwRnj_bBDrNc",
    "lat": 52.55027330000001,
    "lng": 13.4458206,
    "name": "Sepp Maiers 2raumwohnung",
    "city": "Berlin"
  },
  {
    "id": "ChIJY9bC3PtQqEcRoNDnjbNkGOk",
    "lat": 52.5013312,
    "lng": 13.3270013,
    "name": "Grisebach GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJe4MQvuVRqEcRh7b7VA4_5FY",
    "lat": 52.5292602,
    "lng": 13.3974076,
    "name": "janinebeangallery",
    "city": "Berlin"
  },
  {
    "id": "ChIJwf9pgPxQqEcRaWM0N--jaII",
    "lat": 52.5035432,
    "lng": 13.3246584,
    "name": "Bilderrahmen R+R Galerie",
    "city": "Berlin"
  },
  {
    "id": "ChIJld4fBgFOqEcR1gR_4gT6sfY",
    "lat": 52.5380566,
    "lng": 13.4195398,
    "name": "Café Anna Blume",
    "city": "Berlin"
  },
  {
    "id": "ChIJFfMeBi9QqEcRrcT_HFvtki8",
    "lat": 52.4934926,
    "lng": 13.3818712,
    "name": "Mr. Minsch",
    "city": "Berlin"
  },
  {
    "id": "ChIJkbDq51ZFqEcRlNoKuxzxnlw",
    "lat": 52.45458669999999,
    "lng": 13.3848178,
    "name": "REDO XXL Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJm-HoPthPqEcRM3lfzmNhoh8",
    "lat": 52.48903379999999,
    "lng": 13.3934183,
    "name": "Barcomi’s Café & Kaffeerösterei",
    "city": "Berlin"
  },
  {
    "id": "ChIJQREpEnZSqEcRweCIs4tj_C4",
    "lat": 52.56884749999999,
    "lng": 13.4285552,
    "name": "star Tankstelle",
    "city": "Berlin"
  },
  {
    "id": "ChIJE21yCDNOqEcReUXVQLQXap4",
    "lat": 52.5008358,
    "lng": 13.4173427,
    "name": "SCAI BAKERY (Fräulein Wild)",
    "city": "Berlin"
  },
  {
    "id": "ChIJZdifNQBOqEcR915qcTHcI-I",
    "lat": 52.5391185,
    "lng": 13.4176004,
    "name": "Werkstatt der Süße",
    "city": "Berlin"
  },
  {
    "id": "ChIJwQa_XTNOqEcRTAawFjpwlLY",
    "lat": 52.49944499999999,
    "lng": 13.4210358,
    "name": "BIO COMPANY Skalitzer Straße",
    "city": "Berlin"
  },
  {
    "id": "ChIJ_Z3hKeBRqEcR0PVjJ8BZvog",
    "lat": 52.52309229999999,
    "lng": 13.4041516,
    "name": "Bio Company",
    "city": "Berlin"
  },
  {
    "id": "ChIJyTPda-JRqEcRFHRtJJAZIwE",
    "lat": 52.52801519999999,
    "lng": 13.4086068,
    "name": "Zeit für Brot",
    "city": "Berlin"
  },
  {
    "id": "ChIJy3BqNfRQqEcRBKyIyZI9KRE",
    "lat": 52.49092290000001,
    "lng": 13.3261304,
    "name": "BioBackhaus.",
    "city": "Berlin"
  },
  {
    "id": "ChIJ7ey5jYpOqEcRhzRGIr5vg50",
    "lat": 52.51614989999999,
    "lng": 13.4680258,
    "name": "BIO COMPANY Voigtstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJLRL_5ORRqEcRiTfrfENLN6c",
    "lat": 52.5307421,
    "lng": 13.400712,
    "name": "BIO COMPANY Brunnenstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJly_HY3BOqEcRDBBqGoj97sc",
    "lat": 52.5292606,
    "lng": 13.4549963,
    "name": "ServiceStore DB",
    "city": "Berlin"
  },
  {
    "id": "ChIJc7u8o29PqEcRyN-HN7irfMw",
    "lat": 52.46246,
    "lng": 13.45845,
    "name": "Märkisches Landbrot GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJoxBcesJRqEcRuL0eD52W6Ow",
    "lat": 52.5228256,
    "lng": 13.3875301,
    "name": "BIO COMPANY Friedrichstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJiS9Iwd9QqEcRS6PSQws29KI",
    "lat": 52.50901580000001,
    "lng": 13.3068171,
    "name": "Ludwig Stocker Hofpfisterei GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJh4PWUQFSqEcRpmiqXxtgcJs",
    "lat": 52.5471285,
    "lng": 13.4128601,
    "name": "Krautzig Bakery & Cake",
    "city": "Berlin"
  },
  {
    "id": "ChIJYxI0dsJRqEcRwjC0TM-_KnA",
    "lat": 52.52329100000001,
    "lng": 13.387356,
    "name": "PANE E VINO",
    "city": "Berlin"
  },
  {
    "id": "ChIJUwMuZ8ZRqEcRB1wsyOrfkJI",
    "lat": 52.51895150000001,
    "lng": 13.3882726,
    "name": "Bäcker Wiedemann GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJhadej8BPqEcRtCWc1pN2zS4",
    "lat": 52.47999859999999,
    "lng": 13.4178864,
    "name": "Easy Lodges Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJZ0KxF_JRqEcRrLHB-4r-U-o",
    "lat": 52.53505209999999,
    "lng": 13.3901898,
    "name": "Berlin Wall Memorial",
    "city": "Berlin"
  },
  {
    "id": "ChIJd-d5Rx1SqEcRgCz33OsCSZQ",
    "lat": 52.5427179,
    "lng": 13.402652,
    "name": "Mauerpark",
    "city": "Berlin"
  },
  {
    "id": "ChIJmzoVxehPqEcRB6YzEZWqGuM",
    "lat": 52.48211509999999,
    "lng": 13.3891911,
    "name": "Tempelhof Airport",
    "city": "Berlin"
  },
  {
    "id": "ChIJo8NAJSRPqEcRUZxTK-spns0",
    "lat": 52.4792123,
    "lng": 13.4895072,
    "name": "Spreepark",
    "city": "Berlin"
  },
  {
    "id": "ChIJWVbXxhhPqEcR3OZE5GXI9I4",
    "lat": 52.4884599,
    "lng": 13.4697445,
    "name": "Treptower Park",
    "city": "Berlin"
  },
  {
    "id": "ChIJhXndRwhOqEcR1nHs0YmFYog",
    "lat": 52.5386387,
    "lng": 13.4334364,
    "name": "Ernst-Thälmann- Park",
    "city": "Berlin"
  },
  {
    "id": "ChIJ8TbTJwJOqEcRvPFwPGvwmMw",
    "lat": 52.5363177,
    "lng": 13.4169339,
    "name": "Kollwitzplatz",
    "city": "Berlin"
  },
  {
    "id": "ChIJ3b92pjZJqEcR3P-0LbMptL8",
    "lat": 52.5021834,
    "lng": 13.5314733,
    "name": "Tierpark Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJMWnDTT9QqEcRKz-aU03lnfQ",
    "lat": 52.5394971,
    "lng": 13.3987478,
    "name": "Straßenbrunnen Nr. 209",
    "city": "Berlin"
  },
  {
    "id": "ChIJRbzoL2VQqEcR618LdQPMi8s",
    "lat": 52.4756571,
    "lng": 13.3351389,
    "name": "Sintflutbrunnen",
    "city": "Berlin"
  },
  {
    "id": "ChIJ_S5uaxJOqEcRdg-gu1fEgcI",
    "lat": 52.5280353,
    "lng": 13.4363934,
    "name": "Volkspark Friedrichshain",
    "city": "Berlin"
  },
  {
    "id": "ChIJC49cbXtaqEcR6I2NHP-sohU",
    "lat": 52.45438060000001,
    "lng": 13.3056024,
    "name": "Botanical Garden and Botanical Museum",
    "city": "Berlin"
  },
  {
    "id": "ChIJm9UuubhRqEcRXElqrVl6tMY",
    "lat": 52.51858499999999,
    "lng": 13.3731851,
    "name": "Platz der Republik",
    "city": "Berlin"
  },
  {
    "id": "ChIJ2Rv9kd5RqEcRCk1Dri7L9aU",
    "lat": 52.5187,
    "lng": 13.3992,
    "name": "Lustgarten",
    "city": "Berlin"
  },
  {
    "id": "ChIJEUdfXIdQqEcRlWB9_vQBNp4",
    "lat": 52.4724268,
    "lng": 13.3203067,
    "name": "Erikabrunnen",
    "city": "Berlin"
  },
  {
    "id": "ChIJS4MKBSBOqEcRbdbHqlJpT4s",
    "lat": 52.5196058,
    "lng": 13.406843,
    "name": "Fonte de Neptuno",
    "city": "Berlin"
  },
  {
    "id": "ChIJ71LfPyRQqEcREPzINNw8hII",
    "lat": 52.48822699999999,
    "lng": 13.3800144,
    "name": "Viktoriapark",
    "city": "Berlin"
  },
  {
    "id": "ChIJhdT8HlRFqEcRx8RQkAjchVA",
    "lat": 52.4546842,
    "lng": 13.3818058,
    "name": "ufaFabrik",
    "city": "Berlin"
  },
  {
    "id": "ChIJCfROcedRqEcRjFRvdEEGvYY",
    "lat": 52.5231643,
    "lng": 13.3963109,
    "name": "Monbijoupark",
    "city": "Berlin"
  },
  {
    "id": "ChIJS9HC895RqEcR_IovsNVoDng",
    "lat": 52.5190608,
    "lng": 13.401078,
    "name": "Berlin Cathedral",
    "city": "Berlin"
  },
  {
    "id": "ChIJd2v8Cf9QqEcRnLCe4snacBA",
    "lat": 52.504818,
    "lng": 13.335082,
    "name": "Kaiser Wilhelm Memorial Church",
    "city": "Berlin"
  },
  {
    "id": "ChIJxw-fVB5OqEcRd3mOR9VYdBQ",
    "lat": 52.5157702,
    "lng": 13.3948097,
    "name": "St. Hedwig's Cathedral",
    "city": "Berlin"
  },
  {
    "id": "ChIJS4MKBSBOqEcRgXI8kWHFOvw",
    "lat": 52.5206108,
    "lng": 13.4071221,
    "name": "St. Mary's Church",
    "city": "Berlin"
  },
  {
    "id": "ChIJn-Qy59lPqEcRq9s5Arttpe8",
    "lat": 52.489381,
    "lng": 13.3971536,
    "name": "Passionskirche",
    "city": "Berlin"
  },
  {
    "id": "ChIJ4ZsybtpRqEcRqBX6VAnUoAw",
    "lat": 52.5127168,
    "lng": 13.3925442,
    "name": "Neue Kirche",
    "city": "Berlin"
  },
  {
    "id": "ChIJLw6sfxBOqEcRcIx6V7M1Dmw",
    "lat": 52.52725,
    "lng": 13.4256,
    "name": "Evangelische Kirche Berlin-Brandenburg-schlesische Oberlausitz",
    "city": "Berlin"
  },
  {
    "id": "ChIJTQh-jmFQqEcRN9hibD9bGzU",
    "lat": 52.4819169,
    "lng": 13.3279895,
    "name": "Kath. Kirchengemeinde Maria unter dem Kreuz",
    "city": "Berlin"
  },
  {
    "id": "ChIJqdm8x-JRqEcRg9ClmjuB1Ao",
    "lat": 52.5308576,
    "lng": 13.4097394,
    "name": "Sacred Heart Church",
    "city": "Berlin"
  },
  {
    "id": "ChIJDe_DatlRqEcRpi6wtF8o1V4",
    "lat": 52.5158876,
    "lng": 13.3974606,
    "name": "Friedrichswerdersche Kirche",
    "city": "Berlin"
  },
  {
    "id": "ChIJK3LROJNQqEcRx1hj98JE9KQ",
    "lat": 52.4880337,
    "lng": 13.3078029,
    "name": "Christi-Auferstehungs-Kathedrale",
    "city": "Berlin"
  },
  {
    "id": "ChIJG1RztihQqEcRsmuehqoeZZM",
    "lat": 52.4929245,
    "lng": 13.3860384,
    "name": "St. Bonifatius Gemeinde-Standort der Pfarrei Bernhard Lichtenberg",
    "city": "Berlin"
  },
  {
    "id": "ChIJ7wvWwbVRqEcRhZv27v5NFjw",
    "lat": 52.5080585,
    "lng": 13.3674956,
    "name": "St. Matthew's Church",
    "city": "Berlin"
  },
  {
    "id": "ChIJb4DBVgtPqEcRAGCwdQcnNb8",
    "lat": 52.4729132,
    "lng": 13.4519825,
    "name": "Kath. Pfarramt Neukölln",
    "city": "Berlin"
  },
  {
    "id": "ChIJ08FpxARSqEcRLr0e3R7BK6M",
    "lat": 52.5499843,
    "lng": 13.4068246,
    "name": "Kath. Kirche St. Augustinus Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJZejQckxRqEcRE_gTfwM-RpM",
    "lat": 52.5403015,
    "lng": 13.2983351,
    "name": "Maria Regina Martyrum",
    "city": "Berlin"
  },
  {
    "id": "ChIJGSq_5mRNqEcRDv_skrZ3j14",
    "lat": 52.593492,
    "lng": 13.453692,
    "name": "Ev. Kirchengemeinde Berlin-Blankenburg",
    "city": "Berlin"
  },
  {
    "id": "ChIJWdlb3DZOqEcR3tO2nX58HbY",
    "lat": 52.50599,
    "lng": 13.42758,
    "name": "Ev. Pfarramt St. Thomas Gemeinde",
    "city": "Berlin"
  },
  {
    "id": "ChIJebO1csFQqEcRU9fYdJw6Hys",
    "lat": 52.51431719999999,
    "lng": 13.3917955,
    "name": "Französische Kirche zu Berlin (Hugenottenkirche)",
    "city": "Berlin"
  },
  {
    "id": "ChIJ7xcEkQtSqEcRe66L-nrnsjw",
    "lat": 52.5599883,
    "lng": 13.4188027,
    "name": "Evangelische Hoffnungskirchengemeinde Berlin-Pankow",
    "city": "Berlin"
  },
  {
    "id": "ChIJlZjZzQ1SqEcRgzXG9SNSxro",
    "lat": 52.5591851,
    "lng": 13.4137666,
    "name": "BLUME2000 Berlin Vineta",
    "city": "Berlin"
  },
  {
    "id": "ChIJR8P-sOhTqEcRGZNjBZS7oWw",
    "lat": 52.5634188,
    "lng": 13.3281199,
    "name": "BLUME2000 Berlin Der Clou",
    "city": "Berlin"
  },
  {
    "id": "ChIJbz7F2VVQqEcRd931c9-n9pI",
    "lat": 52.5029485,
    "lng": 13.3336765,
    "name": "FLORALE WELTEN SO HOME",
    "city": "Berlin"
  },
  {
    "id": "ChIJs609JtFRqEcRphj9E-f1YfE",
    "lat": 52.509129,
    "lng": 13.3918814,
    "name": "Flowers Marsano GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJLeYapFpMqEcRWBkfAxEK9VE",
    "lat": 52.5644406,
    "lng": 13.5061131,
    "name": "Blume 2000",
    "city": "Berlin"
  },
  {
    "id": "ChIJvaS_vwBOqEcR7j1d0f2qn6A",
    "lat": 52.53982999999999,
    "lng": 13.4220041,
    "name": "Call a fleur Floristic e.K.",
    "city": "Berlin"
  },
  {
    "id": "ChIJhyjL91lQqEcReX0ztlXgKdA",
    "lat": 52.495377,
    "lng": 13.3401833,
    "name": "bringblumen berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJfXr5BaFRqEcRxmijsoBJtsc",
    "lat": 52.52444790000001,
    "lng": 13.3514568,
    "name": "Flower and Garden Art Tunger Cord GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJQxyArwBSqEcRB8PCZ219Le8",
    "lat": 52.5463169,
    "lng": 13.4183185,
    "name": "Frau Rose Floristik",
    "city": "Berlin"
  },
  {
    "id": "ChIJZS_dYgtTqEcRQatraUBuoMA",
    "lat": 52.59771079999999,
    "lng": 13.355627,
    "name": "Blume 2000",
    "city": "Berlin"
  },
  {
    "id": "ChIJQ7KQsg1UqEcRcFkhFp1PoX4",
    "lat": 52.57392669999999,
    "lng": 13.2968851,
    "name": "Garden Center in Tegel GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJ9wA6e4NQqEcR9DtmMtRcY08",
    "lat": 52.472235,
    "lng": 13.3085898,
    "name": "Blumen-Molly",
    "city": "Berlin"
  },
  {
    "id": "ChIJWQhR7OdNqEcRYRt-4xcqVQA",
    "lat": 52.5476116,
    "lng": 13.449937,
    "name": "FlorisTick Am Antonplatz",
    "city": "Berlin"
  },
  {
    "id": "ChIJESSoaI1QqEcRnkIhUEc_7uk",
    "lat": 52.4866986,
    "lng": 13.3136346,
    "name": "Riegel Blumenhaus am Friedhof Wilmersdorf",
    "city": "Berlin"
  },
  {
    "id": "ChIJr-I6stlPqEcRwpYPy6sJkIM",
    "lat": 52.48802190000001,
    "lng": 13.3947111,
    "name": "flores y amores",
    "city": "Berlin"
  },
  {
    "id": "ChIJO8O33Q1SqEcRxY57LhylezY",
    "lat": 52.5590931,
    "lng": 13.4124377,
    "name": "Blumengeschäft Fleurop, Blumengalerie Pankow",
    "city": "Berlin"
  },
  {
    "id": "ChIJDfZVcOhQqEcRFGW7jLHGNq0",
    "lat": 52.4996041,
    "lng": 13.3062857,
    "name": "Rosentraum by Zinnober Blumen",
    "city": "Berlin"
  },
  {
    "id": "ChIJtZb70vFNqEcR5VAVgiMAoWA",
    "lat": 52.554257,
    "lng": 13.429267,
    "name": "SonnenBlau",
    "city": "Berlin"
  },
  {
    "id": "ChIJt_jiMCZQqEcR9dFxtd04OMo",
    "lat": 52.4899308,
    "lng": 13.3868768,
    "name": "Flowers & Garden",
    "city": "Berlin"
  },
  {
    "id": "ChIJNVsY-8tPqEcREbu7Pp4tEOs",
    "lat": 52.4931256,
    "lng": 13.4176134,
    "name": "Eva Blume",
    "city": "Berlin"
  },
  {
    "id": "ChIJa_rRe9tNqEcRhA2CglMahmw",
    "lat": 52.5453629,
    "lng": 13.4583637,
    "name": "Weißensee Cemetery",
    "city": "Berlin"
  },
  {
    "id": "ChIJk-R4ietRqEcR-GJy8K7P3wI",
    "lat": 52.52835,
    "lng": 13.3846804,
    "name": "Dorotheenstadt cemetery",
    "city": "Berlin"
  },
  {
    "id": "ChIJW7LOYpJQqEcR5EVgbUuU0zw",
    "lat": 52.48669489999999,
    "lng": 13.3109693,
    "name": "Wilmersdorf Cemetery",
    "city": "Berlin"
  },
  {
    "id": "ChIJwweQqc9NqEcRTMVqmoZeJxU",
    "lat": 52.5488565,
    "lng": 13.4699324,
    "name": "Auferstehungsfriedhof",
    "city": "Berlin"
  },
  {
    "id": "ChIJI1Ol-IdQqEcR8tMq0Bno0AE",
    "lat": 52.47576,
    "lng": 13.32285,
    "name": "Friedhof Stubenrauchstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJzYefcQJOqEcRNKtXEOxLeJE",
    "lat": 52.5343731,
    "lng": 13.4130453,
    "name": "Jewish Cemetery",
    "city": "Berlin"
  },
  {
    "id": "ChIJjReAw5dPqEcRNOI7vY_TXOM",
    "lat": 52.474149,
    "lng": 13.4279782,
    "name": "St. Michael",
    "city": "Berlin"
  },
  {
    "id": "ChIJn8XgRJhPqEcR0H6HZH7LZyk",
    "lat": 52.4728758,
    "lng": 13.4310594,
    "name": "St. Thomas-Kirchhof",
    "city": "Berlin"
  },
  {
    "id": "ChIJJU-BlzlQqEcRCY8CPsCGMic",
    "lat": 52.48994299999999,
    "lng": 13.36729,
    "name": "Alter St.-Matthäus-Kirchhof",
    "city": "Berlin"
  },
  {
    "id": "ChIJq8VFUWRRqEcRe9TFPipE-VQ",
    "lat": 52.54338980000001,
    "lng": 13.3360478,
    "name": "St. Johannis-Kirchhof II",
    "city": "Berlin"
  },
  {
    "id": "ChIJn0CujuNRqEcRjya_JB51OiE",
    "lat": 52.52822570000001,
    "lng": 13.4033944,
    "name": "Alter Garnisonfriedhof Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJXxsXTHEjZUERa-2Nnx40SEc",
    "lat": 52.4886098,
    "lng": 13.4056968,
    "name": "Der Evangelische Friedhofsverband Berlin Stadtmitte",
    "city": "Berlin"
  },
  {
    "id": "ChIJJU-BlzlQqEcRAFv395BsXXA",
    "lat": 52.49108,
    "lng": 13.36714,
    "name": "Gräber von Immanuel Lazarus Fuchs und Leopold Kronecker",
    "city": "Berlin"
  },
  {
    "id": "ChIJ30TwnblPqEcREYkjEWvCx5Q",
    "lat": 52.48523669999999,
    "lng": 13.4252849,
    "name": "Alter St. Jacobi Friedhof Neukölln",
    "city": "Berlin"
  },
  {
    "id": "ChIJvfGqMutNqEcR6xfc8VB_AQg",
    "lat": 52.5596027,
    "lng": 13.4518865,
    "name": "Segenskirchhof",
    "city": "Berlin"
  },
  {
    "id": "ChIJGXC-lZRNqEcR18msBcm_sN8",
    "lat": 52.5603065,
    "lng": 13.4504459,
    "name": "Segens-Friedhofsverwaltung",
    "city": "Berlin"
  },
  {
    "id": "ChIJn64nARlRqEcRtMx0Ir5uotw",
    "lat": 52.5169678,
    "lng": 13.3163158,
    "name": "Ev. Luis cemetery I (Luis cemetery)",
    "city": "Berlin"
  },
  {
    "id": "ChIJP9nwsz1MqEcR-7nogsdceck",
    "lat": 52.5192018,
    "lng": 13.5135455,
    "name": "Zentralfriedhof Friedrichsfelde",
    "city": "Berlin"
  },
  {
    "id": "ChIJ-zNWo7VNqEcRlMPcHgpq1PA",
    "lat": 52.55759,
    "lng": 13.48213,
    "name": "Kirchhof St. Bartholomäus in Berlin-Pankow",
    "city": "Berlin"
  },
  {
    "id": "ChIJ0c2DA7MhZUER_XdW9PjB9wg",
    "lat": 52.5662269,
    "lng": 13.3333086,
    "name": "Friedhof Berlin (Dankes- und Nazareth Friedhof)",
    "city": "Berlin"
  },
  {
    "id": "ChIJ5XFlUE9OqEcRMsUFkycI-Rg",
    "lat": 52.5063143,
    "lng": 13.4436316,
    "name": "Mercedes-Benz Arena Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJY6B70y9MqEcRqqgF5qOBg0Q",
    "lat": 52.5434713,
    "lng": 13.4917738,
    "name": "Die Theaterkasse",
    "city": "Berlin"
  },
  {
    "id": "ChIJjfrdZphRqEcRPFbDErGvPE8",
    "lat": 52.53022379999999,
    "lng": 13.3595576,
    "name": "Poststadion",
    "city": "Berlin"
  },
  {
    "id": "ChIJ74yLVdNNqEcR1j9vEyyMfWQ",
    "lat": 52.54005389999999,
    "lng": 13.4771787,
    "name": "Sportforum Hohenschönhausen",
    "city": "Berlin"
  },
  {
    "id": "ChIJERcDZU1OqEcRmh-zIJEQDyg",
    "lat": 52.49840080000001,
    "lng": 13.4418585,
    "name": "Falcken-Stadion",
    "city": "Berlin"
  },
  {
    "id": "ChIJTfNKZQJSqEcRnHIEptm1A48",
    "lat": 52.5430417,
    "lng": 13.4052959,
    "name": "Friedrich-Ludwig-Jahn-Sportpark",
    "city": "Berlin"
  },
  {
    "id": "ChIJnbyfL5RQqEcRdp572w88daE",
    "lat": 52.4839875,
    "lng": 13.3022676,
    "name": "Stadion Wilmersdorf",
    "city": "Berlin"
  },
  {
    "id": "ChIJ79_GR8ZOqEcRulCtH7mQPyE",
    "lat": 52.5050064,
    "lng": 13.5066011,
    "name": "Stadium - Friedrichsfelde",
    "city": "Berlin"
  },
  {
    "id": "ChIJ7ya1195TqEcRAMV2OjXxQnM",
    "lat": 52.5520671,
    "lng": 13.3324603,
    "name": "Stadion Rehberge",
    "city": "Berlin"
  },
  {
    "id": "ChIJz9AqfyNQqEcR7Vq8MfkYaiM",
    "lat": 52.48604350000001,
    "lng": 13.3778428,
    "name": "Willy-Kressmann-Stadion",
    "city": "Berlin"
  },
  {
    "id": "ChIJoxoWJ49PqEcRtdM4sUR8qAY",
    "lat": 52.5158298,
    "lng": 13.4253996,
    "name": "Sporthalle",
    "city": "Berlin"
  },
  {
    "id": "ChIJm5AaypZTqEcR-uzzTs28Lc0",
    "lat": 52.54524319999999,
    "lng": 13.4097667,
    "name": "Cantianstadion",
    "city": "Berlin"
  },
  {
    "id": "ChIJxWnPKFlPqEcRXwJtCVjex5E",
    "lat": 52.50620929999999,
    "lng": 13.4435628,
    "name": "Levy Restaurants c/o Mercedes-Benz Arena",
    "city": "Berlin"
  },
  {
    "id": "ChIJLXQV0JNOqEcRSensOHe7kUA",
    "lat": 52.51581700000001,
    "lng": 13.486936,
    "name": "HOWOGE-Arena \"Hans-Zoschke\"",
    "city": "Berlin"
  },
  {
    "id": "ChIJTwXejztNqEcRX9fzvgHpu3s",
    "lat": 52.5639894,
    "lng": 13.4563791,
    "name": "Kabinen Stadion",
    "city": "Berlin"
  },
  {
    "id": "ChIJZzggFO9SqEcRS79449XaC8o",
    "lat": 52.60130059999999,
    "lng": 13.4024971,
    "name": "FC Concordia Wilhelmsruh 1895 e.V.",
    "city": "Berlin"
  },
  {
    "id": "ChIJt9yvX4pQqEcRgaL4UNNwqRs",
    "lat": 52.48397609999999,
    "lng": 13.3224944,
    "name": "Sportanlage Blissestraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJDeFyaYNFqEcRfghiTFkUuIU",
    "lat": 52.4437,
    "lng": 13.43632,
    "name": "Stadion Britz-Süd",
    "city": "Berlin"
  },
  {
    "id": "ChIJbc0nr7RTqEcRro9z9oKpUuQ",
    "lat": 52.5774474,
    "lng": 13.3385369,
    "name": "Stadion POLONIA PARK",
    "city": "Berlin"
  },
  {
    "id": "ChIJw5n7WCRFqEcR3QrLBRPTn28",
    "lat": 52.4436115,
    "lng": 13.3945086,
    "name": "Volksparkstadion Mariendorf",
    "city": "Berlin"
  },
  {
    "id": "ChIJcy1JA8NRqEcRBNy2MNzQTmw",
    "lat": 52.52026859999999,
    "lng": 13.3870955,
    "name": "Bahnhof Berlin-Friedrichstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJweNzLf5QqEcR9_-BQ7QntcI",
    "lat": 52.50738699999999,
    "lng": 13.3325116,
    "name": "Bahnhof Berlin-Zoologischer Garten",
    "city": "Berlin"
  },
  {
    "id": "ChIJ62hndh9OqEcRydXjBjh91ps",
    "lat": 52.52151,
    "lng": 13.41127,
    "name": "Berlin Alexanderplatz Bahnhof",
    "city": "Berlin"
  },
  {
    "id": "ChIJPVCgzy1OqEcR0xEpL5k2ooM",
    "lat": 52.5036429,
    "lng": 13.410774,
    "name": "U Moritzplatz (Berlin)",
    "city": "Berlin"
  },
  {
    "id": "ChIJhwfvW8lRqEcRud4JRZ-d6vQ",
    "lat": 52.5087398,
    "lng": 13.3761867,
    "name": "S+U Potsdamer Platz Bhf (Berlin)",
    "city": "Berlin"
  },
  {
    "id": "ChIJe-ff-71RqEcRqvy8lRR4PHo",
    "lat": 52.5250839,
    "lng": 13.369402,
    "name": "Berlin Central Train Station",
    "city": "Berlin"
  },
  {
    "id": "ChIJH8Bm7QZSqEcR3qUD8kloJ0Q",
    "lat": 52.5493146,
    "lng": 13.413679,
    "name": "Schönhauser Allee",
    "city": "Berlin"
  },
  {
    "id": "ChIJ1eUIwElQqEcRWryKuOGKHg8",
    "lat": 52.49755390000001,
    "lng": 13.3634479,
    "name": "U Bülowstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJifBlpjBQqEcRlzm8nu548DM",
    "lat": 52.4930806,
    "lng": 13.3696171,
    "name": "U Yorckstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJU6NkgLdPqEcRthuvoxHZL_I",
    "lat": 52.4866057,
    "lng": 13.424476,
    "name": "U Hermannplatz",
    "city": "Berlin"
  },
  {
    "id": "ChIJVShd83VPqEcR9lVOHJJcxzA",
    "lat": 52.4694625,
    "lng": 13.4420554,
    "name": "S+U Neukölln",
    "city": "Berlin"
  },
  {
    "id": "ChIJV28Qkx9RqEcR-c0uZCiJ8HQ",
    "lat": 52.5119862,
    "lng": 13.309667,
    "name": "U Deutsche Oper",
    "city": "Berlin"
  },
  {
    "id": "ChIJZ5YtwiNRqEcRQDvYEsytu74",
    "lat": 52.5172813,
    "lng": 13.3065942,
    "name": "U Richard-Wagner-Platz",
    "city": "Berlin"
  },
  {
    "id": "ChIJBWqPEGNQqEcROyh8VmJonN0",
    "lat": 52.47764720000001,
    "lng": 13.3290788,
    "name": "Bundesplatz",
    "city": "Berlin"
  },
  {
    "id": "ChIJx-KTCk5OqEcROKeo4wrecC4",
    "lat": 52.5009224,
    "lng": 13.4415344,
    "name": "U Schlesisches Tor",
    "city": "Berlin"
  },
  {
    "id": "ChIJdaaNHSFOqEcRYJqInNddOaQ",
    "lat": 52.5188972,
    "lng": 13.4085291,
    "name": "U Rotes Rathaus",
    "city": "Berlin"
  },
  {
    "id": "ChIJ02nl6N5RqEcRNmzbRdhzWMM",
    "lat": 52.51746000000001,
    "lng": 13.39987,
    "name": "U Museumsinsel",
    "city": "Berlin"
  },
  {
    "id": "ChIJT-VUfCFOqEcRey1YEk_jh8s",
    "lat": 52.51723,
    "lng": 13.41246,
    "name": "U Klosterstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJZ9DpmOFRqEcRKassH4bPjNk",
    "lat": 52.52547329999999,
    "lng": 13.4050193,
    "name": "Weinmeisterstraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJ25xRQB9OqEcRiDCQLqrmcbA",
    "lat": 52.5217905,
    "lng": 13.4136147,
    "name": "Alexanderplatz",
    "city": "Berlin"
  },
  {
    "id": "ChIJT0dWN_tQqEcRXJIPZjQenpQ",
    "lat": 52.46550879999999,
    "lng": 13.3277291,
    "name": "Schloss-Strassen-Center",
    "city": "Berlin"
  },
  {
    "id": "ChIJYb9yIlRQqEcR7A7Zwwy7q-0",
    "lat": 52.5016021,
    "lng": 13.340993,
    "name": "KaDeWe - Kaufhaus des Westens",
    "city": "Berlin"
  },
  {
    "id": "ChIJJWMVustRqEcRpRM6ykKqzgA",
    "lat": 52.5074806,
    "lng": 13.3741512,
    "name": "The Playce",
    "city": "Berlin"
  },
  {
    "id": "ChIJBWnypt9QqEcRgeKLdM9Zv4o",
    "lat": 52.5090675,
    "lng": 13.3046207,
    "name": "WILMA Shoppen",
    "city": "Berlin"
  },
  {
    "id": "ChIJqwa-_iFSqEcR4ovz1UNXfnE",
    "lat": 52.5497824,
    "lng": 13.3875841,
    "name": "Gesundbrunnen-Center Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJu9ovpehTqEcRn_JoEflFlFw",
    "lat": 52.56306069999999,
    "lng": 13.3285273,
    "name": "DER CLOU BERLIN",
    "city": "Berlin"
  },
  {
    "id": "ChIJbX58JLtPqEcRjviiDiqQu-U",
    "lat": 52.4820895,
    "lng": 13.4328625,
    "name": "Neukölln Arcaden",
    "city": "Berlin"
  },
  {
    "id": "ChIJL8oBBiJOqEcRHwOQbj2RcRo",
    "lat": 52.5199123,
    "lng": 13.4147709,
    "name": "Tamaris Shoe Shop",
    "city": "Berlin"
  },
  {
    "id": "ChIJB3zXilZFqEcR3Ny1GCeM9Ks",
    "lat": 52.4557099,
    "lng": 13.3858637,
    "name": "Tempelhofer Hafen, Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJK5ebNYJaqEcR86Rfpb3Bsqk",
    "lat": 52.4627274,
    "lng": 13.3246775,
    "name": "Boulevard Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJgeJXMOFNqEcRAaTD98fmLv4",
    "lat": 52.5432523,
    "lng": 13.4423194,
    "name": "Mühlenberg-Center",
    "city": "Berlin"
  },
  {
    "id": "ChIJIwgg_gBPqEcRrb7VlG-c9tI",
    "lat": 52.49075049999999,
    "lng": 13.4571892,
    "name": "Park Center Treptow",
    "city": "Berlin"
  },
  {
    "id": "ChIJEbHJuYxOqEcRVrmIcHOa-9Q",
    "lat": 52.514264,
    "lng": 13.476492,
    "name": "Ring-Center Berlin 2 + 3",
    "city": "Berlin"
  },
  {
    "id": "ChIJJyRIGsNRqEcRD8IqHjAkR94",
    "lat": 52.52001860000001,
    "lng": 13.3879296,
    "name": "Clarks ECCO Shop",
    "city": "Berlin"
  },
  {
    "id": "ChIJM4Ssf_ZLqEcRDqvADjbw29E",
    "lat": 52.5439482,
    "lng": 13.5446989,
    "name": "EASTGATE Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJmefJb4JaqEcRv8dHpaTV9qI",
    "lat": 52.4643543,
    "lng": 13.3273761,
    "name": "Forum Steglitz",
    "city": "Berlin"
  },
  {
    "id": "ChIJ7YQQYQtTqEcR74jsUekTOOE",
    "lat": 52.59701589999999,
    "lng": 13.354931,
    "name": "Märkisches Zentrum",
    "city": "Berlin"
  },
  {
    "id": "ChIJgcFYBfZLqEcRefl6mw-XsKU",
    "lat": 52.54335529999999,
    "lng": 13.5432632,
    "name": "Tamaris Eastgate Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJ_____wBSqEcRP0Etm0WcI6U",
    "lat": 52.5497992,
    "lng": 13.4142188,
    "name": "Schönhauser Allee Arcaden",
    "city": "Berlin"
  },
  {
    "id": "ChIJQ7n-0SFOqEcRcM5fnmh3y88",
    "lat": 52.5193483,
    "lng": 13.4104462,
    "name": "RathausPassagen",
    "city": "Berlin"
  },
  {
    "id": "ChIJI0K8KtZNqEcRxSbyV3Fx5Kk",
    "lat": 52.517883,
    "lng": 13.3936551,
    "name": "Humboldt University of Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJcQqAORtRqEcRgY1oNi3sCrQ",
    "lat": 52.5125322,
    "lng": 13.3269446,
    "name": "Technical University Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJ66UFPTtOqEcRvRI_0GVsP2Q",
    "lat": 52.51857829999999,
    "lng": 13.3256029,
    "name": "Games Academy GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJve76UhpRqEcRtnBGHQA4or4",
    "lat": 52.517207,
    "lng": 13.3221784,
    "name": "University of Art in Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJu8Mam8lRqEcRFz6tPRoyDZA",
    "lat": 52.5095226,
    "lng": 13.3735281,
    "name": "German Film and Television Academy Berlin GmbH",
    "city": "Berlin"
  },
  {
    "id": "ChIJFVuTji5JqEcRpoPyL9rQ1aA",
    "lat": 52.4929881,
    "lng": 13.5255146,
    "name": "HTW Berlin - University of Applied Sciences",
    "city": "Berlin"
  },
  {
    "id": "ChIJqwuQMXlRqEcRsxjFXcrdfek",
    "lat": 52.545175,
    "lng": 13.351628,
    "name": "Berliner Hochschule für Technik (BHT)",
    "city": "Berlin"
  },
  {
    "id": "ChIJwyspxoZOqEcRWvyjo_ATzEc",
    "lat": 52.5278994,
    "lng": 13.4779655,
    "name": "Volkshochschule Berlin Lichtenberg",
    "city": "Berlin"
  },
  {
    "id": "ChIJO3rmZR5RqEcRjSNH-WW0X50",
    "lat": 52.51197449999999,
    "lng": 13.3159241,
    "name": "FOM Hochschule Hochschulzentrum Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJ-4h-2thRqEcR76x52fhQxy4",
    "lat": 52.51564949999999,
    "lng": 13.4011509,
    "name": "ESMT Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJ1fR1uVlSqEcR1Pe4dCcodRM",
    "lat": 52.5843043,
    "lng": 13.3937208,
    "name": "Bard College Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJA_EcFLxPqEcRKej4lCNlly4",
    "lat": 52.4797671,
    "lng": 13.4265978,
    "name": "Volkshochschule Neukölln",
    "city": "Berlin"
  },
  {
    "id": "ChIJ97jfBdBRqEcRFFJXb2RVow0",
    "lat": 52.5122593,
    "lng": 13.3875645,
    "name": "Centre for British Studies (Humboldt-Universität zu Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJmwNeiq1RqEcRHXJpQfZnASw",
    "lat": 52.50930109999999,
    "lng": 13.3547316,
    "name": "Canisius-Kolleg Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJBw5RNSVbBEcRibG8fPL-hcE",
    "lat": 52.5103924,
    "lng": 13.3783424,
    "name": "European University of Business",
    "city": "Berlin"
  },
  {
    "id": "ChIJFzoWsZpOqEcRq8X_6xbzE48",
    "lat": 52.518341,
    "lng": 13.3251724,
    "name": "H:G University of Health & Sports, Technology & Arts",
    "city": "Berlin"
  },
  {
    "id": "ChIJ0-1qRhxRqEcRjy4YwqxZD38",
    "lat": 52.521484,
    "lng": 13.3286923,
    "name": "EIT Digital Germany",
    "city": "Berlin"
  },
  {
    "id": "ChIJ0-1qRhxRqEcRihi60q7kjbo",
    "lat": 52.49637000000001,
    "lng": 13.35766,
    "name": "Telekom Innovation Laboratories",
    "city": "Berlin"
  },
  {
    "id": "ChIJr_zOLxFRqEcR5ctnWUCpKEE",
    "lat": 52.524013,
    "lng": 13.3235765,
    "name": "Production Technology Center",
    "city": "Berlin"
  },
  {
    "id": "ChIJsc5hJB1RqEcR7O0xMQI5oHs",
    "lat": 52.5092431,
    "lng": 13.3269634,
    "name": "Berlin University of the Arts",
    "city": "Berlin"
  },
  {
    "id": "ChIJO6sqyedRqEcRnszYhLdgew0",
    "lat": 52.5249168,
    "lng": 13.3941787,
    "name": "New Synagogue Berlin - Centrum Judaicum",
    "city": "Berlin"
  },
  {
    "id": "ChIJDR8pf_BRqEcRmYukmhtj6WM",
    "lat": 52.53537410000001,
    "lng": 13.398199,
    "name": "Kahal Adass Jisroel",
    "city": "Berlin"
  },
  {
    "id": "ChIJq3gZxANOqEcRQfaJY9UGU-c",
    "lat": 52.5350421,
    "lng": 13.4190917,
    "name": "Beth Zion e.V.",
    "city": "Berlin"
  },
  {
    "id": "ChIJmZOriMxPqEcRjAtHdL3x_1w",
    "lat": 52.4958836,
    "lng": 13.4166639,
    "name": "Fraenkelufer Synagogue",
    "city": "Berlin"
  },
  {
    "id": "ChIJm0YhNtBQqEcRkOG5bBdzsKc",
    "lat": 52.5036327,
    "lng": 13.2868168,
    "name": "Sukkat Shalom e. V Herbartstrasse Synagogue",
    "city": "Berlin"
  },
  {
    "id": "ChIJq3gZxANOqEcR-P3YOOCx1JI",
    "lat": 52.535355,
    "lng": 13.4186043,
    "name": "Synagoge Rykestraße",
    "city": "Berlin"
  },
  {
    "id": "ChIJb1PlMflQqEcRgQB4JpJ-jvM",
    "lat": 52.5023048,
    "lng": 13.3308441,
    "name": "Central Orthodox Synagogue",
    "city": "Berlin"
  },
  {
    "id": "ChIJddioiMxPqEcRZGgSSRX6GNU",
    "lat": 52.52475680000001,
    "lng": 13.3944598,
    "name": "Jewish Community of Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJdU3jouhRqEcRFZjU8BxkCD0",
    "lat": 52.5269095,
    "lng": 13.393568,
    "name": "Adass Jisroel, Berlin, K.d.ö.R.",
    "city": "Berlin"
  },
  {
    "id": "ChIJ_Rq9NvlQqEcRWZx3hTslCIw",
    "lat": 52.5023055,
    "lng": 13.3308424,
    "name": "Zentrale Orthodoxe Synagoge zu Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJDR7qg1ZQqEcRbPWNWxIdHgk",
    "lat": 52.50141090000001,
    "lng": 13.3397222,
    "name": "Sephardic Synagogue Tiferet Israel Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJ3fHMDKdRqEcR0A1CVO-GDus",
    "lat": 52.5085025,
    "lng": 13.4002284,
    "name": "Ehemalige Synagoge",
    "city": "Berlin"
  },
  {
    "id": "ChIJp2PQUHZRqEcRCUlujlNhf1I",
    "lat": 52.51401079999999,
    "lng": 13.378653,
    "name": "Katledilen Avrupalı Yahudiler Anıtı",
    "city": "Berlin"
  },
  {
    "id": "ChIJUQHzT1pTqEcRCTwXhh_1UTA",
    "lat": 52.5503745,
    "lng": 13.3882808,
    "name": "Bet Haskala Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJwyHoieFQqEcR_YhKQznxthU",
    "lat": 52.50784829999999,
    "lng": 13.3154783,
    "name": "Synagoge Pestalozzi",
    "city": "Berlin"
  },
  {
    "id": "ChIJsUNbPPFRqEcR4JI2raONLHI",
    "lat": 52.51188009999999,
    "lng": 13.3065006,
    "name": "Heychal Besht Berlin היכל בעש\"ט ברלין",
    "city": "Berlin"
  },
  {
    "id": "ChIJHyvqdsdNqEcRjZG0WOyaO3E",
    "lat": 52.55690990000001,
    "lng": 13.4665637,
    "name": "Jagannatha Temple ISKCON Berlin e.V.",
    "city": "Berlin"
  },
  {
    "id": "ChIJA3cgVtFPqEcRzFzxZZ8oCQI",
    "lat": 52.4527519,
    "lng": 13.4446934,
    "name": "Murugan Temple",
    "city": "Berlin"
  },
  {
    "id": "ChIJef3AIbFTqEcRnZfBtm87rmw",
    "lat": 52.57655479999999,
    "lng": 13.3609507,
    "name": "Radha Govinda Tempel in Berlin",
    "city": "Berlin"
  },
  {
    "id": "ChIJhzoV-plPqEcRbuK9XKSm7bQ",
    "lat": 52.4869587,
    "lng": 13.4207122,
    "name": "Indian Tamil temple",
    "city": "Berlin"
  },
  {
    "id": "ChIJNYfjBLhPqEcRteBDd9oOblQ",
    "lat": 52.4864997,
    "lng": 13.4202967,
    "name": "Sri Ganesha Hindu Tempel e.V.",
    "city": "Berlin"
  },
  {
    "id": "ChIJhyNJtO9RqEcRdy2fcbInEzY",
    "lat": 52.57655479999999,
    "lng": 13.3609507,
    "name": "Hindugemeinde e.V.",
    "city": "Berlin"
  }
]

module.exports = {mockPlaces}