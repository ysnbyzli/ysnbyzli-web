"use server";

import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";
import { unstable_cache as cache } from "next/cache";
import { TwitterApi } from "twitter-api-v2";

const CACHE_DURATION = 3600 * 1.5; // 1.5 hours
const USE_MOCK_DATA_FOR_DEVELOPMENT = true;
const DEFAULT_X_RESPONSE = {
	data: { public_metrics: { followers_count: 179 } },
};
const DEFAULT_GITHUB_RESPONSE = {
    "data": {
        "viewer": {
            "login": "ysnbyzli",
            "repositories": {
                "totalCount": 27,
                "nodes": [
                    {
                        "nameWithOwner": "ysnbyzli/the-movies",
                        "name": "the-movies",
                        "description": null,
                        "forkCount": 3,
                        "stargazerCount": 15,
                        "createdAt": "2021-08-28T12:43:12Z",
                        "updatedAt": "2024-03-02T08:11:41Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/react-native-lowest-price",
                        "name": "react-native-lowest-price",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 8,
                        "createdAt": "2021-11-10T11:00:00Z",
                        "updatedAt": "2024-09-03T09:56:48Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/rn-twitter-flashList-example",
                        "name": "rn-twitter-flashList-example",
                        "description": null,
                        "forkCount": 1,
                        "stargazerCount": 3,
                        "createdAt": "2022-07-12T08:33:24Z",
                        "updatedAt": "2022-09-09T21:53:54Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/Swift-Simple-ChatUI",
                        "name": "Swift-Simple-ChatUI",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 2,
                        "createdAt": "2022-08-21T07:05:16Z",
                        "updatedAt": "2022-09-09T21:53:50Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/swiftui-todo-app",
                        "name": "swiftui-todo-app",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 2,
                        "createdAt": "2022-08-14T11:20:30Z",
                        "updatedAt": "2022-09-09T21:53:51Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/patika-react-native-projects",
                        "name": "patika-react-native-projects",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 2,
                        "createdAt": "2022-01-06T18:07:52Z",
                        "updatedAt": "2022-09-09T21:53:58Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/bootcamp-hizlandirma",
                        "name": "bootcamp-hizlandirma",
                        "description": "Patika bootcamp hızlandırma programı surecinde yapılan projeler bu repoda yer almaktadir",
                        "forkCount": 1,
                        "stargazerCount": 2,
                        "createdAt": "2021-12-08T19:09:11Z",
                        "updatedAt": "2022-09-09T21:54:02Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/node-lowest-price-api",
                        "name": "node-lowest-price-api",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 2,
                        "createdAt": "2021-11-30T12:57:46Z",
                        "updatedAt": "2022-09-09T21:54:02Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/amazon-clone",
                        "name": "amazon-clone",
                        "description": "Next.js- Redux ve Hook yapısını kullanarak \"Amazon\" clone  E-Ticaret uygulaması geliştirdim. 👨‍💻Canlı test linkine detaydan ulaşabilirsiniz",
                        "forkCount": 0,
                        "stargazerCount": 2,
                        "createdAt": "2021-09-21T09:06:56Z",
                        "updatedAt": "2022-09-09T21:54:04Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/getir-clone",
                        "name": "getir-clone",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 2,
                        "createdAt": "2021-08-27T12:21:15Z",
                        "updatedAt": "2022-09-09T21:54:10Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/ysnbyzli",
                        "name": "ysnbyzli",
                        "description": null,
                        "forkCount": 1,
                        "stargazerCount": 2,
                        "createdAt": "2021-08-16T23:13:59Z",
                        "updatedAt": "2025-12-04T00:54:44Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/visual-museum-client",
                        "name": "visual-museum-client",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2022-06-11T10:20:08Z",
                        "updatedAt": "2022-09-09T21:53:52Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/visual-museum-admin",
                        "name": "visual-museum-admin",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2022-04-06T18:23:14Z",
                        "updatedAt": "2022-09-09T21:53:55Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/visual-museum-api",
                        "name": "visual-museum-api",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2022-04-06T16:28:49Z",
                        "updatedAt": "2022-09-09T21:53:54Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/paket-mutfak",
                        "name": "paket-mutfak",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2022-01-09T10:47:46Z",
                        "updatedAt": "2022-09-09T21:54:01Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/BookStore",
                        "name": "BookStore",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2021-10-15T09:19:36Z",
                        "updatedAt": "2022-09-09T21:54:04Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/folksdev-java-bootcamp",
                        "name": "folksdev-java-bootcamp",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2021-09-29T14:19:50Z",
                        "updatedAt": "2022-09-09T21:54:07Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/parika.dev-java",
                        "name": "parika.dev-java",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2021-09-08T22:43:59Z",
                        "updatedAt": "2022-09-09T21:54:07Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/patika.dev-c-sharp",
                        "name": "patika.dev-c-sharp",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2021-09-01T20:51:00Z",
                        "updatedAt": "2022-09-09T21:54:05Z"
                    },
                    {
                        "nameWithOwner": "ysnbyzli/expense-tracker",
                        "name": "expense-tracker",
                        "description": null,
                        "forkCount": 0,
                        "stargazerCount": 1,
                        "createdAt": "2021-09-01T09:15:56Z",
                        "updatedAt": "2022-09-09T21:54:08Z"
                    }
                ]
            },
            "followers": {
                "totalCount": 67
            },
            "contributionsCollection": {
                "contributionCalendar": {
                    "totalContributions": 1906,
                    "weeks": [
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-01"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-02"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-03"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-04"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-05"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-06"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-07"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-08"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-09"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-10"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-11"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-12"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-13"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-14"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-15"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2024-12-16"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2024-12-17"
                                },
                                {
                                    "contributionCount": 20,
                                    "date": "2024-12-18"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2024-12-19"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2024-12-20"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-21"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-22"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-23"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2024-12-24"
                                },
                                {
                                    "contributionCount": 11,
                                    "date": "2024-12-25"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-26"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-27"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-28"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-29"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2024-12-30"
                                },
                                {
                                    "contributionCount": 17,
                                    "date": "2024-12-31"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-01-01"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-01-02"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-01-03"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-01-04"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 6,
                                    "date": "2025-01-05"
                                },
                                {
                                    "contributionCount": 18,
                                    "date": "2025-01-06"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-01-07"
                                },
                                {
                                    "contributionCount": 26,
                                    "date": "2025-01-08"
                                },
                                {
                                    "contributionCount": 16,
                                    "date": "2025-01-09"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-01-10"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-01-11"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-01-12"
                                },
                                {
                                    "contributionCount": 8,
                                    "date": "2025-01-13"
                                },
                                {
                                    "contributionCount": 8,
                                    "date": "2025-01-14"
                                },
                                {
                                    "contributionCount": 20,
                                    "date": "2025-01-15"
                                },
                                {
                                    "contributionCount": 31,
                                    "date": "2025-01-16"
                                },
                                {
                                    "contributionCount": 26,
                                    "date": "2025-01-17"
                                },
                                {
                                    "contributionCount": 21,
                                    "date": "2025-01-18"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 9,
                                    "date": "2025-01-19"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-01-20"
                                },
                                {
                                    "contributionCount": 47,
                                    "date": "2025-01-21"
                                },
                                {
                                    "contributionCount": 19,
                                    "date": "2025-01-22"
                                },
                                {
                                    "contributionCount": 11,
                                    "date": "2025-01-23"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-01-24"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-01-25"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-01-26"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-01-27"
                                },
                                {
                                    "contributionCount": 15,
                                    "date": "2025-01-28"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-01-29"
                                },
                                {
                                    "contributionCount": 60,
                                    "date": "2025-01-30"
                                },
                                {
                                    "contributionCount": 64,
                                    "date": "2025-01-31"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-01"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-02"
                                },
                                {
                                    "contributionCount": 16,
                                    "date": "2025-02-03"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-02-04"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-02-05"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-06"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-07"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-08"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-09"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-02-10"
                                },
                                {
                                    "contributionCount": 8,
                                    "date": "2025-02-11"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-02-12"
                                },
                                {
                                    "contributionCount": 21,
                                    "date": "2025-02-13"
                                },
                                {
                                    "contributionCount": 14,
                                    "date": "2025-02-14"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-15"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-16"
                                },
                                {
                                    "contributionCount": 12,
                                    "date": "2025-02-17"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-02-18"
                                },
                                {
                                    "contributionCount": 10,
                                    "date": "2025-02-19"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-20"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-02-21"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-02-22"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-02-23"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-02-24"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-02-25"
                                },
                                {
                                    "contributionCount": 16,
                                    "date": "2025-02-26"
                                },
                                {
                                    "contributionCount": 27,
                                    "date": "2025-02-27"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-02-28"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-01"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-02"
                                },
                                {
                                    "contributionCount": 13,
                                    "date": "2025-03-03"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-03-04"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-03-05"
                                },
                                {
                                    "contributionCount": 8,
                                    "date": "2025-03-06"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-07"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-08"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-09"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-03-10"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-03-11"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-03-12"
                                },
                                {
                                    "contributionCount": 30,
                                    "date": "2025-03-13"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-03-14"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-15"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-16"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-03-17"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-03-18"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-03-19"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-03-20"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-03-21"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-22"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-23"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-03-24"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-25"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-03-26"
                                },
                                {
                                    "contributionCount": 12,
                                    "date": "2025-03-27"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-03-28"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-29"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-30"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-03-31"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-01"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-02"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-03"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-04"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-05"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-06"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-04-07"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-04-08"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-04-09"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-10"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-04-11"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-12"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-13"
                                },
                                {
                                    "contributionCount": 15,
                                    "date": "2025-04-14"
                                },
                                {
                                    "contributionCount": 14,
                                    "date": "2025-04-15"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-04-16"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-04-17"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-18"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-19"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 1,
                                    "date": "2025-04-20"
                                },
                                {
                                    "contributionCount": 25,
                                    "date": "2025-04-21"
                                },
                                {
                                    "contributionCount": 50,
                                    "date": "2025-04-22"
                                },
                                {
                                    "contributionCount": 11,
                                    "date": "2025-04-23"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-04-24"
                                },
                                {
                                    "contributionCount": 15,
                                    "date": "2025-04-25"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-26"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-04-27"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-04-28"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-04-29"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-04-30"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-01"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-02"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-03"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 5,
                                    "date": "2025-05-04"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-05"
                                },
                                {
                                    "contributionCount": 10,
                                    "date": "2025-05-06"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-05-07"
                                },
                                {
                                    "contributionCount": 8,
                                    "date": "2025-05-08"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-05-09"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-10"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 1,
                                    "date": "2025-05-11"
                                },
                                {
                                    "contributionCount": 17,
                                    "date": "2025-05-12"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-05-13"
                                },
                                {
                                    "contributionCount": 11,
                                    "date": "2025-05-14"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-05-15"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-16"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-17"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-18"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-19"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-05-20"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-05-21"
                                },
                                {
                                    "contributionCount": 16,
                                    "date": "2025-05-22"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-05-23"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-24"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-05-25"
                                },
                                {
                                    "contributionCount": 18,
                                    "date": "2025-05-26"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-05-27"
                                },
                                {
                                    "contributionCount": 10,
                                    "date": "2025-05-28"
                                },
                                {
                                    "contributionCount": 22,
                                    "date": "2025-05-29"
                                },
                                {
                                    "contributionCount": 12,
                                    "date": "2025-05-30"
                                },
                                {
                                    "contributionCount": 15,
                                    "date": "2025-05-31"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-01"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-06-02"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-06-03"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-04"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-06-05"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-06"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-07"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-08"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-09"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-06-10"
                                },
                                {
                                    "contributionCount": 15,
                                    "date": "2025-06-11"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-12"
                                },
                                {
                                    "contributionCount": 19,
                                    "date": "2025-06-13"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-14"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-15"
                                },
                                {
                                    "contributionCount": 27,
                                    "date": "2025-06-16"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-06-17"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-18"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-19"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-20"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-21"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-22"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-06-23"
                                },
                                {
                                    "contributionCount": 8,
                                    "date": "2025-06-24"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-06-25"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-26"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-06-27"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-06-28"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 3,
                                    "date": "2025-06-29"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-06-30"
                                },
                                {
                                    "contributionCount": 15,
                                    "date": "2025-07-01"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-07-02"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-03"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-07-04"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-05"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-06"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-07"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-07-08"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-09"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-10"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-11"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-12"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-13"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-14"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-15"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-07-16"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-07-17"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-07-18"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-19"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 13,
                                    "date": "2025-07-20"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-07-21"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-07-22"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-07-23"
                                },
                                {
                                    "contributionCount": 28,
                                    "date": "2025-07-24"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-25"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-26"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-07-27"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-07-28"
                                },
                                {
                                    "contributionCount": 52,
                                    "date": "2025-07-29"
                                },
                                {
                                    "contributionCount": 16,
                                    "date": "2025-07-30"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-07-31"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-08-01"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-02"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-03"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-04"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-05"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-08-06"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-07"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-08-08"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-09"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-10"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-11"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-08-12"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-08-13"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-14"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-15"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-16"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-17"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-18"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-19"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-20"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-21"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-22"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-23"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-24"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-25"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-08-26"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-08-27"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-08-28"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-08-29"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-30"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-08-31"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-09-01"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-09-02"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-09-03"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-04"
                                },
                                {
                                    "contributionCount": 10,
                                    "date": "2025-09-05"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-09-06"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-07"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-09-08"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-09"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-10"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-09-11"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-09-12"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-13"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-14"
                                },
                                {
                                    "contributionCount": 15,
                                    "date": "2025-09-15"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-09-16"
                                },
                                {
                                    "contributionCount": 11,
                                    "date": "2025-09-17"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-09-18"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-09-19"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-20"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-21"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-22"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-09-23"
                                },
                                {
                                    "contributionCount": 12,
                                    "date": "2025-09-24"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-09-25"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-09-26"
                                },
                                {
                                    "contributionCount": 2,
                                    "date": "2025-09-27"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-28"
                                },
                                {
                                    "contributionCount": 8,
                                    "date": "2025-09-29"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-09-30"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-10-01"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-02"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-10-03"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-04"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-05"
                                },
                                {
                                    "contributionCount": 10,
                                    "date": "2025-10-06"
                                },
                                {
                                    "contributionCount": 13,
                                    "date": "2025-10-07"
                                },
                                {
                                    "contributionCount": 30,
                                    "date": "2025-10-08"
                                },
                                {
                                    "contributionCount": 11,
                                    "date": "2025-10-09"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-10-10"
                                },
                                {
                                    "contributionCount": 7,
                                    "date": "2025-10-11"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 3,
                                    "date": "2025-10-12"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-10-13"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-10-14"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-10-15"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-10-16"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-17"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-18"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-19"
                                },
                                {
                                    "contributionCount": 16,
                                    "date": "2025-10-20"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-10-21"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-22"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-23"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-24"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-25"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-26"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-10-27"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-10-28"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-29"
                                },
                                {
                                    "contributionCount": 3,
                                    "date": "2025-10-30"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-10-31"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-01"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-02"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-03"
                                },
                                {
                                    "contributionCount": 6,
                                    "date": "2025-11-04"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-11-05"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-06"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-07"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-08"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-09"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-11-10"
                                },
                                {
                                    "contributionCount": 11,
                                    "date": "2025-11-11"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-11-12"
                                },
                                {
                                    "contributionCount": 10,
                                    "date": "2025-11-13"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-14"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-15"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-16"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-11-17"
                                },
                                {
                                    "contributionCount": 1,
                                    "date": "2025-11-18"
                                },
                                {
                                    "contributionCount": 5,
                                    "date": "2025-11-19"
                                },
                                {
                                    "contributionCount": 9,
                                    "date": "2025-11-20"
                                },
                                {
                                    "contributionCount": 32,
                                    "date": "2025-11-21"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-22"
                                }
                            ]
                        },
                        {
                            "contributionDays": [
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-23"
                                },
                                {
                                    "contributionCount": 26,
                                    "date": "2025-11-24"
                                },
                                {
                                    "contributionCount": 0,
                                    "date": "2025-11-25"
                                },
                                {
                                    "contributionCount": 4,
                                    "date": "2025-11-26"
                                },
                                {
                                    "contributionCount": 18,
                                    "date": "2025-11-27"
                                },
                                {
                                    "contributionCount": 25,
                                    "date": "2025-11-28"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
}

const rateLimitPlugin = new TwitterApiRateLimitPlugin();
const client = new TwitterApi(
	{
		appKey: process.env.X_API_KEY!,
		appSecret: process.env.X_API_SECRET!,
		accessToken: process.env.X_MY_ACCESS_TOKEN!,
		accessSecret: process.env.X_MY_ACCESS_TOKEN_SECRET!,
	},
	{
		plugins: [rateLimitPlugin],
	},
);

export const getGithubInfo = cache(
	async (): Promise<Externals.Github.ApiResponse> => {
		try {
			// Avoid rate limiting in development
			// set USE_MOCK_DATA_FOR_DEVELOPMENT false to use real data
			if (
				process.env.NODE_ENV === "development" &&
				USE_MOCK_DATA_FOR_DEVELOPMENT
			) {
				return DEFAULT_GITHUB_RESPONSE;
			}

			const query = `
{
  viewer {
    login
    repositories(
      first: 20
      affiliations: OWNER
      isFork: false
      orderBy: {field: STARGAZERS, direction: DESC}
    ) {
      totalCount
      nodes {
        nameWithOwner
        name
        description
        forkCount
        stargazerCount
        createdAt
        updatedAt
      }
    }
    followers {
      totalCount
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

			console.log("API HIT: github");
			const res = await fetch("https://api.github.com/graphql", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				body: JSON.stringify({
					query,
				}),
				next: { revalidate: CACHE_DURATION },
			});

			return await res.json();
		} catch (error) {
			console.error("github api error", error);
			return DEFAULT_GITHUB_RESPONSE;
		}
	},
	["ned-im-github-data"],
	{
		revalidate: CACHE_DURATION,
	},
);

export const getXInfo = cache(
	async () => {
		try {
			// Avoid rate limiting in development
			// set USE_MOCK_DATA_FOR_DEVELOPMENT false to use real data
			if (
				process.env.NODE_ENV === "development" &&
				USE_MOCK_DATA_FOR_DEVELOPMENT
			) {
				return DEFAULT_X_RESPONSE;
			}


			const currentRateLimitForMe =
				await rateLimitPlugin.v2.getRateLimit("users/me");
			console.log("API RATES: X", currentRateLimitForMe);

			console.log("API HIT: X");
			const user = await client.v2.me({
				"user.fields": "public_metrics",
			});
			console.log("API RESPONSE: X", user);

			return user;
		} catch (error) {
			console.error("x api error", error);
			return DEFAULT_X_RESPONSE;
		}
	},
	["ned-im-x-data"],
	{
		revalidate: false,
	},
);
