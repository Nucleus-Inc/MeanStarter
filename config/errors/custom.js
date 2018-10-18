module.exports = {
  REQ001: {
    httpCode: 400,
    response: {
      errorCode: 'REQ-001',
      description: 'Invalid or missing fields'
    }
  },
  REQ002: {
    httpCode: 400,
    response: {
      errorCode: 'REQ-002',
      description: 'Invalid request body'
    }
  },
  REQ003: {
    httpCode: 422,
    response: {
      errorCode: 'REQ-003',
      description: 'Duplicated resource'
    }
  },
  REQ004: {
    httpCode: 429,
    response: {
      errorCode: 'REQ-004',
      description: 'Too Many Requests'
    }
  },
  AUT001: {
    httpCode: 401,
    response: {
      errorCode: 'AUT-001',
      description: 'Invalid or missing credentials.'
    }
  },
  AUT002: {
    httpCode: 403,
    response: {
      errorCode: 'AUT-002',
      description: 'You do not have permission to perfom this action.'
    }
  },
  AUT003: {
    httpCode: 403,
    response: {
      errorCode: 'AUT-003',
      description: 'User new password must not be the current one.'
    }
  },
  AUT004: {
    httpCode: 403,
    response: {
      errorCode: 'AUT-004',
      description: 'Invalid or expired confirmation code.'
    }
  },
  AUT005: {
    httpCode: 403,
    response: {
      errorCode: 'AUT-005',
      description:
        'This request could not be processed. The user account is not active.'
    }
  },
  AUT006: {
    httpCode: 403,
    response: {
      errorCode: 'AUT-006',
      description:
        'This request could not be processed. The user account is already active.'
    }
  },
  AUT007: {
    httpCode: 403,
    response: {
      errorCode: 'AUT-007',
      description:
        'The OAuth2 Provider and/or email address is already connected to another account.'
    }
  },
  SRV001: {
    httpCode: 500,
    response: {
      errorCode: 'SRV-001',
      description: 'An internal error occurred. This request has been logged.'
    }
  }
}
