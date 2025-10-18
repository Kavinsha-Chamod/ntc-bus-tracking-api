const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NTC Bus Tracking API',
      version: '1.0.0',
      description: 'A comprehensive RESTful API for real-time bus tracking system with role-based authentication',
      contact: {
        name: 'NTC Bus Tracking Team',
        email: 'support@ntcbus.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server'
      },
      {
        url: 'https://ntc-bus-tracking-api-production-b336.up.railway.app',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtained from /api/auth/login endpoint'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'password', 'role'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the user',
              example: '507f1f77bcf86cd799439011'
            },
            username: {
              type: 'string',
              description: 'Unique username for authentication',
              example: 'john_doe'
            },
            password: {
              type: 'string',
              description: 'User password (not returned in responses)',
              example: 'securePassword123'
            },
            role: {
              type: 'string',
              enum: ['admin', 'operator', 'commuter'],
              description: 'User role determining access permissions'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            }
          }
        },
        Bus: {
          type: 'object',
          required: ['busId', 'routeId', 'operatorId', 'capacity', 'licensePlate'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the bus',
              example: '507f1f77bcf86cd799439011'
            },
            busId: {
              type: 'number',
              description: 'Unique bus identifier',
              example: 1001
            },
            routeId: {
              type: 'number',
              description: 'Associated route identifier',
              example: 201
            },
            operatorId: {
              type: 'number',
              description: 'Operator identifier',
              example: 301
            },
            capacity: {
              type: 'number',
              minimum: 1,
              description: 'Maximum passenger capacity',
              example: 50
            },
            licensePlate: {
              type: 'string',
              description: 'Vehicle license plate number',
              example: 'ABC-1234'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Bus creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Bus last update timestamp'
            }
          }
        },
        Route: {
          type: 'object',
          required: ['routeId', 'from', 'to', 'distance', 'estimatedTime', 'frequency'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the route',
              example: '507f1f77bcf86cd799439011'
            },
            routeId: {
              type: 'number',
              description: 'Unique route identifier',
              example: 201
            },
            from: {
              type: 'string',
              description: 'Starting location',
              example: 'Central Station'
            },
            to: {
              type: 'string',
              description: 'Destination location',
              example: 'Airport Terminal'
            },
            distance: {
              type: 'number',
              minimum: 0,
              description: 'Route distance in kilometers',
              example: 15.5
            },
            estimatedTime: {
              type: 'string',
              description: 'Estimated travel time',
              example: '45 minutes'
            },
            frequency: {
              type: 'string',
              description: 'Service frequency',
              example: 'Every 15 minutes'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Route creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Route last update timestamp'
            }
          }
        },
        Trip: {
          type: 'object',
          required: ['tripId', 'busId', 'departureTime', 'arrivalTime'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the trip',
              example: '507f1f77bcf86cd799439011'
            },
            tripId: {
              type: 'number',
              description: 'Unique trip identifier',
              example: 5001
            },
            busId: {
              type: 'number',
              description: 'Associated bus identifier',
              example: 1001
            },
            departureTime: {
              type: 'string',
              format: 'date-time',
              description: 'Scheduled departure time',
              example: '2024-01-15T08:00:00Z'
            },
            arrivalTime: {
              type: 'string',
              format: 'date-time',
              description: 'Scheduled arrival time',
              example: '2024-01-15T08:45:00Z'
            },
            status: {
              type: 'string',
              enum: ['scheduled', 'in_transit', 'completed', 'cancelled'],
              default: 'scheduled',
              description: 'Current trip status'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Trip creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Trip last update timestamp'
            }
          }
        },
        Location: {
          type: 'object',
          required: ['busId', 'latitude', 'longitude'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the location record',
              example: '507f1f77bcf86cd799439011'
            },
            busId: {
              type: 'number',
              description: 'Associated bus identifier',
              example: 1001
            },
            latitude: {
              type: 'number',
              minimum: -90,
              maximum: 90,
              description: 'GPS latitude coordinate',
              example: 6.9271
            },
            longitude: {
              type: 'number',
              minimum: -180,
              maximum: 180,
              description: 'GPS longitude coordinate',
              example: 79.8612
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Location recording timestamp',
              example: '2024-01-15T08:30:00Z'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Location record creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Location record last update timestamp'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Invalid credentials'
            },
            message: {
              type: 'string',
              description: 'Detailed error message',
              example: 'The provided username or password is incorrect'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message',
              example: 'Operation completed successfully'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'User username',
              example: 'john_doe'
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'securePassword123'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT authentication token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'User ID',
                  example: '507f1f77bcf86cd799439011'
                },
                role: {
                  type: 'string',
                  enum: ['admin', 'operator', 'commuter'],
                  description: 'User role'
                }
              }
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'password', 'role'],
          properties: {
            username: {
              type: 'string',
              description: 'New user username',
              example: 'jane_operator'
            },
            password: {
              type: 'string',
              description: 'New user password',
              example: 'securePassword123'
            },
            role: {
              type: 'string',
              enum: ['operator', 'commuter'],
              description: 'User role (admin cannot be created via API)'
            }
          }
        },
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['OK', 'Error'],
              description: 'System health status'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Health check timestamp'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js'] // Path to the API files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
