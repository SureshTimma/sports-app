# Sports App Backend

A Node.js backend service for a Sports Application with Express.js and MongoDB. The app manages Sports, Tours, Matches, and News with optimized endpoints and RESTful API design.

## Features

- **Sports Management**: Create and retrieve sports
- **Tours Management**: Create tours linked to sports with optimized match retrieval
- **Matches Management**: Create matches linked to tours with enhanced details
- **News System**: Create and retrieve news for matches, tours, and sports with automatic hierarchy

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- Postman (for API testing)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sports-app
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/SportsApp
```

4. Start the server
```bash
npm start
# or for development
npm run dev
```

Server will run on `http://localhost:3000`

## API Testing with Postman

### Base URL: `http://localhost:3000`

## 1. Sports Endpoints

### GET /sports
**Description**: Retrieve all sports
- **Method**: GET
- **URL**: `http://localhost:3000/sports`
- **Headers**: None required
- **Expected Response**: Array of sports objects

### POST /sports
**Description**: Create a new sport
- **Method**: POST
- **URL**: `http://localhost:3000/sports`
- **Headers**: 
  - Content-Type: application/json
- **Body** (JSON):
```json
{
  "sportName": "Football"
}
```

### GET /sports/tour/match (Problem 2)
**Description**: Get enhanced match details by sport, tour, and match name
- **Method**: GET
- **URL**: `http://localhost:3000/sports/tour/match?sportName=Football&tourName=Premier League&matchName=Arsenal vs Chelsea`
- **Headers**: None required
- **Expected Response**: Match object with id, matchName, startTime, format

## 2. Tours Endpoints

### GET /tours
**Description**: Retrieve all tours with sport details
- **Method**: GET
- **URL**: `http://localhost:3000/tours`
- **Headers**: None required

### POST /tours
**Description**: Create a new tour
- **Method**: POST
- **URL**: `http://localhost:3000/tours`
- **Headers**: 
  - Content-Type: application/json
- **Body** (JSON):
```json
{
  "tourName": "Premier League",
  "sportId": "68a8b2d32276e54e695582fc"
}
```

### GET /tours/matches (Problem 1 - Optimized)
**Description**: Get all matches for a specific tour (Performance Optimized)
- **Method**: GET
- **URL**: `http://localhost:3000/tours/matches?tourName=Premier League`
- **Headers**: None required
- **Expected Response**: Array of matches with selected fields only

## 3. Matches Endpoints

### GET /matches
**Description**: Retrieve all matches with tour details
- **Method**: GET
- **URL**: `http://localhost:3000/matches`
- **Headers**: None required

### POST /matches
**Description**: Create a new match
- **Method**: POST
- **URL**: `http://localhost:3000/matches`
- **Headers**: 
  - Content-Type: application/json
- **Body** (JSON):
```json
{
  "matchName": "Arsenal vs Chelsea",
  "tourId": "68a8b30e2276e54e69558306",
  "startTime": "2024-12-15T15:30:00Z",
  "format": "Regular"
}
```

## 4. News Endpoints (Problem 3)

### GET /news
**Description**: Retrieve all news with populated references
- **Method**: GET
- **URL**: `http://localhost:3000/news`
- **Headers**: None required

### POST /news
**Description**: Create news for a match or tour
- **Method**: POST
- **URL**: `http://localhost:3000/news`
- **Headers**: 
  - Content-Type: application/json

**For Match News** (Body JSON):
```json
{
  "title": "Match Highlights Available",
  "description": "Watch the best moments from this exciting match",
  "matchId": "68a8b35e2276e54e69558312"
}
```

**For Tour News** (Body JSON):
```json
{
  "title": "Tournament Update",
  "description": "Latest updates from the tournament",
  "tourId": "68a8b30e2276e54e69558306"
}
```

### GET /news/match/:matchId
**Description**: Get news by match ID
- **Method**: GET
- **URL**: `http://localhost:3000/news/match/68a8b35e2276e54e69558312`
- **Headers**: None required

### GET /news/tour/:tourId
**Description**: Get news by tour ID
- **Method**: GET
- **URL**: `http://localhost:3000/news/tour/68a8b30e2276e54e69558306`
- **Headers**: None required

### GET /news/sport/:sportId
**Description**: Get news by sport ID
- **Method**: GET
- **URL**: `http://localhost:3000/news/sport/68a8b2d32276e54e695582fc`
- **Headers**: None required

## Testing Sequence

### 1. Basic Setup Testing
1. Start with `GET /sports` to see existing sports
2. Create a new sport using `POST /sports`
3. Create a tour using `POST /tours` with a sport ID
4. Create a match using `POST /matches` with a tour ID

### 2. Assignment Problem Testing

#### Problem 1: Performance Optimization
- Test `GET /tours/matches?tourName=Premier League`
- Verify it returns only necessary fields (matchName, startTime, format)
- Check response time for large datasets

#### Problem 2: Enhanced Match Details
- Test `GET /sports/tour/match?sportName=Football&tourName=Premier League&matchName=Arsenal vs Chelsea`
- Verify response includes: id, matchName, startTime, format

#### Problem 3: News Feature
1. Create news for a match:
   - Use `POST /news` with matchId
   - Verify it auto-populates tourId and sportId
2. Create news for a tour:
   - Use `POST /news` with tourId
   - Verify it auto-populates sportId
3. Test retrieval endpoints:
   - `GET /news/match/:matchId`
   - `GET /news/tour/:tourId`
   - `GET /news/sport/:sportId`

## Sample Object IDs for Testing

Use these IDs from the pre-populated database:

**Sports:**
- Football: `68a8b2d32276e54e695582fc`
- Basketball: `68a8b2d32276e54e695582fd`
- Cricket: `68a84484aa90ec97ea3e5a59`

**Tours:**
- Premier League: `68a8b30e2276e54e69558306`
- NBA Championship: `68a8b30e2276e54e69558307`
- IPL 2024: `68a8b30e2276e54e69558309`

**Matches:**
- Arsenal vs Chelsea: `68a8b35e2276e54e69558312`
- Lakers vs Warriors: `68a8b35e2276e54e69558313`
- Mumbai Indians vs Chennai: `68a8b35e2276e54e69558315`

## Error Handling

All endpoints include proper error handling:
- **400**: Bad Request (missing required parameters)
- **404**: Resource not found
- **500**: Server error

## Performance Features

- Database indexing on frequently queried fields
- Optimized queries with field selection
- Proper population of references
- Efficient relationship management

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment**: dotenv for configuration
- **Development**: nodemon for auto-restart