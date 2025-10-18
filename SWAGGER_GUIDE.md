# NTC Bus Tracking API - Swagger Documentation Guide

## Overview

This API now includes comprehensive Swagger/OpenAPI documentation that makes it easy for developers to understand, test, and integrate with the NTC Bus Tracking system.

## Accessing the Documentation

### Local Development
When running the API locally, access the Swagger UI at:
```
http://localhost:3000/api-docs
```

### Production
In production, the documentation is available at:
```
https://your-domain.com/api-docs
```

## Features

### 🔍 Interactive API Explorer
- **Try it out** functionality for all endpoints
- Real-time request/response testing
- Built-in authentication support
- Request/response examples

### 📚 Comprehensive Documentation
- **Authentication**: Login and user registration
- **Buses**: Complete CRUD operations for bus management
- **Locations**: GPS tracking and location management
- **Routes**: Route management (Admin only)
- **Trips**: Trip scheduling and management
- **System**: Health check endpoints

### 🔐 Security Documentation
- JWT Bearer token authentication
- Role-based access control (Admin, Operator, Commuter)
- Clear security requirements for each endpoint

## Getting Started

### 1. Authentication
Before using most endpoints, you need to authenticate:

1. Go to the **Authentication** section
2. Use the `/api/auth/login` endpoint
3. Provide your credentials:
   ```json
   {
     "username": "your_username",
     "password": "your_password"
   }
   ```
4. Copy the returned JWT token
5. Click the **Authorize** button (🔒) at the top of the page
6. Enter: `Bearer YOUR_JWT_TOKEN_HERE`

### 2. Testing Endpoints
Once authenticated, you can:

1. **Browse** all available endpoints by category
2. **Expand** any endpoint to see details
3. **Click "Try it out"** to test the endpoint
4. **Fill in** required parameters and request body
5. **Execute** the request and see the response

### 3. Understanding Responses
Each endpoint includes:
- **Status codes** (200, 400, 401, 403, 404, 409, 500)
- **Response schemas** with detailed field descriptions
- **Example responses** for success and error cases
- **Error messages** with clear explanations

## API Categories

### 🔐 Authentication
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/register` - User registration (Admin only)

### 🚌 Buses
- **GET** `/api/buses` - Get all buses
- **POST** `/api/buses` - Create new bus
- **GET** `/api/buses/{id}` - Get bus by ID
- **PUT** `/api/buses/{id}` - Update bus
- **DELETE** `/api/buses/{id}` - Delete bus

### 📍 Locations
- **GET** `/api/locations` - Get all location records
- **POST** `/api/locations` - Create location record
- **GET** `/api/locations/{id}` - Get location by ID
- **PUT** `/api/locations/{id}` - Update location
- **DELETE** `/api/locations/{id}` - Delete location

### 🛣️ Routes (Admin Only)
- **GET** `/api/routes` - Get all routes
- **POST** `/api/routes` - Create new route
- **GET** `/api/routes/{id}` - Get route by ID
- **PUT** `/api/routes/{id}` - Update route
- **DELETE** `/api/routes/{id}` - Delete route

### 🚍 Trips
- **GET** `/api/trips` - Get all trips
- **POST** `/api/trips` - Create new trip
- **GET** `/api/trips/{id}` - Get trip by ID
- **PUT** `/api/trips/{id}` - Update trip
- **DELETE** `/api/trips/{id}` - Delete trip

### ⚙️ System
- **GET** `/health` - Health check

## Data Models

The API uses the following main data models:

### User
```json
{
  "_id": "string",
  "username": "string",
  "password": "string",
  "role": "admin|operator|commuter",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Bus
```json
{
  "_id": "string",
  "busId": "number",
  "routeId": "number",
  "operatorId": "number",
  "capacity": "number",
  "licensePlate": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Route
```json
{
  "_id": "string",
  "routeId": "number",
  "from": "string",
  "to": "string",
  "distance": "number",
  "estimatedTime": "string",
  "frequency": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Trip
```json
{
  "_id": "string",
  "tripId": "number",
  "busId": "number",
  "departureTime": "datetime",
  "arrivalTime": "datetime",
  "status": "scheduled|in_transit|completed|cancelled",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Location
```json
{
  "_id": "string",
  "busId": "number",
  "latitude": "number",
  "longitude": "number",
  "timestamp": "datetime",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Error Handling

The API returns consistent error responses:

### Common Error Codes
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found (resource doesn't exist)
- **409** - Conflict (duplicate resource)
- **500** - Internal Server Error

### Error Response Format
```json
{
  "error": "Error message description"
}
```

## Best Practices

### 1. Always Check Authentication
- Most endpoints require a valid JWT token
- Use the "Authorize" button to set your token
- Tokens expire after 10 hours by default

### 2. Understand Role Permissions
- **Admin**: Full access to all endpoints
- **Operator**: Access to buses, locations, and trips
- **Commuter**: Read-only access to buses, locations, and trips

### 3. Use Proper Data Types
- IDs are MongoDB ObjectIds (24-character strings)
- Numbers should be valid integers
- Dates should be in ISO 8601 format
- Coordinates have specific ranges (latitude: -90 to 90, longitude: -180 to 180)

### 4. Handle Errors Gracefully
- Always check response status codes
- Read error messages for debugging
- Implement proper retry logic for 5xx errors

## Integration Examples

### JavaScript/Node.js
```javascript
// Login and get token
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'user', password: 'pass' })
});
const { token } = await loginResponse.json();

// Use token for authenticated requests
const busesResponse = await fetch('/api/buses', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const buses = await busesResponse.json();
```

### Python
```python
import requests

# Login and get token
login_data = {"username": "user", "password": "pass"}
login_response = requests.post('/api/auth/login', json=login_data)
token = login_response.json()['token']

# Use token for authenticated requests
headers = {'Authorization': f'Bearer {token}'}
buses_response = requests.get('/api/buses', headers=headers)
buses = buses_response.json()
```

### cURL
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'

# Use token
curl -X GET http://localhost:3000/api/buses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check if your token is valid and not expired
   - Ensure you're using "Bearer " prefix in Authorization header

2. **403 Forbidden**
   - Verify your user role has permission for the endpoint
   - Some endpoints require admin role

3. **404 Not Found**
   - Check if the resource ID exists
   - Verify the endpoint URL is correct

4. **400 Bad Request**
   - Check request body format and required fields
   - Validate data types and constraints

### Getting Help

If you encounter issues:
1. Check the Swagger documentation for endpoint details
2. Review the error response messages
3. Verify your authentication token
4. Ensure you have the correct user role permissions

## API Versioning

Current API version: **v1.0.0**

The API follows semantic versioning. Breaking changes will increment the major version number.

## Support

For additional support or questions about the API:
- Review the Swagger documentation
- Check the error responses for debugging information
- Ensure you're using the correct authentication and permissions
