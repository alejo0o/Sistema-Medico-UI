import { Row, Col, FormControl, ListGroup, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import { useMediaQuery, ListItemText } from '@material-ui/core';

const StyledListItem = styled(ListGroup.Item)`
  cursor: pointer;
  &:hover {
    background: #fbf6f3;
  }
`;
const StyledIcon = styled.i`
  font-size: 2em;
  margin: auto 0;
  cursor: pointer;
  &:hover {
    color: #e43d40;
  }
`;

const Diagnostico = ({
  enfermedades,
  handleChangeCategoria,
  handleChangeSubcategoria,
  categoriasResults,
  subCategoriasRestuls,
  categoriasQuery,
  subcategoriasQuery,
  handleClickCategoria,
  handleClickSubcategoria,
  handleRemoveSubcategoria,
  handleSearchCategorias,
  handleSearchSubcategorias,
}) => {
  //console.log(enfermedades);
  const matches = useMediaQuery('(max-width:1024px)');
  return (
    <div style={{ background: '' }}>
      <Row>
        <Col sm={matches ? '6' : '4'}>
          <Form.Label>Categorias (código):</Form.Label>
          <div className='d-flex'>
            <FormControl
              name='categoria'
              type='text'
              placeholder='Categoria'
              onChange={handleChangeCategoria}
            />
            <Boton onClick={handleSearchCategorias}>
              <i className='fas fa-search' style={{ fontSize: '1.5em' }} />
            </Boton>
          </div>

          <ListGroup variant='flush'>
            {categoriasResults.length > 0 ? (
              categoriasResults.map((categoria) => (
                <StyledListItem
                  key={categoria.categoria_id}
                  onClick={() => {
                    handleClickCategoria(categoria.codigo);
                  }}>
                  {`${categoria.codigo}: ${categoria.descripcion}`}
                </StyledListItem>
              ))
            ) : (
              <ListGroup.Item>No hay resultados</ListGroup.Item>
            )}
          </ListGroup>
        </Col>

        <Col sm={matches ? '6' : '4'}>
          <Form.Label>Subcategorias (código o nombre):</Form.Label>
          <div className='d-flex'>
            <FormControl
              name='subcategoria'
              type='text'
              placeholder='Subcategoria'
              value={subcategoriasQuery}
              onChange={handleChangeSubcategoria}
            />
            <Boton onClick={handleSearchSubcategorias}>
              <i className='fas fa-search' style={{ fontSize: '1.5em' }} />
            </Boton>
          </div>
          <ListGroup variant='flush'>
            {subCategoriasRestuls.length > 0 ? (
              subCategoriasRestuls.map((subcategoria) => (
                <StyledListItem
                  key={subcategoria.subcategoria_id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleClickSubcategoria({
                      codigo: String(subcategoria.codigo).trim(),
                      descripcion: String(subcategoria.descripcion).trim(),
                    });
                  }}>
                  {`${subcategoria.codigo}: ${subcategoria.descripcion}`}
                </StyledListItem>
              ))
            ) : (
              <ListGroup.Item>No hay resultados</ListGroup.Item>
            )}
          </ListGroup>
        </Col>

        <Col sm={matches ? '' : '4'}>
          <Form.Label>Diagnóstico:</Form.Label>
          <div>
            <ListGroup>
              {enfermedades.length != 0 ? (
                enfermedades.map((enfermedad) => (
                  <ListGroup.Item
                    variant='info'
                    key={enfermedad.codigo}
                    className='d-flex'>
                    <ListItemText
                      primary={`${enfermedad.codigo}: ${enfermedad.descripcion}`}
                    />
                    <StyledIcon
                      className='far fa-times-circle'
                      onClick={() => {
                        handleRemoveSubcategoria(enfermedad);
                      }}
                    />
                  </ListGroup.Item>
                ))
              ) : (
                <div className='p-3'>Vacio</div>
              )}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Diagnostico;
