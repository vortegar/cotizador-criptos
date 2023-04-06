import styled from '@emotion/styled';

const Contenedor = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Imagen = styled.img`
    display:block;
    width: 120px;
`
const Texto = styled.p`
    font-size: 18px;
    font-weight: 100;
    span {
        font-weight: 700;
        color: #66A2FE;
    }
`

const Precio = styled.p`
    font-size: 24px;
    font-weight: 100;
    span {
        font-weight: 700;
        color: #66A2FE;
    }
`
const Monto = styled.p`
    margin:0;
    font-size: 24px;
    font-weight: 100;
    span {
        font-weight: 700;
        color: #fbae56;
    }
`
export const Resultado = ({ resultado, monto, cotizacion, monedas }) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

  return (
    <Contenedor>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
        <div>
            <Monto>Con tu compra obtendrás: <span>{ `${monto/cotizacion} de ${ monedas.criptomoneda }` }</span></Monto>
            <Precio>El precio es de: <span>{PRICE}</span></Precio>

            <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
            <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
            <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
        </div>
    </Contenedor>
  )
}
