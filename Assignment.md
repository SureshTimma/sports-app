# Node.js Backend Assignment – Sports App

## Service Description

You are building the backend service for a Sports Application. The app has 3 main entities: Sport, Tour, and Match. Each Sport has multiple
Tours, and each Tour has multiple Matches.

## Existing Features

The backend already has: - An endpoint /tour/matches that returns all matches for a given tour name. - An endpoint /sport/tour/match that
returns match details.

## Problem 1 – Performance Optimization

The endpoint /tour/matches returns all matches for a given tour name, but latency increases linearly with the number of tours. Task: Optimize
the endpoint to fetch matches efficiently using database indexing, optimized queries, or by avoiding unnecessary data loading.

## Problem 2 – Extend Match Details

Update the endpoint /sport/tour/match to also return: id, startTime, and format for each match, without performance degradation.

## Problem 3 – News Feature

## Functional Requirements:

1. News can be created for a match or a tour.
2. If news is created for a match, it also belongs to the corresponding tour.
3. If news is created for a tour, it also belongs to the corresponding sport.

## Technical Requirements:

1. POST /news – Create news for a match or a tour.
2. GET /news/match/:matchId – Fetch news by match ID.
3. GET /news/tour/:tourId – Fetch news by tour ID.
4. GET /news/sport/:sportId – Fetch news by sport ID.

## News Model:

```
{ "id": "string", "title": "string", "description": "string", "matchId": "string | null", "tourId": "string | null",
"sportId": "string | null", "createdAt": "ISODate", "updatedAt": "ISODate" }
```
## Submission Guidelines

1. Use Node.js with Express.js.
2. Use MongoDB or PostgreSQL.
3. Follow RESTful API design.

## 4. Include error handling, validation, and README.md.

## Evaluation Criteria

1. Correctness – Meets all requirements.
2. Performance – Optimized for large datasets.
3. Code Quality – Readable, modular, maintainable.
4. API Design – RESTful best practices.
5. Documentation – Clear instructions.


