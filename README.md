# Simple API Server with Oauth2

A simple REST API server that uses Oauth2 for authentication.

## Installation

`npm install`

## Usage

### Start the server

`node server`

### Create User

#### request

```
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin", "password":"admin"}' http://localhost:3000/api/users
```

#### response

```
{ "message":"New user added." }
```

### Create Client

#### request

```
curl --user admin:admin -X POST -H "Content-Type: application/json" -d '{"name":"My Client Name", "id":"this_is_my_id", "secret":"this_is_my_secret"}' http://localhost:3000/api/clients
```

#### response

```
{
  "message":"Client added.",
  "data":{
    "__v":0,
    "userId":"55842f5f27cf4e7fa18395e1",
    "secret":"this_is_my_secret",
    "id":"this_is_my_id",
    "name":"My Client Name",
    "_id":"5584302627cf4e7fa18395e2"
  }
}
```

### Get Authorization Code

#### request (in browser; enter username/password when prompted):

```
http://localhost:3000/api/oauth2/authorize?client_id=this_is_my_id&response_type=code&redirect_uri=http://localhost:3000
```

click "accept" (or "deny")

#### response (in address bar):

```
http://localhost:3000/?code=QjWo9QuVR8WuerAn
```

so, your authorization code is: QjWo9QuVR8WuerAn


### Get Access Token

(use client id as username and client secret as password)

#### request

```
curl --user this_is_my_id:this_is_my_secret -X POST -H "Content-Type: application/json" -d '{"code":"QjWo9QuVR8WuerAn", "grant_type":"authorization_code", "redirect_uri":"http://localhost:3000"}' http://localhost:3000/api/oauth2/token
```

#### response

```
{
  "access_token":{
    "__v":0,
    "value":"A9BaPBrwIyyV0g8moyj3r4H4YWLzZfA783ci7XVfNb11gqthvRBdooYbh1m4aihirdhxyTKZs5HDkXQFtQpT8pMfflLyMeFocR9wp5zkVbT7VJ7jAvxABYuUBB2M92k5Bm8ZpXMzRIlgN1Gm4DMESjU14okV6kbOwHmhSn5dP88pzLBhFKmMJ99rKSmLjCYOpgMqisI9gwnSZmbEt5XCIwsseJVTLgd4hs6Ncv1x3shZeJYbnVWlaAV3gmfZ3fmV",
    "clientId":"5584302627cf4e7fa18395e2",
    "userId":"55842f5f27cf4e7fa18395e1",
    "_id":"558431bc27cf4e7fa18395e4"
  },
  "token_type":"Bearer"
}
```

### Add a Resource

IMPORTANT: add authorization header as "Bearer <accessToken>"

