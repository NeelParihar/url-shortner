# URL Shortner
Backend for URL shortner written in typescript using Typeorm and Express.

## Development 

### API Endpoints 

#### `GET /{shortcode}`

Generate 302 redirect to longURL of that shortcode  

#### `POST /api/urls` 
Request 
```json
{
    "url": "https://google.com/q/fgergnren"
}
```

Success Response (status: `201`)
```json 
{
    "status": "success", 
    "data": {
        "shortCode": "kb24JO7",
        "shortUrl": "https://localhost:3000/kb24JO7"
    }
}
```

Create new short code url (this will assign a random short code)

#### `POST /submit/{shortcode}`
Create a new shortcode with the given one 
Request 
```json
{
    "url": "https://somelong.url/of/long/length"
}
```

Success Response (status: `201`)
```json 
{
    "status": "success", 
    "data": {
        "shortCode": "{shortcode}",
        "shortLink": "https://localhost/{shortcode}"
    }
}
```


#### `GET /{shortcode}/stats`
Get details about a short code 


Error Response (status: `404`) 
```json
{
    "status": "error",
    "message": "Invalid short code. Not found"
}
```

Success Response (status: `200`)
```json 
{
    "status": "success", 
    "data": {
        "shortCode": "{shortcode}",
        "shortLink": "https://localhost:3000/{shortcode}"
    }
}
```

### Database 

#### Setup 

Setup database, user for this project

```postgres
create database urlshortner; 
create user urladmin with encrypted password 'urladmin';
grant all privileges on database urlshortner to urladmin;
```

#### Schema 

##### ShortUrl 

1. shortCode - storing Shorten code 
2. longUrl - Original Url Code
3. clicks - Identifys how many times a Url has been clicked
4. createdAt - When the ShortUrl was created
5. updatedAt - When the url was last accessed
