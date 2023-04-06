import { Resultado, Formulario, Spinner } from './Components';
import { useState } from 'react'
import { useEffect } from 'react';

import styled from '@emotion/styled';
import ImgagenCripto from './img/imagen-criptos.png';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px ) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1` 
  font-family: 'Lato', sans-serif;
  color : #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cotizacion, setCotizacion] = useState(0)
  const [cargando, setCargando] = useState(false);
  const [monto, setMonto] = useState(0);

  useEffect(() => {
    if(Object.keys(monedas).length > 0 ) {
      
      const cotizarCripto = async() => {
        setCargando(true);
        setResultado({});
        const { moneda, criptomoneda } = monedas 
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const data = await fetch(url);
        const respuesta = await data.json();
        setResultado(respuesta.DISPLAY[criptomoneda][moneda]);
        setCotizacion(respuesta.RAW[criptomoneda][moneda].PRICE)
        setCargando(false);


      }
      cotizarCripto()
    }
  }, [monedas])
  
  return (
    <Contenedor>
      <Imagen 
        src={ ImgagenCripto }
        alt='imagenes criptomonedas'
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        
        <Formulario
          monto = {monto}
          setMonedas={ setMonedas }
          setMonto = { setMonto }
        />
        { cargando && <Spinner />}
        { resultado.PRICE && <Resultado resultado={ resultado } monto={ monto } cotizacion={ cotizacion } monedas={monedas} />}
      </div>
    </Contenedor>
  )
}

export default App
