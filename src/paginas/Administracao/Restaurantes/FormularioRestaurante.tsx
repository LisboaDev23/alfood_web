import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import { httpAdmin } from "../../../http";
import { Link as RouterLink } from "react-router-dom";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  //buscar todos os parametros da determinada rota
  const parametros = useParams();

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      httpAdmin
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso!");
          setNomeRestaurante("");
        })
        .catch(() => {
          alert("Erro ao cadastrar o restaurante!");
        });
    } else {
      httpAdmin
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
          setNomeRestaurante("");
        })
        .catch(() => {
          alert("Erro ao cadastrar o restaurante!");
        });
    }
  };

  useEffect(() => {
    if (parametros.id) {
      httpAdmin
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((response) => {
          setNomeRestaurante(response.data.nome);
        })
        .catch((erro) => {
          console.log(erro);
          alert("Erro ao buscar o restaurante!");
        });
    }
  }, [parametros]);

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography component="h1" variant="h6">
                Formulario de Restaurantes
              </Typography>
              <Box
                component={"form"}
                sx={{ width: "100%" }}
                onSubmit={aoSubmeterForm}
              >
                <TextField
                  value={nomeRestaurante}
                  onChange={(e) => setNomeRestaurante(e.target.value)}
                  label="Nome do Restaurante"
                  variant="standard"
                  fullWidth
                  required
                />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined">
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FormularioRestaurante;
