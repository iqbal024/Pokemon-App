import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        setPokemons(response.data.results);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Pokemon List
      </Typography>
      <Grid container spacing={3}>
        {pokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
            <Card>
              <CardMedia
                component="img"
                alt={pokemon.name}
                height="140"
                image={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                title={pokemon.name}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PokemonList;
