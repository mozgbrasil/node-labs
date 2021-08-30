[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/logo_32_32.png "MOZG"

![valid XHTML][checkmark]

# stit-talent

- https://github.com/stit/talent-data-api-test

> ## Routes
>
> > ### POST: `/login`
> >
> > Login the user and getting in the response the token
> >
> > #### Body
> >
> > ```json
> > {
> >   "email": "user_email",
> >   "password": "user_password"
> > }
> > ```
> >
> > #### Example Response:
> >
> > ```json
> > {
> >   "token": "eyJhbGciOiJIUzI1NiJ9.MzUwMTE5YzItMzFkYy00YTUzLWExNjYtYTk2YWQ1NWEzOGFj.W_TBtC5gRY6hssrK6JGHRKr3ETzFXQDctXVZVPOuPjY"
> > }
> > ```
>
> > ### GET `products/`
> >
> > Get all the products.
> >
> > #### Example Response:
> >
> > ```json
> > [
> >  {
> >    "name": "Handcrafted Plastic Keyboard",
> >    "department": "Music",
> >    "material": "Soft",
> >    "price": "173.00",
> >    "tags": [
> >      "Practical",
> >      "Small",
> >      "Licensed",
> >      "Practical"
> >    ]
> >  },
> >  {
> >    "name": "Gorgeous Plastic Chips",
> >    "department": "Health",
> >    "material": "Cotton",
> >    "price": "969.00",
> >    "tags": [
> >      "Gorgeous",
> >      "Incredible",
> >      "Handcrafted"
> >    ]
> >  },
> > ...
> > ]
> > ```

> > ### GET `products/{organization_name}?tags={any},{tag}`
> >
> > Get all products of an organization that has the provided tags on the Query URL
> >
> > #### Example
> >
> > `/products/Baby?tags=Intelligent,Rustic`
> >
> > #### Example Response:
> >
> > ```json
> > {
> >   "total": 16,
> >   "products": [
> >     {
> >       "name": "Sleek Plastic Gloves",
> >       "department": "Baby",
> >       "material": "Granite",
> >       "price": "931.00",
> >       "tags": [
> >         "Intelligent"
> >       ]
> >     },
> >     {
> >       "name": "Licensed Metal Sausages",
> >       "department": "Baby",
> >       "material": "Cotton",
> >       "price": "706.00",
> >       "tags": [
> >         "Rustic",
> >         "Licensed"
> >       ]
> >     },
> > ...
> > }
> > ```
