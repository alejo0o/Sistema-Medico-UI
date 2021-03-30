import { Row, Col, FormControl, ListGroup } from 'react-bootstrap';
import { useState } from 'react';

const Diagnostico = ({
  handleChangeCategoria,
  handleChangeSubcategoria,
  categoriasResults,
  subCategoriasRestuls,
  categoriasQuery,
  subcategoriasQuery,
  handleClickCategoria,
}) => {
  return (
    <>
      <Col>
        <FormControl
          name='categoria'
          type='text'
          placeholder='Categoria'
          onChange={handleChangeCategoria}
        />
        <ListGroup variant='flush'>
          {categoriasResults.length > 0 ? (
            categoriasResults.map((categoria) => (
              <ListGroup.Item
                key={categoria.categoria_id}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleClickCategoria(categoria.codigo);
                }}>
                {`${categoria.codigo}: ${categoria.descripcion}`}
              </ListGroup.Item>
            ))
          ) : categoriasQuery.length < 2 ? (
            <ListGroup.Item>Ingrese al menos 2 caracteres</ListGroup.Item>
          ) : (
            <ListGroup.Item>No hay resultados</ListGroup.Item>
          )}
        </ListGroup>
      </Col>

      <Col>
        <FormControl
          name='subcategoria'
          type='text'
          placeholder='Subcategoria'
          value={subcategoriasQuery}
          onChange={handleChangeSubcategoria}
        />
        <ListGroup variant='flush'>
          {subCategoriasRestuls.length > 0 ? (
            subCategoriasRestuls.map((subcategoria) => (
              <ListGroup.Item
                key={subcategoria.subcategoria_id}
                style={{ cursor: 'pointer' }}
                onClick={() => {}}>
                {`${subcategoria.codigo}: ${subcategoria.descripcion}`}
              </ListGroup.Item>
            ))
          ) : subcategoriasQuery.length < 3 ? (
            <ListGroup.Item>Ingrese al menos 3 caracteres</ListGroup.Item>
          ) : (
            <ListGroup.Item>No hay resultados</ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </>
  );
};

export default Diagnostico;
/*{categoriasResults.length == 0 && (
          <Alert variant='warning'>Introduzca al menos 3 caracteres</Alert>
        )} */
