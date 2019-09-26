# ripe-banana

## Models

### Studio Model
```
{
  name: <name-of-studio RS>,
  address: {
    city: <city S>
    state: <state S>
    country: <country S>
  }
}
```

### Film Model
```
{
  title: <title of film RS>,
  studio: <studio _id RI>,
  released: <4-digit year RN>,
  cast: [{
    role: <name of character S>,
    actor: <actor _id RI>
  }]
}
```

### Actor Model
```
{
  name: <name RS>,
  dob: <date-of-birth D>,
  pob: <place-of-birth S>
}
```

### Reviewer Model
```
{
  name: <string RS>,
  company: <company or website name RS>
}
```

### Review Model
```
{
  rating: <rating number 1-5 RN>,
  reviewer: <review _id RI>
  review: <review-text, max-length 140 chars RS>,
  film: <film-id RI>
}
```

## Routes
Pick the set of routes that fit with your vertical slice.

### GET /studios

### GET /studios/:id

### GET /films

### GET /films/:id

### GET /actors

### GET /actors/:id

### GET /reviewer

### GET /reviewer/:id

### GET /reviews

### POST
Studio, Films, and Actors, Reviewers and Reviews can be added.

### PUT
Only Reviewers can be updated.

### DELETE
Studio, Films, and Actors can be deleted. However:
- Studios cannot be deleted if there are films from those studios
- Actors cannot be deleted who are in films.
