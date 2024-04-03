import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Typography, Button, TextField, Grid, Card, CardMedia, MenuItem, TextareaAutosize } from '@mui/material';

interface FormData {
  name: string;
  option: string;
  codigo: string;
  marca: string;
  fornecedor: string;
  categoria: string;
  description: string;
}

function App() {
  const { register, handleSubmit } = useForm<FormData>();
  const [images, setImages] = useState<string[]>([]);
  const [professionalImage, setProfessionalImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...uploadedImages]);
  };

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;

    const droppedImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...droppedImages]);
  };

  const handleImageSelect = (index: number) => {
    setProfessionalImage(images[index]);
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Informações gerais
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField {...register('name')} label="Nome" placeholder='Nome do produto' fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select {...register('option')} label="Tipo" fullWidth>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField {...register('codigo')} label="Código (SKU)" placeholder='Código (SKU) do produto' fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select {...register('marca')} label="Marca" placeholder='Nome da marca' fullWidth>
              <MenuItem value="option1">Tommy</MenuItem>
              <MenuItem value="option2">DoceGalbana</MenuItem>
              <MenuItem value="option3">Nike</MenuItem>
              <MenuItem value="option4">Adidas</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select {...register('fornecedor')} label="Fornecedor" placeholder='Nome do fornecedor' fullWidth>
              <MenuItem value="option1">Tommy</MenuItem>
              <MenuItem value="option2">DoceGalbana</MenuItem>
              <MenuItem value="option3">Nike</MenuItem>
              <MenuItem value="option4">Adidas</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select {...register('categoria')} label="Categoria" placeholder='Nome da categoria' fullWidth>
              <MenuItem value="option1">Tommy</MenuItem>
              <MenuItem value="option2">DoceGalbana</MenuItem>
              <MenuItem value="option3">Nike</MenuItem>
              <MenuItem value="option4">Adidas</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={11.75}>
            <TextareaAutosize
              minRows={3}
              maxRows={8}
              {...register('description')}
              placeholder="Descrição"
              style={{ width: '100%', padding: '10px' }}
            />
          </Grid>
          <Grid item xs={12} >
            <input type="file" accept="image/*" onChange={handleImageUpload} multiple />
            <div
              onDrop={handleImageDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{ border: '1px solid #212121', padding: '20px', marginTop: '20px' }}
            >
              Arraste e solte suas imagens aqui
            </div>
            <div style={{ marginTop: '20px' }}>
              {images.map((image, index) => (
                <Card key={index} style={{ border: '1px solid #212121', width: '150px', display: 'inline-block', marginRight: '10px' }}>
                  <CardMedia component="img" image={image} />
                  <Button onClick={() => handleImageSelect(index)}>Selecionar</Button>
                  <Button onClick={() => handleImageRemove(index)}>Remover</Button>
                </Card>
              ))}
            </div>
          </Grid>
          {professionalImage && (
            <Grid item xs={12}>
              <Typography variant="h6">Imagem Profissional Selecionada:</Typography>
              <Card style={{ width: '150px' }}>
                <CardMedia component="img" image={professionalImage} />
              </Card>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default App;