#### request

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer A9BaPBrwIyyV0g8moyj3r4H4YWLzZfA783ci7XVfNb11gqthvRBdooYbh1m4aihirdhxyTKZs5HDkXQFtQpT8pMfflLyMeFocR9wp5zkVbT7VJ7jAvxABYuUBB2M92k5Bm8ZpXMzRIlgN1Gm4DMESjU14okV6kbOwHmhSn5dP88pzLBhFKmMJ99rKSmLjCYOpgMqisI9gwnSZmbEt5XCIwsseJVTLgd4hs6Ncv1x3shZeJYbnVWlaAV3gmfZ3fmV" -d '{"name":"My First Resource", "type":"something-new", "body":"some content and stuff"}' http://localhost:3000/api/resources
```

#### response

```
{
  "message":"Resource added.",
  "data":{
    "__v":0,
    "body":"some content and stuff",
    "type":"something-new",
    "name":"My First Resource",
    "userId":"55842f5f27cf4e7fa18395e1",
    "_id":"558433f627cf4e7fa18395e5"
  }
}
```

### Get All Resources

#### request

```
curl -X GET -H "Authorization: Bearer A9BaPBrwIyyV0g8moyj3r4H4YWLzZfA783ci7XVfNb11gqthvRBdooYbh1m4aihirdhxyTKZs5HDkXQFtQpT8pMfflLyMeFocR9wp5zkVbT7VJ7jAvxABYuUBB2M92k5Bm8ZpXMzRIlgN1Gm4DMESjU14okV6kbOwHmhSn5dP88pzLBhFKmMJ99rKSmLjCYOpgMqisI9gwnSZmbEt5XCIwsseJVTLgd4hs6Ncv1x3shZeJYbnVWlaAV3gmfZ3fmV" http://localhost:3000/api/resources
```

#### response

```
[
  {
    "_id":"558433f627cf4e7fa18395e5",
    "body":"some content and stuff",
    "type":"something-new",
    "name":"My First Resource",
    "userId":"55842f5f27cf4e7fa18395e1",
    "__v":0
  },
  {
    ...
  }
]
```

### Get a Specific Resource

#### request

```
curl -X GET -H "Authorization: Bearer A9BaPBrwIyyV0g8moyj3r4H4YWLzZfA783ci7XVfNb11gqthvRBdooYbh1m4aihirdhxyTKZs5HDkXQFtQpT8pMfflLyMeFocR9wp5zkVbT7VJ7jAvxABYuUBB2M92k5Bm8ZpXMzRIlgN1Gm4DMESjU14okV6kbOwHmhSn5dP88pzLBhFKmMJ99rKSmLjCYOpgMqisI9gwnSZmbEt5XCIwsseJVTLgd4hs6Ncv1x3shZeJYbnVWlaAV3gmfZ3fmV" http://localhost:3000/api/resources/558433f627cf4e7fa18395e5
```

#### response

```
[
  {
    "_id":"558433f627cf4e7fa18395e5",
    "body":"some content and stuff",
    "type":"something-new",
    "name":"My First Resource",
    "userId":"55842f5f27cf4e7fa18395e1",
    "__v":0
  }
]
```

### Update a Specific Resource

#### request

```
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer A9BaPBrwIyyV0g8moyj3r4H4YWLzZfA783ci7XVfNb11gqthvRBdooYbh1m4aihirdhxyTKZs5HDkXQFtQpT8pMfflLyMeFocR9wp5zkVbT7VJ7jAvxABYuUBB2M92k5Bm8ZpXMzRIlgN1Gm4DMESjU14okV6kbOwHmhSn5dP88pzLBhFKmMJ99rKSmLjCYOpgMqisI9gwnSZmbEt5XCIwsseJVTLgd4hs6Ncv1x3shZeJYbnVWlaAV3gmfZ3fmV" -d '{"name":"My First Updated Resource"}' http://localhost:3000/api/resources/558433f627cf4e7fa18395e5
```

#### response

```
{
  "message":"Resource `My First Updated Resource` updated.",
  "data":{
    "_id":"558433f627cf4e7fa18395e5",
    "body":"some content and stuff",
    "type":"something-new",
    "name":"My First Updated Resource",
    "userId":"55842f5f27cf4e7fa18395e1",
    "__v":0
  }
}
```

### Delete a Specific Resource

#### request

```
curl -X DELETE -H "Authorization: Bearer A9BaPBrwIyyV0g8moyj3r4H4YWLzZfA783ci7XVfNb11gqthvRBdooYbh1m4aihirdhxyTKZs5HDkXQFtQpT8pMfflLyMeFocR9wp5zkVbT7VJ7jAvxABYuUBB2M92k5Bm8ZpXMzRIlgN1Gm4DMESjU14okV6kbOwHmhSn5dP88pzLBhFKmMJ99rKSmLjCYOpgMqisI9gwnSZmbEt5XCIwsseJVTLgd4hs6Ncv1x3shZeJYbnVWlaAV3gmfZ3fmV" http://localhost:3000/api/resources/558433f627cf4e7fa18395e5
```

#### response

```
{ message: 'Resource deleted.' }
```
