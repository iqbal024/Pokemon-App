import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { catchPokemon } from "../redux/pokemonSlice";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  Box,
} from "@mui/material";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [nickname, setNickname] = useState("");
  const [catching, setCatching] = useState(false);
  const [catchSuccess, setCatchSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => {
      setPokemon(response.data);
    });
  }, [name]);

  const handleCatch = () => {
    setCatching(true);
    axios.get("http://localhost:5000/catch").then((response) => {
      setCatchSuccess(response.data.success);
      setCatching(false);
    });
  };

  const handleSave = () => {
    if (catchSuccess) {
      dispatch(catchPokemon({ id: pokemon.id, name: pokemon.name, nickname }));
      setNickname("");
      setCatchSuccess(false);
    }
  };

  return (
    <Container>
      {pokemon && (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            {pokemon.name}
          </Typography>
          <Card>
            <CardMedia
              component="img"
              alt={pokemon.name}
              image={pokemon.sprites.front_default}
              title={pokemon.name}
              height="140"
            />
            <CardContent>
              <Typography variant="h6" component="h2">
                Moves
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {pokemon.moves.map((move) => move.move.name).join(", ")}
              </Typography>
              <Typography variant="h6" component="h2">
                Types
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCatch}
                disabled={catching}
              >
                Catch
              </Button>
              {catchSuccess && (
                <Box mt={2}>
                  <TextField
                    label="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                    style={{ marginLeft: "10px" }}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};

export default PokemonDetail;
